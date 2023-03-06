import React from "react";

import { isEmpty } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getApplicantsselectjobtitleeqChiefEverythingOfficerPythonRemote,
  getNotificationNames,
  getStatusupdateselectemployevoteridfirstnamelastnameapplicantideq1
} from "service/api";
import { Column, Img, List, Row, Text } from "../../../components";
import Base from "../../../components/Base";

const ATSFlutterPage = () => {
  const [apiData, setapiData] = React.useState();
  const [apiData8, setapiData8] = React.useState();
  const [apiData9, setapiData9] = React.useState();

  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    getApplicants();
    getNotiNames();
    getStatus();
  }, []);

  function getStatus() {
    const req = { params: { select: "*,name:employe(display_name)" } };

    getStatusupdateselectemployevoteridfirstnamelastnameapplicantideq1(req)
      .then((res) => {
        setapiData9(res);
      })
      .catch((err) => {
      });
  }

  function getNotiNames() {
    const req = { params: { select: "*,name:employe(display_name)" } };

    getNotificationNames(req)
      .then((res) => {
        setapiData8(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getApplicants() {
    const req = { params: { job_title: `eq.${location.state.job}` } };
    getApplicantsselectjobtitleeqChiefEverythingOfficerPythonRemote(req)
      .then((res) => {
        setapiData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }


  return (
    <Base title={location.state.job}>
      <Column className="bg-white_A700 flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px] my-[32px] sm:mx-[0] md:p-[12px] sm:p-[15px] p-[24px] rounded-radius8 sm:w-[100%] w-[97%]">
        <Column className="flex flex-col gap-[31px] items-start justify-start w-[100%]">
          <Row className="flex flex-row items-center justify-between md:w-[100%] sm:w-[100%] w-[100%]">
            <div
              className="flex flex-row items-center justify-start w-[10%] common-pointer"
              onClick={() => navigate(-1)}
            >
              <Img
                src="/images/img_arrowleft.svg"
                className=" h-[24px] w-[24px]"
                alt="arrowleft"
              />
              <Text
                className="font-medium text-bluegray_500 text-left w-[auto]"
                as="h5"
                variant="h5"
              >
                Back
              </Text>
            </div>
            <Text
              className="font-medium text-black_900 text-left w-[auto]"
              as="h4"
              variant="h4"
            >
              {location.state.job}
            </Text>
            <span className="w-[10%]"></span>
          </Row>
          <div className="bg-white_A700 border border-gray_300 border-solid flex flex-col items-center justify-start w-[100%]">
            <div className="bg-gray_101 border border-gray_300 border-solid flex flex-col items-start justify-start p-[16px] w-[100%]">
              <Row className="flex md:flex-row sm:flex-col flex-row md:gap-[20px] sm:gap-[20px] items-center justify-around md:ml-[0] sm:ml-[0] md:w-[100%] sm:w-[100%] w-[100%]">
                <Column className="flex flex-col items-center justify-center w-[25%]">
                  <Text
                    className="font-semibold text-indigo_600 text-center w-[100%]"
                    variant="body1"
                  >
                    Applicant Name
                  </Text>
                </Column>
                <Column className="flex flex-col items-center justify-center w-[10%]">
                  <Text
                    className="font-semibold text-indigo_600 text-center w-[100%]"
                    variant="body1"
                  >
                    Sent XYZ
                  </Text>
                </Column>
                <Column className="flex flex-col items-center justify-center w-[10%]">
                  <Text
                    className="font-semibold text-indigo_600 text-center w-[100%]"
                    variant="body1"
                  >
                    Qualification
                  </Text>
                </Column>
                <Column className="flex flex-col items-center justify-center w-[10%]">
                  <Text
                    className="font-semibold text-indigo_600 text-center w-[100%]"
                    variant="body1"
                  >
                    Result
                  </Text>
                </Column>
                <Column className="flex flex-col items-center justify-center w-[15%]">
                  <Text
                    className="font-semibold text-indigo_600 text-center w-[100%]"
                    variant="body1"
                  >
                    Accept
                  </Text>
                </Column>
                <Column className="flex flex-col items-center justify-center w-[15%]">
                  <Text
                    className="font-semibold text-indigo_600 text-center w-[100%]"
                    variant="body1"
                  >
                    Rejected
                  </Text>
                </Column>
                <Column className="flex flex-col items-center justify-center w-[15%]">
                  <Text
                    className="font-semibold text-indigo_600 text-center w-[100%]"
                    variant="body1"
                  >
                    Pending
                  </Text>
                </Column>
              </Row>
            </div>
            <List
              className="flex-col grid sm:grid-cols-1 md:grid-cols-3 items-center w-[100%]"
              orientation="vertical"
            >
              {apiData?.map((apiDataResponseEle, index) => {
                return (
                  <React.Fragment key={`apiDataResponseEle${index}`}>
                    <div className="flex flex-col my-[20px] items-center justify-center w-[100%]">
                      <Row className="flex md:flex-row sm:flex-col flex-row items-center justify-around w-[100%] p-[16px]">
                        <Text
                          className="font-normal not-italic text-gray_900 text-center w-[25%]"
                          variant="body1"
                        >
                          {apiDataResponseEle?.name}
                        </Text>
                        <Text
                          className="font-normal not-italic text-gray_900 text-center w-[10%]"
                          variant="body1"
                        >
                          {apiDataResponseEle?.["sent_xyz"] === true
                            ? "Yes"
                            : "No"}
                        </Text>
                        <Text
                          className="font-normal not-italic text-gray_900 text-center w-[10%]"
                          variant="body1"
                        >
                          {isEmpty(apiDataResponseEle?.["overall_vote"]) ||
                            apiDataResponseEle?.["overall_vote"] == null
                            ? "Pending"
                            : apiDataResponseEle?.["is_qualified"] === true
                              ? "Yes"
                              : "No"}
                        </Text>
                        <Text
                          className="font-normal not-italic text-gray_900 text-center w-[10%]"
                          variant="body1"
                        >
                          {isEmpty(apiDataResponseEle?.["overall_vote"]) ||
                            apiDataResponseEle?.["overall_vote"] == null
                            ? "-"
                            : apiDataResponseEle?.["overall_vote"]}
                        </Text>
                        <Text
                          className="font-normal not-italic text-gray_900 text-center w-[15%]"
                          variant="body1"
                        >
                          {apiData9
                            ?.filter(
                              (a) =>
                                a.applicant_id === apiDataResponseEle?.["id"]
                            )
                            ?.map((val) => {
                              if (val?.status) {
                                return val?.name?.display_name;
                              }
                            })
                            .join(", ")}
                        </Text>
                        <Text
                          className="font-normal not-italic text-gray_900 text-center w-[15%]"
                          variant="body1"
                        >
                          {apiData9
                            ?.filter(
                              (a) =>
                                a.applicant_id === apiDataResponseEle?.["id"]
                            )
                            ?.map((val) => {
                              if (!val?.status) {
                                return val?.name?.display_name;
                              }
                            })
                            .join(", ")}
                        </Text>

                        <Text
                          className="font-normal not-italic text-gray_900 text-center w-[15%]"
                          variant="body1"
                        >
                          {apiData8
                            ?.filter(
                              (a) =>
                                a.applicant_id === apiDataResponseEle?.["id"]
                            )
                            ?.map((value) => {
                              {
                                if (
                                  value.applicant_id ===
                                  apiDataResponseEle?.["id"]
                                ) {
                                }

                                const newData = apiData9?.filter(
                                  (val) =>
                                    !!val?.voter_id &&
                                    val.applicant_id ===
                                    apiDataResponseEle?.["id"]
                                );

                                const data = newData?.some(
                                  (x) => x?.voter_id === value?.employe_id
                                );
                                if (!data) {
                                  return value?.name?.display_name;
                                }
                              }
                            })}
                        </Text>
                      </Row>
                    </div>
                  </React.Fragment>
                );
              })}
            </List>
          </div>
        </Column>
      </Column>
    </Base>
  );
};

export default ATSFlutterPage;
