import React from "react";

import {
  Button,
  Column,
  Datepicker,
  Img,
  Input,
  Line,
  List,
  Row,
  SelectBox,
  Stack,
  Text
} from "components";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useForm from "hooks/useForm";
import { last } from "lodash";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteUserProfile,
  getEmployeesByID,
  getEmploymentstatusselect,
  postUserProfile,
  updateEmployee
} from "service/api";
import Base from "../../../components/Base";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import {
  gender,
  SUPABSE_CREDS,
  userDropdown
} from "../../../constant/index.js";

const EmployeePagePage = () => {
  const [apiData, setapiData] = React.useState();
  const [isDisabled, setisDisabled] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const [departmentOption, setdepartmentOption] = React.useState();
  const [employeeStatusOption, setemployeeStatusOption] = React.useState();
  const [jobPosition, setjobPosition] = React.useState();
  const [jobTitle, setjobTitle] = React.useState();
  const [cityOption, setcityOption] = React.useState();
  const [stateOption, setstateOption] = React.useState();
  const [countryOption, setcountryOption] = React.useState();
  const [currencyOption, setcurrencyOption] = React.useState();
  const [ReportToOption, setReportToOption] = React.useState();
  const [file, setFile] = React.useState("");
  const location = useLocation();
  const form = useForm();

  const [userTypeOption, setuserTypeOption] = React.useState();
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    callApi();
  }, []);

  const addressForm = useForm({
    country_id: null,
    state_id: null,
  });
  function getUserType() {
    const req = { params: { select: "*" } };

    getUserType(req)
      .then((res) => {
        setuserTypeOption(dropdownOptions(res));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // GET Employee status
  function getEmployeeStatusApi() {
    const req = {};

    getEmploymentstatusselect(req)
      .then((res) => {
        setemployeeStatusOption(dropdownOptions(res));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //Form
  //Update Employees
  function updateEmployeeDetails(file) {
    const req = file
      ? { data: { ...form?.values, image: [file] } }
      : { data: { ...form?.values } };

    updateEmployee(req)
      .then((res) => {
        toast.success("Employee details updated.");
        setFile("");
        callApi();
        setisDisabled(true);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened!");
      });
  }

  function callApi() {
    const req = { params: { select: "*", id: `eq.${location?.state?.id}` } };
    setIsLoading(true);
    getEmployeesByID(req)
      .then((res) => {
        setapiData(res);
        // getStateCountry(res[0]?.city_id);
        Object.keys(res?.[0]).map((key) => {
          return form.handleChange(key, res?.[0][key]);
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened!");
      });
  }

  // To create the object of dropdown
  function dropdownOptions(data) {
    const options = data?.map(({ id, label }, index) => {
      return { value: id, label: label };
    });
    return options;
  }

  // To create default value object
  function getDefaultValue(options, value) {
    return options?.filter((item) => item?.value === value)[0];
  }

  //Upload profile picture
  const handleUpload = async () => {
    var formdata = new FormData();
    formdata.append("cacheControl", "3600");
    formdata.append("", file, "file");
    const req = {
      fileName: `${new Date().toISOString()}_${file?.name}`,
      file: formdata,
    };
    postUserProfile(req)
      .then((res) => {
        deleteOldPicture(form?.values?.image?.[0]?.["200x200"]?.split("/"));
        updateEmployeeDetails({
          "200x200": `${SUPABSE_CREDS.COMMON_URL}storage/v1/object/public/${res?.Key}`,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Delete Profile Picture
  const deleteOldPicture = async (data) => {
    var formdata = new FormData();
    formdata.append("cacheControl", "3600");
    const req = {
      fileName: last(data),
      file: formdata,
    };
    await deleteUserProfile(req)
      .then((res) => { })
      .catch((err) => {
        console.error(err);
      });
  };

  //reset Form
  const resetForm = () => {
    Object.keys(apiData?.[0]).map((key) => {
      return form.handleChange(key, apiData?.[0][key]);
    });
    setFile("");
    setisDisabled(true);
  };

  //reset file
  const resetFile = () => {
    inputRef.current.value = null;
    setFile("");
  };

  return (
    <Base title="Employee Details">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Column className="bg-white_A700 flex flex-col justify-start sm:mt-[12px] md:mt-[16px] my-[10px] sm:mx-[0] sm:p-[15px] md:p-[16px] p-[18px] rounded-radius8 sm:w-[100%] w-[97%]">
            <Column className="flex flex-col items-center justify-start sm:my-[15px] md:my-[20px] my-[10px] sm:px-[0] w-[100%]">
              <Column className="flex flex-col justify-start pt-[1px] w-[100%]">
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[auto]">
                  <Img
                    src="/images/img_objectscolumn.svg"
                    className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] md:w-[12px] w-[24px] sm:w-[9px]"
                    alt="objectscolumn"
                  />
                  <Text
                    className="flex-grow font-medium ml-[16px] sm:ml-[6px] md:ml-[8px] text-indigo_600 w-[100%]"
                    as="h4"
                    variant="h4"
                  >
                    Personal Information
                  </Text>
                  <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-end sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%] h-8">
                    {isDisabled ? (
                      <Row
                        className="items-center flex cursor-pointer justify-end w-[auto] "
                        onClick={() => setisDisabled(false)}
                      >
                        <Img
                          src="/images/img_edit_24X24.svg"
                          className="settings_One"
                          alt="edit"
                        />
                        <Text
                          className="font-medium text-indigo_600 w-[auto] mx-[10px]"
                          as="h6"
                          variant="h6"
                        >
                          Edit
                        </Text>
                      </Row>
                    ) : (
                      <Row className="items-center flex justify-around rounded-radius8 w-[40%] ">
                        <Button
                          className="common-pointer font-medium xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-center w-[40%] p-[10px]"
                          onClick={() => {
                            file
                              ? handleUpload()
                              : form.handleSubmit(updateEmployeeDetails());
                          }}
                        >
                          Update
                        </Button>
                        <Button
                          className="font-medium lg:ml-[16px] xl:ml-[20px] 2xl:ml-[22px] 3xl:ml-[27px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-center w-[40%] p-[10px]"
                          variant="OutlineIndigo600"
                          onClick={() => resetForm()}
                        >
                          Cancel
                        </Button>
                      </Row>
                    )}
                  </Row>
                </Row>
                <Line className="bg-bluegray_100 h-[1px] mt-[17px] sm:mt-[6px] md:mt-[8px] w-[100%]" />
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start sm:mt-[12px] md:mt-[16px] mt-[32px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%]">
                  <Column className="flex flex-col justify-start items-center w-[25%] pr-[18px]">
                    <Stack className="bg-bluegray_50 h-[150px] sm:mb-[16px] md:mb-[21px] mb-[42px] sm:p-[15px] md:p-[30px] p-[60px] relative rounded-radius50 w-[150px] sm:w-[59px] md:w-[77px]">
                      {file ? (
                        <Img
                          src={URL.createObjectURL(file)}
                          className="absolute h-[150px] inset-[0] rounded-radius50 justify-center m-[auto] max-w-[100%] sm:w-[11px] md:w-[15px] w-[150px]"
                          alt="location"
                        />
                      ) : form?.values?.image ? (
                        <Img
                          src={`${form?.values?.image?.[0]?.["200x200"]}`}
                          className="absolute h-[150px] inset-[0] rounded-radius50 justify-center m-[auto] max-w-[100%] sm:w-[11px] md:w-[15px] w-[150px]"
                          alt="Profile"
                        />
                      ) : (
                        <Img
                          src="/images/img_location_30X30.svg"
                          className="absolute h-[150px] inset-[0] rounded-radius50 justify-center m-[auto] max-w-[100%] sm:w-[11px] md:w-[15px] w-[150px]"
                          alt="location"
                        />
                      )}
                    </Stack>
                    {!isDisabled && (
                      <Column className="items-center lg:mt-[12px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px] w-[100%]">
                        <Text
                          className="font-medium text-black_900 w-[auto]"
                          as="h5"
                          variant="h5"
                        >
                          Upload Profile Picture
                        </Text>
                        <Column className="bg-bluegray_50 mt-[10px] items-center justify-start border-dashed border-[1px] border-indigo_600 xl:p-[10px] 2xl:p-[12px] 3xl:p-[14px] lg:p-[8px] rounded-radius6 w-[100%] p-[10px]">
                          <Img
                            src="/images/img_rewind.svg"
                            className="lg:h-[27px] xl:h-[34px] 2xl:h-[38px] 3xl:h-[46px] lg:w-[26px] xl:w-[33px] 2xl:w-[37px] 3xl:w-[45px]"
                            alt="rewind"
                          />
                          <Input
                            className="placeholder:text-gray_500 Group4000 text-ellipsis"
                            wrapClassName="d-flex"
                            variant="OutlineIndigo600"
                            type="file"
                            ref={inputRef}
                            accept="image/*"
                            id="file_input"
                            onChange={(e) => {
                              setFile(e.target.files[0]);
                            }}
                            suffix={
                              <Img
                                src="/images/img_arrowright_24X24.svg"
                                className="settings_One common-pointer"
                                alt="arrowright One"
                                onClick={() => resetFile()}
                              />
                            }
                          />
                        </Column>
                      </Column>
                    )}
                  </Column>
                  <Column className="flex flex-col items-center justify-start md:ml-[43px] sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[75%]">
                    <List
                      className="md:gap-[12px] gap-[24px] sm:gap-[9px] grid min-h-[auto] w-[100%]"
                      orientation="vertical"
                    >
                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between my-[0] w-[100%]">
                        <Row className="items-center flex justify-between rounded-radius8 w-[100%]">
                          <Text
                            className="font-medium text-black_901 w-[auto]"
                            as="h6"
                            variant="h6"
                          >
                            Name
                          </Text>
                          <Input
                            className="placeholder:text-gray_500 FirstName p-[10px]"
                            wrapClassName="w-[25%]"
                            type="text"
                            onChange={(e) => {
                              form.handleChange("first_name", e.target.value);
                            }}
                            errors={form?.errors?.["first_name"]}
                            value={form?.values?.["first_name"]}
                            name="FirstName"
                            placeholder="First Name"
                            shape="RoundedBorder8"
                            variant="FillBluegray50"
                            disabled={isDisabled}
                          ></Input>
                          <Input
                            className="placeholder:text-gray_500 FirstName p-[10px]"
                            wrapClassName="w-[25%]"
                            type="text"
                            onChange={(e) => {
                              form.handleChange("middle_name", e.target.value);
                            }}
                            errors={form?.errors?.["middle_name"]}
                            value={form?.values?.["middle_name"]}
                            name="MiddleName"
                            placeholder="Middle Name"
                            shape="RoundedBorder8"
                            variant="FillBluegray50"
                            disabled={isDisabled}
                          ></Input>
                          <Input
                            className="placeholder:text-gray_500 FirstName p-[10px]"
                            wrapClassName="w-[25%]"
                            type="text"
                            onChange={(e) => {
                              form.handleChange("last_name", e.target.value);
                            }}
                            errors={form?.errors?.["last_name"]}
                            value={form?.values?.["last_name"]}
                            name="LastName"
                            placeholder="Last Name"
                            shape="RoundedBorder8"
                            variant="FillBluegray50"
                            disabled={isDisabled}
                          ></Input>
                        </Row>
                      </Row>
                      <Line className="self-center w-[40%] items-center lg:mt-[12px] lg:mr-[337px] xl:mt-[16px] xl:mr-[421px] 2xl:mt-[18px] 2xl:mr-[474px] 3xl:mt-[21px] 3xl:mr-[569px] rounded-radius8" />
                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between w-[100%]">
                        <Row className="items-center flex flex-row justify-between rounded-radius8 w-[40%]">
                          <Text
                            className="font-medium text-black_900 w-[auto]"
                            as="h6"
                            variant="h6"
                          >
                            Phone
                          </Text>
                          <Input
                            className="placeholder:text-gray_500 FirstName p-[10px]"
                            wrapClassName="w-[73%]"
                            type="number"
                            name="Group3995"
                            onChange={(e) => {
                              form.handleChange("phone_number", e.target.value);
                            }}
                            errors={form?.errors?.["phone_number"]}
                            value={form?.values?.["phone_number"]}
                            placeholder="Phone no."
                            shape="RoundedBorder8"
                            variant="FillBluegray50"
                            disabled={isDisabled}
                          ></Input>
                        </Row>
                        <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[45%]">
                          <Text
                            className="font-medium text-black_901 w-[auto]"
                            as="h6"
                            variant="h6"
                          >
                            Date of Birth
                          </Text>
                          <Datepicker
                            className="w-[65%] rounded-radius8 bg-bluegray_50 p-[10px] sm:p-[5px] md:p-[7px]"
                            name="birth_date"
                            onChange={(e) => {
                              form.handleChange("birth_date", e);
                            }}
                            selected={new Date(form?.values?.birth_date)}
                            value={new Date(form?.values?.birth_date)}
                            placeholder="--Select date--"
                            disabled={isDisabled}
                          ></Datepicker>
                        </Row>
                      </Row>
                      <Line className="self-center w-[40%] items-center lg:mt-[12px] lg:mr-[337px] xl:mt-[16px] xl:mr-[421px] 2xl:mt-[18px] 2xl:mr-[474px] 3xl:mt-[21px] 3xl:mr-[569px] rounded-radius8" />
                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between w-[100%]">
                        <Row className="items-center flex justify-between rounded-radius8 w-[40%]">
                          <Text
                            className="font-medium text-black_900 w-[auto]"
                            as="h6"
                            variant="h6"
                          >
                            Gender
                          </Text>
                          <SelectBox
                            className="font-normal not-italic  w-[73%] rounded-radius8 bg-bluegray_50"
                            name="Gender"
                            options={gender}
                            placeholder="Select Gender"
                            isSearchable={true}
                            isMulti={false}
                            isDisabled={isDisabled}
                            onChange={(e) => {
                              form.handleChange("gender", e);
                            }}
                            value={getDefaultValue(
                              gender,
                              form?.values?.gender
                            )}
                          ></SelectBox>
                        </Row>
                        <Row className="items-center flex justify-between rounded-radius8 w-[45%]">
                          <Text
                            className="font-medium text-black_900 w-[auto]"
                            as="h6"
                            variant="h6"
                          >
                            Location
                          </Text>
                          <Input
                            className="placeholder:text-gray_500 FirstName p-[10px]"
                            wrapClassName="w-[65%]"
                            onChange={(e) => {
                              form.handleChange("location", e.target.value);
                            }}
                            value={form?.values?.location}
                            name="Group4000"
                            placeholder="Enter the location"
                            shape="RoundedBorder8"
                            variant="FillBluegray50"
                            disabled={isDisabled}
                          ></Input>
                        </Row>
                      </Row>
                      <Line className="self-center w-[40%] items-center lg:mt-[12px] lg:mr-[337px] xl:mt-[16px] xl:mr-[421px] 2xl:mt-[18px] 2xl:mr-[474px] 3xl:mt-[21px] 3xl:mr-[569px] rounded-radius8" />
                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between w-[100%]">
                        <Row className="items-center flex justify-between 3xl:my-[10px] lg:my-[6px] xl:my-[8px] 2xl:my-[9px] rounded-radius8 w-[40%]">
                          <Text
                            className="font-medium text-black_900 w-[auto]"
                            as="h6"
                            variant="h6"
                          >
                            Work Email
                          </Text>
                          <Input
                            className="placeholder:text-gray_500 FirstName p-[10px] text-ellipsis"
                            wrapClassName="w-[73%]"
                            disabled={isDisabled}
                            onChange={(e) => {
                              form.handleChange("work_email", e.target.value);
                            }}
                            errors={form?.errors?.work_email}
                            value={form?.values?.work_email}
                            name="emailId"
                            placeholder="Work Email Id"
                            shape="RoundedBorder8"
                            variant="FillBluegray50"
                          ></Input>
                        </Row>
                        <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[45%]">
                          <Text
                            className="font-medium text-black_901 w-[auto]"
                            as="h6"
                            variant="h6"
                          >
                            Personal Email
                          </Text>
                          <Input
                            className="placeholder:text-gray_500 FirstName p-[10px]"
                            wrapClassName="w-[65%]"
                            disabled={isDisabled}
                            onChange={(e) => {
                              form.handleChange(
                                "personal_email",
                                e.target.value
                              );
                            }}
                            errors={form?.errors?.personal_email}
                            value={form?.values?.personal_email}
                            name="emailId"
                            placeholder="Personal Email Id"
                            shape="RoundedBorder8"
                            variant="FillBluegray50"
                          ></Input>
                        </Row>
                      </Row>
                      <Line className="self-center w-[40%] items-center lg:mt-[12px] lg:mr-[337px] xl:mt-[16px] xl:mr-[421px] 2xl:mt-[18px] 2xl:mr-[474px] 3xl:mt-[21px] 3xl:mr-[569px] rounded-radius8" />
                      <Row className="items-center flex justify-between 3xl:my-[10px] lg:my-[6px] xl:my-[8px] 2xl:my-[9px] rounded-radius8 w-[40%]">
                        <Text
                          className="font-medium text-black_900 w-[auto]"
                          as="h6"
                          variant="h6"
                        >
                          User Type
                        </Text>
                        <Select
                          className="font-normal not-italic w-[73%]"
                          onChange={(e) => {
                            form.handleChange("user_type", e?.value);
                          }}
                          value={getDefaultValue(
                            userDropdown,
                            form?.values?.user_type
                          )}
                          options={userDropdown}
                          name="user_type"
                          placeholder="User Type"
                          isSearchable={true}
                          isMulti={false}
                          isDisabled={isDisabled}
                        ></Select>
                      </Row>
                    </List>
                  </Column>
                </Row>
              </Column>
              <List
                className="sm:gap-[27px] md:gap-[36px] gap-[70px] grid min-h-[auto] sm:mt-[27px] md:mt-[36px] mt-[70px] w-[100%]"
                orientation="vertical"
              >
                <Column className="flex flex-col justify-start w-[100%]">
                  <Column className="flex flex-col justify-start pt-[1px] w-[100%]">
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[14%]">
                      <Img
                        src="/images/img_objectscolumn.svg"
                        className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] md:w-[12px] w-[24px] sm:w-[9px]"
                        alt="objectscolumn One"
                      />
                      <Text
                        className="flex-grow font-medium ml-[16px] sm:ml-[6px] md:ml-[8px] text-indigo_600"
                        as="h4"
                        variant="h4"
                      >
                        Job Details
                      </Text>
                    </Row>
                    <Line className="bg-bluegray_100 h-[1px] mt-[17px] sm:mt-[6px] md:mt-[8px] w-[100%]" />
                  </Column>
                  <Column className="flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px] mt-[32px] sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[100%]">
                    <Column className="flex flex-col items-center justify-start w-[100%] gap-6">
                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between w-[100%]">
                        <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[40%]">
                          <Text
                            className="font-medium text-black_901 w-[auto]"
                            as="h6"
                            variant="h6"
                          >
                            Job Title
                          </Text>
                          <Input
                            className="placeholder:text-gray_500 FirstName w-[100%] bg-transparent border-0 p-[10px]"
                            wrapClassName="sm:mx-[0] sm:w-[100%] w-[73%]"
                            name="Group3997"
                            placeholder="Job Title"
                            shape="RoundedBorder8"
                            variant="FillBluegray50"
                            disabled={isDisabled}
                            onChange={(e) => {
                              form.handleChange("job_title", e.target.value);
                            }}
                            errors={form?.errors?.job_title}
                            value={form?.values?.job_title}
                          ></Input>
                        </Row>
                        <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[45%]">
                          <Text
                            className="font-medium text-black_901 w-[auto]"
                            as="h6"
                            variant="h6"
                          >
                            Secondary Job Title
                          </Text>
                          <Input
                            className="placeholder:text-gray_500 FirstName w-[100%] bg-transparent border-0 p-[10px]"
                            wrapClassName="sm:mx-[0] sm:w-[100%] w-[65%]"
                            name="Group3997 One"
                            placeholder="Secondary Job Title"
                            shape="RoundedBorder8"
                            variant="FillBluegray50"
                            disabled={isDisabled}
                            onChange={(e) => {
                              form.handleChange(
                                "secondary_job_title",
                                e.target.value
                              );
                            }}
                            errors={form?.errors?.secondary_job_title}
                            value={form?.values?.secondary_job_title}
                          ></Input>
                        </Row>
                      </Row>
                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between md:mt-[12px] sm:mt-[9px] w-[100%]">
                        <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[40%]">
                          <Text
                            className="font-medium text-black_901 w-[auto]"
                            as="h6"
                            variant="h6"
                          >
                            Position
                          </Text>
                          <Input
                            className="placeholder:text-gray_500 FirstName w-[100%] bg-transparent border-0 p-[10px]"
                            wrapClassName="sm:mx-[0] sm:w-[100%] w-[73%]"
                            name="Group3997 Three"
                            placeholder="Junior"
                            shape="RoundedBorder8"
                            variant="FillBluegray50"
                          ></Input>
                        </Row>
                        <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[45%]">
                          <Text
                            className="font-medium text-black_901 w-[auto]"
                            as="h6"
                            variant="h6"
                          >
                            Joining Date
                          </Text>
                          <Datepicker
                            className="w-[65%] rounded-radius8 bg-bluegray_50 p-[10px] sm:p-[5px] md:p-[7px]"
                            name="joining_date"
                            onChange={(e) => {
                              form.handleChange("joining_date", e);
                            }}
                            selected={new Date(form?.values?.joining_date)}
                            value={new Date(form?.values?.joining_date)}
                            placeholder="--Select date--"
                            disabled={isDisabled}
                          ></Datepicker>
                        </Row>
                      </Row>
                    </Column>
                  </Column>
                </Column>
                <Column className="flex flex-col justify-start w-[100%]">
                  <Column className="flex flex-col justify-start pt-[1px] w-[100%]">
                    <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[8%]">
                      <Img
                        src="/images/img_objectscolumn.svg"
                        className="flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] md:w-[12px] w-[24px] sm:w-[9px]"
                        alt="objectscolumn Two"
                      />
                      <Text
                        className="flex-grow font-medium ml-[16px] sm:ml-[6px] md:ml-[8px] mt-[3px] text-indigo_600"
                        as="h4"
                        variant="h4"
                      >
                        Address
                      </Text>
                    </Row>
                    <Line className="bg-bluegray_100 h-[1px] mt-[17px] sm:mt-[6px] md:mt-[8px] w-[100%]" />
                  </Column>
                  <Column className="flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px] mt-[32px] sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[100%]">
                    <Column className="flex flex-col items-end justify-start w-[100%]">
                      <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between w-[100%]">
                        <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[40%]">
                          <Text
                            className="font-medium text-black_901 w-[auto]"
                            as="h6"
                            variant="h6"
                          >
                            Address
                          </Text>
                          <Input
                            className="placeholder:text-gray_500 FirstName w-[100%] bg-transparent border-0 p-[10px]"
                            wrapClassName="sm:mx-[0] sm:w-[100%] w-[73%]"
                            name="Group3997 One"
                            placeholder="Address"
                            shape="RoundedBorder8"
                            variant="FillBluegray50"
                            disabled={isDisabled}
                            onChange={(e) => {
                              form.handleChange("address", e.target.value);
                            }}
                            errors={form?.errors?.address}
                            value={form?.values?.address}
                          ></Input>
                        </Row>
                      </Row>
                    </Column>
                  </Column>
                </Column>
              </List>
            </Column>
          </Column>

          <ToastContainer />
        </>
      )}
    </Base>
  );
};

export default EmployeePagePage;
