import React from "react";

import {
  Button, CheckBox, Column, Datepicker, Img, Input, Line, List, Row, SelectBox, Stack, Text
} from "components";
import Sidebar3 from "components/Sidebar3";

const BookSpaceMonthlyPage = () => {
  return (
    <>
      <Column className="bg-gray_100 flex flex-col font-inter items-center justify-start mx-[auto] sm:pb-[15px] md:pb-[25px] pb-[50px] w-[100%]">
        <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start justify-evenly w-[100%]">
          <Sidebar3 className="md:hidden sm:hidden w-[15%]" />
          <Column className="flex flex-col items-center justify-start max-w-[1640px] ml-[auto] mr-[auto] sm:mx-[0] sm:pl-[15px] sm:pr-[15px] sm:px-[0] w-[100%]">
            <Row className="bg-white_A700 border border-gray_300 border-solid flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between md:p-[11px] sm:p-[15px] p-[22px] w-[100%]">
              <Text
                className="font-medium ml-[10px] sm:ml-[3px] md:ml-[5px] text-black_900 w-[auto]"
                as="h3"
                variant="h3"
              >
                Manage your Space
              </Text>
              <Text
                className="bg-deep_orange_A200 flex font-bold items-center mr-[10px] sm:mr-[3px] md:mr-[5px] px-[11px] sm:px-[4px] md:px-[5px] rounded-radius50 text-white_A700 w-[36px]"
                variant="body2"
              >
                AP
              </Text>
            </Row>
            <Column className="bg-white_A700 border border-gray_300 border-solid flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px] mt-[32px] sm:mx-[0] md:p-[12px] sm:p-[15px] p-[24px] rounded-radius8 sm:w-[100%] w-[97%]">
              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[99%]">
                <Text
                  className="font-medium text-black_900 w-[auto]"
                  as="h3"
                  variant="h3"
                >
                  My Space
                </Text>
                <Button
                  className="flex items-center justify-center min-w-[11%] text-center w-[max-content]"
                  leftIcon={
                    <Img
                      src="/images/img_plus.svg"
                      className="mr-[8px] sm:mr-[3px] md:mr-[4px] text-center"
                      alt="plus"
                    />
                  }
                >
                  <div className="bg-transparent cursor-pointer font-medium text-[14px] text-white_A700">
                    Create Space
                  </div>
                </Button>
              </Row>
              <Column className="flex flex-col justify-start sm:mt-[19px] md:mt-[25px] mt-[49px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[98%]">
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between md:mr-[25px] mr-[50px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[97%]">
                  <Stack className="backdrop-opacity-[0.5] bg-indigo_700 blur-[16.00px] h-[401px] relative rounded-radius8 sm:w-[100%] w-[49%]">
                    <Img
                      src="/images/img_projecttitle2.png"
                      className="absolute h-[401px] max-w-[100%] rounded-radius8 w-[100%]"
                      alt="projecttitleTwo"
                    />
                  </Stack>
                  <List
                    className="sm:gap-[15px] md:gap-[19px] gap-[38px] grid min-h-[auto] sm:pt-[2px] md:pt-[3px] pt-[7px] rounded-radius4 sm:w-[100%] w-[49%]"
                    orientation="vertical"
                  >
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[45%]">
                      <Text
                        className="font-medium mt-[1px] text-gray_801 w-[auto]"
                        as="h4"
                        variant="h4"
                      >
                        Space Name :
                      </Text>
                      <Text
                        className="font-bold mb-[1px] md:ml-[12px] ml-[24px] sm:ml-[9px] text-indigo_600 w-[auto]"
                        as="h4"
                        variant="h4"
                      >
                        Organization Name
                      </Text>
                    </Row>
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[86%]">
                      <Text
                        className="font-medium text-gray_801 w-[auto]"
                        as="h4"
                        variant="h4"
                      >
                        Location :
                      </Text>
                      <Text
                        className="font-medium md:ml-[12px] ml-[24px] sm:ml-[9px] mt-[1px] text-black_901 w-[auto]"
                        as="h4"
                        variant="h4"
                      >
                        4517 Washington Ave. Manchester, Kentucky 39495
                      </Text>
                    </Row>
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[40%]">
                      <Text
                        className="font-medium mb-[1px] text-gray_801 w-[auto]"
                        as="h4"
                        variant="h4"
                      >
                        Capacity :
                      </Text>
                      <Text
                        className="font-medium md:ml-[12px] ml-[24px] sm:ml-[9px] mt-[1px] text-black_901 w-[auto]"
                        as="h4"
                        variant="h4"
                      >
                        1000 Employee
                      </Text>
                    </Row>
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:mx-[0] sm:px-[0] rounded-radius4 sm:w-[100%] w-[91%]">
                      <Text
                        className="font-medium text-gray_801 w-[auto]"
                        as="h4"
                        variant="h4"
                      >
                        Resource :
                      </Text>
                      <List
                        className="gap-[16px] sm:gap-[6px] md:gap-[8px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-5 min-h-[auto] md:ml-[12px] ml-[24px] sm:ml-[9px] rounded-radius4 sm:w-[100%] w-[78%]"
                        orientation="horizontal"
                      >
                        <Button
                          className="cursor-pointer font-medium min-w-[16%] text-[16px] text-center text-indigo_600 w-[100%]"
                          shape="RoundedBorder4"
                          size="sm"
                          variant="OutlineIndigo600_1"
                        >
                          Table
                        </Button>
                        <Button
                          className="cursor-pointer font-medium min-w-[16%] text-[16px] text-center text-indigo_600 w-[100%]"
                          shape="RoundedBorder4"
                          size="sm"
                          variant="OutlineIndigo600_1"
                        >
                          Chair
                        </Button>
                        <Button
                          className="cursor-pointer font-medium min-w-[18%] text-[16px] text-center text-indigo_600 w-[100%]"
                          shape="RoundedBorder4"
                          size="sm"
                          variant="OutlineIndigo600_1"
                        >
                          Laptop
                        </Button>
                        <Button
                          className="cursor-pointer font-medium min-w-[22%] text-[16px] text-center text-indigo_600 w-[100%]"
                          shape="RoundedBorder4"
                          size="sm"
                          variant="OutlineIndigo600_1"
                        >
                          Keyboard
                        </Button>
                        <Button
                          className="cursor-pointer font-medium min-w-[18%] text-[16px] text-center text-indigo_600 w-[100%]"
                          shape="RoundedBorder4"
                          size="sm"
                          variant="OutlineIndigo600_1"
                        >
                          Mouse
                        </Button>
                      </List>
                    </Row>
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start sm:px-[0] w-[100%]">
                      <Text
                        className="font-medium sm:mt-[2px] md:mt-[3px] mt-[7px] text-gray_801 w-[auto]"
                        as="h4"
                        variant="h4"
                      >
                        Description :
                      </Text>
                      <Text
                        className="font-medium leading-[28.00px] md:leading-[normal] sm:leading-[normal] md:ml-[12px] ml-[24px] sm:mx-[0] text-black_901 sm:w-[100%] w-[80%]"
                        as="h4"
                        variant="h4"
                      >
                        Amet minim mollit non deserunt ullamco est sit aliqua
                        dolor do amet sint. Velit officia consequat duis enim
                        velit mollit. Exercitation veniam consequat sunt nostrud
                        amet.
                      </Text>
                    </Row>
                  </List>
                </Row>
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-end ml-[auto] sm:mt-[19px] md:mt-[25px] mt-[50px] sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[36%]">
                  <Button className="cursor-pointer font-medium min-w-[31%] text-[16px] text-center text-white_A700 w-[max-content]">
                    Book Space
                  </Button>
                  <Button className="cursor-pointer font-medium min-w-[31%] md:ml-[12px] ml-[24px] sm:ml-[9px] text-[16px] text-center text-white_A700 w-[max-content]">
                    View Booking
                  </Button>
                  <Button className="cursor-pointer font-medium min-w-[31%] md:ml-[12px] ml-[24px] sm:ml-[9px] text-[16px] text-center text-white_A700 w-[max-content]">
                    My Booking
                  </Button>
                </Row>
              </Column>
              <Column className="flex flex-col items-center justify-start mb-[15px] sm:mb-[5px] md:mb-[7px] sm:mt-[12px] md:mt-[16px] mt-[32px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[99%]">
                <Column className="flex flex-col justify-start pt-[1px] w-[100%]">
                  <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-end sm:mx-[0] sm:px-[0] sm:w-[100%] w-[11%]">
                    <Img
                      src="/images/img_objectscolumn.svg"
                      className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] mb-[1px] md:w-[12px] w-[24px] sm:w-[9px]"
                      alt="objectscolumn One"
                    />
                    <Text
                      className="flex-grow font-medium ml-[16px] sm:ml-[6px] md:ml-[8px] sm:mt-[1px] md:mt-[2px] mt-[5px] text-indigo_600"
                      as="h4"
                      variant="h4"
                    >
                      New Booking
                    </Text>
                  </Row>
                  <Line className="bg-bluegray_100 h-[1px] mt-[16px] sm:mt-[6px] md:mt-[8px] w-[100%]" />
                </Column>
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start sm:mt-[11px] md:mt-[15px] mt-[30px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[81%]">
                  <Column className="flex flex-col items-center justify-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[46%]">
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between rounded-radius8 w-[100%]">
                      <Text
                        className="font-medium text-black_901 w-[auto]"
                        as="h5"
                        variant="h5"
                      >
                        Booking Type:
                      </Text>
                      <Input
                        className="font-normal not-italic p-[0] text-[16px] placeholder:text-gray_500 text-gray_500 w-[100%]"
                        wrapClassName="sm:mx-[0] sm:w-[100%] w-[60%]"
                        name="Group3997"
                        placeholder="Text"
                        shape="RoundedBorder8"
                        size="lg"
                        variant="FillBluegray50"
                      ></Input>
                    </Row>
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start justify-between md:mt-[12px] mt-[24px] sm:mt-[9px] w-[100%]">
                      <Text
                        className="font-medium mt-[16px] sm:mt-[6px] md:mt-[8px] text-black_901 w-[auto]"
                        as="h5"
                        variant="h5"
                      >
                        Date & Time:
                      </Text>
                      <Column className="flex flex-col items-center justify-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[60%]">
                        <Datepicker
                          className="placeholder:bg-transparent bg-transparent font-normal not-italic p-[0] text-[16px] placeholder:text-gray_500 text-gray_500 w-[100%]"
                          name="Group3999"
                          placeholder="--Select date--"
                        ></Datepicker>
                        <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:mt-[3px] md:mt-[4px] mt-[8px] w-[100%]">
                          <Datepicker.Time
                            className="bg-transparent font-normal not-italic p-[0] text-[16px] text-gray_500 w-[100%]"
                            name="From"
                          ></Datepicker.Time>
                          <Datepicker.Time
                            className="bg-transparent font-normal not-italic p-[0] text-[16px] text-gray_500 w-[100%]"
                            name="To"
                          ></Datepicker.Time>
                        </Row>
                      </Column>
                    </Row>
                    <List
                      className="md:gap-[12px] gap-[24px] sm:gap-[9px] grid min-h-[auto] md:mt-[12px] mt-[24px] sm:mt-[9px] w-[100%]"
                      orientation="vertical"
                    >
                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between w-[100%]">
                        <Text
                          className="font-medium text-black_901 w-[auto]"
                          as="h5"
                          variant="h5"
                        >
                          Spaces:
                        </Text>
                        <SelectBox
                          className="sm:mx-[0] sm:w-[100%] w-[60%]"
                          placeholderClassName=""
                          name="columncurrentspaces"
                          placeholder=""
                          isSearchable={true}
                          isMulti={true}
                        ></SelectBox>
                      </Row>
                      <Line className="self-center w-[100%] justify-between items-center flex-row flex rounded-radius8" />
                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between w-[100%]">
                        <Text
                          className="font-medium text-black_901 w-[auto]"
                          as="h5"
                          variant="h5"
                        >
                          Host:
                        </Text>
                        <SelectBox
                          className="sm:mx-[0] sm:w-[100%] w-[60%]"
                          placeholderClassName=""
                          name="columncurrentspaces one"
                          placeholder=""
                          isSearchable={true}
                          isMulti={true}
                        ></SelectBox>
                      </Row>
                      <Line className="self-center w-[100%] justify-between items-center flex-row flex rounded-radius8" />
                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between w-[100%]">
                        <Text
                          className="font-medium text-black_901 w-[auto]"
                          as="h5"
                          variant="h5"
                        >
                          Invites:
                        </Text>
                        <SelectBox
                          className="sm:mx-[0] sm:w-[100%] w-[60%]"
                          placeholderClassName=""
                          name="columncurrentspaces two"
                          placeholder=""
                          isSearchable={true}
                          isMulti={true}
                        ></SelectBox>
                      </Row>
                    </List>
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between md:mt-[12px] mt-[24px] sm:mt-[9px] rounded-radius8 w-[100%]">
                      <Text
                        className="font-medium text-black_901 w-[auto]"
                        as="h5"
                        variant="h5"
                      >
                        Booking Title:
                      </Text>
                      <Input
                        className="font-normal not-italic p-[0] text-[16px] placeholder:text-gray_500 text-gray_500 w-[100%]"
                        wrapClassName="sm:mx-[0] sm:w-[100%] w-[60%]"
                        name="Group3997 One"
                        placeholder="Text"
                        shape="RoundedBorder8"
                        size="lg"
                        variant="FillBluegray50"
                      ></Input>
                    </Row>
                  </Column>
                  <Column className="flex flex-col justify-start ml-[100px] md:ml-[51px] mt-[1px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[47%]">
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[77%]">
                      <Text
                        className="font-medium text-black_901 w-[auto]"
                        as="h5"
                        variant="h5"
                      >
                        Repeat
                      </Text>
                      <SelectBox
                        className="md:ml-[35px] ml-[69px] sm:mx-[0] sm:w-[100%] w-[72%]"
                        placeholderClassName=""
                        name="columnmonthly"
                        placeholder=""
                        isSearchable={true}
                        isMulti={true}
                      ></SelectBox>
                    </Row>
                    <Column className="flex flex-col items-center justify-end ml-[124px] md:ml-[64px] md:mt-[12px] mt-[24px] sm:mt-[9px] sm:mx-[0] sm:pt-[1px] md:pt-[2px] pt-[5px] sm:px-[0] sm:w-[100%] w-[78%]">
                      <Column className="flex flex-col justify-start w-[100%]">
                        <Text
                          className="font-medium text-indigo_600 w-[auto]"
                          as="h5"
                          variant="h5"
                        >
                          Monthly Rules*
                        </Text>
                        <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[16px] sm:mt-[6px] md:mt-[8px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[32%]">
                          <Img
                            src="/images/img_airplane.svg"
                            className="md:h-[11px] h-[20px] sm:h-[8px] max-w-[100%] md:w-[10px] w-[20px] sm:w-[7px]"
                            alt="airplane"
                          />
                          <Text
                            className="font-normal sm:ml-[3px] md:ml-[4px] ml-[8px] not-italic text-black_901 w-[auto]"
                            as="h5"
                            variant="h5"
                          >
                            Day
                          </Text>
                          <Button
                            className="cursor-pointer font-normal sm:h-[16px] md:h-[21px] h-[40px] ml-[12px] sm:ml-[4px] md:ml-[6px] not-italic text-[16px] text-black_901 text-center sm:w-[15px] md:w-[20px] w-[40px]"
                            variant="FillBluegray50"
                          >
                            1
                          </Button>
                          <Text
                            className="flex font-normal items-center ml-[12px] sm:ml-[4px] md:ml-[6px] not-italic text-black_901 w-[auto]"
                            as="h5"
                            variant="h5"
                          >
                            of
                          </Text>
                        </Row>
                        <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between mt-[12px] sm:mt-[4px] md:mt-[6px] sm:px-[0] w-[100%]">
                          <Img
                            src="/images/img_airplane.svg"
                            className="md:h-[11px] h-[20px] sm:h-[8px] max-w-[100%] md:w-[10px] w-[20px] sm:w-[7px]"
                            alt="airplane One"
                          />
                          <SelectBox
                            className="sm:mx-[0] sm:w-[100%] w-[46%]"
                            placeholderClassName=""
                            name="columnmon"
                            placeholder=""
                            isSearchable={true}
                            isMulti={true}
                            size="sm"
                          ></SelectBox>
                          <Text
                            className="font-normal not-italic text-black_901 w-[auto]"
                            as="h5"
                            variant="h5"
                          >
                            Of Every
                          </Text>
                          <Button
                            className="cursor-pointer font-normal sm:h-[16px] md:h-[21px] h-[40px] not-italic text-[16px] text-black_901 text-center sm:w-[15px] md:w-[20px] w-[40px]"
                            variant="FillBluegray50"
                          >
                            1
                          </Button>
                          <Text
                            className="font-normal not-italic text-black_901 w-[auto]"
                            as="h5"
                            variant="h5"
                          >
                            Month(s)
                          </Text>
                        </Row>
                      </Column>
                      <Column className="flex flex-col justify-start md:mt-[10px] mt-[20px] sm:mt-[7px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[99%]">
                        <Text
                          className="font-medium text-indigo_600 w-[auto]"
                          as="h5"
                          variant="h5"
                        >
                          End*
                        </Text>
                        <Column className="flex flex-col justify-start mt-[19px] sm:mt-[7px] md:mt-[9px] w-[100%]">
                          <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center w-[100%]">
                            <Img
                              src="/images/img_airplane.svg"
                              className="md:h-[11px] h-[20px] sm:h-[8px] max-w-[100%] md:w-[10px] w-[20px] sm:w-[7px]"
                              alt="airplane Two"
                            />
                            <Text
                              className="font-medium sm:ml-[3px] md:ml-[4px] ml-[8px] text-black_901 w-[auto]"
                              as="h5"
                              variant="h5"
                            >
                              End Day:
                            </Text>
                            <SelectBox
                              className="md:ml-[14px] ml-[29px] sm:mx-[0] sm:w-[100%] w-[71%]"
                              placeholderClassName=""
                              name="columnselectone"
                              placeholder=""
                              isSearchable={true}
                              isMulti={false}
                            ></SelectBox>
                          </Row>
                          <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[63%]">
                            <Img
                              src="/images/img_airplane.svg"
                              className="md:h-[11px] h-[20px] sm:h-[8px] max-w-[100%] md:w-[10px] w-[20px] sm:w-[7px]"
                              alt="airplane Three"
                            />
                            <Text
                              className="font-medium sm:ml-[3px] md:ml-[4px] ml-[8px] text-black_901 w-[auto]"
                              as="h5"
                              variant="h5"
                            >
                              End by For:
                            </Text>
                            <Button
                              className="cursor-pointer font-normal sm:h-[16px] md:h-[21px] h-[40px] ml-[12px] sm:ml-[4px] md:ml-[6px] not-italic text-[16px] text-center text-gray_500 sm:w-[15px] md:w-[20px] w-[40px]"
                              variant="FillBluegray50"
                            >
                              0
                            </Button>
                            <Text
                              className="font-medium ml-[12px] sm:ml-[4px] md:ml-[6px] text-black_901 w-[auto]"
                              as="h5"
                              variant="h5"
                            >
                              Occurrence
                            </Text>
                          </Row>
                        </Column>
                      </Column>
                    </Column>
                  </Column>
                </Row>
                <CheckBox
                  className="font-medium sm:mt-[11px] md:mt-[15px] mt-[30px] text-[18px] text-black_901"
                  inputClassName="h-[24px] mr-[5px] w-[24px]"
                  name="SendInvitation"
                  label="Send Invitation to Join via Email."
                  size="sm"
                  variant="FillIndigo201"
                ></CheckBox>
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center sm:mt-[19px] md:mt-[25px] mt-[50px] sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[24%]">
                  <Button className="cursor-pointer font-medium min-w-[47%] text-[16px] text-center text-white_A700 w-[max-content]">
                    Create
                  </Button>
                  <Button
                    className="cursor-pointer font-medium min-w-[47%] md:ml-[12px] ml-[24px] sm:ml-[9px] text-[16px] text-center text-indigo_600 w-[max-content]"
                    variant="OutlineIndigo600"
                  >
                    Cancel Booking
                  </Button>
                </Row>
              </Column>
            </Column>
          </Column>
        </Row>
      </Column>
    </>
  );
};

export default BookSpaceMonthlyPage;
