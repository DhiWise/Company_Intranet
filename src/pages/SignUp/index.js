import React from "react";

import { Column, Input, Row, Text } from "components";
import useForm from "hooks/useForm";
import { useNavigate } from "react-router-dom";
import { updateUser } from "service/api";
import * as yup from "yup";
import LoadingButton from "../../components/LoadingButton/button";
import "../../components/LoadingButton/button.css";
import { SUPABSE_CREDS, USER_TYPE } from "../../constant/index.js";

const GenderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Others", label: "Others" },
];

const SignUpPage = () => {
  const [showLoader, setShowLoader] = React.useState(false);
  const [apiData, setapiData] = React.useState();
  const [confirmPassword, setconfirmPassword] = React.useState();
  const navigate = useNavigate();

  const formValidationSchema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be minimum of length 8"),
  });

  const form = useForm(
    {
      password: "",
    },
    {
      validate: true,
      validateSchema: formValidationSchema,
      validationOnChange: true,
    }
  );

  async function callApi(data) {
    setShowLoader(true);
    setTimeout(() => setShowLoader(false), 1000);
    const userData = JSON.parse(
      localStorage.getItem(
        `sb-${SUPABSE_CREDS.PROJECT_REFERENCE_ID}-auth-token`
      )
    );
    data = { ...data, data: { user_type: USER_TYPE.User } };
    const req = { data: { ...data }, token: userData?.access_token };

    updateUser(req)
      .then((res) => {
        setapiData(res);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const [error, setError] = React.useState({
    password: "",
    confirmPassword: "",
  });

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };
      switch (name) {
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (confirmPassword && value !== confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (
            form?.values?.password &&
            value !== form?.values?.password
          ) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  return (
    <>
      <Column className="bg-white_A700 flex flex-col font-inter items-center justify-center sm:p-[15px]  md:p-[94px] w-[100%] h-screen">
        <Column className="flex flex-col justify-start max-w-[40%] ml-[auto] mr-[auto] sm:pl-[15px] sm:pr-[15px] w-[100%]">
          <Column className="flex flex-col justify-center items-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%]">
            <Text
              className="text-bluegray_900 text-center"
              as="h1"
              variant="h1"
            >
              Sign up
            </Text>
            <Text
              className="font-normal mt-[13px] sm:mt-[5px] md:mt-[6px] text-center not-italic text-bluegray_700 w-[100%]"
              as="h5"
              variant="h5"
            >
              Please add below details to create account
            </Text>
          </Column>
          <Column className="flex flex-col items-center justify-start sm:mt-[14px] md:mt-[18px] mt-[36px] w-[100%]">
            <Column className="flex flex-col items-center justify-start w-[100%]">
              <Row className="bg-gray_200 flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:mt-[11px] md:mt-[15px] mt-[30px] md:p-[10px] sm:p-[15px] p-[20px] rounded-radius12 w-[100%]">
                <Text
                  className="font-bold text-gray_800 w-[auto] ml-2"
                  as="h5"
                  variant="h5"
                >
                  Password
                </Text>
                <Input
                  className="font-normal not-italic text-[16px] placeholder:text-gray_400 text-gray_400 w-[100%]"
                  wrapClassName="md:ml-[20px] ml-[40px] sm:mx-[0] sm:w-[100%] w-[60%]"
                  type="password"
                  onChange={(e) => {
                    form.handleChange("password", e.target.value),
                      validateInput(e);
                  }}
                  value={form?.values?.password}
                  name="password"
                  placeholder="Enter your password"
                  onBlur={validateInput}
                ></Input>
              </Row>
              <Row className="justify-end items-center flex flex-row rounded-radius8 w-[100%] h-[14px] pr-[12px]">
                <Text
                  className="font-normal text-[11px] text-red-600 w-[max-content] mt-[6px]"
                  wrapClassName="w-2/3 "
                  as="h5"
                  variant="h5"
                >
                  {form?.errors?.["password"]}
                </Text>
                <Text
                  className="font-normal text-[11px] text-red-600 w-[max-content] mt-[6px]"
                  wrapClassName="w-2/3 "
                  as="h5"
                  variant="h5"
                >
                  {error.password && error.password}
                </Text>
              </Row>
              <Row className="bg-gray_200 flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:mt-[11px] md:mt-[15px] mt-[30px] md:p-[10px] sm:p-[15px] p-[20px] rounded-radius12 w-[100%]">
                <Text
                  className="font-bold text-gray_800 w-[auto] ml-2"
                  as="h5"
                  variant="h5"
                >
                  Confirm Password
                </Text>
                <Input
                  className="font-normal not-italic text-[16px] placeholder:text-gray_400 text-gray_400 w-[100%]"
                  wrapClassName="md:ml-[20px] ml-[40px] sm:mx-[0] sm:w-[100%] w-[60%]"
                  onChange={(e) => {
                    setconfirmPassword(e.target.value), validateInput(e);
                  }}
                  value={confirmPassword}
                  onBlur={validateInput}
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter confirm password"
                ></Input>
              </Row>
              <Row className="justify-end items-center flex flex-row rounded-radius8 w-[100%] h-[14px] pr-[12px]">
                <Text
                  className="font-normal text-[11px] text-red-600 w-[max-content] mt-[6px]"
                  wrapClassName="w-2/3 "
                  as="h5"
                  variant="h5"
                >
                  {error.confirmPassword && error.confirmPassword}
                </Text>
              </Row>
            </Column>
          </Column>
          <Row className="flex flex-row items-center justify-center w-[100%] mt-[40px]">
            <LoadingButton
              text="Confirm"
              onSubmit={() => {
                form.handleSubmit(callApi);
              }}
              loading={showLoader}
              disabled={showLoader}
            ></LoadingButton>
          </Row>
        </Column>
      </Column>
    </>
  );
};

export default SignUpPage;
