import {
  Button,
  CheckBox,
  Column,
  Img,
  Input,
  Line,
  List,
  Row,
  SelectBox,
  Text
} from "components";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import dayjs from "dayjs";
import useForm from "hooks/useForm";
import { isEmpty } from "lodash";
import moment from "moment";
import React, { useRef } from "react";
import DatePicker from "react-datepicker";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  getEmployeeselect,
  getSpacebookingselect,
  getSpacebookingselectCount,
  getSpaceideq1,
  getSpaceresourcespaceideq55,
  postBookingInvitees, postBookingNotification, postSpacebooking,
  sendXYZEmail
} from "service/api";
import * as yup from "yup";
import Base from "../../../components/Base";
import { SUPABSE_CREDS } from "../../../constant";
import { EditBookingModal } from "../../../modals/EditBooking";
import { FilterSpaceModal } from "../../../modals/FilterSpace";
import ViewBookingRemoveModal from "../../../modals/ViewBookingRemove";
import TableFooter from "../EmployeeList/tableFooter";

const BookSpaceDailyPage = () => {
  const [arrDates, setarrDates] = React.useState([]);

  const [apiDataPost, setapiDataPost] = React.useState();
  const [isOpenViewBookingRemoveModal, setViewBookingRemoveModal] =
    React.useState(false);
  const [isOpenEditBookingRemoveModal, setEditBookingRemoveModal] =
    React.useState(false);
  const [HostToOption, setHostToOption] = React.useState();
  const [id, setId] = React.useState();
  const [InviteeToOption, setInviteeToOption] = React.useState();
  const [optionsDrop, setOptionsDrop] = React.useState();
  const [ViewBookapiData, setViewBookapiData] = React.useState();
  const inputRef = React.useRef(null);
  const resRef = useRef(null);
  const checkRef = useRef(null);

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
  const [isChecked, setIsChecked] = React.useState();

  // Per Page rows
  const rowsPerPageOption = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
  ];
  const location = useLocation();

  const formValidationSchema = yup.object().shape({
    booking_title: yup.string().required("Title is required"),
    booking_type: yup.string().required("Type is required"),
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
    callApi();
    callApi1();
    getCount();
    pagiantion(spaceCount, rowsPerPage, page);
  }, [spaceCount, setTableRange, page, setSlice, rowsPerPage, filterData]);

  const getCount = async (data) => {
    const req = data
      ? { params: {} }
      : filterData
        ? { filterURL: filterData.join("&") }
        : { params: { space_id: `eq.${location?.state?.id}` } };

    await getSpacebookingselectCount(req)
      .then((res) => {
        setSpaceCount(res[0]?.count);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened");
      });
  };
  function handleDropdown() {
    const req = {
      params: { select: "id,first_name,middle_name,last_name,work_email" },
    };
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

  function sendEmail(email) {
    const data = {
      reciever: email,
      subject: "You're invited",
      content: "I am testing",
    };

    const req = { data: data };

    sendXYZEmail(req)
      .then(() => { })
      .catch((err) => {
        console.error(err);
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
    checkRef.current.checked = false;
    setIsChecked(false);
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
    const req = filterData
      ? { headers: { Range: data }, filterURL: filterData.join("&") }
      : { headers: { Range: data } };

    req.params = {
      select: "*,employee:booked_for(first_name,middle_name,last_name)",
      space_id: `eq.${location?.state?.id}`,
    };
    getSpacebookingselect(req)
      .then((res) => {
        setViewBookapiData(res);
        setToggle(true);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened");
      });
  };

  function hostDropdown(data) {
    const options = data?.map(
      ({ id, first_name, middle_name, last_name, work_email }, index) => {
        return {
          value: id,
          label: `${first_name} ${middle_name} ${last_name}`,
          email: work_email,
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
        let labelToSend = "";

        if (HostToOption?.some((a) => a.value === data?.booked_for)) {
          labelToSend = HostToOption?.filter(
            (a) => a.value === data?.booked_for
          )[0]?.label;
        }

        const req = {
          data: {
            ...data,
            space_id: apiData1?.[0]?.id,
            booking_forName: labelToSend,
          },
        };
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
          employee_id: index?.value,
          space_id: apiData1?.[0]?.id,
          employee_name: index?.label,
        };
      }),
    };
    postBookingInvitees(req)
      .then((res) => {
        insertBookNotification(res, data[0].id)
        setapiData4(res);
        if (isChecked) {
          optionsDrop?.map((val) => {
            sendEmail(val?.email);
          });
        }
        toast.success("Space booked successfully!.");
        resetForm();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function insertBookNotification(res, data) {
    const req = {
      data: optionsDrop?.map((index) => {
        return {
          employe_id: index?.value,
          notification_type: 1,
          booking_id: data
        };
      }),
    };
    postBookingNotification(req)
      .then((res) => { })
      .catch((err) => {
        console.error(err);
      });
  }

  function callApi() {
    const req = { params: { space_id: `eq.${location?.state?.id}` } };

    getSpaceresourcespaceideq55(req)
      .then((res) => {
        setapiData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function callApi1() {
    const req = { params: { id: `eq.${location?.state?.id}` } };

    getSpaceideq1(req)
      .then((res) => {
        setapiData1(res);
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
    pagiantion(spaceCount, rowsPerPage, page);
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
    if (arrSpecificDates.length === 0) {
      setExcludedTimes(arrExcludedTimes);
    }
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
    <Base title="My Space">
      <Column className="bg-white_A700  flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px] my-[32px] sm:mx-[0] md:p-[12px] sm:p-[15px] p-[18px] rounded-radius8 sm:w-[100%] w-[97%]">
        <Column className="flex flex-col items-center justify-start mb-[15px] sm:mb-[5px] md:mb-[7px] sm:px-[0] w-[100%]">
          <Column className="flex flex-col items-center justify-start sm:mt-[19px] md:mt-[25px] mt-[49px] sm:px-[0] w-[100%]">
            <Column className="flex flex-col justify-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[99%]">
              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center md:mr-[25px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[97%]">
                {apiData1?.map((apiData1ResponseEle, index) => {
                  return (
                    <React.Fragment key={`apiData1ResponseEle${index}`}>
                      <Row className="flex flex-row justify-center w-[96%]">
                        <Column className="flex flex-col w-[48%] relative h-[300px]  ml-[60px]">
                          <Img
                            src={`${SUPABSE_CREDS.COMMON_URL}storage/v1/object/public/${apiData1ResponseEle?.["image_url"]}`}
                            className="absolute  w-[390px] rounded-radius8 h-[90%]"
                            alt="projecttitleTwo"
                          />
                        </Column>
                        <Column className="flex flex-col w-[48%]">
                          <Column className="flex flex-col sm:gap-[15px] md:gap-[19px] gap-[30px] min-h-[auto] sm:pt-[2px] md:pt-[3px] pt-[7px] rounded-radius4 sm:w-[100%]">
                            <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:mx-[0] sm:px-[0] sm:w-[100%]">
                              <Text
                                className="font-normal text-gray_801 w-[100px]"
                                as="h4"
                                variant="h4"
                              >
                                Space
                              </Text>
                              <Text className="font-normal text-gray_801">
                                :
                              </Text>
                              <Text
                                className="font-bold mb-[1px] md:ml-[12px] ml-[24px] sm:ml-[9px] text-indigo_600"
                                as="h4"
                                variant="h4"
                              >
                                {apiData1ResponseEle?.["space_name"]}
                              </Text>
                            </Row>
                            <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:mx-[0] sm:px-[0] sm:w-[100%]">
                              <Text
                                className="font-normal text-gray_801 w-[100px]"
                                as="h4"
                                variant="h4"
                              >
                                Location
                              </Text>
                              <Text className="font-normal text-gray_801">
                                :
                              </Text>
                              <Text
                                className="font-light md:ml-[12px] ml-[24px] sm:ml-[9px] mt-[1px] text-black_901 w-[auto]"
                                as="h4"
                                variant="h4"
                              >
                                {apiData1ResponseEle?.["location"]}
                              </Text>
                            </Row>
                            <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:mx-[0] sm:px-[0] sm:w-[100%]">
                              <Text
                                className="font-normal mb-[1px] text-gray_801 w-[100px]"
                                as="h4"
                                variant="h4"
                              >
                                Capacity
                              </Text>
                              <Text className="font-normal text-gray_801">
                                :
                              </Text>
                              <Text
                                className="font-light md:ml-[12px] ml-[24px] sm:ml-[9px] text-black_901 w-[auto]"
                                as="h4"
                                variant="h4"
                              >
                                {apiData1ResponseEle?.["capacity"]}
                              </Text>
                            </Row>

                            <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:px-[0] w-[100%]">
                              <Text
                                className="font-normal text-gray_801 w-[100px]"
                                as="h4"
                                variant="h4"
                              >
                                Resource
                              </Text>
                              <Text className="font-normal text-gray_801">
                                :
                              </Text>
                              {apiData?.map((apiDataResponseEle, index) => {
                                return (
                                  <React.Fragment
                                    key={`apiDataResponseEle${index}`}
                                  >
                                    <div className="rounded-[3.5px] border-[1px] border-indigo-400 pl-[10px] pr-[10px] ml-[24px]">
                                      <Text className="font-light text-indigo_600">
                                        {apiDataResponseEle?.resource.resource}
                                      </Text>
                                    </div>
                                  </React.Fragment>
                                );
                              })}
                            </Row>
                            <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start sm:px-[0] w-[98%]">
                              <Text
                                className="font-normal sm:mt-[2px] md:mt-[3px] text-gray_801 w-[110px]"
                                as="h4"
                                variant="h4"
                              >
                                Details
                              </Text>
                              <Text className="font-normal text-gray_801">
                                :
                              </Text>
                              <Text
                                className="font-medium leading-[26px] md:leading-[normal] sm:leading-[normal] md:ml-[12px] ml-[24px] sm:mx-[0] text-black_901 sm:w-[100%] w-[80%] text-justify"
                                as="h4"
                                variant="h4"
                              >
                                {apiData1ResponseEle?.["description"]}
                              </Text>
                            </Row>
                          </Column>
                        </Column>
                      </Row>
                    </React.Fragment>
                  );
                })}
              </Row>

              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-end ml-[auto] sm:mt-[19px] md:mt-[25px] mt-[50px] sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[36%]">
                <Button
                  className="cursor-pointer font-medium min-w-[31%] text-[16px] text-center text-white_A700 w-[max-content]"
                  onClick={handleDropdown}
                >
                  Book Space
                </Button>
                <Button
                  onClick={() => pagiantion(spaceCount, rowsPerPage, page)}
                  className="cursor-pointer font-medium min-w-[31%] md:ml-[12px] ml-[24px] sm:ml-[9px] text-[16px] text-center text-white_A700 w-[max-content]"
                >
                  View Booking
                </Button>
              </Row>
            </Column>

            {!toggle ? ( // add "!" before the toggle
              <Column className="flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px] mt-[32px] w-[99%]">
                <Column className="flex flex-col justify-start pt-[1px] w-[100%]">
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
                      New Booking
                    </Text>
                  </Row>
                  <Line className="bg-bluegray_100 h-[1px] mt-[16px] sm:mt-[6px] md:mt-[8px] w-[100%]" />
                </Column>
                <Column className="flex flex-col items-center justify-start sm:mt-[11px] md:mt-[15px] mt-[30px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[79%]">
                  <Column className="flex flex-col items-center justify-start w-[100%]">
                    <Column className="flex flex-col items-center justify-start sm:px-[0] w-[80%]">
                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between rounded-radius8 w-[100%]">
                        <Text
                          className="font-medium text-black_901 w-[auto]"
                          as="h5"
                          variant="h5"
                        >
                          Booking Type:
                        </Text>
                        <Input
                          className="font-normal not-italic p-[10px] text-[16px] placeholder:text-gray_500 text-gray_500 w-[100%]"
                          wrapClassName="sm:mx-[0] sm:w-[100%] w-[60%]"
                          onChange={(e) => {
                            form.handleChange("booking_type", e.target.value);
                          }}
                          value={form?.values?.["booking_type"]}
                          name="Group3997"
                          placeholder="What do you want to book for?"
                          shape="RoundedBorder8"
                          size="lg"
                          variant="FillBluegray50"
                        ></Input>
                      </Row>
                      <Row className="justify-end items-center flex flex-row rounded-radius8 w-full">
                        <div className="w-[60%]"></div>
                        <Text
                          className="font-normal text-[11px] text-red-600 w-[max-content] mt-[6px]"
                          wrapClassName="w-2/3 "
                          as="h5"
                          variant="h5"
                        >
                          {form?.errors?.["booking_type"]}
                        </Text>
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
                          <Row className="items-center justify-between lg:mt-[4px] xl:mt-[5px] 2xl:mt-[6px] 3xl:mt-[7px] w-[100%]">
                            <div className="bg-gray-100  rounded-radius8 font-normal not-italic p-[14px] text-[16px] placeholder:text-gray_500 text-gray_500 w-[100%]">
                              <DatePicker
                                name="From"
                                placeholderText="Select from date"
                                dateFormat="dd/MM/yyyy h:mm aa"
                                showTimeSelect
                                minDate={new Date()}
                                filterTime={filterPassedTime}
                                excludeTimes={excludedTimes}
                                onSelect={getExcludedTimes}
                                onChange={(e) => {
                                  form.handleChange("booking_from", e);
                                }}
                                selected={form?.values?.booking_from}
                                value={form?.values?.booking_from}
                              ></DatePicker>
                            </div>
                            <div className="bg-gray-100  rounded-radius8 font-normal not-italic p-[14px] text-[16px] placeholder:text-gray_500 text-gray_500 w-[100%] mt-[15px]">
                              <DatePicker
                                placeholderText="Select to date"
                                dateFormat="dd/MM/yyyy h:mm aa"
                                showTimeSelect
                                minDate={new Date()}
                                filterTime={filterPassedTime}
                                excludeTimes={excludedTimes}
                                onSelect={getExcludedTimes}
                                name="To"
                                onChange={(e) => {
                                  let difference =
                                    e - form?.values?.booking_from;
                                  const diffDuration =
                                    moment.duration(difference);
                                  form.handleChange("booking_to", e);
                                }}
                                selected={form?.values?.booking_to}
                                value={form?.values?.booking_to}
                              ></DatePicker>
                            </div>
                          </Row>
                        </Column>
                      </Row>

                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between w-[100%] mt-[24px]">
                        <Text
                          className="font-medium text-black_901 w-[auto]"
                          as="h5"
                          variant="h5"
                        >
                          Spaces:
                        </Text>
                        <Input
                          className="placeholder:text-gray_500 FirstName"
                          wrapClassName="w-[60%]"
                          value={apiData1?.[0]?.space_id}
                          name="Group3997"
                          shape="RoundedBorder8"
                          size="lg"
                          placeholder={apiData1?.[0]?.space_name}
                          variant="FillBluegray50"
                          disabled
                        ></Input>
                      </Row>
                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between w-[100%] mt-[24px]">
                        <Text
                          className="font-medium text-black_901 w-[auto]"
                          as="h5"
                          variant="h5"
                        >
                          Host
                        </Text>
                        <SelectBox
                          className="sm:mx-[0] sm:w-[100%] w-[60%]"
                          onChange={(e) => {
                            form.handleChange("booked_for", e);
                          }}
                          value={form?.values?.["booked_for"]}
                          options={
                            !isEmpty(optionsDrop)
                              ? HostToOption?.filter(
                                (a) =>
                                  !optionsDrop?.some(
                                    (b) => a.value === b.value
                                  )
                              )
                              : HostToOption
                          }
                          name="host"
                          ref={inputRef}
                          placeholder="Select Host"
                          isSearchable={true}
                          isMulti={false}
                        ></SelectBox>
                      </Row>
                      <Row className="justify-end items-center flex flex-row rounded-radius8 w-full">
                        <div className="w-[60%]"></div>
                        <Text
                          className="font-normal text-[11px] text-red-600 w-[max-content] mt-[6px]"
                          wrapClassName="w-2/3 "
                          as="h5"
                          variant="h5"
                        >
                          {form?.errors?.["booked_for"]}
                        </Text>
                      </Row>
                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between w-[100%] mt-[24px]">
                        <Text
                          className="font-medium text-black_901 w-[auto]"
                          as="h5"
                          variant="h5"
                        >
                          Invites:
                        </Text>
                        <SelectBox
                          className="sm:mx-[0] sm:w-[100%] w-[60%]"
                          onChange={(e) => {
                            let records = InviteeToOption?.filter((a) =>
                              e?.some((b) => a.value === b)
                            );

                            setOptionsDrop(records);
                          }}
                          value={inviteeForm?.values?.["employee_id"]}
                          options={
                            form?.values?.["booked_for"]
                              ? InviteeToOption?.filter(
                                (a) => a.value != form?.values?.["booked_for"]
                              )
                              : InviteeToOption
                          }
                          name="invitees"
                          placeholder="Select Invitees"
                          isSearchable={true}
                          isMulti={true}
                          ref={resRef}
                        ></SelectBox>
                      </Row>
                      <Row className="justify-end items-center flex flex-row rounded-radius8 w-full">
                        <div className="w-[60%]"></div>
                        <Text
                          className="font-normal text-[11px] text-red-600 w-[max-content] mt-[6px]"
                          wrapClassName="w-2/3 "
                          as="h5"
                          variant="h5"
                        >
                          {inviteeForm?.errors?.["employee_id"]}
                        </Text>
                      </Row>

                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between md:mt-[12px] mt-[24px] sm:mt-[9px] rounded-radius8 w-[100%]">
                        <Text
                          className="font-medium text-black_901 w-[auto]"
                          as="h5"
                          variant="h5"
                        >
                          Booking Title:
                        </Text>
                        <Input
                          className="font-normal not-italic p-[12px] text-[16px] placeholder:text-gray_500 text-gray_500 w-[100%]"
                          wrapClassName="sm:mx-[0] sm:w-[100%] w-[60%]"
                          onChange={(e) => {
                            form.handleChange("booking_title", e.target.value);
                          }}
                          value={form?.values?.["booking_title"]}
                          name="Group3997 One"
                          placeholder="Title"
                          shape="RoundedBorder8"
                          variant="FillBluegray50"
                        ></Input>
                      </Row>
                      <Row className="justify-end items-center flex flex-row rounded-radius8 w-full">
                        <div className="w-[60%]"></div>
                        <Text
                          className="font-normal text-[11px] text-red-600 w-[max-content] mt-[6px]"
                          wrapClassName="w-2/3 "
                          as="h5"
                          variant="h5"
                        >
                          {form?.errors?.["booking_title"]}
                        </Text>
                      </Row>
                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center gap-4 md:mt-[12px] mt-[40px] mb-[10px] sm:mt-[9px] rounded-radius8 w-[100%]">
                        <CheckBox
                          className="font-medium flex lg:mt-[10px] xl:mt-[13px] 2xl:mt-[15px] 3xl:mt-[18px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-bluegray_402"
                          inputClassName="h-[24px] mr-[5px] w-[24px]"
                          onChange={(e) => {
                            setIsChecked(e.target.checked);
                          }}
                          shape="RoundedBorder2"
                          variant="OutlineBluegray101"
                          ref={checkRef}
                        ></CheckBox>
                        <Text
                          className="font-medium text-black_901 w-[auto]"
                          as="h5"
                          variant="h5"
                        >
                          Send Invitation to Join via Email.
                        </Text>
                      </Row>
                    </Column>

                    <Row className=" flex flex-row items-center justify-center lg:mt-[26px] xl:mt-[33px] 2xl:mt-[37px] 3xl:mt-[45px] rounded-radius8 w-[30%] mt-[30px]">
                      <Button
                        className="common-pointer font-medium xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-center w-[47%] mr-[20px]"
                        onClick={() => {
                          form.handleSubmit(callBookApi);
                        }}
                      >
                        Book
                      </Button>
                      <Button
                        className="font-medium lg:ml-[12px] xl:ml-[16px] 2xl:ml-[18px] 3xl:ml-[21px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-center w-[47%]"
                        variant="OutlineIndigo600"
                        onClick={resetForm}
                      >
                        Reset
                      </Button>
                    </Row>
                  </Column>
                </Column>
              </Column>
            ) : (
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
                        View Booking
                      </Text>
                    </Row>
                    <Row className="flex flex-row items-center w-[auto]">
                      <Button
                        className="flex lg:h-[23px] xl:h-[29px] 2xl:h-[32px] 3xl:h-[38px] items-center justify-center lg:w-[22px] xl:w-[28px] 2xl:w-[31px] 3xl:w-[37px]"
                        shape="icbRoundedBorder4"
                        size="mdIcn"
                        variant="icbOutlineBluegray5003d"
                        onClick={handleOpenFilterSpaceModal}
                      >
                        <Img
                          src="/images/img_volume_42X42.svg"
                          className="flex items-center justify-center lg:h-[13px] xl:h-[17px] 2xl:h-[19px] 3xl:h-[22px]"
                          alt="volume One"
                        />
                      </Button>

                      {!isEmpty(filterData) && (
                        <Button
                          className="font-medium lg:ml-[5px] xl:ml-[7px] 2xl:ml-[9px] 3xl:ml-[11px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-center w-[auto] ml-[20px]"
                          variant="OutlineIndigo600"
                          onClick={() => {
                            localStorage.removeItem("todayFilter"),
                              localStorage.removeItem("tomoFilter"),
                              localStorage.removeItem("customFilter"),
                              setfilterData("");
                          }}
                        >
                          Reset Filters
                        </Button>
                      )}
                    </Row>
                  </Row>
                  <Line className="bg-bluegray_100 h-[1px] mt-[16px] sm:mt-[6px] md:mt-[8px] w-[100%]" />
                </Column>
                <Column className="items-center justify-start w-[100%]">
                  <Column className="bg-gray-100 flex flex-col justify-start md:ml-[64px] sm:mt-[11px] md:mt-[14px] mt-[29px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%]  border border-gray_300 border-solid ">
                    <Row className="flex flex-row items-center justify-center lg:pl-[39px] xl:pl-[49px] 2xl:pl-[55px] 3xl:pl-[66px] w-[100%] p-[10px]">
                      <Column className="items-center lg:ml-[122px] xl:ml-[152px] 2xl:ml-[171px] 3xl:ml-[206px] py-[2px] flex flex-col w-[15%]">
                        <Row className="items-center justify-center w-[100%] flex flex-row">
                          <Text
                            className="font-medium text-center text-indigo_600 w-[100%]"
                            as="h5"
                            variant="h5"
                          >
                            Booking Title
                          </Text>
                        </Row>
                      </Column>
                      <Column className="items-center lg:ml-[122px] xl:ml-[152px] 2xl:ml-[171px] 3xl:ml-[206px] py-[2px] flex flex-col w-[15%]">
                        <Row className="items-center justify-center w-[100%] flex flex-row">
                          <Text className="rowtitle" as="h5" variant="h5">
                            Created At
                          </Text>
                        </Row>
                      </Column>
                      <Column className="items-center lg:ml-[120px] xl:ml-[150px] 2xl:ml-[169px] 3xl:ml-[203px] py-[2px] flex flex-col w-[30%]">
                        <Row className="items-center justify-center w-[100%] flex flex-row">
                          <Text
                            className="font-normal sm:ml-[3px] md:ml-[4px] not-italic text-black_901"
                            as="h5"
                            variant="h5"
                          >
                            Host
                          </Text>
                        </Row>
                      </Column>
                      <Column className="items-center xl:ml-[116px] 2xl:ml-[130px] 3xl:ml-[156px] lg:ml-[92px] py-[2px] flex flex-col w-[15%]">
                        <Row className="items-center justify-center  w-[100%] flex flex-row">
                          <Text
                            className="font-normal text-center"
                            as="h5"
                            variant="h5"
                          >
                            Booking Type
                          </Text>
                        </Row>
                      </Column>
                      <Column className="items-center xl:ml-[103px] 2xl:ml-[116px] 3xl:ml-[139px] lg:ml-[82px] py-[2px] flex flex-col w-[15%]">
                        <Row className="items-center justify-center w-[100%] flex flex-row">
                          <Text
                            className="font-normal sm:ml-[3px] md:ml-[4px] not-italic text-black_901"
                            as="h5"
                            variant="h5"
                          >
                            Booked From
                          </Text>
                        </Row>
                      </Column>
                      <Column className="items-center lg:ml-[45px] xl:ml-[56px] 2xl:ml-[63px] 3xl:ml-[76px] py-[2px] flex flex-col w-[10%]">
                        <Text className="rowtitle" as="h5" variant="h5">
                          Action
                        </Text>
                      </Column>
                    </Row>
                  </Column>
                  <List
                    className="min-h-[auto]  lg:mt-[12px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px] w-[100%]"
                    orientation="vertical"
                  >
                    {ViewBookapiData?.length ? (
                      ViewBookapiData?.map((apiDataResponseEle, index) => {
                        return (
                          <React.Fragment key={`apiDataResponseEle${index}`}>
                            {apiDataResponseEle?.booking_from >=
                              dayjs().format("YYYY-MM-DDT00:00:00.000Z") ? (
                              <Column className="flex flex-col  3xl:my-[10px] lg:my-[6px] xl:my-[8px] 2xl:my-[9px] w-[100%]">
                                <Row className="flex flex-row items-center justify-center w-[100%] p-[10px]  border-l border-r border-b border-gray_300 border-solid ">
                                  <Text
                                    className="font-normal text-center sm:ml-[3px] md:ml-[4px] sm:mt-[5px] md:mt-[6px] not-italic text-black_901 w-[15%] "
                                    as="h6"
                                    variant="h6"
                                  >
                                    {apiDataResponseEle?.booking_title}
                                  </Text>
                                  <Text
                                    className="font-normal text-center sm:ml-[3px] md:ml-[4px] sm:mt-[4px] md:mt-[6px] not-italic text-black_901 w-[15%]"
                                    as="h6"
                                    variant="h6"
                                  >
                                    {dayjs(
                                      apiDataResponseEle?.["created_at"]
                                    ).format("DD/MM/YYYY h:mm a")}
                                  </Text>
                                  <Text
                                    className="font-medium text-center text-indigo_600 w-[30%]"
                                    as="h6"
                                    variant="h6"
                                  >
                                    {
                                      apiDataResponseEle?.employee?.[
                                      "first_name"
                                      ]
                                    }{" "}
                                    {
                                      apiDataResponseEle?.employee?.[
                                      "middle_name"
                                      ]
                                    }{" "}
                                    {
                                      apiDataResponseEle?.employee?.[
                                      "last_name"
                                      ]
                                    }
                                  </Text>
                                  <Text
                                    className="font-medium text-center text-black_901 w-[15%]"
                                    as="h6"
                                    variant="h6"
                                  >
                                    {apiDataResponseEle?.["booking_type"]}
                                  </Text>
                                  <Text
                                    className="font-medium text-center sm:ml-[3px] md:ml-[4px] text-black_901 w-[15%]"
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
                                  {apiDataResponseEle?.booking_from >=
                                    dayjs().format("YYYY-MM-DDT00:00:00.000Z") ? (
                                    <Row className="flex flex-row items-center justify-center lg:ml-[54px] xl:ml-[68px] 2xl:ml-[76px] 3xl:ml-[91px] rounded-radius8 w-[10%]">
                                      <Button
                                        className="flex lg:h-[24px] xl:h-[30px] 2xl:h-[34px] 3xl:h-[40px] items-center justify-center lg:w-[23px] xl:w-[29px] 2xl:w-[33px] 3xl:w-[39px] w-[36px]"
                                        shape="icbRoundedBorder8"
                                        size="mdIcn"
                                        variant="icbOutlineIndigo600"
                                        onClick={() =>
                                          handleOpenEditBookingRemoveModal(
                                            apiDataResponseEle?.id
                                          )
                                        }
                                      >
                                        {" "}
                                        <Img
                                          src="/images/img_edit_24X24.svg"
                                          className="flex items-center justify-center lg:h-[13px] xl:h-[17px] 2xl:h-[19px] 3xl:h-[22px]"
                                          alt="edit"
                                        />
                                      </Button>
                                      <Button
                                        className="cursor-pointer font-normal sm:h-[16px] md:h-[21px] ml-[10px] sm:ml-[4px] md:ml-[5px] not-italic text-[16px] text-center text-gray_500 sm:w-[15px] md:w-[20px] w-[36px]"
                                        shape="icbRoundedBorder8"
                                        size="mdIcn"
                                        variant="icbOutlineIndigo600"
                                        onClick={() =>
                                          handleOpenViewBookingRemoveModal(
                                            apiDataResponseEle?.id
                                          )
                                        }
                                      >
                                        <Img
                                          src="/images/img_trash_1.svg"
                                          className="flex items-center justify-center lg:h-[13px] xl:h-[17px] 2xl:h-[19px] 3xl:h-[22px]"
                                          alt="trash"
                                        />
                                      </Button>
                                    </Row>
                                  ) : (
                                    <div className="flex flex-row items-center justify-enc lg:ml-[54px] xl:ml-[68px] 2xl:ml-[76px] 3xl:ml-[91px] rounded-radius8 w-[10%]"></div>
                                  )}
                                </Row>
                              </Column>
                            ) : (
                              <Column className="flex flex-col  3xl:my-[10px] lg:my-[6px] xl:my-[8px] 2xl:my-[9px] w-[100%]">
                                <Row className="bg-gray-100 flex flex-row items-center justify-center w-[100%] p-[10px]  border-l border-r border-b border-gray_300 border-solid ">
                                  <Text
                                    className="font-normal text-center sm:ml-[3px] md:ml-[4px] sm:mt-[5px] md:mt-[6px] not-italic text-black_901 w-[15%] "
                                    as="h6"
                                    variant="h6"
                                  >
                                    {apiDataResponseEle?.booking_title}
                                  </Text>
                                  <Text
                                    className="font-normal text-center sm:ml-[3px] md:ml-[4px] sm:mt-[4px] md:mt-[6px] not-italic text-black_901 w-[15%]"
                                    as="h6"
                                    variant="h6"
                                  >
                                    {dayjs(
                                      apiDataResponseEle?.["created_at"]
                                    ).format("DD/MM/YYYY h:mm a")}
                                  </Text>
                                  <Text
                                    className="font-medium text-center text-indigo_600 w-[30%]"
                                    as="h6"
                                    variant="h6"
                                  >
                                    {
                                      apiDataResponseEle?.employee?.[
                                      "first_name"
                                      ]
                                    }{" "}
                                    {
                                      apiDataResponseEle?.employee?.[
                                      "middle_name"
                                      ]
                                    }{" "}
                                    {
                                      apiDataResponseEle?.employee?.[
                                      "last_name"
                                      ]
                                    }
                                  </Text>
                                  <Text
                                    className="font-medium text-center text-black_901 w-[15%]"
                                    as="h6"
                                    variant="h6"
                                  >
                                    {apiDataResponseEle?.["booking_type"]}
                                  </Text>
                                  <Text
                                    className="font-medium text-center sm:ml-[3px] md:ml-[4px] text-black_901 w-[15%]"
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

                                  <div className="flex flex-row items-center justify-enc lg:ml-[54px] xl:ml-[68px] 2xl:ml-[76px] 3xl:ml-[91px] rounded-radius8 w-[10%]"></div>
                                </Row>
                              </Column>
                            )}
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <Row className="flex flex-row items-center justify-center w-[auto] py-[50px] bg-gray-100 opacity-50">
                        <Text
                          className="font-medium mr-[14px] sm:ml-[5px] md:ml-[7px] text-black_901 w-[auto] "
                          as="h5"
                          variant="h5"
                        >
                          No bookings yet...
                        </Text>
                      </Row>
                    )}
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
                        maxMenuHeight="120px"
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
            )}
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
          space_id={location?.state?.id}
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

export default BookSpaceDailyPage;
