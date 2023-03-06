import { Button, Column, Img, Input, Row, Text } from "components";
import useForm from "hooks/useForm";
import React from "react";
import ModalProvider from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  patchEmployeeid,
  patchRenameDropboxFileFolder,
  patchRenameFileToGoogleDrive,
  patchRenameOneDriveFolders,
} from "service/api";
import * as yup from "yup";
import LoadingButton from "../../components/LoadingButton/button";
import "../../components/LoadingButton/button.css";
import { BACKEND_URL } from "../../constant";

const EditFolderModal = (props) => {
  const [showLoader, setShowLoader] = React.useState(false);
  const [apiData21, setapiData21] = React.useState();

  const formValidationSchema = yup.object().shape({
    name: yup.string().required("Folder Name is required"),
  });
  const form = useForm(
    {
      name: props?.data?.name,
    },
    {
      validate: true,
      validateSchema: formValidationSchema,
      validationOnChange: true,
    }
  );

  function callApi21(data) {
    const req = { params: { id: "eq.1" }, data: { ...data } };

    patchEmployeeid(req)
      .then((res) => {
        setapiData21(res);
        toast.success("Updated.");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something bad happened.");
      });
  }

  function callpatchRenameFoldersApi() {
    switch (props?.uploadedOn) {
      case 1:
        const oneDriveReq = {
          path: props?.data?.id,
          data: {
            name: form?.values?.["name"],
          },
        };
        commonApiCalling(patchRenameOneDriveFolders, oneDriveReq);
        break;

      case 2:
        const googleDriveReq = {
          path: props?.data?.id,
          data: {
            name: form?.values?.["name"],
          },
        };
        commonApiCalling(patchRenameFileToGoogleDrive, googleDriveReq);
        break;

      case 3:
        var str = props?.data?.path_lower;
        var lastIndex = str.lastIndexOf("/");
        str = str.substring(0, lastIndex);

        const dropboxData = JSON.stringify({
          method: "post",
          url: `https://api.dropboxapi.com/2/files/move_v2`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "dropboxAccessToken"
            )}`,
            "content-type": "application/json",
          },
          path: props?.data?.id,
          data: {
            from_path: props?.data?.path_lower,
            to_path: `${str}/${form?.values?.["name"]}`,
          },
        });

        const dropboxconfig = {
          method: "post",
          url: `${BACKEND_URL}data`,
          headers: {
            "Content-Type": "application/json",
          },
          data: dropboxData,
        };

        commonApiCalling(patchRenameDropboxFileFolder, dropboxconfig);
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
        toast.success("Renamed!.");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something bad happened.");
      });
  }

  return (
    <>
      <ModalProvider
        appElement={document.getElementById("root")}
        className="!w-[35%] sm:w-[100%] flex-col flex outline-none"
        overlayClassName="bg-black_900_99 fixed flex h-[100%] inset-y-[0] w-[100%] items-center justify-center"
        {...props}
      >
        <div className="max-h-[97vh] overflow-y-auto">
          <Column className="bg-white_A700 flex flex-col items-center justify-start max-w-[669px] sm:mb-[150px] md:mb-[194px] ml-[auto] mr-[auto] sm:pb-[15px] md:pb-[26px] pb-[52px] sm:pl-[15px] sm:pr-[15px] rounded-radius12 shadow-bs1 w-[100%]">
            <Column className="bg-gray_101 flex flex-col items-center justify-start sm:p-[15px] p-[18px] md:p-[9px] rounded-bl-[0] rounded-br-[0] rounded-tl-[12px] rounded-tr-[12px] w-[100%]">
              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:mx-[0] sm:px-[0] sm:w-[100%] w-[96%]">
                <Text
                  className="flex-grow font-bold text-black_900"
                  as="h5"
                  variant="h5"
                >
                  Edit Folder
                </Text>
                <Img
                  src="/images/img_arrowright_gray_900.svg"
                  className="common-pointer flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] md:w-[12px] w-[24px] sm:w-[9px]"
                  onClick={props.onRequestClose}
                  alt="arrowright"
                />
              </Row>
            </Column>
            <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center sm:mt-[17px] md:mt-[23px] mt-[45px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[68%]">
              <Text
                className="font-medium text-black_900 w-[auto]"
                as="h5"
                variant="h5"
              >
                Rename Folder
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
                text="Rename"
                onSubmit={() => {
                  form.handleSubmit(callpatchRenameFoldersApi);
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

export default EditFolderModal;
