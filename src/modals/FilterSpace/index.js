import dayjs from "dayjs";
import React from "react";
import ModalProvider from "react-modal";

import {
  Button,
  CheckBox, Column, Datepicker, Img, Line, Row,
  Text
} from "components";
import {
  getDepartmentjobtitleselect, getDepartmentselect, getEmploymentstatusselect,
  getJobtitlepositionselect
} from "../../service/api";

const FilterSpaceModal = (props) => {
  // FIlter toggle State
  const [toggle, setToggle] = React.useState({
    depToggle: false,
    jobTitleToggle: false,
    jobPositionToggle: false,
    statusToggle: false,
  });

  const toggleFunction = (toggleField) => {
    setToggle({ ...toggle, [toggleField]: !toggle[toggleField] });
  };

  const [departmentOption, setdepartmentOption] = React.useState([]);
  const [employeeStatusOption, setemployeeStatusOption] = React.useState();
  const [jobPosition, setjobPosition] = React.useState();
  const [jobTitle, setjobTitle] = React.useState();
  const [depIds, setdepIds] = React.useState([]);
  const [jobTitleIds, setjobTitleIds] = React.useState([]);
  const [jobPosIds, setjobPosIds] = React.useState([]);
  const [emplStatusIds, setemplStatusIds] = React.useState([]);
  const [todayFilter, setTodayFilter] = React.useState(
    localStorage.getItem("todayFilter")
  );
  const [tomorrowFilter, setTomorrowFilter] = React.useState(
    localStorage.getItem("tomoFilter")
  );
  const [customFilter, setCustomDate] = React.useState(
    localStorage.getItem("customFilter")
  );

  let now = dayjs();

  function getJobTitleApi() {
    const req = {};

    getDepartmentjobtitleselect(req)
      .then((res) => {
        const data = res?.map((data) => {
          return { ...data, checked: false };
        });
        setjobTitle(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getjobPositionApi() {
    const req = {};

    getJobtitlepositionselect(req)
      .then((res) => {
        setjobPosition(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getEmployeeStatusApi() {
    const req = {};

    getEmploymentstatusselect(req)
      .then((res) => {
        setemployeeStatusOption(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getdepartmentApi() {
    const req = {};

    getDepartmentselect(req)
      .then((res) => {
        const data = res?.map((data) => {
          return { ...data, checked: false };
        });
        setdepartmentOption(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleSubmit() {
    const tomoDatePlus = now.add(1, "day").format("YYYY-MM-DD");
    let startOfToday = now.format("YYYY-MM-DD");

    const filters = [];

    if (todayFilter && tomorrowFilter) {
      filters.push(
        `and=(booking_from.gt.${startOfToday}T00:00:00.000Z,booking_from.lt.${tomoDatePlus}T23:59:59.000Z)`
      );
    } else if (todayFilter) {
      filters.push(
        `and=(booking_from.gt.${startOfToday}T00:00:00.000Z,booking_from.lt.${startOfToday}T23:59:59.000Z)`
      );
    } else if (tomorrowFilter) {
      filters.push(
        `and=(booking_from.gt.${tomoDatePlus}T00:00:00.000Z,booking_from.lt.${tomoDatePlus}T23:59:59.000Z)`
      );
    } else if (customFilter) {
      let customDateFormatted = dayjs(customFilter).format("YYYY-MM-DD");
      filters.push(
        `and=(booking_from.gt.${customDateFormatted}T00:00:00.000Z,booking_from.lt.${customDateFormatted}T23:59:59.000Z)`
      );
    }

    // const filterss = [
    //   ...(!isEmpty(todayFilter && tomorrowFilter)
    //     ? [
    //         `and=(booking_from.gt.${startOfToday}T00:00:00.000Z,booking_from.lt.${tomoDatePlus}T23:59:59.000Z)`,
    //       ]
    //     : []),
    //   ...(!isEmpty(todayFilter)
    //     ? [
    //         `and=(booking_from.gt.${startOfToday}T00:00:00.000Z,booking_from.lt.${startOfToday}T23:59:59.000Z)`,
    //       ]
    //     : []),
    //   ...(!isEmpty(tomorrowFilter)
    //     ? [
    //         `and=(booking_from.gt.${tomoDatePlus}T00:00:00.000Z,booking_from.lt.${tomoDatePlus}T23:59:59.000Z)`,
    //       ]
    //     : []),

    //   ...(!isEmpty(customFilter)
    //     ? [`and=(booking_from.lt.2022-11-25,booking_from.gt.2022-11-23)`]
    //     : []),
    // ];
    if (todayFilter) {
      localStorage.setItem("todayFilter", todayFilter);
    }
    if (tomorrowFilter) {
      localStorage.setItem("tomoFilter", tomorrowFilter);
    }

    if (customFilter) {
      localStorage.setItem("customFilter", customFilter);
    }




    props?.filters(filters);
    props?.page(1);
    props?.onRequestClose();
  }

  return (
    <>
      <ModalProvider
        appElement={document.getElementById("root")}
        className=" w-[100%] flex-col flex items-center justify-center"
        overlayClassName="bg-black_900_99 fixed flex h-[100%] inset-y-[0] w-[100%] items-center justify-center"
        {...props}
      >
        <div className=" max-h-[97vh] overflow-y-auto w-[250px] rounded-radius12">
          <Column className="flex flex-col justify-end xl:p-[104px] 2xl:p-[117px] 3xl:p-[141px] lg:p-[83px] w-[100%] ">
            <Column className="bg-white_A700 justify-start lg:mb-[257px] xl:mb-[322px] 2xl:mb-[362px] 3xl:mb-[434px] lg:ml-[109px] xl:ml-[136px] 2xl:ml-[153px] 3xl:ml-[184px] lg:p-[16px] xl:p-[20px] 2xl:p-[22px] 3xl:p-[27px] rounded-radius12 shadow-bs1 w-[100%]">
              <Row className="bg-gray-100 flex flex-row items-center justify-between w-[100%]  p-[14px]">
                <Text
                  className="flex-grow font-bold sm:mt-[1px] md:mt-[2px] text-black_900"
                  as="h5"
                  variant="h5"
                >
                  Filter Data
                </Text>
                {/* <Button
                  className="common-pointer font-medium xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-center w-[43%] p-[10px]"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Filter Data
                </Button> */}
                <Img
                  src="/images/img_arrowright_24X24.svg"
                  className="settings_One"
                  alt="arrowright One"
                  onClick={() => props?.onRequestClose()}
                />
              </Row>
            </Column>
            <Column className="bg-white_A700 justify-start lg:mb-[257px] xl:mb-[322px] 2xl:mb-[362px] 3xl:mb-[434px] lg:ml-[109px] xl:ml-[136px] 2xl:ml-[153px] 3xl:ml-[184px] lg:p-[16px] xl:p-[20px] 2xl:p-[22px] 3xl:p-[27px] shadow-bs1 w-[100%] p-[10px]">
              <Row
                className="flex flex-row items-end justify-between lg:mt-[16px] xl:mt-[20px] 2xl:mt-[22px] 3xl:mt-[27px] w-[100%]"
                onClick={() => toggleFunction("depToggle")}
              >
                <Text className="rowdepartments" as="h5" variant="h5">
                  Filter by:
                </Text>
              </Row>

              {todayFilter ? (
                <CheckBox
                  className="font-medium lg:mt-[10px] xl:mt-[13px] 2xl:mt-[15px] 3xl:mt-[18px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-bluegray_402 mt-[10px]"
                  inputClassName="h-[24px] ml-[10px] mr-[10px] w-[24px]"
                  name="Today"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setTodayFilter(e.target.name);
                      if (customFilter) {
                        setCustomDate("");
                        localStorage.removeItem("customFilter", customFilter);
                      }
                    } else {
                      setTodayFilter("");
                      localStorage.removeItem("todayFilter");
                    }
                  }}
                  checked={todayFilter ? true : false}
                  label="Today"
                  shape="RoundedBorder2"
                  variant="OutlineBluegray101"
                ></CheckBox>
              ) : (
                <CheckBox
                  className="font-medium lg:mt-[10px] xl:mt-[13px] 2xl:mt-[15px] 3xl:mt-[18px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-bluegray_402 mt-[10px]"
                  inputClassName="h-[24px] ml-[10px] mr-[10px] w-[24px]"
                  name="Today"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setTodayFilter(e.target.name);
                      localStorage.setItem("todayFilter", todayFilter);
                      if (customFilter) {
                        setCustomDate("");
                        localStorage.removeItem("customFilter", customFilter);
                      }
                    } else {
                      setTodayFilter("");
                      localStorage.removeItem("todayFilter");
                    }
                  }}
                  //checked={getToday ? true : false}
                  label="Today"
                  shape="RoundedBorder2"
                  variant="OutlineBluegray101"
                ></CheckBox>
              )}

              {tomorrowFilter ? (
                <CheckBox
                  className="font-medium lg:mt-[10px] xl:mt-[13px] 2xl:mt-[15px] 3xl:mt-[18px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-bluegray_402 mt-[10px]"
                  inputClassName="h-[24px] ml-[10px] mr-[10px] w-[24px]"
                  name="Tomorrow"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setTomorrowFilter(e.target.name);
                      if (customFilter) {
                        setCustomDate("");
                        localStorage.removeItem("customFilter", customFilter);
                      }
                    } else {
                      setTomorrowFilter("");
                      localStorage.removeItem("tomoFilter");
                    }
                  }}
                  checked={tomorrowFilter ? true : false}
                  label="Tomorrow"
                  shape="RoundedBorder2"
                  variant="OutlineBluegray101"
                ></CheckBox>
              ) : (
                <CheckBox
                  className="font-medium lg:mt-[10px] xl:mt-[13px] 2xl:mt-[15px] 3xl:mt-[18px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-bluegray_402 mt-[10px]"
                  inputClassName="h-[24px] ml-[10px] mr-[10px]  w-[24px]"
                  name="Tomorrow"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setTomorrowFilter(e.target.name);
                      if (customFilter) {
                        setCustomDate("");
                        localStorage.removeItem("customFilter", customFilter);
                      }
                    } else {
                      setTomorrowFilter("");
                    }
                  }}
                  label="Tomorrow"
                  shape="RoundedBorder2"
                  variant="OutlineBluegray101"
                ></CheckBox>
              )}
              <Row
                className="items-center common-pointer justify-between lg:mt-[16px] xl:mt-[20px] 2xl:mt-[22px] 3xl:mt-[27px] w-[100%] mt-[10px]"
              // onClick={() => toggleFunction("jobPositionToggle")}
              >
                <Text
                  className="font-medium text-black_900 w-[auto]"
                  as="h5"
                  variant="h5"
                >
                  Custom Date:
                </Text>
                {customFilter ? (
                  <Datepicker
                    className="bg-gray-200 font-normal not-italic p-[10px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-gray_500 w-[100%] mt-[10px] rounded-radius8"
                    name="To"
                    selected={new Date(customFilter.toString())}
                    //  value={customFilter}
                    onChange={(e) => {
                      if (e) {
                        setCustomDate(e);
                        setTodayFilter("");
                        setTomorrowFilter("");
                        localStorage.removeItem("todayFilter");
                        localStorage.removeItem("tomoFilter");
                      } else {
                        setCustomDate("");
                      }
                    }}
                  ></Datepicker>
                ) : (
                  <Datepicker
                    className="bg-gray-200 font-normal not-italic p-[10px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-gray_500 w-[100%] mt-[10px] rounded-radius8"
                    name="To"
                    onChange={(e) => {
                      if (e) {
                        setCustomDate(e);
                        localStorage.removeItem("todayFilter");
                        localStorage.removeItem("tomoFilter");
                        setTodayFilter("");
                        setTomorrowFilter("");
                      } else {
                        setCustomDate("");
                      }
                    }}
                  >
                    {" "}
                  </Datepicker>
                )}
              </Row>
              <Line className="bg-bluegray_100 h-[1px] mt-[16px] sm:mt-[6px] md:mt-[8px] w-[100%]" />
              <Row className="bg-white_A700 flex flex-row items-center justify-center w-[100%] mt-[10px]">
                <Button
                  className="common-pointer font-medium xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-center w-[98%] p-[4px] rounded-radius4"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Filter Data
                </Button>
              </Row>
            </Column>
          </Column>
        </div>
      </ModalProvider>
    </>
  );
};

export { FilterSpaceModal };
