import { Column, Img, Line, List, Row, SelectBox, Text } from "components";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import dayjs from "dayjs";
import useForm from "hooks/useForm";
import moment from "moment";
import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  getEmployeeselect,
  getSpacebookingInviteesselect,
  getSpacebookingInviteselect,
  getSpacebookingInviteselectCount,
  getSpacebookingselect,
  postBookingInvitees,
  postSpacebooking
} from "service/api";
import { EditBookingModal } from "../../../modals/EditBooking";
import { FilterSpaceModal } from "../../../modals/FilterSpace";
import ViewBookingRemoveModal from "../../../modals/ViewBookingRemove";
import TableFooter from "../EmployeeList/tableFooter";
// import { date } from "yup";
import * as yup from "yup";
import Base from "../../../components/Base";
import useCurrentUser from "../../../hooks/useCurrentUser";

const Bookings = () => {
  const [startdate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [key, setKey] = React.useState(false);
  const [keyy, setKeyy] = React.useState(false);
  const [arrDates, setarrDates] = React.useState([]);

  const [apiDataPost, setapiDataPost] = React.useState();
  const [isOpenViewBookingRemoveModal, setViewBookingRemoveModal] =
    React.useState(false);
  const [isOpenEditBookingRemoveModal, setEditBookingRemoveModal] =
    React.useState(false);
  const [HostToOption, setHostToOption] = React.useState();
  const [id, setId] = React.useState();
  const [InviteeToOption, setInviteeToOption] = React.useState();
  const [options, setOptions] = React.useState();
  const [optionsDrop, setOptionsDrop] = React.useState();
  const [ViewBookapiData, setViewBookapiData] = React.useState();
  const [ViewHostapiData, setViewHostapiData] = React.useState();
  const inputRef = React.useRef(null);
  const resRef = useRef(null);
  const dateFromRef = useRef(null);
  const dateToRef = useRef(null);
  const [apiData, setapiData] = React.useState();
  const [apiData1, setapiData1] = React.useState();
  const [apiData4, setapiData4] = React.useState();
  const [spaceCount, setSpaceCount] = React.useState(); // Set Employees Count
  const [rowsPerPage, setrowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [tableRange, setTableRange] = React.useState([]);
  const [slice, setSlice] = React.useState();
  const [isOpenFilterSpaceModal, setisOpenFilterSpaceModal] =
    React.useState(false);
  const [filterData, setfilterData] = React.useState(); // Set Filter Data from Modal
  const [excludedTimes, setExcludedTimes] = React.useState();
  const { userData } = useCurrentUser();
  const [ViewBookInviteapiData, setViewBookInviteapiData] = React.useState();

  const handleViewInvitess = async (data) => {
    const req = {
      params: {
        select: "*",
      },
    };

    getSpacebookingInviteesselect(req)
      .then((res) => {
        setViewBookInviteapiData(res);
        //setToggle(true);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened");
      });
  };

  // Per Page rows
  const rowsPerPageOption = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
  ];
  const location = useLocation();

  const formValidationSchema = yup.object().shape({
    //  ["space_name"]: yup.string()
    booking_title: yup.string().required("Title is required"),
    booking_type: yup.string().required("Type is required"),
    booked_for: yup.string().required("Please Select Host"),
  });

  const form = useForm(
    {
      booking_title: "",
      booking_type: "",
      booked_for: "",
      space_id: "",
      booking_from: "",
      booking_to: "",
    },
    {
      validate: true,
      validateSchema: formValidationSchema,
      validationOnChange: true,
    }
  );

  const inviteeFormValidationSchema = yup.object().shape({
    employee_id: yup.string().required("Please Select Host"),
  });

  const inviteeForm = useForm(
    {
      employee_id: "",
      booking_id: "",
    },
    {
      validate: true,
      validateSchema: inviteeFormValidationSchema,
      validationOnChange: true,
    }
  );
  const [toggle, setToggle] = React.useState(true);

  window.addEventListener("beforeunload", function () {
    localStorage.removeItem("todayFilter");
    localStorage.removeItem("tomoFilter");
    localStorage.removeItem("customFilter");
  });

  React.useEffect(() => {
    handleView();
    handleHostView();
    handleViewInvitess();
  }, []);

  const getInvitationCount = async (data) => {
    const req = data
      ? { params: {} }
      : filterData
        ? { filterURL: filterData.join("&") }
        : { params: { employee_id: `eq.${userData.id}` } };
    //replace with login userId

    // !data && setIsLoading(true);
    await getSpacebookingInviteselectCount(req)
      .then((res) => {
        setSpaceCount(res[0]?.count);
        // !data && setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened");
      });
  };
  function handleDropdown() {
    const req = { params: { select: "id,first_name,middle_name,last_name" } };
    // setIsLoading(true);
    getEmployeeselect(req)
      .then((res) => {
        setHostToOption(hostDropdown(res));
        setInviteeToOption(hostDropdown(res));
        setToggle(false);
        loadAllTimeSlots();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened");
      });
  }

  function handleOpenFilterSpaceModal() {
    //Open Filter Modal
    setisOpenFilterSpaceModal(true);
  }
  function handleCloseFilterSpaceModal() {
    // Close FIlter Modal
    setisOpenFilterSpaceModal(false);
  }

  // To calculate the range for pagination
  const calculateRange = (totalRows, rowsPerPage) => {
    const range = [];
    const num = Math.ceil(totalRows / rowsPerPage);
    let i = 1;
    for (let i = 1; i <= num; i++) {
      range.push(i);
    }
    return range;
  };

  const sliceData = (page, rowsPerPage) => {
    return `${(page - 1) * rowsPerPage}-${page * rowsPerPage - 1}`;
  };

  const pagiantion = (count, rows, page) => {
    const range = calculateRange(count, rows);
    setTableRange([...range]);

    const data = sliceData(page, rowsPerPage);
    setSlice(data ? data : "");
    handleView(data);
  };

  const resetForm = () => {
    inputRef.current.clearValue();
    resRef.current.clearValue();
    form.resetForm();
  };
  function createSlotsTodisable(res) {
    const allDates = res?.map(({ booking_from, booking_to }, index) => {
      return {
        booking_from: booking_from,
        booking_to: booking_to,
      };
    });
    let allSlots = [];

    for (let i = 0; i < allDates.length; i++) {
      let time = new Date(allDates[i].booking_to);
      while (time >= new Date(allDates[i].booking_from)) {
        allSlots.push(new Date(time));

        let result = dayjs(time).subtract(30, "minute");
        //let result = dayjs().subtract(dayjs.duration({'minute' : 30}))
        time = result;
      }
    }
    setarrDates(allSlots);
  }
  function loadAllTimeSlots() {
    const req = {
      params: {
        select: "*,employe:booked_for(first_name,middle_name,last_name)",
        space_id: `eq.${location?.state?.id}`,
      },
    };
    getSpacebookingselect(req)
      .then((res) => {
        setViewBookapiData(res);
        createSlotsTodisable(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleView = async (data) => {
    const req = {
      params: {
        select:
          "*,spaceName:space(space_name),bookingFrom:space_booking(booking_from),bookingTo:space_booking(booking_to),host:space_booking(booking_forName),bookingTitle:space_booking(booking_title)",
        employee_id: `eq.${userData.id}`,
      },
    };

    getSpacebookingInviteselect(req)
      .then((res) => {
        setViewBookapiData(res);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened");
      });
  };

  const handleHostView = async (data) => {

    const req = {
      params: {
        select: "*,space:space(space_name)",
        booked_for: `eq.${userData.id}`,
      },
    };
    //replace with login userId

    getSpacebookingselect(req)
      .then((res) => {
        setViewHostapiData(res);
        //setToggle(true);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened");
      });
  };

  function hostDropdown(data) {
    const options = data?.map(
      ({ id, first_name, middle_name, last_name }, index) => {
        return {
          value: id,
          label: `${first_name} ${middle_name} ${last_name}`,
        };
      }
    );
    return options;
  }
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  function callBookApi(data) {
    let from = dayjs(form?.values?.booking_from);
    let to = dayjs(form?.values?.booking_to);
    if (to > from) {
      if (to.diff(from, "minutes") > 60) {
        toast.error("You can book this for an hour only!");
      } else {
        const req = { data: { ...data, space_id: apiData1?.[0]?.id } };
        postSpacebooking(req)
          .then((res) => {
            setapiDataPost(res);
            callApi4(res);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    } else {
      toast.error("Please select appropriate time!");
    }
  }
  function callApi4(data) {
    const req = {
      data: optionsDrop?.map((index) => {
        return {
          booking_id: data[0].id,
          employee_id: index,
          space_id: apiData1?.[0]?.id,
        };
      }),
    };
    postBookingInvitees(req)
      .then((res) => {
        setapiData4(res);
        toast.success("Space booked successfully!.");
        resetForm();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleOpenViewBookingRemoveModal(id) {
    setViewBookingRemoveModal(true);
    setId(id);
  }
  function handleCloseViewBookingRemoveModal() {
    setViewBookingRemoveModal(false);
    getCount();
  }

  function handleOpenEditBookingRemoveModal(id) {
    setEditBookingRemoveModal(true);
    setId(id);
  }
  function handleCloseEditBookingRemoveModal() {
    setEditBookingRemoveModal(false);
    getCount();
  }
  const getExcludedTimes = (date) => {
    let arrSpecificDates = [];
    for (let i = 0; i < arrDates.length; i++) {
      if (
        moment(date, moment.ISO_8601).format("YYYY/MM/DD") ===
        moment(arrDates[i], moment.ISO_8601).format("YYYY/MM/DD")
      ) {
        arrSpecificDates.push(moment(arrDates[i], moment.ISO_8601).toObject());
      }
    }
    let arrExcludedTimes = [];
    for (let i = 0; i < arrSpecificDates.length; i++) {
      arrExcludedTimes.push(
        setHours(
          setMinutes(new Date(), arrSpecificDates[i].minutes),
          arrSpecificDates[i].hours
        )
      );
      setExcludedTimes(arrExcludedTimes);
    }
  };
  return (
    <Base title="Bookings" headerType={2}>
      <Column className="bg-white_A700 flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px]  sm:mx-[0] md:p-[12px] sm:p-[15px] rounded-radius8 sm:w-[100%] w-[97%]">
        <Column className="flex flex-col items-center justify-start mb-[15px] sm:mb-[5px] md:mb-[7px] sm:px-[0] w-[100%]">

          <Column className="flex flex-col items-center justify-start sm:mt-[19px] md:mt-[25px] mt-[29px] sm:px-[0] w-[100%]">
            <footer className="bg-white_A700 lg:mt-[12px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px] w-[100%] mt-[32px]">
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
                      My Invitations
                    </Text>
                  </Row>
                </Row>
                <Line className="bg-bluegray_100 h-[1px] mt-[16px] sm:mt-[6px] md:mt-[8px] w-[100%]" />
              </Column>
              <Column className="items-center justify-start w-[100%]">
                <Column className="bg-gray-100 flex flex-col justify-start md:ml-[64px] sm:mt-[11px] md:mt-[14px] mt-[29px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%]  border border-gray_300 border-solid ">
                  <Row className="flex flex-row items-center justify-evenly lg:pl-[39px] xl:pl-[49px] 2xl:pl-[55px] 3xl:pl-[66px] w-[100%] p-[10px]">
                    <Column className="flex flex-col items-center w-[30%] ">
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
                        {dayjs(
                          apiDataResponseEle?.["bookingFrom"]?.["booking_from"]
                        ).format("YYYY-MM-DD") >=
                          dayjs().format("YYYY-MM-DD") ? (
                          <Column className="flex flex-col  3xl:my-[10px] lg:my-[6px] xl:my-[8px] 2xl:my-[9px] w-[100%]">
                            <Row className="flex flex-row items-center justify-evenly w-[100%] p-[10px]  border-l border-r border-b border-gray_300 border-solid ">
                              <Text
                                className="font-normal text-center sm:ml-[3px] md:ml-[4px] sm:mt-[5px] md:mt-[6px] not-italic text-black_901 w-[30%] "
                                as="h6"
                                variant="h6"
                              >
                                {
                                  apiDataResponseEle?.["host"]?.[
                                  "booking_forName"
                                  ]
                                }{" "}
                              </Text>
                              <Text
                                className="font-normal text-center sm:ml-[3px] md:ml-[4px] sm:mt-[4px] md:mt-[6px] not-italic text-black_901 w-[20%]"
                                as="h6"
                                variant="h6"
                              >
                                {
                                  apiDataResponseEle?.["spaceName"]?.[
                                  "space_name"
                                  ]
                                }{" "}
                              </Text>
                              <Text
                                className="font-medium text-center text-indigo_600 w-[15%]"
                                as="h6"
                                variant="h6"
                              >
                                {dayjs(
                                  apiDataResponseEle?.["bookingFrom"]?.[
                                  "booking_from"
                                  ]
                                ).format("DD/MM/YYYY h:mm a")}
                                {"-"}
                                {dayjs(
                                  apiDataResponseEle?.["bookingTo"]?.[
                                  "booking_to"
                                  ]
                                ).format("DD/MM/YYYY h:mm a")}
                              </Text>
                              <Text
                                className="font-medium text-center text-black_901 w-[20%]"
                                as="h6"
                                variant="h6"
                              >
                                {
                                  apiDataResponseEle?.["bookingTitle"]?.[
                                  "booking_title"
                                  ]
                                }{" "}
                              </Text>
                              <Text
                                className="font-medium text-center text-black_901 w-[25%]"
                                as="h6"
                                variant="h6"
                              >
                                {ViewBookInviteapiData?.filter(
                                  (a) =>
                                    a.booking_id ===
                                    apiDataResponseEle?.["booking_id"]
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
                {spaceCount ? (
                  <Row className="flex flex-row items-center justify-center w-[auto] mt-[50px]">
                    <Text
                      className="font-medium mr-[14px] sm:ml-[5px] md:ml-[7px] text-black_901 w-[auto] "
                      as="h5"
                      variant="h5"
                    >
                      Showing
                    </Text>
                    <SelectBox
                      className="font-normal not-italic p-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] w-[100px] mr-[10px]"
                      onChange={(e) => {
                        setPage(1);
                        setrowsPerPage(e);
                      }}
                      placeholder={rowsPerPage}
                      value={rowsPerPage}
                      options={rowsPerPageOption}
                      name="rowsPerPage"
                      isSearchable={false}
                      isMulti={false}
                    ></SelectBox>
                    <TableFooter
                      range={tableRange}
                      slice={slice}
                      setPage={setPage}
                      page={page}
                    />
                  </Row>
                ) : (
                  ""
                )}
              </Column>
            </footer>
          </Column>
          <Column className="flex flex-col items-center justify-start sm:mt-[19px] md:mt-[25px] mt-[49px] sm:px-[0] w-[100%]">
            <footer className="bg-white_A700 lg:mt-[12px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px] w-[100%] mt-[32px]">
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
                      Meetings that you're hosting...
                    </Text>
                  </Row>
                </Row>
                <Line className="bg-bluegray_100 h-[1px] mt-[16px] sm:mt-[6px] md:mt-[8px] w-[100%]" />
              </Column>
              <Column className="items-center justify-start w-[100%]">
                <Column className="bg-gray-100 flex flex-col justify-start md:ml-[64px] sm:mt-[11px] md:mt-[14px] mt-[29px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%]  border border-gray_300 border-solid ">
                  <Row className="flex flex-row items-center justify-evenly lg:pl-[39px] xl:pl-[49px] 2xl:pl-[55px] 3xl:pl-[66px] w-[100%] p-[10px]">
                    <Column className="flex flex-col items-center w-[20%] ">
                      <Row className=" flex flex-row items-center justify-center ">
                        <Text
                          className="font-medium text-center text-indigo_600 w-[max-content]"
                          as="h5"
                          variant="h5"
                        >
                          Booking Title
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
                          Created At
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
                  {ViewHostapiData?.map((apiDataResponseEle, index) => {
                    return (
                      <React.Fragment key={`apiDataResponseEle${index}`}>
                        {dayjs(apiDataResponseEle?.["booking_from"]).format(
                          "YYYY-MM-DD"
                        ) >= dayjs().format("YYYY-MM-DD") ? (
                          <Column className="flex flex-col  3xl:my-[10px] lg:my-[6px] xl:my-[8px] 2xl:my-[9px] w-[100%]">
                            <Row className="flex flex-row items-center justify-evenly w-[100%] p-[10px]  border-l border-r border-b border-gray_300 border-solid ">
                              <Text
                                className="font-normal text-center sm:ml-[3px] md:ml-[4px] sm:mt-[5px] md:mt-[6px] not-italic text-black_901 w-[20%] "
                                as="h6"
                                variant="h6"
                              >
                                {apiDataResponseEle?.["booking_title"]}{" "}
                              </Text>
                              <Text
                                className="font-normal text-center sm:ml-[3px] md:ml-[4px] sm:mt-[4px] md:mt-[6px] not-italic text-black_901 w-[20%]"
                                as="h6"
                                variant="h6"
                              >
                                {apiDataResponseEle?.space?.["space_name"]}
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
                                className="font-medium text-center sm:ml-[3px] md:ml-[4px] text-black_901 w-[20%]"
                                as="h6"
                                variant="h6"
                              >
                                {dayjs(
                                  apiDataResponseEle?.["created_at"]
                                ).format("DD/MM/YYYY h:mm a")}
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
                {spaceCount ? (
                  <Row className="flex flex-row items-center justify-center w-[auto] mt-[50px]">
                    <Text
                      className="font-medium mr-[14px] sm:ml-[5px] md:ml-[7px] text-black_901 w-[auto] "
                      as="h5"
                      variant="h5"
                    >
                      Showing
                    </Text>
                    <SelectBox
                      className="font-normal not-italic p-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] w-[100px] mr-[10px]"
                      onChange={(e) => {
                        setPage(1);
                        setrowsPerPage(e);
                      }}
                      placeholder={rowsPerPage}
                      value={rowsPerPage}
                      options={rowsPerPageOption}
                      name="rowsPerPage"
                      isSearchable={false}
                      isMulti={false}
                    ></SelectBox>
                    <TableFooter
                      range={tableRange}
                      slice={slice}
                      setPage={setPage}
                      page={page}
                    />
                  </Row>
                ) : (
                  ""
                )}
              </Column>
            </footer>
          </Column>
        </Column>
      </Column>

      {isOpenFilterSpaceModal ? (
        <FilterSpaceModal
          filters={(e) => {
            setfilterData(e);
          }}
          page={(e) => setPage(e)}
          isOpen={isOpenFilterSpaceModal}
          onRequestClose={handleCloseFilterSpaceModal}
        />
      ) : null}
      {isOpenViewBookingRemoveModal ? (
        <ViewBookingRemoveModal
          isOpen={isOpenViewBookingRemoveModal}
          onRequestClose={handleCloseViewBookingRemoveModal}
          id={id}
        />
      ) : null}

      {isOpenEditBookingRemoveModal ? (
        <EditBookingModal
          isOpen={isOpenEditBookingRemoveModal}
          onRequestClose={handleCloseEditBookingRemoveModal}
          id={id}
          space_id={location?.state?.id}
        />
      ) : null}
      <ToastContainer />
    </Base>
  );
};

export default Bookings;
