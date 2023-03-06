import React from "react";

import {
  Button, Column, Img, Input, Line, List, Row, Stack, Text
} from "components";
//import { CloseSVG } from "../../assets/images/index.js";
import { isEmpty } from "lodash";
import { getApplicantsselectjobideq1, getEmployeselectcounttechtageqreact, getStatusUpdateselectcounttechtageqreact } from "service/api";
import Sidebar from "../../../components/Sidebar";


const AllApplicationPage = () => {
  const [apiData3, setapiData3] = React.useState();
  const [apiData, setapiData] = React.useState();
  const [apiData4, setapiData4] = React.useState();
  const [apiData9, setapiData9] = React.useState();
  const [result, setResult] = React.useState();

  React.useEffect(() => {
    callApi3();
    callApi();
    callApi4();
    callApi9();
  }, []);

  React.useEffect(() => {
    if (!isEmpty(apiData) && !isEmpty(apiData4) && !isEmpty(apiData9)) {
      callVoteCountApi();
    }
  }, [apiData, apiData4, apiData9]);

  function callApi() {
    const req = {};

    getEmployeselectcounttechtageqreact(req)
      .then((res) => {
        setapiData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function callApi4() {
    const req = { params: { select: "count", applicant_id: "eq.1" } };

    getStatusUpdateselectcounttechtageqreact(req)
      .then((res) => {
        setapiData4(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function callApi9() {
    const req = { params: { select: "count", applicant_id: "eq.1", status: "eq.true" } };

    getStatusUpdateselectcounttechtageqreact(req)
      .then((res) => {
        setapiData9(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function callVoteCountApi() {

    if (apiData?.[0]?.count == apiData4?.[0]?.count) {
      setResult((apiData9?.[0]?.count / apiData?.[0]?.count) * 100)
      //upsert

    }
    else
      setResult("Under Process...")
  }


  function callApi3() {
    const req = { params: { job_id: "eq.1" } };

    getApplicantsselectjobideq1(req)
      .then((res) => {
        setapiData3(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const [inputvalue, setInputvalue] = React.useState("");

  return (
    <>
      <Column className="bg-gray_100 flex flex-col font-inter justify-start mx-[auto] w-[100%]">
        <Row className="flex flex-row md:flex-wrap sm:flex-wrap justify-evenly w-[100%]">
          <Sidebar className="w-[18%]" />
          <Column className="flex flex-col items-center max-w-[1640px] ml-[auto] mr-[auto] sm:mx-[0] sm:pl-[15px] sm:pr-[15px] sm:px-[0] w-[100%]">
            <Column className="flex flex-col items-center justify-start w-[100%]">
              <Row className="bg-white_A700 border border-gray_300 border-solid flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:p-[15px] p-[19px] md:p-[9px] w-[100%]">
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center md:ml-[16px] ml-[31px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[24%]">
                  <Text
                    className="font-medium text-black_900 w-[auto]"
                    as="h4"
                    variant="h4"
                  >
                    Search
                  </Text>
                  <Input
                    value={inputvalue}
                    onChange={(e) => setInputvalue(e?.target?.value)}
                    className="font-normal not-italic p-[0] text-[14px] placeholder:text-bluegray_500 text-bluegray_500 w-[100%]"
                    wrapClassName="flex md:ml-[8px] ml-[16px] sm:mx-[0] sm:w-[100%] w-[82%]"
                    name="Group3997"
                    placeholder="Search Employee..."
                    prefix={
                      <Img
                        src="images/img_search_bluegray_500.svg"
                        className="cursor-pointer ml-[5px] mr-[18px] sm:mr-[7px] sm:ml-[1px] md:mr-[9px] md:ml-[2px] my-[auto]"
                        alt="search"
                      />
                    }
                    suffix={
                      inputvalue?.length > 0 ? (
                        <CloseSVG
                          color="#757e8a"
                          className="cursor-pointer ml-[10px] mr-[22px] sm:mr-[8px] sm:ml-[3px] md:mr-[11px] md:ml-[5px] my-[auto]"
                          onClick={() => setInputvalue("")}
                        />
                      ) : (
                        ""
                      )
                    }
                    shape="srcRoundedBorder4"
                    size="mdSrc"
                    variant="srcFillBluegray50"
                  ></Input>
                </Row>
                <Img
                  src="images/img_user.svg"
                  className="sm:h-[17px] md:h-[22px] h-[42px] mr-[13px] sm:mr-[5px] md:mr-[6px] rounded-radius50 sm:w-[16px] md:w-[21px] w-[42px]"
                  alt="user"
                />
              </Row>
              <Column className="bg-white_A700 border border-indigo_100 border-solid flex flex-col justify-start p-[11px] sm:p-[4px] md:p-[5px] w-[100%]">
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center md:ml-[20px] ml-[39px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[30%]">
                  <Button
                    className="cursor-pointer font-medium min-w-[34%] text-[16px] text-center text-indigo_600 w-[max-content]"
                    shape="CustomBorderTL8"
                    variant="OutlineIndigo600"
                  >
                    Vote
                  </Button>
                  <Button
                    className="cursor-pointer font-medium min-w-[34%] text-[16px] text-center text-indigo_600 w-[max-content]"
                    variant="OutlineIndigo600"
                  >
                    My Vote
                  </Button>
                  <Button
                    className="cursor-pointer font-medium min-w-[34%] text-[16px] text-center text-white_A700 w-[max-content]"
                    shape="CustomBorderLR8"
                    variant="OutlineIndigo600_1"
                  >
                    All Application
                  </Button>
                </Row>
              </Column>
            </Column>
            <Column className="bg-white_A700 border border-gray_300 border-solid flex flex-col justify-center sm:mt-[12px] md:mt-[16px] mt-[32px] sm:mx-[0] sm:p-[15px] md:p-[25px] p-[50px] rounded-radius8 sm:w-[100%] w-[97%]">
              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start mt-[4px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[16%]">
                <Text
                  className="font-medium text-bluegray_700 w-[auto]"
                  as="h4"
                  variant="h4"
                >
                  Job title :
                </Text>
                <Text
                  className="font-medium ml-[4px] mt-[1px] text-black_900 w-[auto]"
                  as="h4"
                  variant="h4"
                >
                  Sr. React Developer
                </Text>
              </Row>
              <Column className="flex flex-col font-mulish items-center justify-start sm:mb-[31px] md:mb-[40px] mb-[78px] sm:mt-[14px] md:mt-[18px] mt-[36px] sm:px-[0] w-[100%]">
                <Column className="bg-gray_103 border border-indigo_100 border-solid flex flex-col items-center justify-start sm:p-[15px] p-[16px] md:p-[8px] w-[100%]">
                  <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start pr-[4px] pt-[4px] sm:px-[0] w-[100%]">
                    <Text
                      className="font-bold mt-[1px] text-gray_700 w-[auto]"
                      as="h3"
                      variant="h3"
                    >
                      Employee
                    </Text>

                    <Text
                      className="font-bold sm:ml-[106px] md:ml-[137px] ml-[266px] text-gray_700 w-[auto]"
                      as="h3"
                      variant="h3"
                    >
                      Overall a
                    </Text>
                    <Text
                      className="font-bold sm:ml-[113px] md:ml-[146px] ml-[284px] mt-[1px] text-gray_700 w-[auto]"
                      as="h3"
                      variant="h3"
                    >
                      Qualified
                    </Text>
                  </Row>
                </Column>
                <Stack className="h-[554px] md:mt-[10px] mt-[20px] sm:mt-[7px] relative w-[100%]">
                  <Column className="absolute flex flex-col items-center justify-start top-[0] w-[100%]">
                    <List
                      className="gap-[19px] sm:gap-[7px] md:gap-[9px] grid min-h-[auto] w-[100%]"
                      orientation="vertical"
                    >
                      {apiData3?.map((apiData5ResponseEle, index) => {
                        return (
                          <React.Fragment key={`apiData5ResponseEle${index}`}>
                            <Column className="flex flex-col justify-start my-[0] pt-[4px] w-[100%]">
                              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[95%]">
                                <Text
                                  className="font-semibold text-black_900 w-[auto]"
                                  as="h3"
                                  variant="h3"
                                >
                                  {apiData5ResponseEle?.["name"]}{" "}
                                </Text>
                                <Text
                                  className="font-bold sm:ml-[174px] md:ml-[225px] ml-[290px] mt-[1px] text-blue_700 w-[auto]"
                                  as="h3"
                                  variant="h3"
                                >
                                  {apiData5ResponseEle?.["overall_vote"]}%

                                </Text>
                                <Text
                                  className="font-bold sm:ml-[289px] md:ml-[374px] ml-[320px] mt-[1px] text-blue_700 w-[auto]"
                                  as="h3"
                                  variant="h3"
                                >
                                  {apiData5ResponseEle?.["is_qualified"] === false ? "Reject" : "Accept"}

                                </Text>
                              </Row>
                              <Line className="bg-indigo_100 h-[1px] md:mt-[10px] mt-[20px] sm:mt-[7px] w-[100%]" />
                            </Column>
                          </React.Fragment>
                        );
                      })}
                    </List>
                  </Column>
                </Stack>
              </Column>
            </Column>
          </Column>
        </Row>
      </Column>
    </>
  );
};

export default AllApplicationPage;
