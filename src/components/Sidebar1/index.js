import React from "react";

import { Column, Row, Img, Text, Line } from "components";

const Sidebar1 = (props) => {
  const {} = props;

  return (
    <>
      <aside className={props.className}>
        <div className="">
          <Column className="flex flex-col items-center justify-start sm:mb-[11px] md:mb-[15px] mb-[30px] md:mt-[12px] mt-[24px] sm:mt-[9px] mx-[auto] sm:w-[100%] w-[83%]">
            <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[73%]">
              <Img
                src="/images/img_settings.svg"
                className="flex-shrink-0 sm:h-[13px] md:h-[17px] h-[32px] max-w-[100%] sm:w-[12px] md:w-[16px] w-[32px]"
                alt="settings"
              />
              <Text className="flex-grow font-inter font-normal ml-[13px] sm:ml-[5px] md:ml-[6px] my-[1px] not-italic sm:text-[20px] md:text-[22px] text-[24px] text-indigo_600">
                Employees
              </Text>
            </Row>
            <Column className="flex flex-col items-center justify-start md:mt-[12px] mt-[24px] sm:mt-[9px] w-[100%]">
              <Line className="bg-bluegray_100 h-[1px] w-[100%]" />
              <Column className="flex flex-col items-center justify-start md:mt-[12px] mt-[24px] sm:mt-[9px] w-[100%]">
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:p-[3px] md:p-[4px] p-[8px] rounded-radius8 w-[100%]">
                  <Img
                    src="/images/img_objectscolumn_24X24.svg"
                    className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                    alt="objectscolumn"
                  />
                  <Text className="flex-grow font-inter font-medium sm:mb-[1px] md:mb-[2px] mb-[5px] ml-[10px] sm:ml-[3px] md:ml-[5px] sm:mt-[2px] md:mt-[3px] mt-[6px] text-[16px] text-bluegray_401">
                    Dashboard
                  </Text>
                </Row>
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] w-[100%]">
                  <Img
                    src="/images/img_mail.svg"
                    className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                    alt="mail"
                  />
                  <Text className="flex-grow font-inter font-medium sm:mb-[1px] md:mb-[2px] mb-[5px] ml-[10px] sm:ml-[3px] md:ml-[5px] sm:mt-[2px] md:mt-[3px] mt-[6px] text-[16px] text-bluegray_500">
                    Invitation
                  </Text>
                </Row>
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] rounded-radius8 w-[100%]">
                  <Img
                    src="/images/img_upload.svg"
                    className="sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                    alt="upload"
                  />
                  <Text className="font-inter font-medium mb-[2px] ml-[10px] sm:ml-[3px] md:ml-[5px] sm:mt-[2px] md:mt-[3px] mt-[7px] text-[16px] text-bluegray_500 w-[auto]">
                    Employee Directory
                  </Text>
                  <Img
                    src="/images/img_arrowright_bluegray_500.svg"
                    className="h-[16px] sm:h-[7px] md:h-[9px] max-w-[100%] ml-[12px] sm:ml-[4px] md:ml-[6px] sm:my-[2px] md:my-[3px] my-[6px] w-[16px] sm:w-[6px] md:w-[8px]"
                    alt="arrowright"
                  />
                </Row>
                <Row className="bg-indigo_600 flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] rounded-radius8 w-[100%]">
                  <Img
                    src="/images/img_menu.svg"
                    className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                    alt="menu"
                  />
                  <Text className="flex-grow font-inter font-medium sm:mb-[1px] md:mb-[2px] mb-[5px] ml-[10px] sm:ml-[3px] md:ml-[5px] sm:mt-[2px] md:mt-[3px] mt-[6px] text-[16px] text-white_A700">
                    Documents
                  </Text>
                </Row>
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] w-[100%]">
                  <Img
                    src="/images/img_volume.svg"
                    className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                    alt="volume"
                  />
                  <Text className="flex-grow font-inter font-medium mb-[2px] ml-[10px] sm:ml-[3px] md:ml-[5px] sm:mt-[2px] md:mt-[3px] mt-[7px] text-[16px] text-bluegray_500">
                    Space Management
                  </Text>
                </Row>
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] w-[100%]">
                  <Img
                    src="/images/img_trophy.svg"
                    className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                    alt="trophy"
                  />
                  <Text className="flex-grow font-inter font-medium mb-[2px] ml-[10px] sm:ml-[3px] md:ml-[5px] sm:mt-[2px] md:mt-[3px] mt-[7px] text-[16px] text-bluegray_500">
                    Training
                  </Text>
                </Row>
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] w-[100%]">
                  <Img
                    src="/images/img_search.svg"
                    className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                    alt="search"
                  />
                  <Text className="flex-grow font-inter font-medium mb-[2px] ml-[10px] sm:ml-[3px] md:ml-[5px] sm:mt-[2px] md:mt-[3px] mt-[7px] text-[16px] text-bluegray_500">
                    Hiring
                  </Text>
                </Row>
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] w-[100%]">
                  <Img
                    src="/images/img_settings_24X24.svg"
                    className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                    alt="settings One"
                  />
                  <Text className="flex-grow font-inter font-medium mb-[2px] ml-[10px] sm:ml-[3px] md:ml-[5px] sm:mt-[2px] md:mt-[3px] mt-[7px] text-[16px] text-bluegray_500">
                    Manage Role Position
                  </Text>
                </Row>
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] rounded-radius8 w-[100%]">
                  <Img
                    src="/images/img_settings_1.svg"
                    className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                    alt="settings Two"
                  />
                  <Text className="flex-grow font-inter font-medium mb-[2px] ml-[10px] sm:ml-[3px] md:ml-[5px] sm:mt-[2px] md:mt-[3px] mt-[7px] text-[16px] text-bluegray_500">
                    Tool Settings
                  </Text>
                </Row>
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:p-[3px] md:p-[4px] p-[8px] w-[100%]">
                  <Img
                    src="/images/img_clock.svg"
                    className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] my-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                    alt="clock"
                  />
                  <Text className="flex-grow font-inter font-medium mb-[2px] ml-[10px] sm:ml-[3px] md:ml-[5px] sm:mt-[2px] md:mt-[3px] mt-[7px] text-[16px] text-bluegray_500">
                    Data Settings
                  </Text>
                </Row>
              </Column>
              <Row className="bg-gray_101 flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:mt-[141px] md:mt-[182px] mt-[353px] p-[10px] sm:p-[3px] md:p-[5px] rounded-radius8 w-[100%]">
                <Text className="flex-grow font-inter font-medium sm:ml-[2px] md:ml-[3px] ml-[6px] sm:mt-[1px] md:mt-[2px] mt-[5px] text-[16px] text-bluegray_500">
                  Logout
                </Text>
                <Img
                  src="/images/img_question.svg"
                  className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] md:w-[12px] w-[24px] sm:w-[9px]"
                  alt="question"
                />
              </Row>
            </Column>
          </Column>
        </div>
      </aside>
    </>
  );
};

export default Sidebar1;
