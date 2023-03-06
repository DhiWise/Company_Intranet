import { Column, Img, Line, List, Row, Text } from "components";
import dayjs from "dayjs";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  getSpacebookingInviteesselect, getSpacebookingselect
} from "service/api";
import Base from "../../../components/Base";

const Dashboard = () => {

  const [ViewBookapiData, setViewBookapiData] = React.useState();
  const [ViewBookInviteapiData, setViewBookInviteapiData] = React.useState();

  React.useEffect(() => {
    handleView();
    handleViewInvitess();
  }, []);


  const handleView = async (data) => {

    const req = {
      params: {
        select: "*,space:space(space_name)",
      },
    };

    getSpacebookingselect(req)
      .then((res) => {
        setViewBookapiData(res);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened");
      });
  };

  const handleViewInvitess = async (data) => {
    const req = {
      params: {
        select: "*",
      },
    };

    getSpacebookingInviteesselect(req)
      .then((res) => {
        setViewBookInviteapiData(res);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened");
      });
  };


  return (
    <Base title="Dashboard">
      <Column className="bg-white_A700 flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px] my-[32px] sm:mx-[0] md:p-[12px] sm:p-[15px] p-[24px] rounded-radius8 sm:w-[100%] w-[97%]">
        <Column className="flex flex-col items-center justify-start mb-[15px] sm:mb-[5px] md:mb-[7px] sm:px-[0] w-[100%]">

          <Column className="flex flex-col items-center justify-start sm:px-[0] w-[100%]">
            <footer className="bg-white_A700 w-[100%]">
              <Column className="flex flex-col justify-start pt-[1px] w-[100%]">
                <Row className="flex flex-row items-center place-content-between w-[100%]">
                  <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:mx-[0] sm:px-[0] sm:w-[100%]">
                    <Img
                      src="/images/img_objectscolumn.svg"
                      className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] mb-[1px] md:w-[12px] w-[24px] sm:w-[9px]"
                      alt="objectscolumn One"
                    />
                    <Text
                      className="flex-grow font-medium ml-[16px] sm:ml-[6px] md:ml-[8px] sm:mt-[1px] md:mt-[2px] text-indigo_600"
                      as="h4"
                      variant="h4"
                    >
                      Today's bookings
                    </Text>
                  </Row>
                </Row>
                <Line className="bg-bluegray_100 h-[1px] mt-[16px] sm:mt-[6px] md:mt-[8px] w-[100%]" />
              </Column>
              <Column className="items-center justify-start w-[100%]">
                <Column className="bg-gray-100 flex flex-col justify-start md:ml-[64px] sm:mt-[11px] md:mt-[14px] mt-[29px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%]  border border-gray_300 border-solid ">
                  <Row className="flex flex-row items-center justify-evenly lg:pl-[39px] xl:pl-[49px] 2xl:pl-[55px] 3xl:pl-[66px] w-[100%] p-[10px]">
                    <Column className="flex flex-col items-center w-[25%] ">
                      <Row className=" flex flex-row items-center justify-center ">
                        <Text
                          className="font-medium text-center text-indigo_600 w-[max-content]"
                          as="h5"
                          variant="h5"
                        >
                          Host
                        </Text>
                      </Row>
                    </Column>
                    <Column className="items-center lg:ml-[122px] xl:ml-[152px] 2xl:ml-[171px] 3xl:ml-[206px] py-[2px] flex flex-col w-[20%]">
                      <Row className="items-center justify-center mb-[1px] w-[100%] flex flex-row">
                        <Text className="rowtitle" as="h5" variant="h5">
                          Space
                        </Text>
                      </Row>
                    </Column>
                    <Column className="items-center lg:ml-[120px] xl:ml-[150px] 2xl:ml-[169px] 3xl:ml-[203px] py-[2px] flex flex-col w-[15%]">
                      <Row className="items-center justify-center w-[100%] flex flex-row">
                        <Text
                          className="font-normal sm:ml-[3px] md:ml-[4px] not-italic text-black_901"
                          as="h5"
                          variant="h5"
                        >
                          Timing
                        </Text>
                      </Row>
                    </Column>
                    <Column className="items-center xl:ml-[116px] 2xl:ml-[130px] 3xl:ml-[156px] lg:ml-[92px] py-[2px] flex flex-col w-[20%]">
                      <Row className="items-center justify-center  w-[100%] flex flex-row">
                        <Text
                          className="font-normal text-center"
                          as="h5"
                          variant="h5"
                        >
                          Booking Title
                        </Text>
                      </Row>
                    </Column>
                    <Column className="items-center xl:ml-[116px] 2xl:ml-[130px] 3xl:ml-[156px] lg:ml-[92px] py-[2px] flex flex-col w-[25%]">
                      <Row className="items-center justify-center  w-[100%] flex flex-row">
                        <Text
                          className="font-normal text-center"
                          as="h5"
                          variant="h5"
                        >
                          Invitees
                        </Text>
                      </Row>
                    </Column>
                  </Row>
                </Column>
                <List
                  className="min-h-[auto]  lg:mt-[12px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px] w-[100%]"
                  orientation="vertical"
                >
                  {ViewBookapiData?.map((apiDataResponseEle, index) => {
                    return (
                      <React.Fragment key={`apiDataResponseEle${index}`}>
                        {dayjs(apiDataResponseEle?.["booking_from"]).format(
                          "YYYY-MM-DD"
                        ) == dayjs().format("YYYY-MM-DD") ? (
                          <Column className="flex flex-col  3xl:my-[10px] lg:my-[6px] xl:my-[8px] 2xl:my-[9px] w-[100%]">
                            <Row className="flex flex-row items-center justify-evenly w-[100%] p-[10px]  border-l border-r border-b border-gray_300 border-solid ">
                              <Text
                                className="font-normal text-center sm:ml-[3px] md:ml-[4px] sm:mt-[5px] md:mt-[6px] not-italic text-black_901 w-[25%] "
                                as="h6"
                                variant="h6"
                              >
                                {apiDataResponseEle?.["booking_forName"]}
                              </Text>
                              <Text
                                className="font-normal text-center sm:ml-[3px] md:ml-[4px] sm:mt-[4px] md:mt-[6px] not-italic text-black_901 w-[20%]"
                                as="h6"
                                variant="h6"
                              >
                                {apiDataResponseEle?.space?.["space_name"]}{" "}
                              </Text>
                              <Text
                                className="font-medium text-center text-indigo_600 w-[15%]"
                                as="h6"
                                variant="h6"
                              >
                                {dayjs(
                                  apiDataResponseEle?.["booking_from"]
                                ).format("DD/MM/YYYY h:mm a")}
                                {"-"}
                                {dayjs(
                                  apiDataResponseEle?.["booking_to"]
                                ).format("DD/MM/YYYY h:mm a")}
                              </Text>
                              <Text
                                className="font-medium text-center text-black_901 w-[20%]"
                                as="h6"
                                variant="h6"
                              >
                                {apiDataResponseEle?.["booking_title"]}{" "}
                              </Text>
                              <Text
                                className="font-medium text-center text-black_901 w-[25%]"
                                as="h6"
                                variant="h6"
                              >
                                {ViewBookInviteapiData?.filter(
                                  (a) =>
                                    a.booking_id === apiDataResponseEle?.["id"]
                                )
                                  ?.map((val) => {
                                    return val?.employee_name;
                                  })
                                  .join(", ")}
                              </Text>
                            </Row>
                          </Column>
                        ) : (
                          <></>
                        )}
                      </React.Fragment>
                    );
                  })}
                </List>

              </Column>
            </footer>
          </Column>
        </Column>
      </Column>
      <ToastContainer />
    </Base>
  );
};

export default Dashboard;
