import { Button, Column, Img, Input, Row, Text } from "components";
import React from "react";
import ModalProvider from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  renameFileToGoogleDrive,
  uploadFileToDropbox,
  uploadFileToGoogleDrive,
  uploadFileToOneDrive
} from "service/api";
import LoadingButton from "../../components/LoadingButton/button";
import "../../components/LoadingButton/button.css";
import { BACKEND_URL } from "../../constant";

const UploadFileModal = (props) => {
  const [file, setFile] = React.useState();
  const [showLoader, setShowLoader] = React.useState(false);

  const fileFormates = {
    png: "image/png",
    bmp: "image/bmp",
    css: "text/css",
    csv: "text/csv",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    html: "text/html",
    htm: "text/html",
    jar: "application/java-archive",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    js: "text/javascript",
    mp3: "audio/mpeg",
    mp4: "video/mp4",
    mpeg: "video/mpeg",
    mov: "video/quicktime",
    pdf: "application/pdf",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    rar: "application/vnd.rar",
    zip: "application/zip",
    txt: "text/plain",
    webm: "video/webm",
    xhtml: "application/xhtml+xml",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    xml: "application/xml",
    "7z": "application/x-7z-compressed",
  };

  function getExtension(filename) {
    return filename.split(".").pop();
  }

  function callRenameFileToGoogleDrive(fileId, updateFileName) {
    var data;

    if (props?.location == "root") {
      data = JSON.stringify({
        method: "patch",
        url: `https://www.googleapis.com/drive/v3/files/${fileId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "googleDriveAccessToken"
          )}`,
        },
        data: {
          name: updateFileName,
        },
      });
    } else {
      data = JSON.stringify({
        method: "patch",
        url: `https://www.googleapis.com/drive/v3/files/${fileId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "googleDriveAccessToken"
          )}`,
        },
        params: {
          addParents: props?.location,
        },
        data: {
          name: updateFileName,
        },
      });
    }

    const config = {
      method: "post",
      url: `${BACKEND_URL}data`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    renameFileToGoogleDrive(config)
      .then((res) => {
        setTimeout(() => setShowLoader(false), 1000);
        props.apiCall();
        props.onRequestClose();
        toast.success("Uploaded.");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something bad happened.");
      });
  }
  async function callUploadFileApi() {
    setShowLoader(true);

    let extension = getExtension(file.name);
    var contentType;
    for (var key in fileFormates) {
      if (key == extension) {
        contentType = fileFormates[key];
      }
    }
    if (props?.uploadedOn == 1) {
      const req = {
        fileName: file.name,
        file: file,
        type: contentType,
        root: props?.location,
      };
      uploadFileToOneDrive(req)
        .then((res) => {
          setTimeout(() => setShowLoader(false), 1000);
          props.apiCall();
          props.onRequestClose();
          toast.success("Uploaded.");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something bad happened.");
        });
    }
    if (props?.uploadedOn == 2) {
      const req = {
        file: file,
      };
      uploadFileToGoogleDrive(req)
        .then((res) => {
          callRenameFileToGoogleDrive(res?.id, file.name);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something bad happened.");
        });
    }
    if (props?.uploadedOn == 3) {
      var req;
      props?.location == "root"
        ? (req = {
          file: file,
          path: `{"path":"/${file?.name}"}`,
        })
        : (req = {
          file: file,
          path: `{"path":"${props?.location}/${file?.name}"}`,
        });

      let data = JSON.stringify({
        method: "post",
        url: `https://content.dropboxapi.com/2/files/upload`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("dropboxAccessToken")}`,
          "Content-Type": "application/octet-stream",
          "Dropbox-API-Arg": req?.path,
        },
        data: req?.file,
      });

      const config = {
        method: "post",
        url: `${BACKEND_URL}data`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      uploadFileToDropbox(config)
        .then((res) => {
          setTimeout(() => setShowLoader(false), 1000);
          props.apiCall();
          props.onRequestClose();
          toast.success("Uploaded.");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something bad happened.");
        });
    }
  }

  return (
    <>
      <ModalProvider
        appElement={document.getElementById("root")}
        className="m-[auto] sm:w-[100%] flex-col flex"
        overlayClassName="bg-black_900_99 fixed flex h-[100%] inset-y-[0] w-[100%]"
        {...props}
      >
        <div className="m-[auto]">
          <Column className="bg-white_A700 flex flex-col justify-start max-w-[669px] sm:mb-[120px] md:mb-[155px] ml-[auto] mr-[auto] sm:pb-[15px] md:pb-[23px] pb-[45px] sm:pl-[15px] sm:pr-[15px] rounded-radius12 shadow-bs1 w-[100%]">
            <Column className="bg-gray_101 flex flex-col items-center justify-end sm:p-[15px] p-[16px] md:p-[8px] rounded-bl-[0] rounded-br-[0] rounded-tl-[12px] rounded-tr-[12px] w-[100%]">
              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between mt-[2px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[95%]">
                <Text
                  className="flex-grow font-bold sm:mt-[1px] md:mt-[2px] mt-[5px] text-black_900"
                  as="h5"
                  variant="h5"
                >
                  Upload File
                </Text>
                <Img
                  src="/images/img_arrowright_gray_900.svg"
                  className="common-pointer flex-shrink-0 sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] mb-[2px] md:w-[12px] w-[24px] sm:w-[9px]"
                  onClick={props.onRequestClose}
                  alt="arrowright"
                />
              </Row>
            </Column>
            <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center md:ml-[65px] sm:mt-[17px] md:mt-[23px] mt-[45px] sm:mx-[0] sm:px-[0] sm:w-[100%]">
              <Text
                className="font-medium text-black_900 w-[auto]"
                as="h5"
                variant="h5"
              >
                Upload File
              </Text>
              <Input
                className="text-ellipsis"
                wrapClassName="w-[32%]"
                type="file"
                name="file"
                placeholder="Select File"
                shape="RoundedBorder8"
                size="lg"
                accept="xlsx,xls"
                onChange={(e) => setFile(e.target.files[0])}
              ></Input>
            </Row>
            <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center md:ml-[109px] sm:mt-[19px] md:mt-[25px] mt-[50px] sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%]">
              <LoadingButton
                className={`min-w-[24%] w-[24%]`}
                text="Upload"
                onSubmit={() => {
                  callUploadFileApi();
                }}
                loading={showLoader}
                disabled={showLoader}
              ></LoadingButton>
              <Button
                className="common-pointer cursor-pointer font-medium sm:ml-[11px] md:ml-[15px] ml-[30px] text-[16px] text-center text-indigo_600"
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

export default UploadFileModal;
