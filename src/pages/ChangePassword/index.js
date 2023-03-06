import React from "react";

import { Column, Input, Row, Text } from "components";
import useForm from "hooks/useForm";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import LoadingButton from "../../components/LoadingButton/button";
import "../../components/LoadingButton/button.css";
import { SUPABSE_CREDS } from "../../constant";
import { updateUser } from "../../service/api";
import { supabase } from "../../util/supabase";

const GenderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Others", label: "Others" },
];
const ChangePassword = () => {
  const [apiData, setapiData] = React.useState();
  const [confirmPassword, setconfirmPassword] = React.useState();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoader, setShowLoader] = React.useState(false);
  const userData = JSON.parse(
    localStorage.getItem(`sb-${SUPABSE_CREDS.PROJECT_REFERENCE_ID}-auth-token`)
  );
  console.log(supabase);
  const formValidationSchema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required. ")
      .min(8, "Password must be minimum of length 8. "),
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
      <Column className="flex flex-col justify-center bg-white_A700 font-inter items-center mx-[auto] xl:p-[122px] 2xl:p-[138px] 3xl:p-[165px] lg:p-[98px] w-[100%] min-h-screen">
        <Column className="w-[40%]">
          <Column className="flex flex-col justify-center items-center">
            <Text className="text-black_900 w-[auto]" as="h1" variant="h1">
              Reset Password
            </Text>
            <Text
              className="text-black_900 w-[auto] mt-[20px]"
              as="h2"
              variant="h2"
            >
              Please enter new password below.
            </Text>
          </Column>
          <Column className="items-center justify-start lg:mt-[19px] xl:mt-[24px] 2xl:mt-[27px] 3xl:mt-[32px] w-[100%] mt-2">
            <Column className="flex flex-col items-center justify-center w-[100%]">
              <Row className="flex flex-row justify-between bg-gray_200 items-center lg:mt-[16px] xl:mt-[20px] 2xl:mt-[22px] 3xl:mt-[27px] lg:p-[10px] xl:p-[13px] 2xl:p-[15px] 3xl:p-[18px] rounded-radius12 w-[100%] p-[20px] mt-10">
                <Text
                  className="font-bold text-gray_800 w-[auto] ml-8"
                  as="h5"
                  variant="h5"
                >
                  Password
                </Text>
                <Input
                  className="font-normal not-italic text-[16px] placeholder:text-gray_400 w-[100%]"
                  wrapClassName=" w-[60%]"
                  onChange={(e) => {
                    form.handleChange("password", e.target.value),
                      validateInput(e);
                  }}
                  // errors={form?.errors?.password}
                  value={form?.values?.password}
                  type="password"
                  name="password"
                  placeholder="Enter new password"
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
              <Row className="flex flex-row bg-gray_200 items-center  justify-between lg:mt-[16px] xl:mt-[20px] 2xl:mt-[22px] 3xl:mt-[27px] lg:p-[10px] xl:p-[13px] 2xl:p-[15px] 3xl:p-[18px] rounded-radius12 w-[100%] p-[20px] mt-10">
                <Text
                  className="font-bold text-gray_800 w-[auto] ml-8"
                  as="h5"
                  variant="h5"
                >
                  Confirm Password
                </Text>
                <Input
                  className="font-normal not-italic text-[16px] placeholder:text-gray_400 w-[100%]"
                  wrapClassName=" w-[60%]"
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

export default ChangePassword;
