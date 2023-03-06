import React from "react";

import { Button, Column, Grid, Img, Row, Text } from "components";
import CreateNewFolderModal from "modals/CreateNewFolder";
import DeleteFolderModal from "modals/DeleteFolder";
import EditFolderModal from "modals/EditFolder";
import UploadFileModal from "modals/UploadFile";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getGoogleDriveFolders,
  getOneDriveFolders,
  getSettings,
  getTemporaryLinkOfDropbox,
  postDropboxAccessToken,
  postEmbededPreviewOneDriveFile,
  postGoogleDriveAccessToken,
  postOneDropboxFileFolders,
  postPreviewDropboxFile,
} from "service/api";
import Base from "../../../components/Base";
import { BACKEND_URL, FILE_FOLDER_TOKEN_CONST } from "../../../constant";

const DocumentsPage = () => {
  const [isOpenDeleteFolderModal, setDeleteFolderModal] = React.useState(false);
  const [isOpenEditFolderModal, setEditFolderModal] = React.useState(false);
  const [isOpenCreateNewFolderModal, setCreateNewFolderModal] =
    React.useState(false);
  const [isOpenUploadFileModal, setUploadFileModal] = React.useState(false);

  const [indexData, setIndexData] = React.useState();
  const [locationData, setLocationData] = React.useState();
  const [uploadingData, setUploadingData] = React.useState();
  const [callingApi, setCallingApi] = React.useState();
  const [apiData, setapiData] = React.useState();
  const [googleApiData, setGoogleApiData] = React.useState();
  const [dropboxApiData, setDropboxApiData] = React.useState();
  const [open, setOpen] = React.useState();
  const [isOnedriveChecked, setIsOneDriveChecked] = React.useState();
  const [isGoogledriveChecked, setIsGoogleDriveChecked] = React.useState();
  const [isDropboxChecked, setIsDropboxeChecked] = React.useState();
  const navigate = useNavigate();

  // ====================> LOCAL STORAGE FUNCTION <========================

  function setDataToLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }

  const getDataFromLocalStorage = (key) => {
    return window.localStorage.getItem(key);
  };

  function RemoveDataFromLocalStorage(key) {
    localStorage.removeItem(key);
  }

  React.useEffect(() => {
    callSettingsApi();
  }, []);

  React.useEffect(() => {
    isOnedriveChecked ? callApi() : undefined;
  }, [isOnedriveChecked]);

  React.useEffect(() => {
    isGoogledriveChecked ? callGoogleApi() : undefined;
  }, [isGoogledriveChecked]);

  React.useEffect(() => {
    isDropboxChecked ? callDropBoxApi() : undefined;
  }, [isDropboxChecked]);

  function callpostRegenerateGoogleDriveAccessTokenApi() {
    const data = JSON.stringify({
      method: "post",
      url: "https://oauth2.googleapis.com/token",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "googleDriveAccessToken"
        )}`,
      },
      data: {
        grant_type: "refresh_token",
        client_id: getDataFromLocalStorage(
          FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN.CLIENT_ID
        ),
        client_secret: getDataFromLocalStorage(
          FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN.CLIENT_SECRET
        ),
        refresh_token: getDataFromLocalStorage(
          FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN.REFRESH_TOKEN
        ),
        access_type: "offline",
      },
    });

    const config = {
      method: "post",
      url: `${BACKEND_URL}generateToken`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    postGoogleDriveAccessToken(config)
      .then((res) => {
        RemoveDataFromLocalStorage(
          FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN.ACCESS_TOKEN
        );
        setDataToLocalStorage(
          FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN.ACCESS_TOKEN,
          res?.["access_token"]
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function callpostRegenerateDropboxAccessTokenApi() {
    const data = JSON.stringify({
      method: "post",
      url: "https://api.dropboxapi.com/oauth2/token",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: {
        grant_type: "refresh_token",
        refresh_token: getDataFromLocalStorage(
          FILE_FOLDER_TOKEN_CONST.DROPBOX_TOKEN.REFRESH_TOKEN
        ),
        client_id: getDataFromLocalStorage(
          FILE_FOLDER_TOKEN_CONST.DROPBOX_TOKEN.CLIENT_ID
        ),
        client_secret: getDataFromLocalStorage(
          FILE_FOLDER_TOKEN_CONST.DROPBOX_TOKEN.CLIENT_SECRET
        ),
      },
    });

    const config = {
      method: "post",
      url: `${BACKEND_URL}generateToken`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    postDropboxAccessToken(config)
      .then((res) => {
        RemoveDataFromLocalStorage(
          FILE_FOLDER_TOKEN_CONST.DROPBOX_TOKEN.ACCESS_TOKEN
        );
        setDataToLocalStorage(
          FILE_FOLDER_TOKEN_CONST.DROPBOX_TOKEN.ACCESS_TOKEN,
          res?.["access_token"]
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function callSettingsApi() {
    const req = {};
    getSettings(req)
      .then((res) => {
        setIsOneDriveChecked(res[0]["is_selected"]);
        setIsGoogleDriveChecked(res[1]["is_selected"]);
        setIsDropboxeChecked(res[2]["is_selected"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function callpostEmbededPreviewOneDriveFileApi(itemId) {
    const req = {
      itemId: itemId,
    };
    postEmbededPreviewOneDriveFile(req)
      .then((res) => {
        fileDownloading(res?.link?.webUrl);
      })
      .catch((err) => {
        console.log(err);
        toast.err("Something bad Happened!...");
      });
  }

  function callPreviewDropboxFileApi(path) {
    const dropboxData = JSON.stringify({
      method: "post",
      url: `https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("dropboxAccessToken")}`,
        "content-type": "application/json",
      },
      data: {
        path: path,
      },
    });

    const config = {
      method: "post",
      url: `${BACKEND_URL}data`,
      headers: {
        "Content-Type": "application/json",
      },
      data: dropboxData,
    };

    postPreviewDropboxFile(config)
      .then((res) => {
        fileDownloading(res?.url.replace("?dl=0", ""));
      })
      .catch((err) => {
        let url =
          err?.response?.data?.error?.shared_link_already_exists?.metadata?.url.replace(
            "?dl=0",
            ""
          );
        fileDownloading(url);
      });
  }

  function callDownloadFileOfDropboxApi(downloadPath) {
    const dropboxData = JSON.stringify({
      method: "post",
      url: `https://api.dropboxapi.com/2/files/get_temporary_link`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("dropboxAccessToken")}`,
        "content-type": "application/json",
      },
      data: {
        path: downloadPath,
      },
    });

    const config = {
      method: "post",
      url: `${BACKEND_URL}data`,
      headers: {
        "Content-Type": "application/json",
      },
      data: dropboxData,
    };

    getTemporaryLinkOfDropbox(config)
      .then((res) => {
        fileDownloading(res?.link);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function callApi() {
    const req = {};
    getOneDriveFolders(req)
      .then((res) => {
        setapiData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function callGoogleApi() {
    const data = JSON.stringify({
      method: "get",
      url: "https://www.googleapis.com/drive/v3/files?fields=*",
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
    getGoogleDriveFolders(config)
      .then((res) => {
        setGoogleApiData(res);
      })
      .catch((err) => {
        if (err.message.error.code === 401) {
          callpostRegenerateGoogleDriveAccessTokenApi();
        }
        // console.error(err);
      });
  }

  function callDropBoxApi() {
    const data = JSON.stringify({
      method: "post",
      url: "https://api.dropboxapi.com/2/files/list_folder",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("dropboxAccessToken")}`,
      },
      data: {
        path: "",
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

    postOneDropboxFileFolders(config)
      .then((res) => {
        setDropboxApiData(res);
      })
      .catch((err) => {
        if (err?.status == 401) {
          callpostRegenerateDropboxAccessTokenApi();
        }
      });
  }
  function handleNavigateToFiles(indexData, title = 1) {
    navigate("/admin/files", { state: { title: title, data: indexData } });
  }
  function fileDownloading(exportFormat) {
    window.open(exportFormat, "_blank", "noopener,noreferrer");
  }
  function handleOpenDeleteFolderModal() {
    setDeleteFolderModal(true);
  }
  function handleCloseDeleteFolderModal() {
    setDeleteFolderModal(false);
  }
  function handleOpenEditFolderModal() {
    setEditFolderModal(true);
  }
  function handleCloseEditFolderModal() {
    setEditFolderModal(false);
  }
  function handleOpenCreateNewFolderModal() {
    setCreateNewFolderModal(true);
  }
  function handleCloseCreateNewFolderModal() {
    setCreateNewFolderModal(false);
  }
  function handleOpenUploadFileModal() {
    setUploadFileModal(true);
  }
  function handleCloseUploadFileModal() {
    setUploadFileModal(false);
  }

  return (
    <Base title="Documents">
      {/* =============================> OneDrive <============================= */}

      {isOnedriveChecked ? (
        <Column className="bg-white_A700  flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px] my-[32px] sm:mx-[0] sm:p-[15px] p-[18px] md:p-[9px] rounded-radius8 sm:w-[100%] w-[97%]">
          <Column className="flex flex-col items-center justify-start mb-[100px] sm:mb-[48px] md:mb-[62px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[99%]">
            <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center w-[100%]">
              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between rounded-radius4 w-[100%]">
                <Text
                  className="font-medium text-black_901 ml-[10px] w-[auto]"
                  as="h5"
                  variant="h5"
                >
                  OneDrive
                </Text>
              </Row>
              <Button
                className="flex items-center justify-center md:ml-[358px] min-w-[fit-content] ml-[auto] sm:ml-[277px] text-center w-[max-content] p-[10px]"
                onClick={() => {
                  setLocationData(`root`);
                  setUploadingData(1);
                  handleOpenCreateNewFolderModal();
                }}
                leftIcon={
                  <Img
                    src="/images/img_plus.svg"
                    className="mr-[8px] sm:mr-[3px] md:mr-[4px] text-center"
                    alt="plus"
                  />
                }
              >
                <div className="common-pointer bg-transparent cursor-pointer font-medium text-[12px] text-white_A700">
                  Create Folder
                </div>
              </Button>
              <Button
                className="flex items-center justify-center md:ml-[12px] min-w-[fit-content] ml-[24px] sm:ml-[9px] text-center w-[max-content] p-[10px]"
                leftIcon={
                  <Img
                    src="/images/img_download.svg"
                    className="mr-[8px] sm:mr-[3px] md:mr-[4px] text-center"
                    alt="download"
                  />
                }
              >
                <div className="bg-transparent cursor-pointer font-medium text-[12px] text-white_A700">
                  Download
                </div>
              </Button>
              <Button
                className="flex items-center justify-center md:ml-[12px] min-w-[fit-content] ml-[24px] mr-[10px] sm:ml-[9px] text-center w-[max-content] p-[10px]"
                leftIcon={
                  <Img
                    src="/images/img_upload_24X24.svg"
                    className="mr-[8px] sm:mr-[3px] md:mr-[4px] text-center"
                    alt="upload"
                  />
                }
                variant="FillDeeporangeA200"
                onClick={() => {
                  setLocationData(`root`);
                  setUploadingData(1);
                  handleOpenUploadFileModal();
                }}
              >
                <div className="bg-transparent cursor-pointer font-medium text-[12px] text-white_A700">
                  Upload
                </div>
              </Button>
            </Row>
            <Column className="flex flex-col items-center justify-start sm:mt-[19px] md:mt-[25px] mt-[50px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[98%]">
              <Grid className="sm:gap-[11px] md:gap-[15px] gap-[30px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 min-h-[auto] w-[100%]">
                {apiData?.value?.map((apiDataResponseEle, index) => {
                  return (
                    <React.Fragment key={`apiDataResponseEle${index}`}>
                      <Column className="bg-white_A700 flex flex-col items-center justify-center md:p-[15px] sm:p-[15px] p-[30px] rounded-radius12 shadow-bs1 w-[100%]">
                        <Column className="flex flex-col items-center justify-center sm:mb-[11px] md:mb-[15px] mb-[30px] sm:mx-[0] pb-[3px] sm:px-[0] sm:w-[100%] w-[68%]">
                          <Row className="flex flex-row w-[10%] ml-[190px]">
                            <Img
                              src="/images/img_edit.svg"
                              className="common-pointer sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] sm:ml-[101px] mr-[5px] md:ml-[130px] md:w-[12px] w-[24px] sm:w-[9px]"
                              alt="Edit"
                              onClick={() => {
                                setIndexData(apiDataResponseEle);
                                setLocationData(apiDataResponseEle?.["id"]);
                                setUploadingData(1);
                                handleOpenEditFolderModal();
                              }}
                            />
                            <Img
                              src="/images/img_trash_24X24.svg"
                              className="common-pointer sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] sm:ml-[101px] mr-[5px] md:ml-[130px] md:w-[12px] w-[24px] sm:w-[9px]"
                              alt="Delete"
                              onClick={() => {
                                setIndexData(apiDataResponseEle);
                                setLocationData(apiDataResponseEle?.["id"]);
                                setUploadingData(1);
                                handleOpenDeleteFolderModal();
                              }}
                            />
                            {apiDataResponseEle?.[
                              "@microsoft.graph.downloadUrl"
                            ] ? (
                              <Img
                                src="/images/img_download_30X30.svg"
                                className="common-pointer sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] sm:ml-[101px] md:ml-[130px] md:w-[12px] w-[24px] sm:w-[9px]"
                                alt="Download"
                                onClick={() =>
                                  fileDownloading(
                                    apiDataResponseEle?.[
                                      "@microsoft.graph.downloadUrl"
                                    ]
                                  )
                                }
                              />
                            ) : (
                              <div className="h-[24px]"></div>
                            )}
                          </Row>

                          <Column className="flex flex-col items-center justify-center  md:mr-[69px] sm:mt-[2px] md:mt-[3px] mt-[7px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[52%]">
                            {!apiDataResponseEle?.[
                              "@microsoft.graph.downloadUrl"
                            ] ? (
                              <Img
                                src="/images/img_folder_white_A700.png"
                                className="common-pointer max-w-[100%] w-[100%]"
                                alt="Folder"
                                onClick={() =>
                                  handleNavigateToFiles(apiDataResponseEle, 1)
                                }
                              />
                            ) : (
                              <Img
                                src="/images/img_paper.png"
                                className="common-pointer max-w-[100%] w-[100%]"
                                alt="File"
                                onClick={() =>
                                  callpostEmbededPreviewOneDriveFileApi(
                                    apiDataResponseEle?.id
                                  )
                                }
                              />
                            )}
                            <Text className="font-medium text-sm md:mt-[12px] mt-[16px] sm:mt-[9px] text-black_901 w-[max-content]">
                              {apiDataResponseEle?.["name"]}
                            </Text>
                            <Text className="font-medium text-xs md:mt-[10px] mt-[8px] sm:mt-[7px] text-gray_502 w-[auto]">
                              {!apiDataResponseEle?.[
                                "@microsoft.graph.downloadUrl"
                              ]
                                ? `${apiDataResponseEle?.["folder"]?.childCount} items`
                                : ``}
                            </Text>
                          </Column>
                        </Column>
                      </Column>
                    </React.Fragment>
                  );
                })}
              </Grid>
            </Column>
          </Column>
        </Column>
      ) : undefined}

      {/* =============================> Google Drive <============================= */}

      {isGoogledriveChecked ? (
        <Column className="bg-white_A700 flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px] my-[32px] sm:mx-[0] sm:p-[15px] p-[18px] md:p-[9px] rounded-radius8 sm:w-[100%] w-[97%]">
          <Column className="flex flex-col items-center justify-start mb-[100px] sm:mb-[48px] md:mb-[62px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[99%]">
            <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center w-[100%]">
              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between rounded-radius4 w-[100%]">
                <Text
                  className="font-medium text-black_901 ml-[10px] w-[auto]"
                  as="h5"
                  variant="h5"
                >
                  Google Drive
                </Text>
              </Row>
              <Button
                className="flex items-center justify-center md:ml-[358px] min-w-[fit-content] ml-[auto] sm:ml-[277px] text-center w-[max-content] p-[10px]"
                onClick={() => {
                  setLocationData(`root`);
                  setUploadingData(2);
                  handleOpenCreateNewFolderModal();
                }}
                leftIcon={
                  <Img
                    src="/images/img_plus.svg"
                    className="mr-[8px] sm:mr-[3px] md:mr-[4px] text-center"
                    alt="plus"
                  />
                }
              >
                <div className="common-pointer bg-transparent cursor-pointer font-medium text-[12px] text-white_A700">
                  Create Folder
                </div>
              </Button>
              <Button
                className="flex items-center justify-center md:ml-[12px] min-w-[fit-content] ml-[24px] sm:ml-[9px] text-center w-[max-content] p-[10px]"
                leftIcon={
                  <Img
                    src="/images/img_download.svg"
                    className="mr-[8px] sm:mr-[3px] md:mr-[4px] text-center"
                    alt="download"
                  />
                }
              >
                <div className="bg-transparent cursor-pointer font-medium text-[12px] text-white_A700">
                  Download
                </div>
              </Button>
              <Button
                className="flex items-center justify-center md:ml-[12px] min-w-[fit-content] ml-[24px] mr-[10px] sm:ml-[9px] text-center w-[max-content] p-[10px]"
                onClick={() => {
                  setLocationData(`root`),
                    setUploadingData(2),
                    handleOpenUploadFileModal();
                }}
                leftIcon={
                  <Img
                    src="/images/img_upload_24X24.svg"
                    className="mr-[8px] sm:mr-[3px] md:mr-[4px] text-center"
                    alt="upload"
                  />
                }
                variant="FillDeeporangeA200"
              >
                <div className="bg-transparent cursor-pointer font-medium text-[12px] text-white_A700">
                  Upload
                </div>
              </Button>
            </Row>
            <Column className="flex flex-col items-center justify-start sm:mt-[19px] md:mt-[25px] mt-[50px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[98%]">
              <Grid className="sm:gap-[11px] md:gap-[15px] gap-[30px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 min-h-[auto] w-[100%]">
                {googleApiData?.files?.map((apiDataResponseEle, index) => {
                  if (apiDataResponseEle?.parents?.[0].length == 19) {
                    return (
                      <React.Fragment key={`apiDataResponseEle${index}`}>
                        <Column className="bg-white_A700 flex flex-col items-center justify-center md:p-[15px] sm:p-[15px] p-[30px] rounded-radius12 shadow-bs1 w-[100%]">
                          <Column className="flex flex-col items-center justify-center sm:mb-[11px] md:mb-[15px] mb-[30px] sm:mx-[0] pb-[3px] sm:px-[0] sm:w-[100%] w-[68%]">
                            <Row className="flex flex-row w-[10%] ml-[190px]">
                              <Img
                                src="/images/img_edit.svg"
                                className="common-pointer sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] sm:ml-[101px] mr-[5px] md:ml-[130px] md:w-[12px] w-[24px] sm:w-[9px]"
                                alt="Edit"
                                onClick={() => {
                                  setIndexData(apiDataResponseEle);
                                  setLocationData(apiDataResponseEle?.["id"]);
                                  setUploadingData(2);
                                  handleOpenEditFolderModal();
                                }}
                              />
                              <Img
                                src="/images/img_trash_24X24.svg"
                                className="common-pointer sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] sm:ml-[101px] mr-[5px] md:ml-[130px] md:w-[12px] w-[24px] sm:w-[9px]"
                                alt="Delete"
                                onClick={() => {
                                  setIndexData(apiDataResponseEle);
                                  setLocationData(apiDataResponseEle?.["id"]);
                                  setUploadingData(2);
                                  handleOpenDeleteFolderModal();
                                }}
                              />
                              {apiDataResponseEle?.["mimeType"] !=
                              "application/vnd.google-apps.folder" ? (
                                <Img
                                  src="/images/img_download_30X30.svg"
                                  className="common-pointer sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] sm:ml-[101px] md:ml-[130px] md:w-[12px] w-[24px] sm:w-[9px]"
                                  alt="overflowmenu One"
                                  onClick={() => {
                                    if (
                                      apiDataResponseEle.hasOwnProperty(
                                        "webContentLink"
                                      )
                                    ) {
                                      fileDownloading(
                                        apiDataResponseEle?.["webContentLink"]
                                      );
                                    } else {
                                      switch (
                                        apiDataResponseEle?.["mimeType"]
                                      ) {
                                        case "application/vnd.google-apps.document":
                                          fileDownloading(
                                            apiDataResponseEle?.[
                                              "exportLinks"
                                            ]?.[
                                              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                            ]
                                          );
                                          break;

                                        case "application/vnd.google-apps.spreadsheet":
                                          fileDownloading(
                                            apiDataResponseEle?.[
                                              "exportLinks"
                                            ]?.[
                                              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                            ]
                                          );
                                          break;

                                        case "application/vnd.google-apps.presentation":
                                          fileDownloading(
                                            apiDataResponseEle?.[
                                              "exportLinks"
                                            ]?.[
                                              "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                                            ]
                                          );
                                          break;
                                        default:
                                      }
                                    }
                                  }}
                                />
                              ) : (
                                <div className="h-[24px]"></div>
                              )}
                            </Row>

                            <Column className="flex flex-col items-center justify-center  md:mr-[69px] sm:mt-[2px] md:mt-[3px] mt-[7px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[52%]">
                              {apiDataResponseEle?.["mimeType"] ==
                              "application/vnd.google-apps.folder" ? (
                                <Img
                                  src="/images/img_folder_white_A700.png"
                                  className="common-pointer max-w-[100%] w-[100%]"
                                  alt="Folder"
                                  onClick={() =>
                                    handleNavigateToFiles(apiDataResponseEle, 2)
                                  }
                                />
                              ) : (
                                <Img
                                  src="/images/img_paper.png"
                                  className="common-pointer max-w-[100%] w-[100%]"
                                  alt="File"
                                  onClick={() =>
                                    fileDownloading(
                                      apiDataResponseEle?.["webViewLink"]
                                    )
                                  }
                                />
                              )}
                              <Text className="font-medium text-sm md:mt-[12px] mt-[16px] sm:mt-[9px] text-black_901 w-[max-content]">
                                {apiDataResponseEle?.["name"]}
                              </Text>
                            </Column>
                          </Column>
                        </Column>
                      </React.Fragment>
                    );
                  }
                })}
              </Grid>
            </Column>
          </Column>
        </Column>
      ) : undefined}

      {/* =============================> Dropbox <============================= */}

      {isDropboxChecked ? (
        <Column className="bg-white_A700 flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px] my-[32px] sm:mx-[0] sm:p-[15px] p-[18px] md:p-[9px] rounded-radius8 sm:w-[100%] w-[97%]">
          <Column className="flex flex-col items-center justify-start mb-[100px] sm:mb-[48px] md:mb-[62px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[99%]">
            <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center w-[100%]">
              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between rounded-radius4 w-[100%]">
                <Text
                  className="font-medium text-black_901 ml-[10px] w-[auto]"
                  as="h5"
                  variant="h5"
                >
                  Dropbox
                </Text>
              </Row>
              <Button
                className="flex items-center justify-center md:ml-[358px] min-w-[fit-content] ml-[auto] sm:ml-[277px] text-center w-[max-content] p-[10px]"
                onClick={() => {
                  setLocationData(`root`);
                  setUploadingData(3);
                  handleOpenCreateNewFolderModal();
                }}
                leftIcon={
                  <Img
                    src="/images/img_plus.svg"
                    className="mr-[8px] sm:mr-[3px] md:mr-[4px] text-center"
                    alt="plus"
                  />
                }
              >
                <div className="common-pointer bg-transparent cursor-pointer font-medium text-[12px] text-white_A700">
                  Create Folder
                </div>
              </Button>
              <Button
                className="flex items-center justify-center md:ml-[12px] min-w-[fit-content] ml-[24px] sm:ml-[9px] text-center w-[max-content] p-[10px]"
                leftIcon={
                  <Img
                    src="/images/img_download.svg"
                    className="mr-[8px] sm:mr-[3px] md:mr-[4px] text-center"
                    alt="download"
                  />
                }
              >
                <div className="bg-transparent cursor-pointer font-medium text-[12px] text-white_A700">
                  Download
                </div>
              </Button>
              <Button
                className="flex items-center justify-center md:ml-[12px] min-w-[fit-content] ml-[24px] mr-[10px] sm:ml-[9px] text-center w-[max-content] p-[10px]"
                leftIcon={
                  <Img
                    src="/images/img_upload_24X24.svg"
                    className="mr-[8px] sm:mr-[3px] md:mr-[4px] text-center"
                    alt="upload"
                  />
                }
                variant="FillDeeporangeA200"
                onClick={() => {
                  setLocationData(`root`),
                    setUploadingData(3),
                    handleOpenUploadFileModal();
                }}
              >
                <div className="bg-transparent cursor-pointer font-medium text-[12px] text-white_A700">
                  Upload
                </div>
              </Button>
            </Row>
            <Column className="flex flex-col items-center justify-start sm:mt-[19px] md:mt-[25px] mt-[50px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[98%]">
              <Grid className="sm:gap-[11px] md:gap-[15px] gap-[30px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 min-h-[auto] w-[100%]">
                {dropboxApiData?.entries?.map((apiDataResponseEle, index) => {
                  return (
                    <React.Fragment key={`apiDataResponseEle${index}`}>
                      <Column className="bg-white_A700 flex flex-col items-center justify-center md:p-[15px] sm:p-[15px] p-[30px] rounded-radius12 shadow-bs1 w-[100%]">
                        <Column className="flex flex-col items-center justify-center sm:mb-[11px] md:mb-[15px] mb-[30px] sm:mx-[0] pb-[3px] sm:px-[0] sm:w-[100%] w-[68%]">
                          <Row className="flex flex-row w-[10%] ml-[190px]">
                            <Img
                              src="/images/img_edit.svg"
                              className="common-pointer sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] sm:ml-[101px] mr-[5px] md:ml-[130px] md:w-[12px] w-[24px] sm:w-[9px]"
                              alt="Edit"
                              onClick={() => {
                                setIndexData(apiDataResponseEle);
                                setLocationData(apiDataResponseEle?.path_lower);
                                setUploadingData(3);
                                handleOpenEditFolderModal();
                              }}
                            />
                            <Img
                              src="/images/img_trash_24X24.svg"
                              className="common-pointer sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] sm:ml-[101px] mr-[5px] md:ml-[130px] md:w-[12px] w-[24px] sm:w-[9px]"
                              alt="Delete"
                              onClick={() => {
                                setIndexData(apiDataResponseEle);
                                setLocationData(apiDataResponseEle?.path_lower);
                                setUploadingData(3);
                                handleOpenDeleteFolderModal();
                              }}
                            />
                            {apiDataResponseEle?.[".tag"] == "file" ? (
                              <Img
                                src="/images/img_download_30X30.svg"
                                className="common-pointer sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] sm:ml-[101px] md:ml-[130px] md:w-[12px] w-[24px] sm:w-[9px]"
                                alt="overflowmenu One"
                                onClick={() =>
                                  callDownloadFileOfDropboxApi(
                                    apiDataResponseEle?.path_lower
                                  )
                                }
                              />
                            ) : (
                              <div className="h-[24px]"></div>
                            )}
                          </Row>

                          <Column className="flex flex-col items-center justify-center  md:mr-[69px] sm:mt-[2px] md:mt-[3px] mt-[7px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[52%]">
                            {apiDataResponseEle?.[".tag"] == "folder" ? (
                              <Img
                                src="/images/img_folder_white_A700.png"
                                className="common-pointer max-w-[100%] w-[100%]"
                                alt="Folder"
                                onClick={() =>
                                  handleNavigateToFiles(apiDataResponseEle, 3)
                                }
                              />
                            ) : (
                              <Img
                                src="/images/img_paper.png"
                                className="common-pointer max-w-[100%] w-[100%]"
                                alt="File"
                                onClick={() =>
                                  callPreviewDropboxFileApi(
                                    apiDataResponseEle?.path_lower
                                  )
                                }
                              />
                            )}
                            <Text className="font-medium text-sm md:mt-[12px] mt-[16px] sm:mt-[9px] text-black_901 w-[max-content]">
                              {apiDataResponseEle?.["name"]}
                            </Text>
                          </Column>
                        </Column>
                      </Column>
                    </React.Fragment>
                  );
                })}
              </Grid>
            </Column>
          </Column>
        </Column>
      ) : undefined}

      {isOpenDeleteFolderModal ? (
        <DeleteFolderModal
          data={indexData}
          location={locationData}
          uploadedOn={uploadingData}
          isOpen={isOpenDeleteFolderModal}
          apiCall={() => {
            isOnedriveChecked
              ? callApi()
              : isGoogledriveChecked
              ? callGoogleApi()
              : isDropboxChecked
              ? callDropBoxApi()
              : null;
          }}
          onRequestClose={handleCloseDeleteFolderModal}
        />
      ) : null}
      {isOpenEditFolderModal ? (
        <EditFolderModal
          data={indexData}
          location={locationData}
          uploadedOn={uploadingData}
          isOpen={isOpenEditFolderModal}
          apiCall={() => {
            isOnedriveChecked
              ? callApi()
              : isGoogledriveChecked
              ? callGoogleApi()
              : isDropboxChecked
              ? callDropBoxApi()
              : null;
          }}
          onRequestClose={handleCloseEditFolderModal}
        />
      ) : null}
      {isOpenCreateNewFolderModal ? (
        <CreateNewFolderModal
          location={locationData}
          uploadedOn={uploadingData}
          isOpen={isOpenCreateNewFolderModal}
          apiCall={() => {
            isOnedriveChecked
              ? callApi()
              : isGoogledriveChecked
              ? callGoogleApi()
              : isDropboxChecked
              ? callDropBoxApi()
              : null;
          }}
          onRequestClose={handleCloseCreateNewFolderModal}
        />
      ) : null}
      {isOpenUploadFileModal ? (
        <UploadFileModal
          location={locationData}
          uploadedOn={uploadingData}
          isOpen={isOpenUploadFileModal}
          apiCall={() => {
            isOnedriveChecked
              ? callApi()
              : isGoogledriveChecked
              ? callGoogleApi()
              : isDropboxChecked
              ? callDropBoxApi()
              : null;
          }}
          onRequestClose={handleCloseUploadFileModal}
        />
      ) : null}
      <ToastContainer />
    </Base>
  );
};

export default DocumentsPage;
