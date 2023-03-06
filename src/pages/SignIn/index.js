import React from "react";

import { Column, Input, Row, Text } from "components";
import useForm from "hooks/useForm";
import { postTokengranttypepassword } from "service/api";
import * as yup from "yup";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../components/LoadingButton/button";
import "../../components/LoadingButton/button.css";
import { login, setUserData, setUserType } from "../../reducers/authReducer";
import { getEmployeesByID } from "../../service/api";
import { encryptStorage } from "../../util/encryptStorage";
// import { LoadingSpinner } from "../../components/LoadingSpinner";

const SignInPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showLoader, setShowLoader] = React.useState(false);

  const dispatch = useDispatch();
  function handleNavigate() {
    navigate("/forgotpassword");
  }
  const [apiData, setapiData] = React.useState();
  const formValidationSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  const form = useForm(
    { email: "", password: "" },
    {
      validate: true,
      validateSchema: formValidationSchema,
      validationOnChange: true,
    }
  );

  async function callApi(data) {
    setShowLoader(true);
    setTimeout(() => setShowLoader(false), 1000);
    const req = { params: { grant_type: "password" }, data: { ...data } };

    postTokengranttypepassword(req)
      .then((res) => {
        setapiData(res);
        encryptStorage.set("access_token", res?.access_token);
        dispatch(login(res));
        dispatch(setUserType(res?.user?.user_metadata?.user_type));
        getEmployeeData(res?.user?.id);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getEmployeeData(id) {
    const req = { params: { select: "*", uuid: `eq.${id}` } };
    setIsLoading(true);
    getEmployeesByID(req)
      .then((res) => {
        dispatch(setUserType(res[0]?.user_type));
        dispatch(setUserData(res[0]));
        navigate("/");
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened!");
      });
  }

  return (
    <>
      <Column className="bg-white_A700 flex flex-col font-inter items-center justify-center mx-[auto] sm:p-[15px] md:p-[160px] min-h-screen w-[100%]">
        <Text className="text-bluegray_900 w-[auto]" as="h1" variant="h1">
          Sign In
        </Text>
        <Column className="bg-white_A700 flex flex-col w-[40%] items-center justify-center ">
          <Row className="bg-gray_200 h-14 flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between ml-[auto] mr-[auto] sm:mt-[23px] md:mt-[30px] mt-[59px] md:p-[10px] sm:p-[15px] p-[20px] sm:pl-[15px] sm:pr-[15px] rounded-radius12 w-[90%]">
            <Text
              className="font-bold text-gray_800 w-[auto] ml-8"
              as="h5"
              variant="h5"
            >
              Email
            </Text>
            <Input
              className="font-normal not-italic text-[16px] placeholder:text-gray_400 w-[100%]"
              wrapClassName=" w-[70%]"
              type="email"
              onChange={(e) => {
                form.handleChange("email", e.target.value);
              }}
              value={form?.values?.email}
              name="Enteryouremai"
              placeholder="Enter your email address"
            ></Input>
          </Row>
          <Row className="justify-end items-center flex flex-row rounded-radius8 w-[90%] h-[14px] mr-[12px]">
            <Text
              className="font-normal text-[11px] text-red-600 w-[max-content] mt-[6px]"
              wrapClassName="w-2/3 "
              as="h5"
              variant="h5"
            >
              {form?.errors?.["email"]}
            </Text>
          </Row>
          <Row className="bg-gray_200 h-14 flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between ml-[auto] mr-[auto] sm:mt-[11px] md:mt-[15px] mt-[30px] md:p-[10px] sm:p-[15px] p-[20px] sm:pl-[15px] sm:pr-[15px] rounded-radius12 w-[90%]">
            <Text
              className="font-bold text-gray_800 w-[auto] ml-8"
              as="h5"
              variant="h5"
            >
              Password
            </Text>
            <Input
              className="font-normal not-italic text-[16px] placeholder:text-gray_400 w-[100%]"
              wrapClassName=" w-[70%]"
              type="password"
              onChange={(e) => {
                form.handleChange("password", e.target.value);
              }}
              value={form?.values?.password}
              name="Enteryourpass"
              placeholder="Enter your password"
            ></Input>
          </Row>
          <Row className="justify-end items-center flex flex-row rounded-radius8 w-[90%] h-[14px] mr-[12px]">
            <Text
              className="font-normal text-[11px] text-red-600 w-[max-content] mt-[6px]"
              wrapClassName="w-2/3 "
              as="h5"
              variant="h5"
            >
              {form?.errors?.["password"]}
            </Text>
          </Row>
          <Row className="flex flex-row items-center justify-center w-[90%] mt-[40px]">
            <LoadingButton
              text="Confirm"
              onSubmit={() => {
                form.handleSubmit(callApi);
              }}
              loading={showLoader}
              disabled={showLoader}
            ></LoadingButton>
          </Row>
          <Row className="nav-link hover:underline common-pointer text-blue-800 items-center justify-center w-[40%] mt-[40px]">
            <Text
              className="underline text-center"
              as="h5"
              variant="h5"
              onClick={handleNavigate}
            >
              Forgot Password
            </Text>
          </Row>
        </Column>
      </Column>
    </>
  );
};

export default SignInPage;
