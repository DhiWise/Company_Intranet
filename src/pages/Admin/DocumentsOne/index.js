import React from "react";

import {
  Button, Column, Grid, Img, Input, Line, Row, Stack, Text
} from "components";
import Sidebar1 from "components/Sidebar1";
import UploadFileModal from "modals/UploadFile";

const DocumentsOnePage = () => {
  const [isOpenUploadFileModal, setUploadFileModal] = React.useState(false);

  function handleOpenUploadFileModal() {
    setUploadFileModal(true);
  }
  function handleCloseUploadFileModal() {
    setUploadFileModal(false);
  }

  return (
    <>
      <Column className="bg-gray_100 flex flex-col font-inter items-center justify-start mx-[auto] sm:pb-[15px] md:pb-[22px] pb-[44px] w-[100%]">
        <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start justify-evenly w-[100%]">
          <Sidebar1 className="md:hidden sm:hidden w-[15%]" />
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
            <Column className="bg-white_A700 border border-gray_300 border-solid flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px] mt-[32px] sm:mx-[0] sm:p-[15px] p-[18px] md:p-[9px] rounded-radius8 sm:w-[100%] w-[97%]">
              <Column className="flex flex-col items-center justify-start mb-[122px] sm:mb-[48px] md:mb-[62px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[99%]">
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start justify-between w-[100%]">
                  <Stack className="h-[436px] relative w-[33%]">
                    <Column className="absolute flex flex-col h-[max-content] inset-y-[0] items-center justify-start sm:mx-[0] my-[auto] sm:px-[0] right-[0] sm:w-[100%] w-[96%]">
                      <Column className="flex flex-col justify-start w-[100%]">
                        <Img
                          src="/images/img_arrowup_gray_900.svg"
                          className="sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] sm:ml-[123px] md:ml-[158px] ml-[308px] md:w-[12px] w-[24px] sm:w-[9px]"
                          alt="arrowup"
                        />
                        <Column className="bg-white_A700 flex flex-col items-end justify-start sm:mt-[23px] md:mt-[30px] mt-[59px] md:p-[15px] sm:p-[15px] p-[30px] rounded-radius12 shadow-bs1 w-[100%]">
                          <Column className="flex flex-col justify-start sm:mb-[11px] md:mb-[15px] mb-[30px] sm:mx-[0] pb-[3px] sm:px-[0] sm:w-[100%] w-[68%]">
                            <Img
                              src="/images/img_overflowmenu.svg"
                              className="sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] sm:ml-[101px] md:ml-[130px] ml-[253px] md:w-[12px] w-[24px] sm:w-[9px]"
                              alt="overflowmenu"
                            />
                            <Column className="flex flex-col items-center justify-start mr-[135px] md:mr-[69px] sm:mt-[2px] md:mt-[3px] mt-[7px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[52%]">
                              <Img
                                src="/images/img_folder_white_A700.png"
                                className="max-w-[100%] w-[100%]"
                                alt="Folder"
                              />
                              <Column className="flex flex-col items-center justify-start md:mt-[12px] mt-[24px] sm:mt-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[41%]">
                                <Text
                                  className="font-medium text-black_901 w-[auto]"
                                  as="h3"
                                  variant="h3"
                                >
                                  Demo
                                </Text>
                                <Text
                                  className="font-medium md:mt-[10px] mt-[20px] sm:mt-[7px] text-gray_502 w-[auto]"
                                  as="h5"
                                  variant="h5"
                                >
                                  4 Items
                                </Text>
                              </Column>
                            </Column>
                          </Column>
                        </Column>
                      </Column>
                    </Column>
                    <Column className="absolute flex flex-col items-end justify-start left-[0] sm:mx-[0] sm:px-[0] rounded-radius4 sm:w-[100%] w-[77%]">
                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between rounded-radius4 w-[100%]">
                        <Text
                          className="font-medium text-black_901 w-[auto]"
                          as="h5"
                          variant="h5"
                        >
                          Sort By
                        </Text>
                        <Input
                          className="font-normal not-italic p-[0] text-[14px] placeholder:text-bluegray_500 text-bluegray_500 w-[100%]"
                          wrapClassName="sm:mx-[0] sm:w-[100%] w-[82%]"
                          name="Group3997"
                          placeholder="--Select one--"
                          shape="RoundedBorder4"
                          size="sm"
                          variant="FillBluegray50"
                        ></Input>
                      </Row>
                      <Column className="bg-gray_103 flex flex-col justify-start sm:mt-[3px] md:mt-[4px] mt-[9px] sm:mx-[0] p-[13px] sm:p-[5px] md:p-[6px] rounded-radius4 shadow-bs1 sm:w-[100%] w-[81%]">
                        <Column className="flex flex-col items-center justify-start ml-[2px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[35%]">
                          <Text
                            className="font-normal not-italic text-bluegray_500 w-[auto]"
                            as="h6"
                            variant="h6"
                          >
                            --Select one--
                          </Text>
                        </Column>
                        <Column className="flex flex-col justify-start ml-[2px] sm:mt-[13px] md:mt-[17px] mt-[33px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[98%]">
                          <Text
                            className="font-normal not-italic text-bluegray_500 w-[auto]"
                            as="h6"
                            variant="h6"
                          >
                            (A-Z)
                          </Text>
                          <Line className="bg-gray_301 h-[1px] md:mt-[10px] mt-[21px] sm:mt-[8px] w-[100%]" />
                        </Column>
                        <Input
                          className="border-b-[1px] border-gray_301 font-normal not-italic p-[0] text-[14px] placeholder:text-bluegray_500 text-bluegray_500 w-[100%]"
                          wrapClassName="md:mt-[9px] ml-[2px] mt-[19px] sm:mt-[7px] sm:mx-[0] sm:w-[100%] w-[98%]"
                          name="Group3683"
                          placeholder="(Z-A)"
                          size="3xl"
                        ></Input>
                        <Input
                          className="border-b-[1px] border-gray_301 font-normal not-italic p-[0] text-[14px] placeholder:text-bluegray_500 text-bluegray_500 w-[100%]"
                          wrapClassName="md:mt-[9px] ml-[2px] mt-[19px] sm:mt-[7px] sm:mx-[0] sm:w-[100%] w-[98%]"
                          name="Group3685"
                          placeholder="Newest"
                          size="3xl"
                        ></Input>
                        <Input
                          className="border-b-[1px] border-gray_301 font-normal not-italic p-[0] text-[14px] placeholder:text-bluegray_500 text-bluegray_500 w-[100%]"
                          wrapClassName="md:mt-[9px] ml-[2px] mt-[19px] sm:mt-[7px] sm:mx-[0] sm:w-[100%] w-[98%]"
                          name="Group3687"
                          placeholder="Oldest"
                          size="3xl"
                        ></Input>
                        <Input
                          className="border-b-[1px] border-gray_301 font-normal not-italic p-[0] text-[14px] placeholder:text-bluegray_500 text-bluegray_500 w-[100%]"
                          wrapClassName="md:mt-[9px] ml-[2px] mt-[19px] sm:mt-[7px] sm:mx-[0] sm:w-[100%] w-[98%]"
                          type="text"
                          name="Group3689"
                          placeholder="Name Wise"
                          size="3xl"
                        ></Input>
                        <Text
                          className="font-normal mb-[15px] sm:mb-[5px] md:mb-[7px] ml-[2px] mt-[19px] sm:mt-[7px] md:mt-[9px] not-italic text-bluegray_500 w-[auto]"
                          as="h6"
                          variant="h6"
                        >
                          Date Wise
                        </Text>
                      </Column>
                    </Column>
                  </Stack>
                  <Column className="bg-white_A700 flex flex-col items-end justify-start mb-[13px] sm:mb-[5px] md:mb-[6px] sm:mt-[36px] md:mt-[47px] mt-[92px] sm:mx-[0] md:p-[15px] sm:p-[15px] p-[30px] rounded-radius12 shadow-bs1 sm:w-[100%] w-[32%]">
                    <Column className="flex flex-col justify-start sm:mb-[11px] md:mb-[15px] mb-[30px] sm:mx-[0] pb-[3px] sm:px-[0] sm:w-[100%] w-[68%]">
                      <Img
                        src="/images/img_overflowmenu.svg"
                        className="sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] sm:ml-[101px] md:ml-[130px] ml-[253px] md:w-[12px] w-[24px] sm:w-[9px]"
                        alt="overflowmenu One"
                      />
                      <Stack className="h-[206px] mr-[13px] sm:mr-[5px] md:mr-[6px] sm:mt-[2px] md:mt-[3px] mt-[7px] relative sm:w-[100%] w-[96%]">
                        <Column className="absolute flex flex-col items-center justify-start left-[0] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[54%]">
                          <Img
                            src="/images/img_folder_white_A700.png"
                            className="max-w-[100%] w-[100%]"
                            alt="Folder One"
                          />
                          <Text
                            className="font-medium md:mt-[12px] mt-[24px] sm:mt-[9px] text-black_901 w-[auto]"
                            as="h3"
                            variant="h3"
                          >
                            Employee
                          </Text>
                          <Text
                            className="font-medium md:mt-[10px] mt-[20px] sm:mt-[7px] text-gray_502 w-[auto]"
                            as="h5"
                            variant="h5"
                          >
                            2 Items
                          </Text>
                        </Column>
                        <Column className="absolute bg-white_A700 flex flex-col items-center justify-start sm:mx-[0] md:p-[12px] sm:p-[15px] p-[24px] right-[0] rounded-radius12 shadow-bs1 top-[1%] sm:w-[100%] w-[66%]">
                          <Column className="flex flex-col justify-start sm:px-[0] w-[100%]">
                            <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[57%]">
                              <Img
                                src="/images/img_edit.svg"
                                className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] md:w-[12px] w-[24px] sm:w-[9px]"
                                alt="edit"
                              />
                              <Text
                                className="flex-grow font-medium ml-[16px] sm:ml-[6px] md:ml-[8px] text-gray_600"
                                as="h5"
                                variant="h5"
                              >
                                Edit
                              </Text>
                            </Row>
                            <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center md:mt-[12px] mt-[24px] sm:mt-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[72%]">
                              <Img
                                src="/images/img_trash.svg"
                                className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] md:w-[12px] w-[24px] sm:w-[9px]"
                                alt="trash"
                              />
                              <Text
                                className="flex-grow font-medium ml-[16px] sm:ml-[6px] md:ml-[8px] text-gray_600"
                                as="h5"
                                variant="h5"
                              >
                                Delete
                              </Text>
                            </Row>
                            <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center md:mt-[12px] mt-[24px] sm:mt-[9px] w-[100%]">
                              <Img
                                src="/images/img_clock_24X24.svg"
                                className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] md:w-[12px] w-[24px] sm:w-[9px]"
                                alt="clock One"
                              />
                              <Text
                                className="flex-grow font-medium ml-[16px] sm:ml-[6px] md:ml-[8px] text-gray_600"
                                as="h5"
                                variant="h5"
                              >
                                Permission
                              </Text>
                            </Row>
                          </Column>
                        </Column>
                      </Stack>
                    </Column>
                  </Column>
                  <Column className="flex flex-col justify-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[33%]">
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-end ml-[auto] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[91%]">
                      <Button
                        className="flex items-center justify-center min-w-[35%] text-center w-[max-content]"
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
                        className="flex items-center justify-center md:ml-[12px] min-w-[30%] ml-[24px] sm:ml-[9px] text-center w-[max-content]"
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
                        className="flex items-center justify-center md:ml-[12px] min-w-[26%] ml-[24px] sm:ml-[9px] text-center w-[max-content]"
                        onClick={handleOpenUploadFileModal}
                        leftIcon={
                          <Img
                            src="/images/img_upload_24X24.svg"
                            className="mr-[8px] sm:mr-[3px] md:mr-[4px] text-center"
                            alt="upload"
                          />
                        }
                        variant="FillDeeporangeA200"
                      >
                        <div className="common-pointer bg-transparent cursor-pointer font-medium text-[14px] text-white_A700">
                          Upload
                        </div>
                      </Button>
                    </Row>
                    <Column className="bg-white_A700 flex flex-col items-end justify-start md:mr-[10px] mr-[20px] sm:mt-[19px] md:mt-[25px] mt-[50px] sm:mx-[0] md:p-[15px] sm:p-[15px] p-[30px] rounded-radius12 shadow-bs1 sm:w-[100%] w-[96%]">
                      <Column className="flex flex-col justify-start sm:mb-[11px] md:mb-[15px] mb-[30px] sm:mx-[0] pb-[3px] sm:px-[0] sm:w-[100%] w-[68%]">
                        <Img
                          src="/images/img_overflowmenu.svg"
                          className="sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] sm:ml-[101px] md:ml-[130px] ml-[253px] md:w-[12px] w-[24px] sm:w-[9px]"
                          alt="overflowmenu Two"
                        />
                        <Column className="flex flex-col items-center justify-start mr-[134px] md:mr-[69px] sm:mt-[2px] md:mt-[3px] mt-[7px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[52%]">
                          <Img
                            src="/images/img_folder_white_A700.png"
                            className="max-w-[100%] w-[100%]"
                            alt="Folder Two"
                          />
                          <Column className="flex flex-col items-center justify-start md:mt-[12px] mt-[24px] sm:mt-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[41%]">
                            <Text
                              className="font-medium text-black_901 w-[auto]"
                              as="h3"
                              variant="h3"
                            >
                              Demo
                            </Text>
                            <Text
                              className="font-medium md:mt-[10px] mt-[20px] sm:mt-[7px] text-gray_502 w-[auto]"
                              as="h5"
                              variant="h5"
                            >
                              4 Items
                            </Text>
                          </Column>
                        </Column>
                      </Column>
                    </Column>
                  </Column>
                </Row>
                <Column className="flex flex-col items-center justify-start mt-[17px] sm:mt-[6px] md:mt-[8px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[98%]">
                  <Grid className="sm:gap-[11px] md:gap-[15px] gap-[30px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 min-h-[auto] w-[100%]">
                    <Column className="bg-white_A700 flex flex-col items-end justify-start md:p-[15px] sm:p-[15px] p-[30px] rounded-radius12 shadow-bs1 w-[100%]">
                      <Column className="flex flex-col justify-start sm:mb-[11px] md:mb-[15px] mb-[30px] sm:mx-[0] pb-[3px] sm:px-[0] sm:w-[100%] w-[68%]">
                        <Img
                          src="/images/img_overflowmenu.svg"
                          className="sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] sm:ml-[101px] md:ml-[130px] ml-[253px] md:w-[12px] w-[24px] sm:w-[9px]"
                          alt="overflowmenu Three"
                        />
                        <Column className="flex flex-col items-center justify-start mr-[134px] md:mr-[69px] sm:mt-[2px] md:mt-[3px] mt-[7px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[52%]">
                          <Img
                            src="/images/img_folder_white_A700.png"
                            className="max-w-[100%] w-[100%]"
                            alt="Folder Three"
                          />
                          <Text
                            className="font-medium md:mt-[12px] mt-[24px] sm:mt-[9px] text-black_901 w-[auto]"
                            as="h3"
                            variant="h3"
                          >
                            Employee
                          </Text>
                          <Text
                            className="font-medium md:mt-[10px] mt-[20px] sm:mt-[7px] text-gray_502 w-[auto]"
                            as="h5"
                            variant="h5"
                          >
                            2 Items
                          </Text>
                        </Column>
                      </Column>
                    </Column>
                    <Column className="bg-white_A700 flex flex-col items-end justify-start md:p-[15px] sm:p-[15px] p-[30px] rounded-radius12 shadow-bs1 w-[100%]">
                      <Column className="flex flex-col justify-start sm:mb-[11px] md:mb-[15px] mb-[30px] sm:mx-[0] pb-[3px] sm:px-[0] sm:w-[100%] w-[68%]">
                        <Img
                          src="/images/img_overflowmenu.svg"
                          className="sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] sm:ml-[101px] md:ml-[130px] ml-[253px] md:w-[12px] w-[24px] sm:w-[9px]"
                          alt="overflowmenu Four"
                        />
                        <Column className="flex flex-col items-center justify-start mr-[134px] md:mr-[69px] sm:mt-[2px] md:mt-[3px] mt-[7px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[52%]">
                          <Img
                            src="/images/img_folder_white_A700.png"
                            className="max-w-[100%] w-[100%]"
                            alt="Folder Four"
                          />
                          <Text
                            className="font-medium md:mt-[12px] mt-[24px] sm:mt-[9px] text-black_901 w-[auto]"
                            as="h3"
                            variant="h3"
                          >
                            Employee
                          </Text>
                          <Text
                            className="font-medium md:mt-[10px] mt-[20px] sm:mt-[7px] text-gray_502 w-[auto]"
                            as="h5"
                            variant="h5"
                          >
                            2 Items
                          </Text>
                        </Column>
                      </Column>
                    </Column>
                    <Column className="bg-white_A700 flex flex-col items-end justify-start md:p-[15px] sm:p-[15px] p-[30px] rounded-radius12 shadow-bs1 w-[100%]">
                      <Column className="flex flex-col justify-start sm:mb-[11px] md:mb-[15px] mb-[30px] sm:mx-[0] pb-[3px] sm:px-[0] sm:w-[100%] w-[68%]">
                        <Img
                          src="/images/img_overflowmenu.svg"
                          className="sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] sm:ml-[101px] md:ml-[130px] ml-[253px] md:w-[12px] w-[24px] sm:w-[9px]"
                          alt="overflowmenu Five"
                        />
                        <Column className="flex flex-col items-center justify-start mr-[134px] md:mr-[69px] sm:mt-[2px] md:mt-[3px] mt-[7px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[52%]">
                          <Img
                            src="/images/img_folder_white_A700.png"
                            className="max-w-[100%] w-[100%]"
                            alt="Folder Five"
                          />
                          <Text
                            className="font-medium md:mt-[12px] mt-[24px] sm:mt-[9px] text-black_901 w-[auto]"
                            as="h3"
                            variant="h3"
                          >
                            Employee
                          </Text>
                          <Text
                            className="font-medium md:mt-[10px] mt-[20px] sm:mt-[7px] text-gray_502 w-[auto]"
                            as="h5"
                            variant="h5"
                          >
                            2 Items
                          </Text>
                        </Column>
                      </Column>
                    </Column>
                    <Column className="bg-white_A700 flex flex-col items-end justify-start md:p-[15px] sm:p-[15px] p-[30px] rounded-radius12 shadow-bs1 w-[100%]">
                      <Column className="flex flex-col justify-start sm:mb-[11px] md:mb-[15px] mb-[30px] sm:mx-[0] pb-[3px] sm:px-[0] sm:w-[100%] w-[68%]">
                        <Img
                          src="/images/img_overflowmenu.svg"
                          className="sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] sm:ml-[101px] md:ml-[130px] ml-[253px] md:w-[12px] w-[24px] sm:w-[9px]"
                          alt="overflowmenu Six"
                        />
                        <Column className="flex flex-col items-center justify-start mr-[134px] md:mr-[69px] sm:mt-[2px] md:mt-[3px] mt-[7px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[52%]">
                          <Img
                            src="/images/img_folder_white_A700.png"
                            className="max-w-[100%] w-[100%]"
                            alt="Folder Six"
                          />
                          <Text
                            className="font-medium md:mt-[12px] mt-[24px] sm:mt-[9px] text-black_901 w-[auto]"
                            as="h3"
                            variant="h3"
                          >
                            Employee
                          </Text>
                          <Text
                            className="font-medium md:mt-[10px] mt-[20px] sm:mt-[7px] text-gray_502 w-[auto]"
                            as="h5"
                            variant="h5"
                          >
                            2 Items
                          </Text>
                        </Column>
                      </Column>
                    </Column>
                    <Column className="bg-white_A700 flex flex-col items-end justify-start md:p-[15px] sm:p-[15px] p-[30px] rounded-radius12 shadow-bs1 w-[100%]">
                      <Column className="flex flex-col justify-start sm:mb-[11px] md:mb-[15px] mb-[30px] sm:mx-[0] pb-[3px] sm:px-[0] sm:w-[100%] w-[68%]">
                        <Img
                          src="/images/img_overflowmenu.svg"
                          className="sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] sm:ml-[101px] md:ml-[130px] ml-[253px] md:w-[12px] w-[24px] sm:w-[9px]"
                          alt="overflowmenu Seven"
                        />
                        <Column className="flex flex-col items-center justify-start mr-[134px] md:mr-[69px] sm:mt-[2px] md:mt-[3px] mt-[7px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[52%]">
                          <Img
                            src="/images/img_folder_white_A700.png"
                            className="max-w-[100%] w-[100%]"
                            alt="Folder Seven"
                          />
                          <Text
                            className="font-medium md:mt-[12px] mt-[24px] sm:mt-[9px] text-black_901 w-[auto]"
                            as="h3"
                            variant="h3"
                          >
                            Employee
                          </Text>
                          <Text
                            className="font-medium md:mt-[10px] mt-[20px] sm:mt-[7px] text-gray_502 w-[auto]"
                            as="h5"
                            variant="h5"
                          >
                            2 Items
                          </Text>
                        </Column>
                      </Column>
                    </Column>
                  </Grid>
                </Column>
              </Column>
            </Column>
          </Column>
        </Row>
      </Column>
      {isOpenUploadFileModal ? (
        <UploadFileModal
          isOpen={isOpenUploadFileModal}
          onRequestClose={handleCloseUploadFileModal}
        />
      ) : null}
    </>
  );
};

export default DocumentsOnePage;
