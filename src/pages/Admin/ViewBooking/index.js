import React from "react";

import { Button, Column, Img, Line, List, Row, Stack, Text } from "components";
import Sidebar3 from "components/Sidebar3";
import ViewBookingRemoveModal from "modals/ViewBookingRemove";
import { getSpacebookingselect } from "service/api";

const ViewBookingPage = () => {
  const [apiData11, setapiData11] = React.useState();
  const [isOpenViewBookingRemoveModal, setViewBookingRemoveModal] =
    React.useState(false);
  React.useEffect(() => {
    callApi11();
  }, []);

  function callApi11() {
    const req = {};

    getSpacebookingselect(req)
      .then((res) => {
        setapiData11(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handleOpenViewBookingRemoveModal() {
    setViewBookingRemoveModal(true);
  }
  function handleCloseViewBookingRemoveModal() {
    setViewBookingRemoveModal(false);
  }

  return (
    <>
      <Column className="bg-gray_100 flex flex-col font-inter items-center justify-start mx-[auto] sm:pb-[15px] md:pb-[26px] pb-[51px] w-[100%]">
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
              <Column className="flex flex-col items-center justify-start md:mb-[10px] mb-[21px] sm:mb-[8px] sm:px-[0] w-[100%]">
                <Column className="flex flex-col justify-start w-[100%]">
                  <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:px-[0] w-[100%]">
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
                  <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between md:ml-[10px] ml-[20px] sm:mt-[19px] md:mt-[25px] mt-[49px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[96%]">
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
                          velit mollit. Exercitation veniam consequat sunt
                          nostrud amet.
                        </Text>
                      </Row>
                    </List>
                  </Row>
                  <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-end ml-[auto] sm:mt-[19px] md:mt-[25px] mt-[50px] sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[35%]">
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
                  <Column className="flex flex-col justify-start sm:mt-[12px] md:mt-[16px] mt-[32px] pt-[1px] sm:px-[0] w-[100%]">
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
                        View Booking
                      </Text>
                    </Row>
                    <Line className="bg-bluegray_100 h-[1px] mt-[16px] sm:mt-[6px] md:mt-[8px] w-[100%]" />
                  </Column>
                </Column>
                <Column className="bg-white_A700 border border-gray_300 border-solid flex flex-col items-center justify-start md:mt-[12px] mt-[24px] sm:mt-[9px] w-[100%]">
                  <Column className="bg-gray_101 border border-gray_300 border-solid flex flex-col items-center justify-start sm:p-[15px] p-[16px] md:p-[8px] w-[100%]">
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-end sm:mx-[0] sm:pl-[15px] md:pl-[38px] pl-[74px] sm:pr-[0] sm:w-[100%] w-[99%]">
                      <Column className="flex flex-col items-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[8%]">
                        <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-evenly w-[100%]">
                          <Text
                            className="flex-grow font-semibold text-indigo_600"
                            as="h5"
                            variant="h5"
                          >
                            Booking Id
                          </Text>
                          <Img
                            src="/images/img_arrowup.svg"
                            className="flex-shrink-0 h-[16px] sm:h-[7px] md:h-[9px] max-w-[100%] w-[16px] sm:w-[6px] md:w-[8px]"
                            alt="arrowup"
                          />
                        </Row>
                      </Column>
                      <Column className="flex flex-col items-center md:ml-[118px] ml-[229px] sm:mx-[0] pb-[3px] sm:px-[0] sm:w-[100%] w-[4%]">
                        <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start justify-evenly w-[100%]">
                          <Text
                            className="flex-grow font-semibold mb-[1px] text-indigo_600"
                            as="h5"
                            variant="h5"
                          >
                            Title
                          </Text>
                          <Img
                            src="/images/img_arrowup.svg"
                            className="flex-shrink-0 h-[16px] sm:h-[7px] md:h-[9px] max-w-[100%] mt-[3px] w-[16px] sm:w-[6px] md:w-[8px]"
                            alt="arrowup One"
                          />
                        </Row>
                      </Column>
                      <Column className="flex flex-col items-center md:ml-[116px] ml-[226px] sm:mx-[0] sm:px-[0] py-[2px] sm:w-[100%] w-[5%]">
                        <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-evenly mt-[1px] w-[100%]">
                          <Text
                            className="flex-grow font-semibold mt-[1px] text-indigo_600"
                            as="h5"
                            variant="h5"
                          >
                            Date
                          </Text>
                          <Img
                            src="/images/img_arrowup.svg"
                            className="flex-shrink-0 h-[16px] sm:h-[7px] md:h-[9px] max-w-[100%] mb-[1px] w-[16px] sm:w-[6px] md:w-[8px]"
                            alt="arrowup Two"
                          />
                        </Row>
                      </Column>
                      <Column className="flex flex-col items-center ml-[174px] md:ml-[89px] sm:mx-[0] pb-[3px] sm:px-[0] sm:w-[100%] w-[5%]">
                        <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start justify-evenly w-[100%]">
                          <Text
                            className="flex-grow font-semibold mb-[1px] text-indigo_600"
                            as="h5"
                            variant="h5"
                          >
                            Time
                          </Text>
                          <Img
                            src="/images/img_arrowup.svg"
                            className="flex-shrink-0 h-[16px] sm:h-[7px] md:h-[9px] max-w-[100%] mt-[3px] w-[16px] sm:w-[6px] md:w-[8px]"
                            alt="arrowup Three"
                          />
                        </Row>
                      </Column>
                      <Column className="flex flex-col items-center ml-[155px] md:ml-[80px] sm:mx-[0] sm:px-[0] py-[2px] sm:w-[100%] w-[7%]">
                        <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-evenly mt-[1px] w-[100%]">
                          <Text
                            className="flex-grow font-semibold mt-[1px] text-indigo_600"
                            as="h5"
                            variant="h5"
                          >
                            Members
                          </Text>
                          <Img
                            src="/images/img_arrowup.svg"
                            className="flex-shrink-0 h-[16px] sm:h-[7px] md:h-[9px] max-w-[100%] mb-[1px] w-[16px] sm:w-[6px] md:w-[8px]"
                            alt="arrowup Four"
                          />
                        </Row>
                      </Column>
                      <Column className="flex flex-col items-center md:ml-[43px] ml-[85px] sm:mx-[0] pb-[3px] sm:px-[0] px-[3px] sm:w-[100%] w-[12%]">
                        <Text
                          className="font-semibold text-indigo_600 w-[auto]"
                          as="h5"
                          variant="h5"
                        >
                          Action
                        </Text>
                      </Column>
                    </Row>
                  </Column>
                  <List
                    className="md:gap-[12px] gap-[24px] sm:gap-[9px] grid min-h-[auto] md:mt-[12px] mt-[24px] sm:mt-[9px] w-[100%]"
                    orientation="vertical"
                  >
                    {apiData11?.map((apiData11ResponseEle, index) => {
                      return (
                        <React.Fragment key={`apiData11ResponseEle${index}`}>
                          <Column className="flex flex-col justify-start w-[100%]">
                            <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-end ml-[auto] sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[90%]">
                              <Text
                                className="font-normal not-italic text-blue_A400 w-[auto]"
                                as="h5"
                                variant="h5"
                              >
                                {apiData11ResponseEle?.id}
                              </Text>
                              <Text
                                className="font-normal md:ml-[107px] ml-[209px] sm:ml-[83px] not-italic text-black_901 w-[auto]"
                                as="h5"
                                variant="h5"
                              >
                                {apiData11ResponseEle?.["booking_title"]}
                              </Text>
                              <Text
                                className="font-normal ml-[176px] sm:ml-[70px] md:ml-[90px] not-italic text-black_901 w-[auto]"
                                as="h5"
                                variant="h5"
                              >
                                {apiData11ResponseEle?.["booked_for"]}
                              </Text>
                              <Text
                                className="font-normal ml-[107px] sm:ml-[42px] md:ml-[55px] not-italic text-black_901 w-[auto]"
                                as="h5"
                                variant="h5"
                              >
                                09:00 AM - 06:00 PM
                              </Text>
                              <Text
                                className="font-normal sm:ml-[39px] md:ml-[51px] ml-[99px] not-italic text-black_901 w-[auto]"
                                as="h5"
                                variant="h5"
                              >
                                {apiData11ResponseEle?.["booking_type"]}
                              </Text>
                              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between ml-[101px] md:ml-[52px] sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[9%]">
                                <Button
                                  className="flex sm:h-[18px] md:h-[23px] h-[44px] items-center justify-center sm:w-[17px] md:w-[22px] w-[44px]"
                                  shape="icbRoundedBorder8"
                                  size="mdIcn"
                                  variant="icbOutlineIndigo600"
                                >
                                  <Img
                                    src="/images/img_edit_24X24.svg"
                                    className="h-[24px] sm:h-[10px] md:h-[13px] flex items-center justify-center"
                                    alt="edit"
                                  />
                                </Button>
                                <Button
                                  className="common-pointer flex sm:h-[18px] md:h-[23px] h-[44px] items-center justify-center sm:w-[17px] md:w-[22px] w-[44px]"
                                  onClick={handleOpenViewBookingRemoveModal}
                                  shape="icbRoundedBorder8"
                                  size="mdIcn"
                                  variant="icbOutlineIndigo600"
                                >
                                  <Img
                                    src="/images/img_trash_1.svg"
                                    className="h-[24px] sm:h-[10px] md:h-[13px] flex items-center justify-center"
                                    alt="trash"
                                  />
                                </Button>
                              </Row>
                            </Row>
                            <Line className="bg-bluegray_100 h-[1px] md:mt-[12px] mt-[24px] sm:mt-[9px] w-[100%]" />
                          </Column>
                        </React.Fragment>
                      );
                    })}
                  </List>
                </Column>
              </Column>
            </Column>
          </Column>
        </Row>
      </Column>
      {isOpenViewBookingRemoveModal ? (
        <ViewBookingRemoveModal
          isOpen={isOpenViewBookingRemoveModal}
          onRequestClose={handleCloseViewBookingRemoveModal}
        />
      ) : null}
    </>
  );
};

export default ViewBookingPage;
