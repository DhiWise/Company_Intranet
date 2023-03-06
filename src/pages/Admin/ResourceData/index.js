import React from "react";

import { Button, Column, Img, Input, List, Row, Text } from "components";
import useForm from "hooks/useForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteResourceideq3,
  deleteSpaceresourcespaceideq24,
  getResourceselect,
  postResource
} from "service/api";
import * as yup from "yup";
import Base from "../../../components/Base";

const ResourceData = () => {
  const [apiData, setResourceData] = React.useState();
  const [getResource, setGetResource] = React.useState();
  const [resource, setResource] = React.useState();

  const formValidationSchema = yup.object().shape({
    resource: yup.string().required("Resource is required"),
  });
  const form = useForm(
    { resource: "" },
    {
      validate: true,
      validateSchema: formValidationSchema,
      validationOnChange: true,
    }
  );
  React.useEffect(() => {
    getResources();
  }, []);

  const [toggle, setToggle] = React.useState({
    resToggle: true,
  });

  const toggleFunction = (toggleField) => {
    setToggle({ ...toggle, [toggleField]: !toggle[toggleField] });
  };

  function callApiDelete(id) {
    const req = { params: { id: `eq.${id}` } };

    deleteResourceideq3(req)
      .then((res) => {
        setResourceData(res);
        getResources();
        toast.success("Resource Deleted!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error Deleting Resource...");
      });
  }

  function insertResourceData(data) {
    const req = { data: { ...data } };

    postResource(req)
      .then((res) => {
        setResourceData(res);
        getResources();
        setResource("");
        toast.success("Added successfully!");
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function getResources() {
    const req = {};

    getResourceselect(req)
      .then((res) => {
        setGetResource(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function callApiDeleteResource(id) {
    const req = { params: { resource_id: `eq.${id}` } };
    deleteSpaceresourcespaceideq24(req)
      .then(() => {
        callApiDelete(id);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <Base title="Resource Data">
      <Column className="bg-white_A700 flex flex-col items-center justify-center sm:mt-[12px] md:mt-[16px] my-[32px] sm:mx-[0] sm:p-[15px] md:p-[25px] p-[18px] rounded-radius483 sm:w-[100%] w-[97%]">
        <Column className=" border-bluegray_102 border-solid flex flex-col items-center justify-start sm:mt-[1px] md:mt-[2px] mt-[5px] md:p-[10px] p-[18px] sm:px-[15px] sm:py-[7px] rounded-radius8 w-[100%] ">
          <Column className="flex flex-col items-center justify-start mb-[1px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[98%]">
            <Row
              className="flex flex-row items-center justify-between w-[98%]"
            >
              <Text
                className="font-medium text-bluegray_900 w-[auto]"
                as="h2"
                variant="h2"
              >
                Manage Resources
              </Text>
            </Row>
            {toggle?.resToggle ? (
              <Row className="md:gap-[12px] gap-[24px] sm:gap-[9px] grid min-h-[auto] md:mt-[12px] mt-[24px] sm:mt-[9px] w-[100%]">
                <List
                  className="md:gap-[12px] gap-[24px] sm:gap-[9px] grid min-h-[auto] md:mt-[12px] mt-[24px] sm:mt-[9px] w-[100%]"
                  orientation="vertical"
                >
                  {getResource?.map((apiData1ResponseEle, index) => {
                    return (
                      <React.Fragment key={`apiData1ResponseEle${index}`}>
                        <Input
                          value={apiData1ResponseEle?.resource}
                          className="font-normal not-italic p-[0] text-[18px] placeholder:text-bluegray_900 text-bluegray_900 w-[100%]"
                          wrapClassName="flex w-[100%]"
                          name="One"
                          placeholder="Sofa"
                          suffix={
                            <Img
                              src="/images/img_trash_1.svg"
                              className="common-pointer"
                              alt="trash"
                              onClick={() => {
                                callApiDeleteResource(apiData1ResponseEle?.id);
                              }}
                            />
                          }
                          shape="RoundedBorder4"
                          size="sm"
                          variant="FillBluegray51"
                        ></Input>
                      </React.Fragment>
                    );
                  })}
                </List>
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between w-[100%] border-2 mt-2 rounded-radius8">
                  <Input
                    className="font-normal not-italic p-[0] text-[18px] text-bluegray_900 w-[100%]"
                    wrapClassName="sm:mx-[0] sm:w-[100%] w-[87%]"
                    onChange={(e) => {
                      form.handleChange("resource", e.target.value);
                    }}
                    value={resource}
                    name="Four"
                    placeholder="Resource..."
                    shape="RoundedBorder4"
                    size="sm"
                    variant="OutlineBluegray102"
                  ></Input>
                  <Button
                    className="common-pointer cursor-pointer font-medium min-w-[12%] text-[16px] text-center text-white_A700 w-[max-content]"
                    onClick={() => {
                      form.handleSubmit(insertResourceData);
                    }}
                    size="lg"
                  >
                    Add
                  </Button>
                </Row>
                <Row className="justify-start items-center flex flex-row rounded-radius8 w-[100%] h-[14px]">
                  <Text
                    className="font-normal text-[11px] text-red-600 w-[auto]"
                    wrapClassName="w-2/3 "
                    as="h5"
                    variant="h5"
                  >
                    {form?.errors?.["resource"]}
                  </Text>
                </Row>
              </Row>
            ) : null}
          </Column>
        </Column>
      </Column>

      <ToastContainer />
    </Base>
  );
};

export default ResourceData;
