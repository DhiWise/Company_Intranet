import React from "react";
import ModalProvider from "react-modal";

import { Button, Column, Img, Row, Text } from "components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingButton from "../../components/LoadingButton/button";
import "../../components/LoadingButton/button.css";

import {
  deleteDropboxFileFolder,
  deleteFoldersideq3,
  deleteGoogleDriveFileFolder,
  deleteOneDriveFileFolder,
} from "service/api";
import { BACKEND_URL, FILE_FOLDER_CONST } from "../../constant";

const DeleteFolderModal = (props) => {
  const [showLoader, setShowLoader] = React.useState(false);
  const [modelData, setModalData] = React.useState();

  React.useEffect(() => {
    folderContainItems();
  }, []);

  const [apiData19, setapiData19] = React.useState();
  function callDeleteApi() {
    switch (props?.uploadedOn) {
      case 1:
        const oneDriveReq = { path: `items/${props?.data["id"]}` };
        commonApiCalling(deleteOneDriveFileFolder, oneDriveReq);
        break;

      case 2:
        const data = JSON.stringify({
          method: "delete",
          url: `https://www.googleapis.com/drive/v3/files/${props?.data["id"]}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "googleDriveAccessToken"
            )}`,
          },
        });

        const config = {
          method: "post",
          url: `${BACKEND_URL}data`,
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };
        // const googleDriveReq = { path: props?.data["id"] };
        commonApiCalling(deleteGoogleDriveFileFolder, config);
        break;

      case 3:
        // const dropboxReq = {
        //   data: { path: `${props?.location}` },
        // };
        const dropboxData = JSON.stringify({
          method: "post",
          url: `https://api.dropboxapi.com/2/files/delete_v2`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "dropboxAccessToken"
            )}`,
            "content-type": "application/json",
          },
          data: { path: `${props?.location}` },
        });

        const dropboxconfig = {
          method: "post",
          url: `${BACKEND_URL}data`,
          headers: {
            "Content-Type": "application/json",
          },
          data: dropboxData,
        };
        commonApiCalling(deleteDropboxFileFolder, dropboxconfig);
        break;

      default:
        break;
    }
  }

  function folderContainItems() {
    switch (props?.uploadedOn) {
      case 1:
        !props?.data["@microsoft.graph.downloadUrl"]
          ? setModalData({
              name: FILE_FOLDER_CONST.DEL_FOLDER,
              imageScr: FILE_FOLDER_CONST.FOLDER_IMAGE,
              items: `${
                props?.data?.folder["childCount"] > 0
                  ? `This folder contain ${props?.data?.folder["childCount"]} items.`
                  : "This folder may contain items."
              }`,
            })
          : setModalData({
              name: FILE_FOLDER_CONST.DEL_FILE,
              imageScr: FILE_FOLDER_CONST.FILE_IMAGE,
              items: "",
            });
        break;

      case 2:
        props?.data["mimeType"] == "application/vnd.google-apps.folder"
          ? setModalData({
              name: FILE_FOLDER_CONST.DEL_FOLDER,
              imageScr: FILE_FOLDER_CONST.FOLDER_IMAGE,
              items: "This folder may contain items.",
            })
          : setModalData({
              name: FILE_FOLDER_CONST.DEL_FILE,
              imageScr: FILE_FOLDER_CONST.FILE_IMAGE,
              items: "",
            });
        break;

      case 3:
        props?.data[".tag"] == "folder"
          ? setModalData({
              name: FILE_FOLDER_CONST.DEL_FOLDER,
              imageScr: FILE_FOLDER_CONST.FOLDER_IMAGE,
              items: "This folder may contain items.",
            })
          : setModalData({
              name: FILE_FOLDER_CONST.DEL_FILE,
              imageScr: FILE_FOLDER_CONST.FILE_IMAGE,
              items: "",
            });
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
        toast.success("Deleted!.");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something bad happened.");
      });
  }
  function callApi19() {
    const req = { params: { id: "eq.3" } };

    deleteFoldersideq3(req)
      .then((res) => {
        setapiData19(res);

        toast.success("Deleted.");
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
        className="!w-[35%] sm:w-[100%] flex-col flex outline-none"
        overlayClassName="bg-black_900_99 fixed flex h-[100%] inset-y-[0] w-[100%] items-center justify-center"
        {...props}
      >
        <div className="max-h-[97vh]">
          <Column className="bg-white_A700 flex flex-col items-center justify-start max-w-[669px] sm:mb-[134px] md:mb-[173px] ml-[auto] mr-[auto] sm:pb-[15px] md:pb-[19px] pb-[37px] sm:pl-[15px] sm:pr-[15px] rounded-radius12 shadow-bs1 w-[100%]">
            <Column className="bg-gray_101 flex flex-col items-center justify-start sm:p-[15px] p-[18px] md:p-[9px] rounded-bl-[0] rounded-br-[0] rounded-tl-[12px] rounded-tr-[12px] w-[100%]">
              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between sm:mx-[0] sm:px-[0] sm:w-[100%] w-[96%]">
                <Text
                  className="flex-grow font-bold text-black_900"
                  as="h5"
                  variant="h5"
                >
                  {/* {modalHeaderName()} */}
                  {modelData?.name}
                </Text>
                <Img
                  src="/images/img_arrowright_gray_900.svg"
                  className="common-pointer flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] md:w-[12px] w-[24px] sm:w-[9px]"
                  onClick={props.onRequestClose}
                  alt="arrowright"
                />
              </Row>
            </Column>
            <Column className="flex flex-col items-center justify-start md:mt-[12px] mt-[24px] sm:mt-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[70%]">
              <Column className="flex flex-col items-center justify-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[27%]">
                <Img
                  // src={deleteImageScr()}
                  src={modelData?.imageScr}
                  className="max-w-[100%] w-[100%]"
                  alt="FilwFolder"
                />
                <Text
                  className="font-bold mt-[14px] sm:mt-[5px] md:mt-[7px] text-black_901 w-[max-content]"
                  variant="body1"
                >
                  {props?.data["name"]}
                </Text>
              </Column>
              <Text
                className="font-medium md:mt-[10px] mt-[20px] sm:mt-[7px] text-black_900 w-[auto]"
                as="h6"
                variant="h6"
              >
                {/* This folder may contain items. */}
                {modelData?.items}
              </Text>
              <Text
                className="font-medium md:mt-[10px] sm:mt-[7px] text-black_900 w-[auto]"
                as="h6"
                variant="h6"
              >
                Are you sure you want to delete this?
              </Text>
              <Row className="flex md:flex-wrap sm:flex-wrap items-center justify-center md:mt-[12px] mt-[24px] sm:mt-[9px] sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[70%] gap-3 flex-row-reverse">
                <Button
                  variant="OutlineIndigo600"
                  className="common-pointer font-medium text-[16px] text-center text-white_A700 w-[35%]"
                  onClick={props.onRequestClose}
                >
                  Keep
                </Button>
                <LoadingButton
                  className={`min-w-[44%]`}
                  text="Delete"
                  onSubmit={() => {
                    callDeleteApi();
                  }}
                  loading={showLoader}
                  disabled={showLoader}
                ></LoadingButton>
              </Row>
            </Column>
          </Column>
        </div>
      </ModalProvider>
      <ToastContainer />
    </>
  );
};

export default DeleteFolderModal;
