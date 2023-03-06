import { Column, Line, List, Row, Text } from "components";
import useForm from "hooks/useForm";
import { find, isEmpty } from "lodash";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  getApplicantsideq1,
  getApplicantsselectjobideq1,
  getEmployeeVotes,
  getEmployeselectcounttechtageqreact,
  getGoogleresponseideq2,
  getNotificationNames,
  getStatusUpdateselectcounttechtageqreact,
  getStatusupdateselectemployevoteridfirstnamelastnameapplicantideq1,
  postApplicants
} from "service/api";
import * as yup from "yup";
import Base from "../../../components/Base";
import { VOTES_CONST } from "../../../constant";
import useCurrentUser from "../../../hooks/useCurrentUser";
import AcceptVotesModal from "../../../modals/AcceptVotes";
import RejectVotesModal from "../../../modals/RejectVotes";

const VotesPage = () => {
  const [MyVoteapiData4, MyVotesetapiData4] = React.useState();
  const [apiData4, setapiData4] = React.useState();
  const [apiData5, setapiData5] = React.useState();
  const [apiData6, setapiData6] = React.useState();
  const [apiData7, setapiData7] = React.useState();
  const [apiData9, setapiData9] = React.useState();
  const [isOpenRejectVotesModal, setRejectVotesModal] = React.useState(false);
  const [isOpenAcceptVotesModal, setAcceptVotesModal] = React.useState(false);
  const [id, setId] = React.useState();
  const [voterid, setvoterid] = React.useState();
  const [status, setStatus] = React.useState();
  const [applicantid, setApplicantid] = React.useState();
  const [comments, setCommentsId] = React.useState();
  const [AllAppapiData3, setAllAppapiData3] = React.useState();
  const [AllAppapiData, setAllAppapiData] = React.useState();
  const [AllAppapiData4, setAllAppapiData4] = React.useState();
  const [AllAppapiData9, setAllAppapiData9] = React.useState();
  const [pendingVotes, setPendingVotes] = React.useState();
  const [apiData8, setapiData8] = React.useState();
  const [disabled, setDisabled] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [AllAppapiDataUpsert, setAllAppapiDataUpsert] = React.useState();
  const [result, setResult] = React.useState();
  const { userData } = useCurrentUser();
  const location = useLocation();
  const navigate = useNavigate();

  const formValidationSchema = yup.object().shape({
    comments: yup.string().required("Comment is required"),
  });
  const form = useForm(
    { comments: "" },
    {
      validate: true,
      validateSchema: formValidationSchema,
      validationOnChange: true,
    }
  );

  React.useEffect(() => {
    if (tabIndex == 0) {
      MyVotescallApi4();
    }
    if (tabIndex == 1) {
      MyVotescallApi4();
      AllAppcallApi3();
    }
    if (tabIndex == 2) {
      callApiNoti();
    }
  }, [tabIndex]);

  React.useEffect(() => {
    if (
      !isEmpty(AllAppapiData) &&
      !isEmpty(AllAppapiData4) &&
      !isEmpty(AllAppapiData9)
    ) {
      AllAppcallVoteCountApi();
    }
  }, [AllAppapiData, AllAppapiData4, AllAppapiData9]);

  function changeTab(index) {
    setTabIndex(index);
  }
  function callApiNoti() {
    //login user
    const req = {
      params: {
        employe_id: `eq.${userData.id}`,
        select:
          "*,jobTitle:applicants(job_title),experience:applicants(experience)",
      },
    };

    getNotificationNames(req)
      .then((res) => {
        setapiData8(res);
        MyStatusVotes(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function MyVotescallApi7() {
    const req = { params: { applicant_id: "eq.10" } };

    getStatusupdateselectemployevoteridfirstnamelastnameapplicantideq1(req)
      .then((res) => {
        setapiData7(res);
        checkVotes(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const checkVotes = () => {
    let result = find(apiData7, function (apiData7) {
      if (
        apiData7?.response_id == `${location.state.id}` &&
        apiData7.voter_id == userData.id
      ) {
        return true;
      }
    });
    if (result) {
      setDisabled(true);
    }
  };

  function AllAppcallApi() {
    const req = { params: { tech_tag: "eq.python" } };

    getEmployeselectcounttechtageqreact(req)
      .then((res) => {
        setAllAppapiData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function AllAppcallApi4() {
    const req = {
      params: {
        select: "count",
        applicant_id: `eq.${location.state.applicantID}`,
      },
    };

    getStatusUpdateselectcounttechtageqreact(req)
      .then((res) => {
        setAllAppapiData4(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function AllAppcallApi9() {
    const req = {
      params: {
        select: "count",
        applicant_id: `eq.${location.state.applicantID}`,
        status: "eq.true",
      },
    };

    getStatusUpdateselectcounttechtageqreact(req)
      .then((res) => {
        setAllAppapiData9(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function callApitoUpsert(results, isQualified) {
    const req = {
      data: { overall_vote: `${results}`, id: `10`, is_qualified: isQualified },
    };

    postApplicants(req)
      .then((res) => {
        setAllAppapiDataUpsert(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function AllAppcallVoteCountApi() {
    if (AllAppapiData?.[0]?.count == AllAppapiData4?.[0]?.count) {
      let is_qualified = false;
      let total =
        (AllAppapiData9?.[0]?.count / AllAppapiData?.[0]?.count) * 100;
      if (total >= 70) {
        is_qualified = true;
      }
      callApitoUpsert(total, is_qualified);
    }
  }

  function AllAppcallApi3() {
    const req = {};

    getApplicantsselectjobideq1(req)
      .then((res) => {
        setAllAppapiData3(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function MyVotescallApi4() {
    const req = {
      params: {
        voter_id: `eq.${userData.id}`,
        select: "*,name:applicants(name),jobTitle:applicants(job_title)",
        order: "created_at.desc",
      },
    };

    getStatusupdateselectemployevoteridfirstnamelastnameapplicantideq1(req)
      .then((res) => {
        MyVotesetapiData4(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function MyStatusVotes(noti) {
    //login
    const req = { params: { voter_id: `eq.${userData.id}` } };

    getStatusupdateselectemployevoteridfirstnamelastnameapplicantideq1(req)
      .then((res) => {
        setapiData9(res);
        getPendingApplications(noti, res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getPendingApplications(noti, status) {
    //login

    var uniqueResultArrayObjOne = noti.filter(function (objOne) {
      return !status.some(function (objTwo) {
        return objOne.applicant_id == objTwo.applicant_id;
      });
    });
    setPendingVotes(uniqueResultArrayObjOne);
  }

  function callApi7() {
    const req = {
      params: { applicant_id: `eq.${location.state.applicantID}` },
    };

    getStatusupdateselectemployevoteridfirstnamelastnameapplicantideq1(req)
      .then((res) => {
        setapiData7(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function callApi4() {
    const req = { params: { tech_tag: `eq.${apiData6?.[0]?.["tech_tag"]}` } };

    getEmployeeVotes(req)
      .then((res) => {
        setapiData4(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function callApi5() {
    const req = { params: { id: `eq.${location?.state?.id}` } };

    getGoogleresponseideq2(req)
      .then((res) => {
        setapiData5(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function callApi6() {
    const req = { params: { id: `eq.${location?.state?.applicantID}` } };

    getApplicantsideq1(req)
      .then((res) => {
        setapiData6(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handleOpenRejectVotesModal(
    id,
    voterId,
    status,
    applicantId,
    comments
  ) {
    setRejectVotesModal(true);
    setId(id);
    setvoterid(voterId);
    setStatus(status);
    setApplicantid(applicantId);
    setCommentsId(comments);
  }
  function handleCloseRejectVotesModal() {
    setRejectVotesModal(false);
  }
  function handleOpenAcceptVotesModal(
    id,
    voterId,
    status,
    applicantId,
    comments
  ) {
    setAcceptVotesModal(true);
    setId(id);
    setvoterid(voterId);
    setStatus(status);
    setApplicantid(applicantId);
    setCommentsId(comments);
  }
  function handleCloseAcceptVotesModal() {
    setAcceptVotesModal(false);
  }

  const [inputvalue, setInputvalue] = React.useState("");

  return (
    <Base title="Votes" headerType={2}>
      <Column className="bg-white_A700 flex flex-col justify-start sm:p-[4px] md:p-[5px] w-[100%]">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => changeTab(index)}>
          <TabList className="pl-[20px] pt-[10px] pb-[5px] border-b-2">
            {/* <Tab>Vote</Tab> */}
            <Tab>My Votes</Tab>
            <Tab>All applications</Tab>
            <Tab>Pending</Tab>
          </TabList>
          <div className="">
            <TabPanel className="">
              <Column className="bg-white_A700 flex flex-col justify-center sm:mt-[12px] md:mt-[16px] sm:mx-[0] sm:p-[15px] md:p-[25px] p-[50px] rounded-radius8 sm:w-[100%] w-[100%]">
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start mt-[4px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%]">
                  <Text
                    className="font-medium text-bluegray_700 w-[max-content]"
                    as="h4"
                    variant="h4"
                  >
                    Applications
                  </Text>
                </Row>
                <Column className="flex flex-col font-mulish justify-center items-center mb-[144px] sm:mb-[57px] md:mb-[74px] sm:mt-[14px] md:mt-[18px] mt-[36px] sm:px-[0] w-[100%]">
                  <Column className="bg-gray_103 border border-indigo_100 border-solid flex flex-col items-center justify-center sm:p-[15px] p-[16px] md:p-[8px] w-[100%]">
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start justify-between sm:px-[0] w-[100%]">
                      <Text
                        className="font-normal  text-gray-600 w-[auto]"
                        as="h4"
                        variant="h4"
                      >
                        Applicant
                      </Text>
                      <Text
                        className="font-normal  text-gray-600 w-[auto]"
                        as="h4"
                        variant="h4"
                      >
                        Job Title
                      </Text>
                      <Text
                        className="font-normal  text-gray-600 w-[auto]"
                        as="h4"
                        variant="h4"
                      >
                        Comments
                      </Text>
                      <Text
                        className="font-normal  text-gray-600 w-[auto]"
                        as="h4"
                        variant="h4"
                      >
                        Your Votes
                      </Text>
                    </Row>
                  </Column>
                  <List
                    className="grid min-h-[auto] md:mt-[10px] sm:mt-[7px] w-[100%]"
                    orientation="vertical"
                  >
                    {MyVoteapiData4?.map((apiData5ResponseEle, index) => {
                      return (
                        <React.Fragment key={`apiData5ResponseEle${index}`}>
                          <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start justify-between sm:mx-[0] sm:px-[0] sm:w-[100%] w-[98%] p-[14px]">
                            <Text
                              className="font-normal text-black_900 w-[auto]"
                              as="h4"
                              variant="h4"
                            >
                              {apiData5ResponseEle?.["name"]?.["name"]}{" "}
                            </Text>
                            <Text
                              className="font-normal text-black_900 w-[auto] text-center max-w-[40%] "
                              as="h4"
                              variant="h4"
                            >
                              {apiData5ResponseEle?.jobTitle?.["job_title"]}{" "}
                            </Text>
                            <Text
                              className="font-normal text-black_900 w-[auto]"
                              as="h4"
                              variant="h4"
                            >
                              {apiData5ResponseEle?.["comments"]}{" "}
                            </Text>

                            <Text
                              className={`font-semibold text-blue_700 w-[auto] text-right ${apiData5ResponseEle?.["status"]
                                ? `text-indigo-500`
                                : `text-red-500`
                                }`}
                              as="h4"
                              variant="h4"
                            >
                              {apiData5ResponseEle?.["status"] === false
                                ? "Reject"
                                : "Accept"}
                            </Text>
                          </Row>
                          <Line className="bg-indigo_100 h-[1px] md:mt-[10px] sm:mt-[7px] w-[100%]" />
                        </React.Fragment>
                      );
                    })}
                  </List>
                </Column>
              </Column>
            </TabPanel>

            <TabPanel className="">
              <Column className="bg-white_A700  flex flex-col justify-center sm:mt-[12px] md:mt-[16px] sm:mx-[0] sm:p-[15px] md:p-[25px] p-[50px] rounded-radius8 sm:w-[100%] w-[100%]">
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start mt-[4px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%]">
                  <Text
                    className="font-medium text-bluegray_700 w-[max-content]"
                    as="h4"
                    variant="h4"
                  >
                    Overall Status
                  </Text>
                </Row>
                <Column className="flex flex-col font-mulish items-center justify-center sm:mb-[31px] md:mb-[40px] mb-[78px] sm:mt-[14px] md:mt-[18px] mt-[36px] sm:px-[0] w-[100%]">
                  <Column className="bg-gray_103 border border-indigo_100 border-solid flex flex-col items-center justify-center sm:p-[15px] p-[16px] md:p-[8px] w-[100%]">
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start justify-between sm:px-[0] w-[100%]">
                      <Text
                        className="font-normal  text-gray-600 w-[auto]"
                        as="h4"
                        variant="h4"
                      >
                        Applicant
                      </Text>
                      <Text
                        className="font-normal  text-gray-600 w-[auto]"
                        as="h4"
                        variant="h4"
                      >
                        Job Title
                      </Text>

                      <Text
                        className="font-normal  text-gray-600 w-[auto]"
                        as="h4"
                        variant="h4"
                      >
                        Overall Votes
                      </Text>
                      <Text
                        className="font-normal  text-gray-600 w-[auto]"
                        as="h4"
                        variant="h4"
                      >
                        Qualified
                      </Text>
                    </Row>
                  </Column>
                  {/* <Stack className="h-[554px] md:mt-[10px] mt-[20px] sm:mt-[7px] relative w-[100%]"> */}
                  <Column className="flex flex-col items-center justify-start w-[100%]">
                    <List
                      className=" sm:gap-[7px] md:gap-[9px] grid min-h-[auto] w-[100%]"
                      orientation="vertical"
                    >
                      {AllAppapiData3?.filter((a) =>
                        MyVoteapiData4?.some((b) => a.id === b.applicant_id)
                      )?.map((apiData5ResponseEle, index) => {
                        return (
                          <React.Fragment key={`apiData5ResponseEle${index}`}>
                            <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:mx-[0] sm:px-[0] sm:w-[100%] w-[98%] p-[14px] ">
                              <Text
                                className="font-light text-black_900 w-[40%]"
                                as="h4"
                                variant="h4"
                              >
                                {apiData5ResponseEle?.["name"]}{" "}
                              </Text>
                              <Text
                                className="font-light text-black_900 w-[40%]"
                                as="h4"
                                variant="h4"
                              >
                                {apiData5ResponseEle?.["job_title"]}{" "}
                              </Text>
                              <Text
                                className="font-light justify-center text-blue_700 w-[25%] text-center"
                                as="h4"
                                variant="h4"
                              >
                                {isEmpty(
                                  apiData5ResponseEle?.["overall_vote"]
                                ) ||
                                  apiData5ResponseEle?.["overall_vote"] == null
                                  ? "-"
                                  : `${apiData5ResponseEle?.["overall_vote"]}%`}
                              </Text>

                              <Text
                                className={`font-semibold text-blue_700 w-[35%] text-right ${apiData5ResponseEle?.["is_qualified"]
                                  ? VOTES_CONST?.ACCEPTED_COLOR
                                  : VOTES_CONST?.REJECTED_COLOR
                                  }`}
                                as="h4"
                                variant="h4"
                              >
                                {isEmpty(
                                  apiData5ResponseEle?.["overall_vote"]
                                ) ||
                                  apiData5ResponseEle?.["overall_vote"] == null
                                  ? "Pending"
                                  : apiData5ResponseEle?.["is_qualified"] ===
                                    true
                                    ? "Yes"
                                    : "No"}
                              </Text>
                            </Row>
                            <Line className="bg-indigo_100 h-[1px] md:mt-[10px] sm:mt-[7px] w-[100%]" />
                          </React.Fragment>
                        );
                      })}
                    </List>
                  </Column>
                  {/* </Stack> */}
                </Column>
              </Column>
            </TabPanel>
            <TabPanel className="">
              <Column className="bg-white_A700 flex flex-col justify-center sm:mt-[12px] md:mt-[16px] sm:mx-[0] sm:p-[15px] md:p-[25px] p-[50px] rounded-radius8 sm:w-[100%] w-[100%]">
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start mt-[4px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%]">
                  <Text
                    className="font-medium text-bluegray_700 w-[max-content]"
                    as="h4"
                    variant="h4"
                  >
                    Applications yet to review...
                  </Text>
                </Row>
                <Column className="flex flex-col font-mulish items-center justify-center sm:mb-[31px] md:mb-[40px] mb-[78px] sm:mt-[14px] md:mt-[18px] mt-[36px] sm:px-[0] w-[100%]">
                  <Column className="bg-gray_103 border border-indigo_100 border-solid flex flex-col items-center justify-center sm:p-[15px] p-[16px] md:p-[8px] w-[100%]">
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-cneter justify-around sm:px-[0] w-[100%]">
                      <Text
                        className="font-normal  text-gray-600 w-[auto]"
                        as="h4"
                        variant="h4"
                      >
                        Job Title
                      </Text>
                      <Text
                        className="font-normal  text-gray-600 w-[auto]"
                        as="h4"
                        variant="h4"
                      >
                        Experience
                      </Text>
                    </Row>
                  </Column>
                  {/* <Stack className="h-[554px] md:mt-[10px] mt-[20px] sm:mt-[7px] relative w-[100%]"> */}
                  <Column className="flex flex-col items-center justify-around w-[100%]">
                    <List
                      className=" sm:gap-[7px] md:gap-[9px] grid min-h-[auto] w-[100%]"
                      orientation="vertical"
                    >
                      {pendingVotes?.map((apiData5ResponseEle, index) => {
                        return (
                          <React.Fragment key={`apiData5ResponseEle${index}`}>
                            <Row
                              onClick={() => {
                                navigate("/votehere", {
                                  state: {
                                    id: apiData5ResponseEle?.response_id,
                                    applicantID:
                                      apiData5ResponseEle?.applicant_id,
                                  },
                                });
                              }}
                              className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%] p-[14px] "
                            >
                              <Text
                                className="font-light text-black_900 w-[50%] text-center"
                                as="h5"
                                variant="h5"
                              >
                                {apiData5ResponseEle?.jobTitle?.["job_title"]}{" "}
                              </Text>
                              <Text
                                className="font-light text-black_900 w-[50%] text-center"
                                as="h5"
                                variant="h5"
                              >
                                {`${apiData5ResponseEle?.experience?.["experience"]} Months`}{" "}
                              </Text>
                            </Row>
                            <Line className="bg-indigo_100 h-[1px] md:mt-[10px] sm:mt-[7px] w-[100%]" />
                          </React.Fragment>
                        );
                      })}
                    </List>
                  </Column>
                  {/* </Stack> */}
                </Column>
              </Column>
            </TabPanel>
          </div>
        </Tabs>
      </Column>

      {isOpenRejectVotesModal ? (
        <RejectVotesModal
          isOpen={isOpenRejectVotesModal}
          onRequestClose={handleCloseRejectVotesModal}
          id={id}
          voterid={voterid}
          status={status}
          applicantid={applicantid}
          comments={comments}
        />
      ) : null}
      {isOpenAcceptVotesModal ? (
        <AcceptVotesModal
          isOpen={isOpenAcceptVotesModal}
          onRequestClose={handleCloseAcceptVotesModal}
          id={id}
          voterid={voterid}
          status={status}
          applicantid={applicantid}
          comments={comments}
        />
      ) : null}
    </Base>
  );
};

export default VotesPage;
