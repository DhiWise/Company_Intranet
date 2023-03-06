import React from "react";
import ModalProvider from "react-modal";

import { Button, Column, Img, Row, Text } from "components";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getNotificationCount, getStatusUpdateselectcounttechtageqreact, postApplicants, postStatusupdate, sendXYZEmail } from "service/api";


const RejectVotesModal = (props) => {
  const [apiData1, setapiData1] = React.useState();
  const [AllAppapiData, setAllAppapiData] = React.useState();
  const [AllAppapiData4, setAllAppapiData4] = React.useState();
  const [AllAppapiData9, setAllAppapiData9] = React.useState();
  const [apiData, setapiData] = React.useState();
  const navigate = useNavigate();


  function callApi1() {
    const req = { data: { response_id: `${props.id}`, voter_id: `${props.voterid}`, status: `${props.status}`, applicant_id: `${props.applicantid}`, comments: `${props.comments}` } };
    postStatusupdate(req)
      .then((res) => {
        setapiData1(res);
        AllAppcallApi();
        navigate("/votes");

        props?.onRequestClose()

      })
      .catch((err) => {
        console.error(err);
      });
  }


  function AllAppcallApi() {
    const req = {
      params: { applicant_id: `eq.${props.applicantid}` }
    };

    getNotificationCount(req)
      .then((res) => {
        setAllAppapiData(res);
        AllAppcallApi4(res); //api to get total status count(Accepted/Rejected).
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function AllAppcallApi4(totalEmployee) {
    const req = { params: { select: "count", applicant_id: `eq.${props.applicantid}` } };

    getStatusUpdateselectcounttechtageqreact(req)
      .then((res) => {
        setAllAppapiData4(res);
        AllAppcallApi9(res, totalEmployee); //get status count of accepted .
      })
      .catch((err) => {
        console.error(err);
      });
  }


  function AllAppcallApi9(statusCount, totalEmployee) {
    const req = {
      params: { select: "count", applicant_id: `eq.${props.applicantid}`, status: "eq.true" },
    };

    getStatusUpdateselectcounttechtageqreact(req)
      .then((res) => {
        setAllAppapiData9(res);
        AllAppcallVoteCountApi(res, statusCount, totalEmployee); // API to count responses.
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function callApi(results, isQualified) {
    const req = {
      data: { overall_vote: `${results}`, id: `${props.applicantid}`, is_qualified: isQualified },
    };

    postApplicants(req)
      .then((res) => {
        setapiData(res);
        callApiToAckHR(isQualified);

      })
      .catch((err) => {
        console.error(err);
      });
  }

  function callApiToAckHR(isQualified) {
    const req = {
      data: { id: `${props.applicantid}`, sent_mail_to_hr: true },
    };

    postApplicants(req)
      .then(() => {
        sendEmail(isQualified)

      })
      .catch((err) => {
        console.error(err);
      });
  }


  function sendEmail(isQualified) {

    const data = {
      reciever: 'YOUR_HR_EMAIL',
      subject: "Qualification status",
      content: isQualified ? `XYZ is verified for ${props.applicantid}` : `XYZ is not verified for ${props.applicantid}`
    }
    const req = { data: data };

    sendXYZEmail(req)
      .then(() => {

      })
      .catch((err) => {
        console.error(err);
      });
  }

  function AllAppcallVoteCountApi(acceptCount, statusCount, totalEmployee) {
    let is_qualified = false;

    if (totalEmployee?.[0]?.count === statusCount?.[0]?.count) {

      let total = (acceptCount?.[0]?.count / totalEmployee?.[0]?.count) * 100;
      if (total >= 70) {
        is_qualified = true;
      }
      callApi(total, is_qualified);
    }
  }
  return (
    <>
      <ModalProvider
        appElement={document.getElementById("root")}
        className="m-[auto] !w-[35%] sm:w-[100%] flex-col flex"
        overlayClassName="bg-black_900_99 fixed flex h-[100%] inset-y-[0] w-[100%]"
        {...props}
      >
        <div className="max-h-[97vh] overflow-y-auto">
          <Column className="bg-white_A700 flex flex-col items-center justify-start max-w-[669px] ml-[auto] mr-[auto] mt-[1px] sm:pb-[15px] md:pb-[30px] pb-[59px] sm:pl-[15px] sm:pr-[15px] rounded-radius12 shadow-bs1 w-[100%]">
            <Column className="bg-gray_101 flex flex-col items-center justify-end sm:p-[15px] p-[16px] md:p-[8px] rounded-bl-[0] rounded-br-[0] rounded-tl-[12px] rounded-tr-[12px] w-[100%]">
              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-end justify-between mt-[2px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[95%]">
                <Text
                  className="flex-grow font-bold sm:mt-[1px] md:mt-[2px] mt-[5px] text-black_901"
                  as="h4"
                  variant="h4"
                >
                  Vote to reject
                </Text>
                <Img
                  src="images/img_arrowright_gray_900.svg"
                  className="common-pointer flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] mb-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                  onClick={props.onRequestClose}
                  alt="arrowright"
                />
              </Row>
            </Column>
            <Text
              className="font-medium sm:mt-[20px] md:mt-[26px] mt-[52px] text-black_901 w-[auto]"
              as="h4"
              variant="h4"
            >
              Are you sure you want to reject this XYZ response?
            </Text>
            <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center sm:mt-[17px] md:mt-[23px] mt-[45px] sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[35%]">
              <Button
                className="common-pointer cursor-pointer font-medium min-w-[44%] text-[16px] text-center text-white_A700 w-[max-content]"
                onClick={() => {
                  callApi1();
                }}
                shape="RoundedBorder8"
              >
                Yes
              </Button>
              <Button
                className="common-pointer cursor-pointer font-medium min-w-[44%] sm:ml-[11px] md:ml-[15px] ml-[30px] text-[16px] text-center text-indigo_600 w-[max-content]"
                onClick={props.onRequestClose}
                shape="RoundedBorder8"
                variant="OutlineIndigo600"
              >
                No
              </Button>
            </Row>
          </Column>
        </div>
      </ModalProvider>
      <ToastContainer />
    </>
  );
};

export default RejectVotesModal;
