import React from "react";

import { Button, Column, Input, Row, Text } from "components";
import useForm from "hooks/useForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postInvite } from "service/api";
import * as yup from "yup";
import Base from "../../../components/Base";

const InvitationPage = () => {
  const [apiData8, setapiData8] = React.useState();
  const formValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter valid email"),
  });
  const form = useForm(
    { email: "" },
    {
      validate: true,
      validateSchema: formValidationSchema,
      validationOnChange: true,
    }
  );

  function callApi8(data) {
    const req = { data: { ...data } };

    postInvite(req)
      .then((res) => {
        setapiData8(res);

        toast.success("User Invited Successfully.");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Somethig bad happened!");
      });
  }

  const [inputvalue, setInputvalue] = React.useState("");

  return (
    <Base title="Invitation">
      <Column className="bg-white_A700 flex flex-col items-center justify-center sm:mt-[12px] md:mt-[16px] my-[32px] sm:mx-[0] p-[130px] sm:p-[15px] md:p-[67px] rounded-radius483 sm:w-[100%] w-[97%]">
        <Column className="flex flex-col items-center justify-start my-[10px] sm:my-[3px] md:my-[5px] sm:px-[0] rounded-radius12 w-[100%]">
          <Row className="flex flex-row w-[100%] justify-start items-center">
            <Text
              className="font-medium text-bluegray_900 w-[auto]"
              as="h2"
              variant="h2"
            >
              Enter email to send invitation
            </Text>
          </Row>
          <Row className="flex flex-row items-center justify-between md:mt-[12px] mt-[20px] sm:mt-[9px] w-[100%]">
            <Input
              className="font-normal not-italic p-[12px] text-[16px] placeholder:text-gray_400 w-[100%]"
              wrapClassName="w-[60%]"
              type="email"
              onChange={(e) => {
                form.handleChange("email", e.target.value);
              }}
              value={form?.values?.email}
              name="GroupThree"
              placeholder="Enter email address"
              shape="RoundedBorder8"
              variant="FillGray200"
            ></Input>

            <Button
              className="common-pointer cursor-pointer font-normal md:mt-[12px] sm:mt-[9px] not-italic text-[18px] text-center text-white_A700 uppercase w-[20%]"
              onClick={() => {
                form.handleSubmit(callApi8);
              }}
              shape="RoundedBorder12"
            >
              INVITE
            </Button>
          </Row>
          <Row className="justify-start items-center flex flex-row rounded-radius8 w-full h-[15px]">
            <Text
              className="font-normal text-[11px] text-red-600 w-[max-content] p-[10px]"
              wrapClassName="w-2/3 "
              as="h5"
              variant="h5"
            >
              {form?.errors?.["email"]}
            </Text>
          </Row>
        </Column>
      </Column>

      <ToastContainer />
    </Base>
  );
};

export default InvitationPage;
