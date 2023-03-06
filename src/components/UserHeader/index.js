import { Row, Text } from "components";
import { compact, isEmpty, uniq } from "lodash";
import React from "react";
import { BACKEND_URL, EMAIL_TEMPLATE_CONTENT, EMAIL_TEMPLATE_SUBJECT, TECH_TAG } from "../../constant";
import {
  FRESHTEAM_TOKN,
  FRESHTEAM_URL,
  getApplicantscategory1,
  getApplicantscategory2,
  getApplicantselectedById,
  getApplicantsselectjobideq1,
  getGoogleresponseselect,
  getResponses, postApplicantsFromFreshteam, postGoogleResposne, sendXYZEmail, updateSentXyzStatus
} from "../../service/api";
import { encryptStorage } from "../../util/encryptStorage";
import { NotificationIcon } from "../NotificationIcon";

const UserHeader = ({ className, children, prefix, suffix, ...restProps }) => {
  const [newApplicants, setnewApplicants] = React.useState([]);
  const [allApplicantsSupabase, setallApplicantsSupabase] = React.useState();
  const [applicantscategory2, setapplicantscategory2] = React.useState();
  const [applicantscategory1, setapplicantscategory1] = React.useState();
  const [isOpenNotificationdrawerModal, setNotificationdrawerModal] =
    React.useState(false);
  const [employeeList, setEmployeeList] = React.useState();
  const [supabaseGoogleRes, setsupabaseGoogleRes] = React.useState();
  const [notifyData, setnotifyData] = React.useState();
  const [notification, setnotifications] = React.useState();
  const [googleFormRes, setgoogleFormRes] = React.useState();
  const [supabaseRes, setsupabaseRes] = React.useState();
  const [applicants, setApplicants] = React.useState();

  // To get and insert new Applicants
  const ApiCalls = () => {
    const mins = new Date().getMinutes();
    if (mins === 0) {
      getAllApplicants();
      getApplicants1();
      getApplicants2();
    }
  };

  React.useEffect(() => {
    const interval = setInterval(ApiCalls, 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  async function getApplicants2() {
    const data = JSON.stringify({
      method: "get",
      url: `${FRESHTEAM_URL}hire/jobs/6000136821/applicants`,
      headers: {
        Authorization: FRESHTEAM_TOKN,
      },
      params: {
        category_id: "3",
        filter_id: "6007152174",
        includes:
          "applicant_state,stage,offer,job,interviews.feedback,interviews.stage,job,lead.positions,lead.ratings,lead.owner,lead.owner.avatar,requisition,lead.source,lead.medium",
        sort: "leads.updated_at",
        sort_type: "desc",
      },
    });

    const config = {
      method: "post",
      url: `${BACKEND_URL}data`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await getApplicantscategory2(config)
      .then((res) => {
        setapplicantscategory2(dataConvert(res));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getAllApplicants() {
    const req = {};

    getApplicantsselectjobideq1(req)
      .then((res) => {
        setallApplicantsSupabase(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function getApplicants1() {
    const data = JSON.stringify({
      method: "get",
      url: `${FRESHTEAM_URL}hire/jobs/6000136767/applicants`,
      headers: {
        Authorization: FRESHTEAM_TOKN,
      },
      params: {
        category_id: "3",
        filter_id: "6007152174",
        includes:
          "applicant_state,stage,offer,job,interviews.feedback,interviews.stage,job,lead.positions,lead.ratings,lead.owner,lead.owner.avatar,requisition,lead.source,lead.medium",
        sort: "leads.updated_at",
        sort_type: "desc",
      },
    });

    const config = {
      method: "post",
      url: `${BACKEND_URL}data`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await getApplicantscategory1(config)
      .then((res) => {
        setapplicantscategory1(dataConvert(res));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const dataConvert = (values) => {
    const { applicants, jobs, leads, interview_stages } = values;
    const data = leads?.map((data) => {
      const job_id = applicants?.filter((x) => x?.lead_id === data?.id)?.[0]
        ?.job_id;
      const job_title = jobs?.filter((x) => x?.id === job_id)[0]?.title;
      const techTag = uniq(
        compact(
          TECH_TAG?.map((x) => {
            if (x?.job_title?.includes(job_title?.toLowerCase())) {
              return x?.tech_tag;
            }
          })
        )
      )?.toString();

      return {
        name: `${data?.first_name} ${data?.middle_name} ${data?.last_name}`,
        email: data?.email,
        mobile: data?.mobile,
        experience: data?.total_experience_in_months,
        job_id: job_id,
        job_title: job_title,
        tech_tag: techTag,
      };
    });
    return data;
  };

  React.useEffect(() => {
    if (!isEmpty(applicantscategory2)) {
      const newAppli = applicantscategory2?.filter(
        ({ email: email1 }) =>
          !allApplicantsSupabase?.some(({ email: email2 }) => email1 === email2)
      );
      !isEmpty(newAppli) && callApi1(newAppli);
    }
  }, [applicantscategory2]);

  React.useEffect(() => {
    if (!isEmpty(applicantscategory1)) {
      const newAppli = applicantscategory1?.filter(
        ({ email: email1 }) =>
          !allApplicantsSupabase?.some(({ email: email2 }) => email1 === email2)
      );
      !isEmpty(newAppli) && callApi1(newAppli);
    }
  }, [applicantscategory1]);

  function callApi1(data) {
    const req = {
      headers: {},
      data: data,
    };

    postApplicantsFromFreshteam(req)
      .then((res) => {
        data?.map((val) => {
          sendEmail(val);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function sendEmail(val) {
    const data = {
      reciever: val?.email,
      subject: `${EMAIL_TEMPLATE_SUBJECT}`,
      content: `${EMAIL_TEMPLATE_CONTENT}`,
    };

    const req = { data: data };

    sendXYZEmail(req)
      .then((res) => {
        sentEmailConfirm(val?.email);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function sentEmailConfirm(email) {
    const req = {
      params: { email: `eq.${email}` },
      data: { sent_xyz: "true" },
    };

    updateSentXyzStatus(req)
      .then((res) => {
        //
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // To get and insert new google form res to supabase tableFooter

  const googleFormAPIcalls = () => {
    const mins = new Date().getMinutes();
    if (mins === 5) {
      getAllApplicantsSupabase();
      getGoogleResponseSupabasetable();
      getGoogleFormResponse();
    }
  };

  React.useEffect(() => {
    const interval = setInterval(googleFormAPIcalls, 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function getAllApplicantsSupabase() {
    const req = { params: { select: "id,email,sent_xyz" } };

    getApplicantselectedById(req)
      .then((res) => {
        setApplicants(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getGoogleResponseSupabasetable() {
    const req = { params: { select: "*" } };

    getGoogleresponseselect(req)
      .then((res) => {
        setsupabaseRes(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getGoogleFormResponse() {
    const accesstoken = encryptStorage.get("google_access_token");

    const data = JSON.stringify({
      method: "get",
      url: "https://forms.googleapis.com/v1/forms/1uTo1q-lzhlo4iNoFwTasVw6T9B4owcbEdiEdD4M2-5I/responses",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    });

    const config = {
      method: "post",
      url: `${BACKEND_URL}data`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };

    getResponses(config)
      .then((res) => {
        if (res?.status === 401) {
          getAccessToken();
        }
        setgoogleFormRes(res?.responses);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          getAccessToken();
        }
        console.error(err);
      });
  }

  function getAccessToken() {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer ya29.a0AVvZVsqybkOPrzTOt4-O7mysHl2d6liGx2rJYQH9BEt8sjo6P3bV0Nf-OaCE5XEm8VKCJ9XMsPct7tXomsekEvoFwr83kzEJG2twzEbyQF_hqY0ee5qXTimWS7FyKUt8b7ydp-ba7juC6gHNBNRSsxuj8dJkaCgYKAegSARESFQGbdwaIMo7wXAMyGMaoxpMz_PTXSQ0163"
    );

    var formdata = new FormData();
    formdata.append("grant_type", "refresh_token");
    formdata.append(
      "client_id",
      "740759777935-kjfllrb53icchubi810r9csr6017544p.apps.googleusercontent.com"
    );
    formdata.append("client_secret", "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");
    formdata.append(
      "refresh_token",
      "1//0gdNKPqVg3hJKCgYIARAAGBASNgF-L9Irwx9aOfcsLIY3d8XCPCVIAHzJw38sXPWWyalL7Gg714x72euB1z88J1uyy3t2OOtm9w"
    );
    formdata.append("access_type", "offline");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://oauth2.googleapis.com/token", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        encryptStorage.set("google_access_token", result?.access_token);
        getGoogleFormResponse();
      })
      .catch((error) => console.log("error", error));
  }

  React.useEffect(() => {
    if (!isEmpty(googleFormRes)) {
      const newRes = googleFormRes?.filter(
        ({ responseId: id1 }) =>
          !supabaseRes?.some(({ response_id: id2 }) => id1 === id2)
      );
      !isEmpty(newRes) && convertRes(newRes);
    }
  }, [googleFormRes]);

  function convertRes(data) {
    const res = data
      ?.filter((res) => res?.respondentEmail)
      ?.map((val) => {
        const question = Object?.values(val?.answers)[0];
        const applicantId = applicants?.filter(
          (data) => data?.email === val?.respondentEmail
        )?.[0]?.id;
        return {
          response_id: val?.responseId,
          question_id: question?.questionId,
          answer: question?.textAnswers?.answers?.[0]?.value,
          applicants_id: applicantId,
        };
      });
    !isEmpty(res) && postRes(res);
  }

  function postRes(res) {
    const req = { data: res };

    postGoogleResposne(req)
      .then((res) => {
        // setsupabaseRes(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <Row
        className={`bg-white_A700 flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between md:p-[11px] sm:p-[15px] p-[21px] w-[100%] ${
          // className={`bg-white_A700 border border-gray_300 border-solid flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between md:p-[11px] sm:p-[15px] p-[21px] w-[100%] ${
          className && className
          }`}
      >
        {!!prefix && prefix}
        {children && (
          <Text
            className="font-medium ml-[10px] sm:ml-[3px] md:ml-[5px] text-black_900 w-[auto]"
            as="h3"
            variant="h3"
          >
            {children}
          </Text>
        )}
        {!!suffix && suffix}
        <NotificationIcon />
      </Row>
    </>
  );
};

export { UserHeader };
