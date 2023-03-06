import React, { useRef } from "react";
import ModalProvider from "react-modal";
import LoadingButton from "../../components/LoadingButton/button";
import "../../components/LoadingButton/button.css";

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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteSpaceresourcespaceideq24,
  getResourceselect,
  getSpaceByID,
  getSpaceresourceselectresourceidspaceideq15,
  patchSpaceideq15,
  postImagesjpeg,
  postSpaceresource
} from "service/api";
import * as yup from "yup";
import { SUPABSE_CREDS } from "../../constant";

const EditSpaceModal = (props) => {
  const inputRef = useRef(null);
  const resRef = useRef(null);
  const [apiData, setapiData] = React.useState();
  const [apiDataDelete, setapiDataDelete] = React.useState();
  const [apiDataEdit, setapiDataEdit] = React.useState();
  const [apiRes, setapiRes] = React.useState();
  const [resourceOption, setresourceOption] = React.useState();
  const [file, setFile] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [options, setOptions] = React.useState();
  const [apiData4, setSpaceData] = React.useState();
  const [uploadKey, setUploadKey] = React.useState();
  const [showLoader, setShowLoader] = React.useState(false);

  React.useEffect(() => {
    getSpacebyID();
    getResourceApi();
    callResourecApi();
  }, []);

  async function handleUpload(data) {
    setShowLoader(true);
    setTimeout(() => setShowLoader(false), 1500);
    if (file) {
      const fileNameNoSpaces = file.name.replace(/ /g, "_");
      const fileName = `${new Date().toISOString()}_${fileNameNoSpaces}`;
      const req = { fileName: fileName, file: file };
      postImagesjpeg(req)
        .then((res) => {
          callApiEdit(data, res.Key);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      callApiEdit(data);
    }
  }

  function callApiEdit(data, url) {

    let req;
    if (url) {
      req = { data: { ...data, image_url: url } };
    } else {
      req = { data: { ...data } };
    }
    patchSpaceideq15(req)
      .then((res) => {
        setapiDataEdit(res);
        callApiDelete();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error updating... Please retry!");
      });
  }
  function callApiDelete() {
    if (options) {
      const req = { params: { space_id: `eq.${props.id}` } };

      deleteSpaceresourcespaceideq24(req)
        .then((res) => {
          setapiDataDelete(res);
          //toast.success("Updated Successfully!");
          callInsertUpdatedResource();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      props.onRequestClose();
    }
  }
  const resetFile = () => {
    inputRef.current.value = null;
    setFile("");
  };

  function callInsertUpdatedResource() {
    let req;
    if (options) {
      req = {
        data: options?.map((index) => {
          return { space_id: props.id, resource_id: index };
        }),
      };
    } else {
      req = "abc";
    }
    postSpaceresource(req)
      .then((res) => {
        setSpaceData(res);
        props.onRequestClose();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getSpacebyID() {
    const req = { params: { select: "*", id: `eq.${props.id}` } };
    getSpaceByID(req)
      .then((res) => {
        setapiData(res);
        Object.keys(res?.[0]).map((key) => {
          return form.handleChange(key, res?.[0][key]);
        });
      })

      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened!");
      });
  }
  function dropdownOptionss(data) {
    const options = data?.map(({ resource_id, label }, index) => {
      return { value: resource_id, label: label?.resource };
    });
    return options;
  }
  function callResourecApi() {
    const req = {
      params: {
        select: "resource_id,label:resource_id(resource)",
        space_id: `eq.${props.id}`,
      },
    };
    setIsLoading(true);

    getSpaceresourceselectresourceidspaceideq15(req)
      .then((res) => {
        setapiRes(res);
        setIsLoading(false);
      })

      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened!");
      });
  }
  const formValidationSchema = yup.object().shape({
    ["space_name"]: yup
      .string()
      .required("Space_name is required")
      .min(3, " Space_name must be minimum of length 3"),
    description: yup.string().required("Description is required"),
    location: yup.string().required("Location is required"),
    capacity: yup
      .number()
      .typeError("Capacity must be a number")
      .positive("Must be more than 0")
      .integer("Must be more than 0")
      .required("Capacity is required"),

  });

  const form = useForm(
    {
      space_name: "",
      description: "",
      location: "",
      capacity: "",
      image_url: "",
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
        className="sm:w-[100%] flex-col flex item-center justify-center"
        overlayClassName="bg-black_900_99 fixed flex h-[100%] inset-y-[0] w-[100%] item-center justify-center"
        {...props}
      >
        <div className="max-h-[97vh] overflow-y-auto w-[100%]">
          <Column className="bg-white_A700 items-center justify-start lg:p-[101px] xl:p-[126px] 2xl:p-[142px] 3xl:p-[171px] rounded-radius12 shadow-bs1 w-[100%]">
            <Column className="flex bg-gray_101 items-center justify-start xl:p-[12px] 2xl:p-[13px] 3xl:p-[16px] lg:p-[9px] rounded-bl-[0] rounded-br-[0] rounded-tl-[12px] rounded-tr-[12px] w-[100%]">
              <Row className="flex items-center justify-between sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%] p-[10px]">
                <Text
                  className="flex-grow font-bold sm:mt-[1px] md:mt-[2px] text-black_900"
                  as="h5"
                  variant="h5"
                >
                  Edit Space
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
              <Row className="flex flex-row justify-end items-center rounded-radius8 w-[98%] p-[10px]">
                <Text
                  className="font-medium text-black_900 w-[max-content] pr-[40px]"
                  as="h5"
                  variant="h5"
                >
                  Space Name:
                </Text>
                <Input
                  className="placeholder:text-gray_500 FirstName "
                  wrapClassName="w-2/3 p-[2px] mr-[10px]"
                  type="text"
                  onChange={(e) => {
                    form.handleChange("space_name", e.target.value);
                  }}
                  // errors={form?.errors?.["space_name"]}
                  value={form?.values?.["space_name"]}
                  name="EmailId"
                  placeholder="Enter Name"
                  shape="RoundedBorder8"
                  size="lg"
                  variant="FillBluegray50"
                ></Input>
              </Row>
              <Row className="justify-end items-center flex flex-row rounded-radius8 w-[98%]">
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
              <Row className="flex flex-row items-start justify-end lg:mt-[12px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px] sm:mt-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[98%] p-[10px]">
                <Text
                  className="font-medium xl:mt-[11px] 2xl:mt-[12px] 3xl:mt-[15px] lg:mt-[9px] text-black_900 w-[max-content] pr-[40px]"
                  as="h5"
                  variant="h5"
                >
                  Description:
                </Text>
                <TextArea
                  className="placeholder:text-gray_500 w-2/3 p-[2px] mr-[10px]"
                  onChange={(e) => {
                    form.handleChange("description", e.target.value);
                  }}
                  value={form?.values?.description}
                  name="EmailId One"
                  placeholder="Write here.."
                ></TextArea>
              </Row>
              <Row className="justify-end items-center flex flex-row rounded-radius8 w-[98%]">
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

              <Row className="flex flex-row items-center justify-end lg:mt-[12px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px] md:mt-[12px] sm:mt-[9px] sm:mx-[0] sm:px-[0] rounded-radius8 w-[98%] p-[10px]">
                <Text
                  className="font-medium text-black_900 w-[max-content] pr-[40px]"
                  as="h5"
                  variant="h5"
                >
                  Loaction:
                </Text>
                <Input
                  className="placeholder:text-gray_500 FirstName"
                  wrapClassName="w-2/3 p-[2px] mr-[10px]"
                  onChange={(e) => {
                    form.handleChange("location", e.target.value);
                  }}
                  value={form?.values?.location}
                  name="EmailId Two"
                  placeholder="Enter Location"
                  shape="RoundedBorder8"
                  size="lg"
                  variant="FillBluegray50"
                ></Input>
              </Row>
              <Row className="justify-end items-center flex flex-row rounded-radius8 w-[98%]">
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
              <Row className="flex flex-row items-start justify-end lg:mt-[12px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px] rounded-radius6 w-[98%] p-[10px]">
                <Text
                  className="font-medium lg:mt-[10px] xl:mt-[12px] 2xl:mt-[14px] 3xl:mt-[17px] text-black_900 w-[max-content] pr-[40px]"
                  as="h5"
                  variant="h5"
                >
                  Upload Image:
                </Text>
                <Column className="bg-bluegray_50 items-center justify-start outline-dashed outline-[1px] outline-indigo_600 xl:p-[10px] 2xl:p-[12px] 3xl:p-[14px] lg:p-[8px] rounded-radius6 w-2/3 p-[2px] mr-[10px]">
                  {file ? (
                    <Img
                      src={URL.createObjectURL(file)}
                      className="lg:h-[27px] xl:h-[34px] 2xl:h-[38px] 3xl:h-[46px] lg:w-[26px] xl:w-[33px] 2xl:w-[37px] 3xl:w-[45px] rounded-radius12 object-cover h-48 w-96 p-[6px]"
                      alt="rewind"
                    />
                  ) : form?.values?.image_url ? (
                    <Img
                      src={`${SUPABSE_CREDS.COMMON_URL}storage/v1/object/public/${form?.values?.image_url}`}
                      className="lg:h-[27px] xl:h-[34px] 2xl:h-[38px] 3xl:h-[46px] lg:w-[26px] xl:w-[33px] 2xl:w-[37px] 3xl:w-[45px] rounded-radius12 object-cover h-48 w-96 p-[6px]"
                      alt="rewind"
                    />
                  ) : (
                    <Img
                      src="images/img_location_30X30.svg"
                      className="lg:h-[27px] xl:h-[34px] 2xl:h-[38px] 3xl:h-[46px] lg:w-[26px] xl:w-[33px] 2xl:w-[37px] 3xl:w-[45px] rounded-radius12 object-cover h-48 w-96 p-[6px]"
                      alt="rewind"
                    />
                  )}
                  <Row className="flex flex-row items-center justify-between 2xl:mt-[10px] 3xl:mt-[12px] lg:mt-[7px] mt-[9px] ml-[10px] mr-[10px] pb-[10px]">
                    <Input
                      className="2xl:mt-[12px] 3xl:mt-[14px] flex items-center justify-center lg:mt-[8px] text-center xl:mt-[10px]"
                      leftIcon={
                        <Img
                          src="/images/img_music.svg"
                          className="text-center lg:w-[10px] lg:h-[11px] lg:mr-[4px] xl:w-[13px] xl:h-[14px] xl:mr-[5px] 2xl:w-[15px] 2xl:h-[16px] 2xl:mr-[6px] 3xl:w-[18px] 3xl:h-[19px] 3xl:mr-[7px]"
                          alt="music"
                        />
                      }
                      placeholder="select file"
                      variant="OutlineIndigo600"
                      type="file"
                      ref={inputRef}
                      accept="image/*"
                      id="file_input"
                      onChange={(e) => setFile(e.target.files[0])}
                    >
                      <div className="bg-transparent font-normal not-italic xl:text-[10px] 3xl:text-[12px] lg:text-[7px] xl:text-[9px]">
                        Click to upload
                      </div>
                    </Input>
                    <Img
                      src="/images/img_arrowright_24X24.svg"
                      className="common-pointer settings_One"
                      alt="arrowright One"
                      onClick={() => resetFile()}
                    />
                  </Row>
                </Column>
              </Row>
              <Row className="justify-end items-center flex flex-row rounded-radius8 w-[98%]">
                <div className="w-1/3"></div>
                <Text
                  className="font-normal text-[11px] text-red-600 w-[max-content] mr-[20px]"
                  wrapClassName="w-2/3 "
                  as="h5"
                  variant="h5"
                >
                  {form?.errors?.["image_url"]}
                </Text>
              </Row>

              <Row className="flex flex-row items-center justify-end lg:mt-[12px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px] rounded-radius8 w-[98%] p-[10px]">
                <Text
                  className="font-medium text-black_900 w-[max-content] pr-[40px]"
                  as="h5"
                  variant="h5"
                >
                  Resources:
                </Text>
                {apiRes ?
                  <SelectBox
                    className="lg:ml-[12px] xl:ml-[16px] 2xl:ml-[18px] 3xl:ml-[21px] w-2/3 mr-[10px] overflow-y-auto block"
                    placeholderClassName=""
                    maxMenuHeight="140px"
                    name="EmailId"
                    placeholder="Select the resources..."
                    isSearchable={true}
                    ref={resRef}
                    isMulti={true}
                    onChange={(e) => setOptions(e)}
                    value={dropdownOptionss(apiRes)}
                    options={dropdownOptions(resourceOption)}
                  ></SelectBox>
                  : <></>}
              </Row>

              <Row className="flex flex-row items-center justify-end lg:mt-[12px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px] rounded-radius8 w-[98%] p-[10px]">
                <Text
                  className="font-medium text-black_900 w-[max-content] pr-[40px]"
                  as="h5"
                  variant="h5"
                >
                  Capacity:
                </Text>
                <Input
                  className="placeholder:text-gray_500 FirstName"
                  wrapClassName="w-2/3 p-[2px] mr-[10px]"
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
              <Row className="justify-end items-center flex flex-row rounded-radius8 w-[98%]">
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
            <Row className="flex flex-row items-center justify-center lg:mb-[15px] xl:mb-[19px] 2xl:mb-[21px] 3xl:mb-[26px] lg:mt-[26px] xl:mt-[33px] 2xl:mt-[37px] 3xl:mt-[45px] rounded-radius8 w-[98%] p-[10px] mt-3">
              <LoadingButton
                text="Edit"
                onSubmit={() => {
                  form.handleSubmit(handleUpload);
                }}
                loading={showLoader}
                disabled={showLoader}
              >
                Edit
              </LoadingButton>
              <Button
                className="font-medium lg:ml-[12px] xl:ml-[16px] 2xl:ml-[18px] 3xl:ml-[21px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-center w-1/3 ml-[10px]"
                variant="OutlineIndigo600"
                onClick={props.onRequestClose}
              >
                Cancle
              </Button>
            </Row>
          </Column>
        </div>
      </ModalProvider>
      <ToastContainer />
    </>
  );
};

export { EditSpaceModal };
