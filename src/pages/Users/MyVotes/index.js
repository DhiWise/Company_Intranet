import React from "react";

import { Button, Column, Img, Input, Line, List, Row, Text } from "components";
import { getStatusupdateselectemployevoteridfirstnamelastnameapplicantideq1 } from "service/api";

const MyVotesPage = () => {
  const [apiData4, setapiData4] = React.useState();
  React.useEffect(() => {
    callApi4();
  }, []);

  function callApi4() {
    const req = { params: { voter_id: "eq.425", select: "*,name:applicants(name)" } };

    getStatusupdateselectemployevoteridfirstnamelastnameapplicantideq1(req)
      .then((res) => {
        setapiData4(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function callApi7() {
    const req = { params: { applicant_id: "eq.1" } };

    getStatusupdateselectemployevoteridfirstnamelastnameapplicantideq1(req)
      .then((res) => {
        setapiData7(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const [inputvalue, setInputvalue] = React.useState("");

  return (
    <>
      <Column className="bg-gray_100 flex flex-col font-inter items-center justify-start mx-[auto] w-[100%]">
        <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-evenly w-[100%]">
          <aside className="md:hidden sm:hidden w-[15%]">
            <div className="">
              <Column className="bg-white_A700 border border-gray_300 border-solid flex flex-col items-center justify-start md:p-[12px] sm:p-[15px] p-[24px] w-[100%]">
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center max-w-[168px] ml-[auto] mr-[auto] sm:mx-[0] sm:pl-[15px] sm:pr-[15px] sm:px-[0] w-[100%]">
                  <Img
                    src="images/img_settings.svg"
                    className="flex-shrink-0 sm:h-[13px] md:h-[17px] h-[32px] max-w-[100%] sm:w-[12px] md:w-[16px] w-[32px]"
                    alt="settings"
                  />
                  <Text
                    className="flex-grow font-normal ml-[13px] sm:ml-[5px] md:ml-[6px] not-italic text-indigo_600"
                    as="h1"
                    variant="h1"
                  >
                    Employees
                  </Text>
                </Row>
                <Column className="flex flex-col items-center justify-start max-w-[232px] sm:mb-[2px] md:mb-[3px] mb-[6px] ml-[auto] mr-[auto] md:mt-[12px] mt-[24px] sm:mt-[9px] sm:pl-[15px] sm:pr-[15px] sm:px-[0] w-[100%]">
                  <Line className="bg-bluegray_100 h-[1px] w-[100%]" />
                  <Column className="flex flex-col items-center justify-start md:mt-[12px] mt-[24px] sm:mt-[9px] w-[100%]">
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:p-[3px] md:p-[4px] p-[8px] rounded-radius8 w-[100%]">
                      <Img
                        src="images/img_objectscolumn_24X24.svg"
                        className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                        alt="objectscolumn"
                      />
                      <Text
                        className="flex-grow font-medium ml-[10px] sm:ml-[3px] md:ml-[5px] text-bluegray_400"
                        as="h4"
                        variant="h4"
                      >
                        Dashboard
                      </Text>
                    </Row>
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] rounded-radius8 w-[100%]">
                      <Img
                        src="images/img_upload.svg"
                        className="sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                        alt="upload"
                      />
                      <Text
                        className="font-medium ml-[10px] sm:ml-[3px] md:ml-[5px] text-bluegray_500 w-[auto]"
                        as="h4"
                        variant="h4"
                      >
                        Employee Directory
                      </Text>
                      <Img
                        src="images/img_arrowright.svg"
                        className="h-[16px] sm:h-[7px] md:h-[9px] max-w-[100%] ml-[12px] sm:ml-[4px] md:ml-[6px] w-[16px] sm:w-[6px] md:w-[8px]"
                        alt="arrowright"
                      />
                    </Row>
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] w-[100%]">
                      <Img
                        src="images/img_volume.svg"
                        className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                        alt="volume"
                      />
                      <Text
                        className="flex-grow font-medium ml-[10px] sm:ml-[3px] md:ml-[5px] text-bluegray_500"
                        as="h4"
                        variant="h4"
                      >
                        Space Management
                      </Text>
                    </Row>
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] rounded-radius8 w-[100%]">
                      <Img
                        src="images/img_file.svg"
                        className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                        alt="file"
                      />
                      <Text
                        className="flex-grow font-medium ml-[10px] sm:ml-[3px] md:ml-[5px] text-bluegray_500"
                        as="h4"
                        variant="h4"
                      >
                        Documents
                      </Text>
                    </Row>
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] w-[100%]">
                      <Img
                        src="images/img_mail.svg"
                        className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                        alt="mail"
                      />
                      <Text
                        className="flex-grow font-medium ml-[10px] sm:ml-[3px] md:ml-[5px] text-bluegray_500"
                        as="h4"
                        variant="h4"
                      >
                        Invitation
                      </Text>
                    </Row>
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] w-[100%]">
                      <Img
                        src="images/img_trophy.svg"
                        className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                        alt="trophy"
                      />
                      <Text
                        className="flex-grow font-medium ml-[10px] sm:ml-[3px] md:ml-[5px] text-bluegray_500"
                        as="h4"
                        variant="h4"
                      >
                        Training
                      </Text>
                    </Row>
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] w-[100%]">
                      <Img
                        src="images/img_search.svg"
                        className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                        alt="search"
                      />
                      <Text
                        className="flex-grow font-medium ml-[10px] sm:ml-[3px] md:ml-[5px] text-bluegray_500"
                        as="h4"
                        variant="h4"
                      >
                        Hiring
                      </Text>
                    </Row>
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] w-[100%]">
                      <Img
                        src="images/img_settings_24X24.svg"
                        className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                        alt="settings One"
                      />
                      <Text
                        className="flex-grow font-medium ml-[10px] sm:ml-[3px] md:ml-[5px] text-bluegray_500"
                        as="h4"
                        variant="h4"
                      >
                        Manage Role Position
                      </Text>
                    </Row>
                    <Row className="bg-indigo_600 flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] rounded-radius8 w-[100%]">
                      <Img
                        src="images/img_map.svg"
                        className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                        alt="map"
                      />
                      <Text
                        className="flex-grow font-medium ml-[10px] sm:ml-[3px] md:ml-[5px] text-white_A700"
                        as="h4"
                        variant="h4"
                      >
                        Votes
                      </Text>
                    </Row>
                  </Column>
                  <Row className="bg-gray_101 flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:mt-[163px] md:mt-[211px] mt-[409px] p-[10px] sm:p-[3px] md:p-[5px] rounded-radius8 w-[100%]">
                    <Text
                      className="flex-grow font-medium sm:ml-[2px] md:ml-[3px] ml-[6px] text-bluegray_500"
                      as="h4"
                      variant="h4"
                    >
                      Logout
                    </Text>
                    <Img
                      src="images/img_question.svg"
                      className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] md:w-[12px] w-[24px] sm:w-[9px]"
                      alt="question"
                    />
                  </Row>
                </Column>
              </Column>
            </div>
          </aside>
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
                    className="cursor-pointer font-medium min-w-[34%] text-[16px] text-center text-white_A700 w-[max-content]"
                    variant="OutlineIndigo600_1"
                  >
                    My Vote
                  </Button>
                  <Button
                    className="cursor-pointer font-medium min-w-[34%] text-[16px] text-center text-indigo_600 w-[max-content]"
                    shape="CustomBorderLR8"
                    variant="OutlineIndigo600"
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
              <Column className="flex flex-col font-mulish justify-start mb-[144px] sm:mb-[57px] md:mb-[74px] sm:mt-[14px] md:mt-[18px] mt-[36px] sm:px-[0] w-[100%]">
                <Row className="bg-gray_103 border border-indigo_100 border-solid flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:p-[15px] p-[16px] md:p-[8px] w-[100%]">
                  <Text
                    className="font-bold sm:ml-[17px] md:ml-[22px] ml-[44px] sm:mt-[2px] md:mt-[3px] mt-[6px] text-gray_700 w-[auto]"
                    as="h3"
                    variant="h3"
                  >
                    Employee
                  </Text>
                  <Text
                    className="font-bold sm:mr-[17px] md:mr-[22px] mr-[44px] text-gray_700 w-[auto]"
                    as="h3"
                    variant="h3"
                  >
                    Your Vote
                  </Text>
                </Row>
                <List
                  className="gap-[19px] sm:gap-[7px] md:gap-[9px] grid min-h-[auto] md:mt-[10px] mt-[20px] sm:mt-[7px] w-[100%]"
                  orientation="vertical"
                >
                  {apiData4?.map((apiData5ResponseEle, index) => {
                    return (
                      <React.Fragment key={`apiData5ResponseEle${index}`}>
                        <Column className="flex flex-col justify-start pt-[4px] w-[100%]">
                          <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[96%]">
                            <Text
                              className="font-semibold text-black_900 w-[auto]"
                              as="h3"
                              variant="h3"
                            >

                              {apiData5ResponseEle?.["name"]?.["name"]}{" "}
                            </Text>
                            <Text
                              className="font-bold ml-[1215px] sm:ml-[485px] md:ml-[627px] mt-[1px] text-blue_700 w-[auto]"
                              as="h3"
                              variant="h3"
                            >
                              {apiData5ResponseEle?.["status"] === false ? "Reject" : "Accept"}
                            </Text>
                          </Row>
                          <Line className="bg-indigo_100 h-[1px] md:mt-[10px] mt-[20px] sm:mt-[7px] w-[100%]" />
                        </Column>
                      </React.Fragment>
                    );
                  })}
                </List>
              </Column>
            </Column>
          </Column>
        </Row>
      </Column>
    </>
  );
};

export default MyVotesPage;
