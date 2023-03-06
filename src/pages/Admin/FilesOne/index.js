import React from "react";

import {
  Button,
  CheckBox, Column, Grid, Img, Input, Line, Row, Text
} from "components";
import { getFilesFromSupabase } from "service/api";

const FilesOnePage = () => {
  const [apiData6, setapiData6] = React.useState();
  React.useEffect(() => {
    callApi6();
  }, []);

  function callApi6() {
    const req = {};

    getFilesFromSupabase(req)
      .then((res) => {
        setapiData6(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <Column className="bg-gray_100 flex flex-col font-inter items-center justify-start mx-[auto] sm:pb-[15px] md:pb-[22px] pb-[44px] w-[100%]">
        <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start justify-evenly w-[100%]">
          <Column className="bg-white_A700 border border-gray_300 border-solid flex flex-col items-center justify-start max-w-[280px] sm:mb-[133px] md:mb-[172px] mb-[335px] ml-[auto] mr-[auto] sm:mx-[0] md:p-[12px] sm:p-[15px] p-[24px] sm:pl-[15px] sm:pr-[15px] w-[100%]">
            <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[73%]">
              <Img
                src="/images/img_settings.svg"
                className="flex-shrink-0 sm:h-[13px] md:h-[17px] h-[32px] max-w-[100%] sm:w-[12px] md:w-[16px] w-[32px]"
                alt="settings"
              />
              <Text
                className="flex-grow font-normal ml-[13px] sm:ml-[5px] md:ml-[6px] not-italic text-indigo_600"
                as="h2"
                variant="h2"
              >
                Employees
              </Text>
            </Row>
            <Column className="flex flex-col items-center justify-start sm:mb-[2px] md:mb-[3px] mb-[6px] md:mt-[12px] mt-[24px] sm:mt-[9px] sm:px-[0] w-[100%]">
              <Line className="bg-bluegray_100 h-[1px] w-[100%]" />
              <Column className="flex flex-col items-center justify-start md:mt-[12px] mt-[24px] sm:mt-[9px] w-[100%]">
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:p-[3px] md:p-[4px] p-[8px] rounded-radius8 w-[100%]">
                  <Img
                    src="/images/img_objectscolumn_24X24.svg"
                    className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                    alt="objectscolumn"
                  />
                  <Text
                    className="flex-grow font-medium ml-[10px] sm:ml-[3px] md:ml-[5px] text-bluegray_401"
                    as="h5"
                    variant="h5"
                  >
                    Dashboard
                  </Text>
                </Row>
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] w-[100%]">
                  <Img
                    src="/images/img_mail.svg"
                    className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                    alt="mail"
                  />
                  <Text
                    className="flex-grow font-medium ml-[10px] sm:ml-[3px] md:ml-[5px] text-bluegray_500"
                    as="h5"
                    variant="h5"
                  >
                    Invitation
                  </Text>
                </Row>
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] rounded-radius8 w-[100%]">
                  <Img
                    src="/images/img_upload.svg"
                    className="sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                    alt="upload"
                  />
                  <Text
                    className="font-medium ml-[10px] sm:ml-[3px] md:ml-[5px] text-bluegray_500 w-[auto]"
                    as="h5"
                    variant="h5"
                  >
                    Employee Directory
                  </Text>
                  <Img
                    src="/images/img_arrowright_bluegray_500.svg"
                    className="h-[16px] sm:h-[7px] md:h-[9px] max-w-[100%] ml-[12px] sm:ml-[4px] md:ml-[6px] w-[16px] sm:w-[6px] md:w-[8px]"
                    alt="arrowright"
                  />
                </Row>
                <Input
                  className="font-medium p-[0] text-[16px] placeholder:text-white_A700 text-white_A700 w-[100%]"
                  wrapClassName="flex md:mt-[6px] mt-[12px] sm:mt-[4px] w-[100%]"
                  name="Frame5933"
                  placeholder="Documents"
                  prefix={
                    <Img
                      src="/images/img_menu.svg"
                      className="ml-[7px] mr-[10px] sm:mr-[3px] sm:ml-[2px] md:mr-[5px] md:ml-[3px] my-[auto]"
                      alt="menu"
                    />
                  }
                  shape="RoundedBorder8"
                  size="lg"
                  variant="FillIndigo600"
                ></Input>
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] w-[100%]">
                  <Img
                    src="/images/img_volume.svg"
                    className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                    alt="volume"
                  />
                  <Text
                    className="flex-grow font-medium ml-[10px] sm:ml-[3px] md:ml-[5px] text-bluegray_500"
                    as="h5"
                    variant="h5"
                  >
                    Space Management
                  </Text>
                </Row>
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] w-[100%]">
                  <Img
                    src="/images/img_trophy.svg"
                    className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                    alt="trophy"
                  />
                  <Text
                    className="flex-grow font-medium ml-[10px] sm:ml-[3px] md:ml-[5px] text-bluegray_500"
                    as="h5"
                    variant="h5"
                  >
                    Training
                  </Text>
                </Row>
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] w-[100%]">
                  <Img
                    src="/images/img_search.svg"
                    className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                    alt="search"
                  />
                  <Text
                    className="flex-grow font-medium ml-[10px] sm:ml-[3px] md:ml-[5px] text-bluegray_500"
                    as="h5"
                    variant="h5"
                  >
                    Hiring
                  </Text>
                </Row>
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] w-[100%]">
                  <Img
                    src="/images/img_settings_24X24.svg"
                    className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                    alt="settings One"
                  />
                  <Text
                    className="flex-grow font-medium ml-[10px] sm:ml-[3px] md:ml-[5px] text-bluegray_500"
                    as="h5"
                    variant="h5"
                  >
                    Manage Role Position
                  </Text>
                </Row>
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] rounded-radius8 w-[100%]">
                  <Img
                    src="/images/img_settings_1.svg"
                    className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                    alt="settings Two"
                  />
                  <Text
                    className="flex-grow font-medium ml-[10px] sm:ml-[3px] md:ml-[5px] text-bluegray_500"
                    as="h5"
                    variant="h5"
                  >
                    Tool Settings
                  </Text>
                </Row>
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] w-[100%]">
                  <Img
                    src="/images/img_clock.svg"
                    className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                    alt="clock"
                  />
                  <Text
                    className="flex-grow font-medium ml-[10px] sm:ml-[3px] md:ml-[5px] text-bluegray_500"
                    as="h5"
                    variant="h5"
                  >
                    Data Settings
                  </Text>
                </Row>
              </Column>
              <Input
                className="font-medium p-[0] text-[16px] placeholder:text-bluegray_500 text-bluegray_500 w-[100%]"
                wrapClassName="flex md:mt-[182px] mt-[353px] sm:mt-[141px] w-[100%]"
                name="Logout"
                placeholder="Logout"
                suffix={
                  <Img
                    src="/images/img_question.svg"
                    className="ml-[35px] mr-[2px] sm:ml-[13px] md:ml-[18px] my-[auto]"
                    alt="question"
                  />
                }
                shape="RoundedBorder8"
                size="xl"
                variant="FillGray101"
              ></Input>
            </Column>
          </Column>
          <Column className="flex flex-col items-center justify-start max-w-[1640px] ml-[auto] mr-[auto] sm:mx-[0] sm:pl-[15px] sm:pr-[15px] sm:px-[0] w-[100%]">
            <Row className="bg-white_A700 border border-gray_300 border-solid flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between md:p-[11px] sm:p-[15px] p-[22px] w-[100%]">
              <Text
                className="font-medium ml-[10px] sm:ml-[3px] md:ml-[5px] text-black_900 w-[auto]"
                as="h3"
                variant="h3"
              >
                Documents
              </Text>
              <Text
                className="bg-deep_orange_A200 flex font-bold items-center mr-[10px] sm:mr-[3px] md:mr-[5px] px-[11px] sm:px-[4px] md:px-[5px] rounded-radius50 text-white_A700 w-[36px]"
                variant="body2"
              >
                AP
              </Text>
            </Row>
            <Column className="bg-white_A700 border border-gray_300 border-solid flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px] mt-[32px] sm:mx-[0] sm:py-[15px] py-[18px] md:py-[9px] rounded-radius8 sm:w-[100%] w-[97%]">
              <Column className="flex flex-col items-center justify-start sm:mb-[129px] md:mb-[167px] mb-[325px] w-[100%]">
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[97%]">
                  <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:mx-[0] sm:px-[0] rounded-radius4 sm:w-[100%] w-[25%]">
                    <Text
                      className="font-medium text-black_901 w-[auto]"
                      as="h5"
                      variant="h5"
                    >
                      Sort By
                    </Text>
                    <Row className="bg-bluegray_50 flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:mx-[0] sm:p-[3px] md:p-[4px] p-[9px] rounded-radius4 sm:w-[100%] w-[82%]">
                      <Column className="flex flex-col items-center md:ml-[3px] ml-[7px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[34%]">
                        <Text
                          className="font-normal not-italic text-bluegray_500 w-[auto]"
                          as="h6"
                          variant="h6"
                        >
                          --Select one--
                        </Text>
                      </Column>
                      <Img
                        src="/images/img_arrowup_gray_900.svg"
                        className="sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] mr-[15px] sm:mr-[5px] md:mr-[7px] md:w-[12px] w-[24px] sm:w-[9px]"
                        alt="arrowup"
                      />
                    </Row>
                  </Row>
                  <Button
                    className="flex items-center justify-center md:ml-[358px] min-w-[11%] ml-[694px] sm:ml-[277px] text-center w-[max-content]"
                    leftIcon={
                      <Img
                        src="/images/img_plus.svg"
                        className="mr-[8px] sm:mr-[3px] md:mr-[4px] text-center"
                        alt="plus"
                      />
                    }
                  >
                    <div className="bg-transparent cursor-pointer font-medium text-[14px] text-white_A700">
                      Create Folder
                    </div>
                  </Button>
                  <Button
                    className="flex items-center justify-center md:ml-[12px] min-w-[9%] ml-[24px] sm:ml-[9px] text-center w-[max-content]"
                    leftIcon={
                      <Img
                        src="/images/img_download.svg"
                        className="mr-[8px] sm:mr-[3px] md:mr-[4px] text-center"
                        alt="download"
                      />
                    }
                  >
                    <div className="bg-transparent cursor-pointer font-medium text-[14px] text-white_A700">
                      Download
                    </div>
                  </Button>
                  <Button
                    className="flex items-center justify-center md:ml-[12px] min-w-[8%] ml-[24px] sm:ml-[9px] text-center w-[max-content]"
                    leftIcon={
                      <Img
                        src="/images/img_upload_24X24.svg"
                        className="mr-[8px] sm:mr-[3px] md:mr-[4px] text-center"
                        alt="upload"
                      />
                    }
                    variant="FillDeeporangeA200"
                  >
                    <div className="bg-transparent cursor-pointer font-medium text-[14px] text-white_A700">
                      Upload
                    </div>
                  </Button>
                </Row>
                <Input
                  className="font-medium p-[0] text-[16px] placeholder:text-black_901 text-black_901 w-[100%]"
                  wrapClassName="flex md:mt-[8px] mt-[16px] sm:mt-[6px] w-[100%]"
                  name="Group3665"
                  placeholder="Demo"
                  prefix={
                    <Img
                      src="/images/img_arrowleft_gray_900.svg"
                      className="ml-[10px] mr-[12px] sm:mr-[4px] sm:ml-[3px] md:mr-[6px] md:ml-[5px] my-[auto]"
                      alt="arrow_left"
                    />
                  }
                  size="2xl"
                  variant="OutlineGray300"
                ></Input>
                <Column className="flex flex-col items-center justify-start md:mt-[12px] mt-[24px] sm:mt-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[97%]">
                  <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center w-[100%]">
                    <CheckBox
                      className="font-medium sm:mb-[2px] md:mb-[3px] mb-[7px] mt-[11px] sm:mt-[4px] md:mt-[5px] text-[18px] text-indigo_600"
                      inputClassName="h-[24px] mr-[5px] w-[24px]"
                      name="2FilesSelecte"
                      label="2 Files Selected"
                      variant="FillIndigo200"
                    ></CheckBox>
                    <Button
                      className="flex items-center justify-center md:ml-[496px] min-w-[9%] ml-[962px] sm:ml-[384px] text-center w-[max-content]"
                      leftIcon={
                        <Img
                          src="/images/img_download.svg"
                          className="mr-[8px] sm:mr-[3px] md:mr-[4px] text-center"
                          alt="download"
                        />
                      }
                    >
                      <div className="bg-transparent cursor-pointer font-medium text-[14px] text-white_A700">
                        Download
                      </div>
                    </Button>
                    <Column className="flex flex-col items-center md:ml-[12px] ml-[24px] sm:mx-[0] md:p-[4px] p-[9px] sm:px-[0] sm:py-[3px] rounded-radius8 sm:w-[100%] w-[6%]">
                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[81%]">
                        <Img
                          src="/images/img_edit_24X24.svg"
                          className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] md:w-[12px] w-[24px] sm:w-[9px]"
                          alt="edit"
                        />
                        <Text
                          className="flex-grow font-medium sm:ml-[3px] md:ml-[4px] ml-[8px] text-indigo_600"
                          as="h6"
                          variant="h6"
                        >
                          Edit
                        </Text>
                      </Row>
                    </Column>
                    <Column className="flex flex-col items-center md:ml-[12px] ml-[24px] sm:mx-[0] md:p-[4px] p-[9px] sm:px-[0] sm:py-[3px] rounded-radius8 sm:w-[100%] w-[8%]">
                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[85%]">
                        <Img
                          src="/images/img_trash_1.svg"
                          className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] md:w-[12px] w-[24px] sm:w-[9px]"
                          alt="trash"
                        />
                        <Text
                          className="flex-grow font-medium sm:ml-[3px] md:ml-[4px] ml-[8px] text-indigo_600"
                          as="h6"
                          variant="h6"
                        >
                          Delete
                        </Text>
                      </Row>
                    </Column>
                  </Row>
                  <Line className="bg-bluegray_100 h-[1px] mt-[18px] sm:mt-[7px] md:mt-[9px] w-[100%]" />
                  <Grid className="sm:gap-[11px] md:gap-[15px] gap-[30px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 min-h-[auto] sm:mt-[19px] md:mt-[25px] mt-[50px] sm:w-[100%] w-[98%]">
                    <Column className="bg-white_A700 flex flex-col items-center justify-start md:p-[15px] sm:p-[15px] p-[30px] rounded-radius12 shadow-bs1 w-[100%]">
                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:px-[0] w-[100%]">
                        <Button
                          className="flex sm:h-[12px] md:h-[16px] h-[30px] items-center justify-center sm:w-[11px] md:w-[15px] w-[30px]"
                          shape="icbRoundedBorder4"
                          size="smIcn"
                          variant="icbFillIndigo201"
                        >
                          <Img
                            src="/images/img_checkmark.svg"
                            className="h-[25px] sm:h-[10px] md:h-[13px] flex items-center justify-center"
                            alt="checkmark"
                          />
                        </Button>
                        <Button
                          className="flex sm:h-[12px] md:h-[16px] h-[30px] items-center justify-center sm:ml-[119px] md:ml-[153px] ml-[298px] sm:w-[11px] md:w-[15px] w-[30px]"
                          shape="icbRoundedBorder4"
                          size="smIcn"
                          variant="icbFillIndigo600"
                        >
                          <Img
                            src="/images/img_download.svg"
                            className="h-[16px] sm:h-[7px] md:h-[9px] flex items-center justify-center"
                            alt="download Two"
                          />
                        </Button>
                        <Img
                          src="/images/img_overflowmenu_30X30.svg"
                          className="sm:h-[12px] md:h-[16px] h-[30px] max-w-[100%] md:ml-[12px] ml-[24px] sm:ml-[9px] sm:w-[11px] md:w-[15px] w-[30px]"
                          alt="overflowmenu"
                        />
                      </Row>
                      <Column className="flex flex-col items-center justify-start md:mb-[12px] mb-[25px] sm:mb-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[32%]">
                        <Img
                          src="/images/img_paper.png"
                          className="max-w-[100%] w-[100%]"
                          alt="Paper"
                        />
                        <Text
                          className="font-medium md:mt-[12px] mt-[24px] sm:mt-[9px] text-black_901 w-[auto]"
                          as="h3"
                          variant="h3"
                        >
                          {apiData6?.response?.name}
                        </Text>
                      </Column>
                    </Column>
                    <Column className="bg-white_A700 flex flex-col items-center justify-start md:p-[15px] sm:p-[15px] p-[30px] rounded-radius12 shadow-bs1 w-[100%]">
                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:px-[0] w-[100%]">
                        <Button
                          className="flex sm:h-[12px] md:h-[16px] h-[30px] items-center justify-center sm:w-[11px] md:w-[15px] w-[30px]"
                          shape="icbRoundedBorder4"
                          size="smIcn"
                          variant="icbFillIndigo201"
                        >
                          <Img
                            src="/images/img_checkmark.svg"
                            className="h-[25px] sm:h-[10px] md:h-[13px] flex items-center justify-center"
                            alt="checkmark One"
                          />
                        </Button>
                        <Button
                          className="flex sm:h-[12px] md:h-[16px] h-[30px] items-center justify-center sm:ml-[119px] md:ml-[153px] ml-[298px] sm:w-[11px] md:w-[15px] w-[30px]"
                          shape="icbRoundedBorder4"
                          size="smIcn"
                          variant="icbFillIndigo600"
                        >
                          <Img
                            src="/images/img_download.svg"
                            className="h-[16px] sm:h-[7px] md:h-[9px] flex items-center justify-center"
                            alt="download Three"
                          />
                        </Button>
                        <Img
                          src="/images/img_overflowmenu_30X30.svg"
                          className="sm:h-[12px] md:h-[16px] h-[30px] max-w-[100%] md:ml-[12px] ml-[24px] sm:ml-[9px] sm:w-[11px] md:w-[15px] w-[30px]"
                          alt="overflowmenu One"
                        />
                      </Row>
                      <Column className="flex flex-col items-center justify-start md:mb-[12px] mb-[25px] sm:mb-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[32%]">
                        <Img
                          src="/images/img_paper.png"
                          className="max-w-[100%] w-[100%]"
                          alt="Paper One"
                        />
                        <Text
                          className="font-medium md:mt-[12px] mt-[24px] sm:mt-[9px] text-black_901 w-[auto]"
                          as="h3"
                          variant="h3"
                        >
                          Intranet.jpg
                        </Text>
                      </Column>
                    </Column>
                    <Column className="bg-white_A700 flex flex-col items-center justify-start md:p-[15px] sm:p-[15px] p-[30px] rounded-radius12 shadow-bs1 w-[100%]">
                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:px-[0] w-[100%]">
                        <div className="bg-white_A700 border-bluegray_101 border-bw083 border-solid sm:h-[12px] md:h-[16px] h-[30px] rounded-radius25 sm:w-[11px] md:w-[15px] w-[30px]"></div>
                        <Button
                          className="flex sm:h-[12px] md:h-[16px] h-[30px] items-center justify-center sm:ml-[119px] md:ml-[153px] ml-[298px] sm:w-[11px] md:w-[15px] w-[30px]"
                          shape="icbRoundedBorder4"
                          size="smIcn"
                          variant="icbFillIndigo600"
                        >
                          <Img
                            src="/images/img_download.svg"
                            className="h-[16px] sm:h-[7px] md:h-[9px] flex items-center justify-center"
                            alt="download Four"
                          />
                        </Button>
                        <Img
                          src="/images/img_overflowmenu_30X30.svg"
                          className="sm:h-[12px] md:h-[16px] h-[30px] max-w-[100%] md:ml-[12px] ml-[24px] sm:ml-[9px] sm:w-[11px] md:w-[15px] w-[30px]"
                          alt="overflowmenu Two"
                        />
                      </Row>
                      <Column className="flex flex-col items-center justify-start md:mb-[12px] mb-[25px] sm:mb-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[32%]">
                        <Img
                          src="/images/img_paper.png"
                          className="max-w-[100%] w-[100%]"
                          alt="Paper Two"
                        />
                        <Text
                          className="font-medium md:mt-[12px] mt-[24px] sm:mt-[9px] text-black_901 w-[auto]"
                          as="h3"
                          variant="h3"
                        >
                          Intranet.jpg
                        </Text>
                      </Column>
                    </Column>
                    <Column className="bg-white_A700 flex flex-col items-center justify-start md:p-[15px] sm:p-[15px] p-[30px] rounded-radius12 shadow-bs1 w-[100%]">
                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:px-[0] w-[100%]">
                        <div className="bg-white_A700 border-bluegray_101 border-bw083 border-solid sm:h-[12px] md:h-[16px] h-[30px] rounded-radius25 sm:w-[11px] md:w-[15px] w-[30px]"></div>
                        <Button
                          className="flex sm:h-[12px] md:h-[16px] h-[30px] items-center justify-center sm:ml-[119px] md:ml-[153px] ml-[298px] sm:w-[11px] md:w-[15px] w-[30px]"
                          shape="icbRoundedBorder4"
                          size="smIcn"
                          variant="icbFillIndigo600"
                        >
                          <Img
                            src="/images/img_download.svg"
                            className="h-[16px] sm:h-[7px] md:h-[9px] flex items-center justify-center"
                            alt="download Five"
                          />
                        </Button>
                        <Img
                          src="/images/img_overflowmenu_30X30.svg"
                          className="sm:h-[12px] md:h-[16px] h-[30px] max-w-[100%] md:ml-[12px] ml-[24px] sm:ml-[9px] sm:w-[11px] md:w-[15px] w-[30px]"
                          alt="overflowmenu Three"
                        />
                      </Row>
                      <Column className="flex flex-col items-center justify-start md:mb-[12px] mb-[25px] sm:mb-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[32%]">
                        <Img
                          src="/images/img_paper.png"
                          className="max-w-[100%] w-[100%]"
                          alt="Paper Three"
                        />
                        <Text
                          className="font-medium md:mt-[12px] mt-[24px] sm:mt-[9px] text-black_901 w-[auto]"
                          as="h3"
                          variant="h3"
                        >
                          Intranet.jpg
                        </Text>
                      </Column>
                    </Column>
                    <Column className="bg-white_A700 flex flex-col items-center justify-start md:p-[15px] sm:p-[15px] p-[30px] rounded-radius12 shadow-bs1 w-[100%]">
                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:px-[0] w-[100%]">
                        <div className="bg-white_A700 border-bluegray_101 border-bw083 border-solid sm:h-[12px] md:h-[16px] h-[30px] rounded-radius25 sm:w-[11px] md:w-[15px] w-[30px]"></div>
                        <Button
                          className="flex sm:h-[12px] md:h-[16px] h-[30px] items-center justify-center sm:ml-[119px] md:ml-[153px] ml-[298px] sm:w-[11px] md:w-[15px] w-[30px]"
                          shape="icbRoundedBorder4"
                          size="smIcn"
                          variant="icbFillIndigo600"
                        >
                          <Img
                            src="/images/img_download.svg"
                            className="h-[16px] sm:h-[7px] md:h-[9px] flex items-center justify-center"
                            alt="download Six"
                          />
                        </Button>
                        <Img
                          src="/images/img_overflowmenu_30X30.svg"
                          className="sm:h-[12px] md:h-[16px] h-[30px] max-w-[100%] md:ml-[12px] ml-[24px] sm:ml-[9px] sm:w-[11px] md:w-[15px] w-[30px]"
                          alt="overflowmenu Four"
                        />
                      </Row>
                      <Column className="flex flex-col items-center justify-start md:mb-[12px] mb-[25px] sm:mb-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[32%]">
                        <Img
                          src="/images/img_paper.png"
                          className="max-w-[100%] w-[100%]"
                          alt="Paper Four"
                        />
                        <Text
                          className="font-medium md:mt-[12px] mt-[24px] sm:mt-[9px] text-black_901 w-[auto]"
                          as="h3"
                          variant="h3"
                        >
                          Intranet.jpg
                        </Text>
                      </Column>
                    </Column>
                    <Column className="bg-white_A700 flex flex-col items-center justify-start md:p-[15px] sm:p-[15px] p-[30px] rounded-radius12 shadow-bs1 w-[100%]">
                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:px-[0] w-[100%]">
                        <div className="bg-white_A700 border-bluegray_101 border-bw083 border-solid sm:h-[12px] md:h-[16px] h-[30px] rounded-radius25 sm:w-[11px] md:w-[15px] w-[30px]"></div>
                        <Button
                          className="flex sm:h-[12px] md:h-[16px] h-[30px] items-center justify-center sm:ml-[119px] md:ml-[153px] ml-[298px] sm:w-[11px] md:w-[15px] w-[30px]"
                          shape="icbRoundedBorder4"
                          size="smIcn"
                          variant="icbFillIndigo600"
                        >
                          <Img
                            src="/images/img_download.svg"
                            className="h-[16px] sm:h-[7px] md:h-[9px] flex items-center justify-center"
                            alt="download Seven"
                          />
                        </Button>
                        <Img
                          src="/images/img_overflowmenu_30X30.svg"
                          className="sm:h-[12px] md:h-[16px] h-[30px] max-w-[100%] md:ml-[12px] ml-[24px] sm:ml-[9px] sm:w-[11px] md:w-[15px] w-[30px]"
                          alt="overflowmenu Five"
                        />
                      </Row>
                      <Column className="flex flex-col items-center justify-start md:mb-[12px] mb-[25px] sm:mb-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[32%]">
                        <Img
                          src="/images/img_paper.png"
                          className="max-w-[100%] w-[100%]"
                          alt="Paper Five"
                        />
                        <Text
                          className="font-medium md:mt-[12px] mt-[24px] sm:mt-[9px] text-black_901 w-[auto]"
                          as="h3"
                          variant="h3"
                        >
                          Intranet.jpg
                        </Text>
                      </Column>
                    </Column>
                  </Grid>
                </Column>
              </Column>
            </Column>
          </Column>
        </Row>
      </Column>
    </>
  );
};

export default FilesOnePage;
