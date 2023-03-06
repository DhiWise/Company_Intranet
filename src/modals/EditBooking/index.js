import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import useForm from "hooks/useForm";
import moment from "moment";
import React, { useRef } from "react";
import ModalProvider from "react-modal";

import {
  Button, Column, Datepicker, Img,
  Input, Line, Row, SelectBox, Text
} from "components";
import {
  deleteSpacebookinginviteesbookingideq30, getEmployeeselect, getNotifications, getSpacebookinginviteesideq50selectemployeeemployeeidfirstnamemiddlenamelastname, getSpacebookingselect, getSpacebookingselectideq15, patchSpacebookingideq26, postBookingInvitees, postBookingNotification
} from "service/api";

import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import useCurrentUser from "../../hooks/useCurrentUser";

const EditBookingModal = (props) => {
  const [apiData, setapiData] = React.useState();
  const [apiDataInvitees, setapiDataInvitees] = React.useState();
  const [apiData4, setapiData4] = React.useState();
  const [arrDates, setarrDates] = React.useState([]);
  const [ViewBookapiData, setViewBookapiData] = React.useState();
  const { userData } = useCurrentUser();

  const [isLoading, setIsLoading] = React.useState(false);
  const [options, setOptions] = React.useState();
  const [optionss, setOptionss] = React.useState();

  const [apiRes, setapiRes] = React.useState();
  const [inviteesApiData, setInviteesapiData] = React.useState();

  const [resourceOption, setresourceOption] = React.useState();
  const [defaultHost, setDefaultHost] = React.useState({});
  const [excludedTimes, setExcludedTimes] = React.useState();

  const resRef = useRef(null);

  React.useEffect(() => {
    callApi();
    getResourceApi();
    callInviteesApi();
    loadAllTimeSlots();
  }, []);

  React.useEffect(() => {
    if (resourceOption?.length > 0) {
      setDefaultHost(
        resourceOption?.filter((x) => x?.value === apiRes?.[0]?.booked_for)?.[0]
      );
    }
  }, [resourceOption]);

  const formValidationSchema = yup.object().shape({
    booking_title: yup.string().required("Title is required"),
    booking_type: yup.string().required("Type is required"),
  });
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
        space_id: `eq.${props.space_id}`,
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
    if (arrSpecificDates.length === 0) { setExcludedTimes(arrExcludedTimes); }
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


  const form = useForm(
    {
      booking_title: "",
      booked_for: "",
      booking_from: "",
      booking_to: "",
      booking_type: "",
      space_name: "",
    },
    {
      validate: true,
      validateSchema: formValidationSchema,
      validationOnChange: true,
    }
  );

  function callApiEdit() {
    if (optionss) {
      const req = { params: { booking_id: `eq.${apiData?.[0]?.id}` } };

      deleteSpacebookinginviteesbookingideq30(req)
        .then((res) => {
          setapiDataInvitees(res);
          callInsertUpdatedInvitees();
        })
        .catch((err) => {
          console.error(err);
        });
    }
    function callInsertUpdatedInvitees() {

      const req = {
        data: optionss?.map((index) => {
          return { booking_id: props.id, employee_id: index?.value, space_id: `${props.space_id}`, employee_name: index?.label };
        }),
      };
      postBookingInvitees(req)
        .then((res) => {
          setapiData4(res);
          getEmployeesBasedOnBooking()
          props.onRequestClose();
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function insertBookNotification(missingPeople) {
      const req = {
        data: missingPeople?.map((index) => {
          return {
            employe_id: index?.value,
            notification_type: 1,
            booking_id: `${props.id}`
          };
        }),
      };
      postBookingNotification(req)
        .then((res) => {

        })
        .catch((err) => {
          console.error(err);
        });
    }



    function getEmployeesBasedOnBooking() {

      const req = {
        params: { booking_id: `eq.${props.id}` }
      };
      getNotifications(req)
        .then((res) => {
          var missingPeople = optionss.filter(function (objOne) {
            return !res.some(function (objTwo) {
              return objOne.value == objTwo.employe_id;
            });
          });
          insertBookNotification(missingPeople)

        })
        .catch((err) => {
          console.error(err);
        });
    }
  }



  function callInviteesApi() {
    const req = {
      params: {
        select: "*,employee:employee_id(first_name,middle_name,last_name)",
        booking_id: `eq.${props?.id}`,
      },
    };

    getSpacebookinginviteesideq50selectemployeeemployeeidfirstnamemiddlenamelastname(
      req
    )
      .then((res) => {
        setInviteesapiData(dropdownOptionsInvitees(res));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const formResource = useForm({
    booked_for: "",
  });

  function dropdownOptions(data) {
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
  function dropdownOptionsInvitees(data) {
    const options = data?.map(({ employee_id, employee }, index) => {
      return {
        value: employee_id,
        label: `${employee.first_name} ${employee.middle_name} ${employee.last_name}`,
      };
    });
    return options;
  }
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };
  function callApiToUpdate(data) {
    const req = {
      data: {
        booking_title: data.booking_title,
        booking_type: data.booking_type,
        booking_from: data.booking_from,
        booking_to: data.booking_to,
        id: data.id,
        updated_at: new Date(),
        updated_by: userData.id
      },
    };

    patchSpacebookingideq26(req)
      .then((res) => {
        setapiData(res);

        toast.success("Booking details updated!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error booking booking details!");
      });
  }
  function callApi() {
    const req = {
      params: {
        select:
          "* , space:space_id(space_name) , name:booked_for(first_name,middle_name,last_name)",
        id: `eq.${props?.id}`,
      },
    };
    setIsLoading(true);
    getSpacebookingselectideq15(req)
      .then((res) => {
        setapiData(res);
        setapiRes(res);
        setIsLoading(false);
        Object.keys(res?.[0]).map((key) => {
          return form.handleChange(key, res?.[0][key]);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getResourceApi() {
    const req = { params: { select: "id,first_name,middle_name,last_name" } };
    setIsLoading(true);
    getEmployeeselect(req)
      .then((res) => {
        setresourceOption(dropdownOptions(res));

        setIsLoading(false);
        Object.keys(res?.[0]).map((key) => {
          return formResource.handleChange(key, res?.[0][key]);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <>
      <ModalProvider
        appElement={document.getElementById("root")}
        className=" w-[40%] items-center justify-center"
        overlayClassName="bg-black_900_99 fixed flex h-[100%] inset-y-[0] w-[100%] items-center justify-center"
        {...props}
      >
        <div className="max-h-[97vh] overflow-y-auto">
          <Column className="bg-white_A700 items-center justify-start mt-[1px] lg:pb-[26px] xl:pb-[33px] 2xl:pb-[37px] 3xl:pb-[45px] rounded-radius12 shadow-bs1 w-[100%]">
            <Column className="bg-gray_101 items-center justify-end xl:p-[10px] 2xl:p-[12px] 3xl:p-[14px] lg:p-[8px] rounded-bl-[0] rounded-br-[0] rounded-tl-[12px] rounded-tr-[12px] w-[100%]">
              <Row className="flex flex-row items-center justify-between p-[14px] w-[100%]">
                <Text className="font-bold" as="h5" variant="h5">
                  Edit Booking
                </Text>
                <Img
                  src="/images/img_arrowright_24X24.svg"
                  className="arrowright1"
                  onClick={props.onRequestClose}
                  alt="arrowright"
                />
              </Row>
            </Column>
            <Column className="flex flex-col items-end justify-start lg:mt-[26px] xl:mt-[33px] 2xl:mt-[37px] 3xl:mt-[45px] w-[100%]">
              <Column className="flex flex-col justify-end w-[100%] pl-[20px] pr-[20px]">
                <Column className="items-end justify-start pl-[4px] w-[100%]">
                  <Row className="justify-end  items-center flex flex-row rounded-radius8  w-full p-[10px]">
                    <Text
                      className="font-medium text-black_900 w-[max-content] pr-[40px]"
                      as="h5"
                      variant="h5"
                    >
                      Booking Type:
                    </Text>

                    <Input
                      className="placeholder:text-gray_500 w-2/3"
                      wrapClassName="bg-bluegray_50 rounded-radius8 w-2/3 p-[2px] mr-[10px]"
                      type="text"
                      onChange={(e) => {
                        form.handleChange("booking_type", e.target.value);
                      }}
                      value={form?.values?.["booking_type"]}
                      name="Booking Type"
                      placeholder="Booking Type"
                    ></Input>
                  </Row>
                  <Row className="justify-end items-center flex flex-row rounded-radius8 w-full pr-[20px]">
                    <div className="w-[60%]"></div>
                    <Text
                      className="font-normal text-[11px] text-red-600 w-[max-content]"
                      wrapClassName="w-2/3 "
                      as="h5"
                      variant="h5"
                    >
                      {form?.errors?.["booking_type"]}
                    </Text>
                  </Row>
                  {form?.values?.booking_from && form?.values?.booking_to ? (
                    <Row className="flex fles-row items-center justify-end lg:mt-[12px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px] rounded-radius8 w-[100%] p-[10px]">
                      <Text
                        className="font-medium text-black_901 w-[auto] pr-[40px]"
                        as="h5"
                        variant="h5"
                      >
                        Date and Time:
                      </Text>
                      <Datepicker.DateTime
                        className="xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] w-1/3 rounded-radius8 bg-bluegray_50 3xl:p-[10px] p-[10px] lg:p-[6px] xl:p-[8px] 2xl:p-[9px] mr-[4px]"
                        name="booking_from"
                        onChange={(e) => {
                          form.handleChange("booking_from", e);
                        }}
                        filterTime={filterPassedTime}
                        minDate={new Date()}
                        onSelect={getExcludedTimes}
                        dateFormat="dd/MM/yyyy h:mm aa"
                        selected={new Date(form?.values?.booking_from)}
                        value={new Date(form?.values?.booking_from)}
                        placeholder="--Select date--"
                        excludeTimes={excludedTimes}
                      ></Datepicker.DateTime>
                      <Datepicker.DateTime
                        className="xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] w-1/3 rounded-radius8 bg-bluegray_50 3xl:p-[10px] p-[10px] lg:p-[6px] xl:p-[8px] 2xl:p-[9px] mr-[10px]"
                        name="booking_to"
                        onChange={(e) => {
                          form.handleChange("booking_to", e);
                        }}
                        filterTime={filterPassedTime}
                        minDate={new Date()}
                        onSelect={getExcludedTimes}
                        dateFormat="dd/MM/yyyy h:mm aa"
                        selected={new Date(form?.values?.booking_to)}
                        placeholder="--Select date--"
                        excludeTimes={excludedTimes}
                      ></Datepicker.DateTime>
                    </Row>
                  ) : null}
                  <Row className="flex flex-row items-center justify-end lg:mt-[12px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px] rounded-radius8 w-full p-[10px]">
                    <Text
                      className="font-medium text-black_900 w-[max-content] pr-[40px]"
                      as="h5"
                      variant="h5"
                    >
                      Space:
                    </Text>
                    <Input
                      className="placeholder:text-gray_500 text-gray-500"
                      wrapClassName="w-2/3 p-[2px] mr-[10px]"
                      type="text"
                      errors={form?.errors?.["space_name"]}
                      value={form?.values?.space?.space_name}
                      name="space Name"
                      placeholder="Space Name"
                      shape="RoundedBorder8"
                      variant="FillBluegray50"
                      disabled
                    ></Input>
                  </Row>
                  {defaultHost?.label ? (
                    <Row className="justify-end  items-center flex flex-row rounded-radius8  w-full p-[10px]">
                      <Text
                        className="font-medium text-black_900 w-[max-content] pr-[40px]"
                        as="h5"
                        variant="h5"
                      >
                        Host:
                      </Text>
                      <SelectBox
                        className="w-2/3 p-[10px] mr-[10px]"
                        name="EmailId"
                        placeholder="Select the Host..."
                        isSearchable={true}
                        ref={resRef}
                        //isMulti={false}
                        onChange={(e) => setOptions(e)}
                        value={defaultHost}
                        options={resourceOption}
                      ></SelectBox>
                      <Text
                        className="font-normal 3xl:ml-[10px] lg:ml-[6px] xl:ml-[8px] 2xl:ml-[9px] not-italic text-gray_500 w-[auto]"
                        as="h5"
                        variant="h5"
                      ></Text>
                    </Row>
                  ) : null}

                  <Row className="justify-end  items-center flex flex-row rounded-radius8  w-full p-[10px]">
                    <Text
                      className="font-medium text-black_900 w-[max-content] pr-[40px]"
                      as="h5"
                      variant="h5"
                    >
                      Booking Title:
                    </Text>

                    <Input
                      className="placeholder:text-gray_500"
                      wrapClassName="w-2/3 p-[2px] mr-[10px]"
                      type="text"
                      onChange={(e) => {
                        form.handleChange("booking_title", e.target.value);
                      }}
                      value={form?.values?.["booking_title"]}
                      name="Booking Title"
                      placeholder="Booking Title"
                      shape="RoundedBorder8"
                      variant="FillBluegray50"
                    ></Input>
                  </Row>
                  <Row className="justify-end items-center flex flex-row rounded-radius8 w-full pr-[20px]">
                    <div className="w-[60%]"></div>
                    <Text
                      className="font-normal text-[11px] text-red-600 w-[max-content]"
                      wrapClassName="w-2/3 "
                      as="h5"
                      variant="h5"
                    >
                      {form?.errors?.["booking_title"]}
                    </Text>
                  </Row>
                </Column>
                <Row className="justify-center items-center flex flex-row rounded-radius8  w-full p-[10px] mt-[10px]">
                  <Button
                    onClick={() => {
                      form.handleSubmit(callApiToUpdate);
                    }}
                    className="font-medium xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-center w-[30%]"
                  >
                    Update
                  </Button>
                </Row>
              </Column>
              <Line className="bg-bluegray_102 h-[1px] lg:mt-[12px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px] w-[100%]" />
              {inviteesApiData ? (
                <Column className="flex flex-col items-start justify-start lg:mt-[14px] xl:mt-[18px] 2xl:mt-[20px] 3xl:mt-[24px] rounded-radius8 w-[100%] pl-[20px] pr-[20px]">
                  <Row className="justify-end  items-start flex flex-row rounded-radius8  w-full p-[10px] mt-[10px]">
                    <Text
                      className="font-medium text-black_900 w-[max-content] pr-[40px] mt-[10px]"
                      as="h5"
                      variant="h5"
                    >
                      Edit Invite:
                    </Text>
                    <Column className="bg-bluegray_50 justify-start lg:mt-[5px] xl:mt-[7px] 2xl:mt-[8px] 3xl:mt-[9px] lg:p-[4px] 2xl:p-[6px] xl:p-[6px] 3xl:p-[8px] rounded-radius8 w-2/3 mr-[10px]">
                      <SelectBox
                        wrapClassName="w-2/3 p-[2px] mr-[10px]"
                        name="EmailId"
                        placeholder="Select the Host..."
                        isSearchable={true}
                        ref={resRef}
                        isMulti={true}
                        onChange={(e) => {
                          let records = resourceOption?.filter((a) =>
                            e?.some((b) => a.value === b)
                          );
                          setOptionss(records);
                        }

                        }
                        value={inviteesApiData}
                        options={resourceOption}
                      ></SelectBox>

                    </Column>
                  </Row>
                  <Row className="justify-center items-center flex flex-row rounded-radius8  w-full p-[10px] mt-[10px]">
                    <Button
                      className="font-medium xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-center w-[30%]"
                      onClick={() => {
                        form.handleSubmit(callApiEdit);
                      }}
                    >
                      Edit Invites
                    </Button>
                  </Row>
                </Column>
              ) : null}
            </Column>
          </Column>
        </div>
      </ModalProvider >

      <ToastContainer />
    </>
  );
};

export { EditBookingModal };
