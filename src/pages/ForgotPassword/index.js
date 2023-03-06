import React from "react";

import { Column, Input, Row, Text } from "components";
import useForm from "hooks/useForm";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import LoadingButton from "../../components/LoadingButton/button";
import "../../components/LoadingButton/button.css";
import { forgotPassword } from "../../service/api";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [apiData, setapiData] = React.useState();
  const [showLoader, setShowLoader] = React.useState(false);

  const formValidationSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
  });
  const form = useForm(
    { email: "" },
    {
      validate: true,
      validateSchema: formValidationSchema,
      validationOnChange: true,
    }
  );

  async function callApi(data) {
    setShowLoader(true);
    setTimeout(() => setShowLoader(false), 1000);
    const req = { data: { ...data } };

    forgotPassword(req)
      .then((res) => {
        setapiData(res);
        toast.success("Check your mail to reset password.");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened.");
      });
  }

  function handleNavigate() {
    navigate("/");
  }
  return (
    <>
      <Column className="bg-white_A700 flex flex-col font-inter items-center justify-center mx-[auto] sm:p-[15px] md:p-[212px] w-[100%] min-h-screen">
        <Column className="flex flex-col justify-start max-w-[500px] ml-[auto] mr-[auto] sm:pl-[15px] sm:pr-[15px] rounded-radius12 w-[100%]">
          <Column className="flex flex-col items-center justify-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%]">
            <Text className="text-bluegray_900 w-[auto]" as="h1" variant="h1">
              Forgot Password
            </Text>
            <Text
              className="font-normal mt-[13px] sm:mt-[5px] md:mt-[6px] not-italic text-bluegray_700 w-[auto]"
              as="h5"
              variant="h5"
            >
              Enter your email id to set new password
            </Text>
          </Column>
          <Row className="bg-gray_200 h-14 flex flex-row md:flex-wrap sm:flex-wrap justify-between items-center p-[20px] sm:pl-[15px] sm:pr-[15px] rounded-radius12 w-[100%] mt-[40px]">
            <Text
              className="font-bold text-gray_800 w-[auto] ml-8"
              as="h5"
              variant="h5"
            >
              Email
            </Text>
            <Input
              className="font-normal not-italic text-[16px] placeholder:text-gray_400 w-[100%]"
              wrapClassName="w-[70%]"
              type="email"
              name="Enteryouremai"
              placeholder="Enter your email address"
              onChange={(e) => {
                form.handleChange("email", e.target.value);
              }}
              value={form?.values?.email}
            ></Input>
          </Row>
          <Row className="justify-end items-center flex flex-row rounded-radius8 w-[100%] h-[14px] pr-[12px]">
            <Text
              className="font-normal text-[11px] text-red-600 w-[max-content] mt-[6px]"
              wrapClassName="w-2/3 "
              as="h5"
              variant="h5"
            >
              {form?.errors?.["email"]}
            </Text>
          </Row>
          <Row className="flex flex-row items-center justify-center w-[100%] mt-[32px]">
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
        <Row className="nav-link text-center mt-10 hover:underline text-blue-800 items-center justify-center mx-w-[13%] w-[100%] common-pointer">
          <Text
            className="underline"
            as="h5"
            variant="h5"
            onClick={handleNavigate}
          >
            Go to Login
          </Text>
        </Row>
      </Column>
      <ToastContainer />
    </>
  );
};

export default ForgotPasswordPage;
