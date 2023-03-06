import { Button, Column, List, Row, Text, TextArea } from "components";
import useForm from "hooks/useForm";
import { find } from "lodash";
import React from "react";
import { useLocation } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import {
  getApplicantsideq1, getGoogleresponseideq2,
  getNotificationNames, getStatusupdateselectemployevoteridfirstnamelastnameapplicantideq1
} from "service/api";
import * as yup from "yup";
import Base from "../../../components/Base";
import useCurrentUser from "../../../hooks/useCurrentUser";
import AcceptVotesModal from "../../../modals/AcceptVotes";
import RejectVotesModal from "../../../modals/RejectVotes";

const VoteHere = () => {
  const [apiData5, setapiData5] = React.useState();
  const [apiData6, setapiData6] = React.useState();
  const [apiData7, setapiData7] = React.useState();
  const [apiData9, setapiData9] = React.useState();
  const [apiData8, setapiData8] = React.useState();

  const [isOpenRejectVotesModal, setRejectVotesModal] = React.useState(false);
  const [isOpenAcceptVotesModal, setAcceptVotesModal] = React.useState(false);
  const [id, setId] = React.useState();
  const [voterid, setvoterid] = React.useState();
  const [status, setStatus] = React.useState();
  const [applicantid, setApplicantid] = React.useState();
  const [comments, setCommentsId] = React.useState();
  const [disabled, setDisabled] = React.useState(false);
  const { userData } = useCurrentUser();
  const location = useLocation();

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
    callGetApplicants(); //get particular applicant's data
    callGetAppGoogleResponse(); //get google response of a particular employe
    callGetStatusUpdate(); //status update of a particular applicant
    callGetEmployeNames(); //api to get employe names from noti table
    callApi9();

  }, [`${location?.state?.id}`]);


  const checkVotes = (res) => {
    let result = find(res, function (res) {
      if (
        res?.applicant_id.toString() === `${location.state.applicantID}` &&
        res?.voter_id.toString() === `${userData.id}`
      ) {
        return true;
      }
    });
    if (result) {
      setDisabled(true);
    }
  };


  function callGetEmployeNames() {
    const req = {
      params: {
        applicant_id: `eq.${location.state.applicantID}`,
        select: "*,name:employe(display_name)",
      },
    };

    getNotificationNames(req)
      .then((res) => {
        setapiData8(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }


  function callGetStatusUpdate() {
    const req = {
      params: {
        applicant_id: `eq.${location.state.applicantID}`,
        voter_id: `eq.${userData.id}`,
      },
    };

    getStatusupdateselectemployevoteridfirstnamelastnameapplicantideq1(req)
      .then((res) => {
        setapiData7(res);
        checkVotes(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function callApi9() {
    const req = {
      params: { applicant_id: `eq.${location.state.applicantID}` },
    };

    getStatusupdateselectemployevoteridfirstnamelastnameapplicantideq1(req)
      .then((res) => {
        setapiData9(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function callGetAppGoogleResponse() {
    const req = { params: { id: `eq.${location?.state?.id}` } };

    getGoogleresponseideq2(req)
      .then((res) => {
        setapiData5(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function callGetApplicants() {
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

  return (
    <Base title="Vote Here" headerType={2}>
      <Column className="bg-white_A700 flex flex-col justify-start sm:p-[4px] md:p-[5px] w-[100%]">
        <div className="p-[18px]">
          <Column className="bg-white_A700 flex flex-col justify-start sm:mt-[12px] md:mt-[16px] sm:mx-[0] sm:p-[15px] md:p-[25px] p-[50px] rounded-radius8 sm:w-[100%] w-[100%]">
            <Column className="flex flex-col justify-start sm:mx-[0] pt-[4px] sm:px-[0] sm:w-[100%] w-[100%]">
              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-start w-[100%]">
                <Text
                  className="font-medium text-black_900  w-[auto]"
                  as="h4"
                  variant="h4"
                >
                  Job title :
                </Text>
                <Text
                  className="font-medium text-bluegray_700 w-[auto] ml-[5px]"
                  as="h4"
                  variant="h4"
                >
                  {apiData6?.[0]?.["job_title"]}
                </Text>
              </Row>
              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center md:mt-[10px] mt-[20px] sm:mt-[7px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[80%]">
                <Text
                  className="font-medium mt-[1px] text-black_900 w-[auto]"
                  as="h4"
                  variant="h4"
                >
                  Experience :
                </Text>
                <Text
                  className="font-medium sm:ml-[1px] md:ml-[2px] ml-[5px] text-bluegray_700 w-[auto]"
                  as="h4"
                  variant="h4"
                >
                  {apiData6?.[0]?.["experience"]} Months
                </Text>
              </Row>
            </Column>
            <Column className="flex flex-col font-mulish justify-start sm:mt-[14px] md:mt-[18px] mt-[36px] sm:px-[0] rounded-radius2 w-[100%]">
              <Text
                className="font-semibold text-bluegray_900 w-[auto]"
                as="h3"
                variant="h3"
              >
                <span className="text-blue_700 text-[18px] font-mulish font-bold">
                  XYZ
                </span>
                <span className="text-bluegray_900 text-[18px] font-mulish">
                  {" "}
                  based on job descriptions
                </span>
              </Text>
              <List
                className="bg-gray_103 border border-indigo_100 border-solid md:gap-[122px] gap-[237px] sm:gap-[94px] grid min-h-[auto] mt-[16px] sm:mt-[6px] md:mt-[8px] sm:p-[2px] md:p-[3px] p-[7px] rounded-radius2 w-[100%] h-[270px]"
                orientation="vertical"
              >
                {apiData5?.map((apiData5ResponseEle, index) => {
                  return (
                    <React.Fragment key={`apiData5ResponseEle${index}`}>
                      <Column className="flex flex-col items-center justify-start sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[100%] h-[100%]">
                        <Text
                          className="font-semibold text-gray_503 w-[100%] h-[90%] overflow-y-auto break-all"
                          as="h4"
                          variant="h4"
                        >
                          {apiData5ResponseEle?.answer}
                        </Text>
                      </Column>
                    </React.Fragment>
                  );
                })}
              </List>
              <TextArea
                className="font-semibold p-[10px] text-[16px] placeholder:text-gray_503 text-gray_503 w-[100%] border border-indigo_100 border-solid mt-[2%]"
                wrapClassName="flex md:mt-[15px] mt-[30px] sm:mt-[11px] w-[100%]"
                name="TextPlaceholde"
                placeholder="Note your remarks here..."
                onChange={(e) => {
                  form.handleChange("comments", e.target.value);
                }}
                value={form?.values?.comments}

                shape="RoundedBorder4"
                variant="OutlineIndigo100"
              ></TextArea>
              <Row className="justify-start items-center flex flex-row w-full h-[12px] mt-[10px] ml-[2px]">
                <Text
                  className="font-normal text-[11px] text-red-600 w-[max-content] mr-[20px]"
                  wrapClassName="w-2/3 "
                  as="h5"
                  variant="h5"
                >
                  {form?.errors?.["comments"]}
                </Text>
              </Row>
            </Column>
            <Row className="flex flex-row-reverse md:flex-wrap sm:flex-wrap font-mulish items-center justify-start sm:mt-[12px] md:mt-[16px] mt-[31px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%]">
              <Button
                className={`${disabled
                  ? "cursor-not-allowed"
                  : "common-pointer cursor-pointer"
                  } font-normal min-w-[8%] text-[14px] text-center text-gray_603 w-[max-content] bg-indigo-500 ml-[20px] text-white_A700 rounded-none p-[12px]`}
                onClick={() => {
                  form.handleSubmit()
                    ? form.values["comments"] != ""
                      ? handleOpenAcceptVotesModal(
                        `${location.state.id}`,
                        `${userData.id}`,
                        true,
                        `${location.state.applicantID}`,
                        form?.values?.comments
                      )
                      : null
                    : null;
                }}
                size="lg"
                variant="FillBlue700"
                disabled={disabled}
              >
                Accept
              </Button>

              <Button
                className={` ${disabled
                  ? "cursor-not-allowed"
                  : "common-pointer cursor-pointer"
                  }  font-normal min-w-[8%] text-[14px] text-center text-gray_603 w-[max-content] bg-red-100 rounded-none p-[12px]`}
                onClick={() => {
                  form.handleSubmit()
                    ? form.values["comments"] != ""
                      ? handleOpenRejectVotesModal(
                        `${location.state.id}`,
                        `${userData.id}`,
                        false,
                        `${location.state.applicantID}`,
                        form?.values?.comments
                      )
                      : null
                    : null;
                }}
                size="lg"
                variant="FillRed100"
                disabled={disabled}
              >
                Reject
              </Button>
            </Row>
            <Column className="flex flex-col font-inter justify-start sm:mt-[19px] md:mt-[24px] mt-[48px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%]">
              <Text
                className="font-medium text-bluegray_901 w-[auto]"
                as="h2"
                variant="h2"
              >
                Your colleagues who voted{" "}
              </Text>
              <Row className="flex flex-row items-center justify-between mt-[20px]">
                <Text
                  className="font-medium text-bluegray_700 w-[auto]"
                  as="h4"
                  variant="h4"
                >
                  Employees
                </Text>

                <Text
                  className="font-medium text-bluegray_700 w-[auto]"
                  as="h4"
                  variant="h4"
                >
                  Status
                </Text>
              </Row>
              <List
                className="sm:gap-[398px] md:gap-[514px] gap-[90px] sm:grid-cols-1 grid-cols-2 min-h-[auto] md:mt-[10px] mt-[10px] sm:mt-[8px] py-[2px] w-[100%]"
                orientation="horizontal"
              >
                {apiData8?.map((apiData8ResponseEle, index) => {
                  return (
                    <React.Fragment key={`apiData8ResponseEle${index}`}>
                      <Row className="flex flex-row justify-between items-center sm:px-[0] w-[100%] my-[14px]">
                        <Text
                          className="font-normal md:mt-[12px] sm:mt-[9px] text-bluegray_901 w-[max-content] text-gray-500"
                          as="h5"
                          variant="h5"
                        >
                          {apiData8ResponseEle?.name?.["display_name"]}
                        </Text>

                        {apiData9?.map((val) => {
                          if (
                            val?.voter_id ===
                            apiData8ResponseEle?.["employe_id"]
                          ) {
                            return val?.status ? "Accepted" : "Rejected";
                          }
                        })}
                      </Row>
                    </React.Fragment>
                  );
                })}
              </List>
            </Column>
          </Column>
        </div>
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

export default VoteHere;
