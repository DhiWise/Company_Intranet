import React from "react";
import ModalProvider from "react-modal";

import { Button, Column, Img, Input, Row, Text } from "components";
import useForm from "hooks/useForm";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingButton from "../../components/LoadingButton/button";
import "../../components/LoadingButton/button.css";
import { BACKEND_URL } from "../../constant";

import {
  postCreateDropboxFolder,
  postCreateGoogleDriveFolder,
  postCreateOneDriveFolder,
  postFolders,
} from "service/api";
import * as yup from "yup";

const CreateNewFolderModal = (props) => {
  const [apiData20, setapiData20] = React.useState();
  const [showLoader, setShowLoader] = React.useState(false);

  const location = useLocation();

  const formValidationSchema = yup.object().shape({
    name: yup.string().required("Folder Name is required"),
  });

  const form = useForm(
    { name: "" },
    {
      validate: true,
      validateSchema: formValidationSchema,
      validationOnChange: true,
    }
  );

  function callPostCreateFolderApi() {
    switch (props?.uploadedOn) {
      case 1:
        const oneDriveReq = {
          path: props?.location,
          data: {
            name: form?.values?.["name"],
            folder: {},
            "@microsoft.graph.conflictBehavior": "rename",
          },
        };
        commonApiCalling(postCreateOneDriveFolder, oneDriveReq);
        break;

      case 2:
        let googlDrvieReq;
        props?.location == "child"
          ? (googlDrvieReq = {
              data: {
                name: form?.values?.["name"],
                parents: [`${location?.state?.data?.id}`],
                mimeType: "application/vnd.google-apps.folder",
              },
            })
          : (googlDrvieReq = {
              data: {
                name: form?.values?.["name"],
                parents: [],
                mimeType: "application/vnd.google-apps.folder",
              },
            });
        commonApiCalling(postCreateGoogleDriveFolder, googlDrvieReq);
        break;

      case 3:
        let dropboxReq;
        props?.location == "root"
          ? (dropboxReq = {
              data: { path: `/${form?.values?.["name"]}` },
            })
          : (dropboxReq = {
              data: { path: `${props?.location}/${form?.values?.["name"]}` },
            });

        const data = JSON.stringify({
          method: "post",
          url: `https://api.dropboxapi.com/2/files/create_folder_v2`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "dropboxAccessToken"
            )}`,
            "content-type": "application/json",
          },
          data: dropboxReq?.data,
        });

        const config = {
          method: "post",
          url: `${BACKEND_URL}data`,
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };

        commonApiCalling(postCreateDropboxFolder, config);
        break;

      default:
        break;
    }
  }

  async function commonApiCalling(func, req) {
    setShowLoader(true);
    setTimeout(() => setShowLoader(false), 1000);
    func(req)
      .then((res) => {
        props.apiCall();
        props.onRequestClose();
        toast.success("Folder Created!.");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something bad happened.");
      });
  }
  function callApi20(data) {
    const req = { data: { ...data, created_by: "30" } };

    postFolders(req)
      .then((res) => {
        setapiData20(res);
        toast.success("Created.");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened.");
      });
  }

  return (
    <>
      <ModalProvider
        appElement={document.getElementById("root")}
        className="m-[auto] sm:w-[100%] flex-col flex outline-none"
        overlayClassName="bg-black_900_99 fixed flex h-[100%] inset-y-[0] w-[100%]"
        {...props}
      >
        <div className="m-[auto] w-[500px] ">
          <Column className="bg-white_A700 flex flex-col items-center justify-start max-w-[669px] sm:mb-[150px] md:mb-[194px] ml-[auto] mr-[auto] sm:pb-[15px] md:pb-[26px] pb-[52px] sm:pl-[15px] sm:pr-[15px] rounded-radius12 shadow-bs1 w-[100%]">
            <Column className="bg-gray_101 flex flex-col items-center justify-start sm:p-[15px] p-[18px] md:p-[9px] rounded-bl-[0] rounded-br-[0] rounded-tl-[12px] rounded-tr-[12px] w-[100%]">
              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:mx-[0] sm:px-[0] sm:w-[100%] w-[96%]">
                <Text
                  className="flex-grow font-bold text-black_900"
                  as="h5"
                  variant="h5"
                >
                  Create New Folder
                </Text>
                <Img
                  src="/images/img_arrowright_gray_900.svg"
                  className="common-pointer flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] md:w-[12px] w-[24px] sm:w-[9px]"
                  onClick={props.onRequestClose}
                  alt="arrowright"
                />
              </Row>
            </Column>
            <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center sm:mt-[17px] md:mt-[23px] mt-[45px] sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[100%]">
              <Text
                className="font-medium text-black_900 w-[auto]"
                as="h5"
                variant="h5"
              >
                Folder Name
              </Text>
              <Input
                className="rounded-radius8 w-[100%]"
                wrapClassName="ml-4 2xl:h-[37px] 2xl:ml-[22px] 3xl:h-[44px] 3xl:ml-[27px] flex lg:h-[26px] lg:ml-[16px] w-[auto] xl:h-[33px] xl:ml-[20px]"
                onChange={(e) => {
                  form.handleChange("name", e.target.value);
                }}
                value={form?.values?.["name"]}
                name="Rectangle489"
                placeholder="Enter folder name"
                shape="RoundedBorder8"
                variant="FillBluegray50"
              ></Input>
            </Row>
            <Row className="justify-end items-center flex flex-row rounded-radius8 w-[60%] h-[12px]">
              <Text
                className="font-normal text-[11px] text-red-600 w-[auto] mt-[8px]"
                wrapClassName="w-2/3 "
                as="h5"
                variant="h5"
              >
                {form?.errors?.["name"]}
              </Text>
            </Row>
            <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center sm:mt-[17px] md:mt-[23px] mt-[45px] sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[50%]">
              <LoadingButton
                className={`min-w-[44%] w-[44%]`}
                text="Save"
                onSubmit={() => {
                  form.handleSubmit(callPostCreateFolderApi);
                }}
                loading={showLoader}
                disabled={showLoader}
              ></LoadingButton>
              <Button
                className="common-pointer cursor-pointer font-medium min-w-[44%] sm:ml-[11px] md:ml-[15px] ml-[30px] text-[16px] text-center text-indigo_600 w-[max-content]"
                onClick={props.onRequestClose}
                variant="OutlineIndigo600"
              >
                Cancel
              </Button>
            </Row>
          </Column>
        </div>
      </ModalProvider>
      <ToastContainer />
    </>
  );
};

export default CreateNewFolderModal;
