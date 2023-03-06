import {
  Button,
  Column,
  Img,
  Input,
  Row,
  SelectBox,
  Text,
  TextArea
} from "components";
import useForm from "hooks/useForm";
import React, { useRef } from "react";
import ModalProvider from "react-modal";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getResourceselect,
  postImagesjpeg,
  postSpace,
  postSpaceresource
} from "service/api";
import * as yup from "yup";
import LoadingButton from "../../components/LoadingButton/button";
import "../../components/LoadingButton/button.css";

const AddSpaceModal = (props) => {
  const inputRef = useRef(null);
  const resRef = useRef(null);
  const [apiData, setSpaceData] = React.useState();
  const [resourceOption, setresourceOption] = React.useState();
  const [resourceArray, setresourceArray] = React.useState();
  const [file, setFile] = React.useState();
  const [options, setOptions] = React.useState();
  const [spaceResource, setSpaceResources] = React.useState();
  const [showLoader, setShowLoader] = React.useState(false);

  const formValidationSchema = yup.object().shape({
    ["space_name"]: yup
      .string()
      .required("Space Name is required.")
      .min(3, " Space Name must be minimum of length 3"),
    description: yup.string().required("Description is required"),
    location: yup.string().required("Location is required"),
    capacity: yup
      .number()
      .typeError("Capacity must be a number")
      .positive("Must be more than 0")
      .integer("Must be more than 0")
      .required("Capacity is required"),
    file: yup.mixed().required("File is required "),
  });


  const form = useForm(
    {
      space_name: "",
      description: "",
      location: "",
      capacity: "",
      file: undefined,
    },
    {
      validate: true,
      validateSchema: formValidationSchema,
      validationOnChange: true,
    }
  );
  const formResource = useForm({
    resource_id: "",
  });

  React.useEffect(() => {
    getResourceApi();
  }, []);

  async function handleUpload() {
    setShowLoader(true);
    setTimeout(() => setShowLoader(false), 1000);
    const fileNameNoSpaces = file.name.replace(/ /g, "_");

    const fileName = `${new Date().toISOString()}_${fileNameNoSpaces}`;

    const req = { fileName: fileName, file: file };
    postImagesjpeg(req)
      .then((res) => {
        var submitData = form.values;
        delete submitData.file;
        insertSpace(submitData, res.Key);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const navigate = useNavigate();

  function insertSpaceResource(data) {
    const req = {
      data: options?.map((index) => {
        return { space_id: data[0].id, resource_id: index };
      }),
    };
    postSpaceresource(req)
      .then((res) => {
        setSpaceResources(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function insertSpace(data, url) {
    const req = { data: { ...data, image_url: url } };

    postSpace(req)
      .then((res) => {
        setSpaceData(res);
        insertSpaceResource(res);
        props.onRequestClose();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error creating the space! Please retry!");
      });
  }
  const resetFile = () => {
    setFile(null);
    inputRef.current.value = null;
    resRef.current.clearValue();
  };

  const resetForm = () => {
    resetFile();
    form.resetForm();
  };

  function dropdownOptions(data) {
    const options = data?.map(({ id, resource }, index) => {
      return { value: id, label: resource };
    });
    return options;
  }

  function getResourceApi() {
    const req = {};

    getResourceselect(req)
      .then((res) => {
        setresourceOption(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <>
      <ModalProvider
        appElement={document.getElementById("root")}
        className="sm:w-[100%] flex-col flex"
        overlayClassName="bg-black_900_99 fixed flex h-[100%] inset-y-[0] w-[100%] items-center justify-center"
        {...props}
      >
        <div className=" max-h-[97vh] overflow-y-auto w-[600px]">
          <Column className="bg-white_A700 items-center justify-start lg:p-[101px] xl:p-[126px] 2xl:p-[142px] 3xl:p-[171px] md:pb-[15px] sm:pb-[15px] rounded-radius12 shadow-bs1 w-[100%]">
            <Column className="bg-gray_101 items-center justify-start sm:p-[15px] xl:p-[12px] 2xl:p-[13px] 3xl:p-[16px] lg:p-[9px] rounded-bl-[0] rounded-br-[0] rounded-tl-[12px] rounded-tr-[12px] w-[100%]">
              <Row className="flex items-center justify-between sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%] p-[10px]">
                <Text
                  className="flex-grow font-bold sm:mt-[1px] md:mt-[2px] text-black_900"
                  as="h5"
                  variant="h5"
                >
                  Create Space
                </Text>
                <Img
                  src="/images/img_arrowright_24X24.svg"
                  className="common-pointer flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] mb-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                  onClick={props.onRequestClose}
                  alt="arrowright"
                />
              </Row>
            </Column>
            <Column className="flex flex-col lg:mt-[26px] xl:mt-[33px] 2xl:mt-[37px] 3xl:mt-[45px] lg:pl-[5px] xl:pl-[7px] 2xl:pl-[8px] 3xl:pl-[9px] pl-[20px] pr-[20px]">
              <Row className="justify-end  items-center flex flex-row rounded-radius8  w-full p-[10px]">
                <Text
                  className="font-medium text-black_900 w-[max-content] pr-[40px]"
                  as="h5"
                  variant="h5"
                >
                  Space Name:
                </Text>
                <Input
                  className="placeholder:text-gray_500"
                  wrapClassName="w-2/3 p-[2px] mr-[10px]"
                  type="text"
                  onChange={(e) => {
                    form.handleChange("space_name", e.target.value);
                  }}
                  value={form?.values?.["space_name"]}
                  name="EmailId"
                  placeholder="Enter Name"
                  shape="RoundedBorder8"
                  size="lg"
                  variant="FillBluegray50"
                ></Input>
              </Row>
              <Row className="justify-end items-center flex flex-row rounded-radius8 w-full">
                <div className="w-1/3"></div>
                <Text
                  className="font-normal text-[11px] text-red-600 w-[max-content] mr-[20px]"
                  wrapClassName="w-2/3 "
                  as="h5"
                  variant="h5"
                >
                  {form?.errors?.["space_name"]}
                </Text>
              </Row>

              <Row className="flex flex-row items-start justify-end lg:mt-[12px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px] sm:mt-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] p-[10px] w-full">
                <Text
                  className="font-medium xl:mt-[11px] 2xl:mt-[12px] 3xl:mt-[15px] lg:mt-[9px] text-black_900 w-[max-content] pr-[40px]"
                  as="h5"
                  variant="h5"
                >
                  Description:
                </Text>
                <TextArea
                  className="placeholder:text-gray_500 Group4000 w-2/3 mr-[10px]"
                  onChange={(e) => {
                    form.handleChange("description", e.target.value);
                  }}
                  value={form?.values?.description}
                  name="EmailId One"
                  placeholder="Write here.."
                  size="sm"
                ></TextArea>
              </Row>
              <Row className="justify-end items-center flex flex-row rounded-radius8 w-full">
                <div className="w-1/3"></div>
                <Text
                  className="font-normal text-[11px] text-red-600 w-[max-content] mr-[20px]"
                  wrapClassName="w-2/3 "
                  as="h5"
                  variant="h5"
                >
                  {form?.errors?.["description"]}
                </Text>
              </Row>

              <Row className="flex flex-row items-center justify-end rounded-radius8 w-full p-[10px]">
                <Text
                  className="font-medium text-black_900 w-[max-content] pr-[40px]"
                  as="h5"
                  variant="h5"
                >
                  Location:
                </Text>
                <Input
                  className="placeholder:text-gray_500 FirstName w-2/3"
                  wrapClassName="sm:mx-[0] sm:w-[100%] w-2/3 mr-[10px]"
                  onChange={(e) => {
                    form.handleChange("location", e.target.value);
                  }}
                  // errors={form?.errors?.location}
                  value={form?.values?.location}
                  name="EmailId Two"
                  placeholder="Enter Location"
                  shape="RoundedBorder8"
                  size="lg"
                  variant="FillBluegray50"
                ></Input>
              </Row>
              <Row className="justify-end items-center flex flex-row rounded-radius8 w-full">
                <div className="w-1/3"></div>
                <Text
                  className="font-normal text-[11px] text-red-600 w-[max-content] mr-[20px]"
                  wrapClassName="w-2/3 "
                  as="h5"
                  variant="h5"
                >
                  {form?.errors?.["location"]}
                </Text>
              </Row>

              <Row className="flex flex-row items-start justify-end lg:mt-[12px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px]md:mt-[12px] sm:mt-[9px] sm:px-[0]rounded-radius6 w-full p-[10px] ">
                <Text
                  className="font-medium lg:mt-[10px] xl:mt-[12px] 2xl:mt-[14px] 3xl:mt-[17px] sm:mt-[7px] md:mt-[9px] text-black_900 w-[max-content] pr-[40px]"
                  as="h5"
                  variant="h5"
                >
                  Upload Image:
                </Text>
                <Column className="bg-bluegray_50 items-center justify-start outline-dashed outline-[1px] outline-indigo_600 xl:p-[10px] 2xl:p-[12px] 3xl:p-[14px] lg:p-[8px] rounded-radius6 w-2/3 mr-[10px]">
                  {file ? (
                    <Img
                      src={URL.createObjectURL(file)}
                      className="lg:h-[27px] xl:h-[34px] 2xl:h-[38px] 3xl:h-[46px] lg:w-[26px] xl:w-[33px] 2xl:w-[37px] 3xl:w-[45px] rounded-radius12 object-cover h-48 w-96 p-[6px]"
                      alt="rewind"
                    />
                  ) : (
                    <Img
                      src="/images/img_rewind.svg"
                      className="sm:h-[20px] md:h-[26px] h-[50px] max-w-[100%] sm:w-[19px] md:w-[25px] w-[50px] p-[10px]"
                      alt="rewind"
                    />
                  )}
                  <Row className="flex flex-row items-center justify-between 2xl:mt-[10px] 3xl:mt-[12px] lg:mt-[7px] xl:mt-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] pb-[10px]">
                    <Input
                      className="text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ml-[10px]"
                      variant="OutlineIndigo600"
                      type="file"
                      ref={inputRef}
                      accept="image/*"
                      id="file_input"
                      onChange={(e) => {
                        form.handleChange("file", e.target.files[0]) != null &&
                          setFile(e.target.files[0]);
                      }}
                    >
                      <div className="bg-transparent font-normal not-italic xl:text-[10px] 3xl:text-[12px] lg:text-[7px] xl:text-[9px]">
                        Click to upload
                      </div>
                    </Input>
                    <Img
                      src="/images/img_arrowright_24X24.svg"
                      className="mr-[10px]"
                      alt="arrowright One"
                      onClick={() => resetFile()}
                    />
                  </Row>
                </Column>
              </Row>
              <Row className="justify-end items-center flex flex-row rounded-radius8 w-full">
                <div className="w-1/3"></div>
                <Text
                  className="font-normal text-[11px] text-red-600 w-[max-content] mr-[20px]"
                  wrapClassName="w-2/3 "
                  as="h5"
                  variant="h5"
                >
                  {form?.errors?.["file"]}
                </Text>
              </Row>

              <Row className="flex flex-row items-center justify-end lg:mt-[12px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px] rounded-radius8 sm:mx-[0] sm:px-[0] sm:w-[100%] w-full p-[10px]">
                <Text
                  className="font-medium text-black_900 w-[max-content] pr-[40px]"
                  as="h5"
                  variant="h5"
                >
                  Resources:
                </Text>
                <SelectBox
                  className="lg:ml-[12px] xl:ml-[16px] 2xl:ml-[18px] 3xl:ml-[21px] sm:mx-[0] sm:w-[100%] w-2/3 mr-[10px] overflow-y-auto"
                  placeholderClassName=""
                  maxMenuHeight="140px"
                  name="EmailId"
                  placeholder="Select the resources..."
                  isSearchable={true}
                  ref={resRef}
                  isMulti={true}
                  onChange={(e) => setOptions(e)}
                  value={formResource?.values?.["resource_id"]}
                  options={dropdownOptions(resourceOption)}
                ></SelectBox>
              </Row>

              <Row className="flex flex-row items-center justify-end rounded-radius8 w-full p-[10px] ">
                <Text
                  className="font-medium text-black_900 w-[max-content] pr-[40px]"
                  as="h5"
                  variant="h5"
                >
                  Capacity:
                </Text>
                <Input
                  className="placeholder:text-gray_500 FirstName"
                  wrapClassName="sm:mx-[0] sm:w-[100%] w-2/3 mr-[10px]"
                  onChange={(e) => {
                    form.handleChange("capacity", e.target.value);
                  }}
                  value={form?.values?.capacity}
                  name="EmailId Three"
                  placeholder="Capacity to accomodate"
                  shape="RoundedBorder8"
                  size="2xl"
                  variant="FillBluegray50"
                ></Input>
              </Row>
              <Row className="justify-end items-center flex flex-row rounded-radius8 w-full">
                <div className="w-1/3"></div>
                <Text
                  className="font-normal text-[11px] text-red-600 w-[max-content] mr-[20px]"
                  wrapClassName="w-2/3 "
                  as="h5"
                  variant="h5"
                >
                  {form?.errors?.["capacity"]}
                </Text>
              </Row>
            </Column>
            <Row className="flex flex-row items-center justify-around sm:mt-[19px] md:mt-[25px] lg:mb-[15px] xl:mb-[19px] 2xl:mb-[21px] 3xl:mb-[26px] lg:mt-[26px] xl:mt-[33px] 2xl:mt-[37px] 3xl:mt-[45px] sm:mx-[0] sm:px-[0] rounded-radius8 w-full p-[10px] mt-3">
              <LoadingButton
                text="Create"
                onSubmit={() => {
                  form.handleSubmit(handleUpload);
                }}
                loading={showLoader}
                disabled={showLoader}
              >
                Create
              </LoadingButton>

              <Button
                className="cursor-pointer font-medium md:ml-[12px] sm:ml-[9px] text-[16px] text-center text-indigo_600 w-1/3"
                variant="OutlineIndigo600"
                onClick={resetForm}
              >
                Reset
              </Button>
            </Row>
          </Column>
        </div>
      </ModalProvider>
      <ToastContainer />
    </>
  );
};

export { AddSpaceModal };
