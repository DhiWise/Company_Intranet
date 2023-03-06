import React from "react";

import { Button, Column, Grid, Img, Input, Row, Text } from "components";
import CreateNewFolderModal from "modals/CreateNewFolder";
import DeleteFolderModal from "modals/DeleteFolder";
import EditFolderModal from "modals/EditFolder";
import UploadFileModal from "modals/UploadFile";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getGoogleDriveFolders,
  getOneDriveChildFolders,
  getTemporaryLinkOfDropbox,
  postEmbededPreviewOneDriveFile,
  postOneDropboxFileFolders,
  postPreviewDropboxFile
} from "service/api";
import Base from "../../../components/Base";
import { BACKEND_URL } from "../../../constant";

const FilesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpenUploadFileModal, setUploadFileModal] = React.useState(false);
  const [isOpenCreateNewFolderModal, setCreateNewFolderModal] =
    React.useState(false);
  const [isOpenDeleteFolderModal, setDeleteFolderModal] = React.useState(false);
  const [isOpenEditFolderModal, setEditFolderModal] = React.useState(false);
  const [indexData, setIndexData] = React.useState();
  const [apiData, setapiData] = React.useState("");
  const [googleApiData, setGoogleApiData] = React.useState("");
  const [dropboxApiData, setDropboxApiData] = React.useState("");
  const [locationData, setLocationData] = React.useState();
  const [uploadingData, setUploadingData] = React.useState();
  React.useEffect(() => {
    callApi();
  }, [location?.state]);

  function handleNavigateToFiles(indexData, title) {
    navigate("/admin/files", { state: { title: title, data: indexData } });
  }

  function handleBackNavigate() {
    navigate(-1);
  }

  function callpostEmbededPreviewOneDriveFileApi(itemId) {
    if (location?.state?.title == 1) {
      const req = {
        itemId: itemId,
      };

      postEmbededPreviewOneDriveFile(req)
        .then((res) => {
          fileDownloading(res?.link?.webUrl);
        })
        .catch((err) => {
          toast.err("Something bad Happened!...");
        });
    }
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
        window.open(res?.link, "_blank", "noopener,noreferrer");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function callApi() {
    if (location?.state?.title == 1) {
      const req = {
        id: location?.state?.data?.id,
      };

      getOneDriveChildFolders(req)
        .then((res) => {
          setapiData(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (location?.state?.title == 2) {
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
          console.error(err);
        });
    }

    if (location?.state?.title == 3) {
      const data = JSON.stringify({
        method: "post",
        url: "https://api.dropboxapi.com/2/files/list_folder",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("dropboxAccessToken")}`,
        },
        data: {
          path: location?.state?.data?.path_lower,
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
          toast.error(err);
        });
    }
  }
  function fileDownloading(exportFormat) {
    window.open(exportFormat, "_blank", "noopener,noreferrer");
  }
  function handleOpenUploadFileModal() {
    setUploadFileModal(true);
  }
  function handleCloseUploadFileModal() {
    setUploadFileModal(false);
  }
  function handleOpenDeleteFolderModal() {
    setDeleteFolderModal(true);
  }
  function handleCloseDeleteFolderModal() {
    setDeleteFolderModal(false);
  }
  function handleOpenCreateNewFolderModal() {
    setCreateNewFolderModal(true);
  }
  function handleCloseCreateNewFolderModal() {
    setCreateNewFolderModal(false);
  }
  function handleOpenEditFolderModal() {
    setEditFolderModal(true);
  }
  function handleCloseEditFolderModal() {
    setEditFolderModal(false);
  }

  return (
    <Base title="Documents">
      {
        // ==========================> OneDrive <==========================
        location?.state?.title == 1 ? (
          <Column className="bg-white_A700 flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px] my-[32px] sm:mx-[0] sm:py-[15px] py-[18px] md:py-[9px] rounded-radius8 sm:w-[100%] w-[97%]">
            <Column className="flex flex-col items-center justify-start sm:mb-[129px] md:mb-[167px] mb-[100px] w-[100%]">
              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[97%]">
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
                    setLocationData(`items/${location?.state?.data?.id}`);
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
                    setLocationData(`items/${location?.state?.data?.id}`),
                      handleOpenUploadFileModal();
                  }}
                >
                  <div className="bg-transparent cursor-pointer font-medium text-[12px] text-white_A700">
                    Upload
                  </div>
                </Button>
              </Row>
              <Input
                className="font-medium p-[0] text-[16px] placeholder:text-black_901 text-black_901 w-[100%]"
                wrapClassName="flex md:mt-[8px] mt-[16px] sm:mt-[6px] w-[100%]"
                name="Group3615"
                placeholder={`${location?.state?.data?.name}`}
                prefix={
                  <Img
                    src="/images/img_arrowleft_gray_900.svg"
                    className="common-pointer ml-[10px] mr-[12px] sm:mr-[4px] sm:ml-[3px] md:mr-[6px] md:ml-[5px] my-[auto]"
                    alt="arrow_left"
                    onClick={handleBackNavigate}
                  />
                }
                size="2xl"
                variant="OutlineGray300"
              ></Input>

              <Column className="flex flex-col items-center justify-start md:mt-[12px] mt-[24px] sm:mt-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[97%]">
                <Grid className="sm:gap-[11px] md:gap-[15px] gap-[30px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 min-h-[auto] w-[100%] p-[20px]">
                  {apiData?.value?.map((apiDataResponseEle, index) => {
                    return (
                      <React.Fragment key={`apiDataResponseEle${index}`}>
                        <Column className="bg-white_A700 flex flex-col items-center justify-start md:p-[15px] sm:p-[15px] p-[30px] rounded-radius12 shadow-bs1 w-[100%]">
                          <Row className="flex flex-row w-[7%] ml-[190px]">
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
                          <Column className="flex flex-col items-center justify-start md:mb-[12px] mb-[25px] sm:mb-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[32%]">
                            {!apiDataResponseEle?.[
                              "@microsoft.graph.downloadUrl"
                            ] ? (
                              <Img
                                src="/images/img_folder_white_A700.png"
                                className="common-pointer max-w-[100%] w-[100%]"
                                alt="Folder"
                                onClick={() => {
                                  handleNavigateToFiles(
                                    apiDataResponseEle,
                                    location?.state?.title
                                  );
                                }}
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

                            <Text className="font-medium text-sm md:mt-[12px] mt-[12px] sm:mt-[9px] text-black_901 w-[max-content]">
                              {apiDataResponseEle?.name}
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
                      </React.Fragment>
                    );
                  })}
                </Grid>
              </Column>
            </Column>
          </Column>
        ) : // =======================> GoogleDrive <==========================

          location?.state?.title == 2 ? (
            <Column className="bg-white_A700 flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px] my-[32px] sm:mx-[0] sm:py-[15px] py-[18px] md:py-[9px] rounded-radius8 sm:w-[100%] w-[97%]">
              <Column className="flex flex-col items-center justify-start sm:mb-[129px] md:mb-[167px] mb-[100px] w-[100%]">
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[97%]">
                  <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-between rounded-radius4 w-[100%]">
                    <Text
                      className="font-medium text-black_901 ml-[10px] w-[auto]"
                      as="h5"
                      variant="h5"
                    >
                      GoogleDrive
                    </Text>
                  </Row>
                  <Button
                    className="flex items-center justify-center md:ml-[358px] min-w-[fit-content] ml-[auto] sm:ml-[277px] text-center w-[max-content] p-[10px]"
                    onClick={() => {
                      setLocationData(`child`);
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
                        className="common-pointer mr-[8px] sm:mr-[3px] md:mr-[4px] text-center"
                        alt="download"
                      />
                    }
                  >
                    <div className="bg-transparent cursor-pointer font-medium text-[12px] text-white_A700">
                      Download
                    </div>
                  </Button>
                  <Button
                    className="common-pointer flex items-center justify-center md:ml-[12px] min-w-[fit-content] ml-[24px] mr-[10px] sm:ml-[9px] text-center w-[max-content] p-[10px]"
                    onClick={() => {
                      setLocationData(`${location?.state?.data?.id}`),
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
                <Input
                  className="font-medium p-[0] text-[16px] placeholder:text-black_901 text-black_901 w-[100%]"
                  wrapClassName="flex md:mt-[8px] mt-[16px] sm:mt-[6px] w-[100%]"
                  name="Group3615"
                  placeholder={`${location?.state?.data?.name}`}
                  prefix={
                    <Img
                      src="/images/img_arrowleft_gray_900.svg"
                      className="common-pointer ml-[10px] mr-[12px] sm:mr-[4px] sm:ml-[3px] md:mr-[6px] md:ml-[5px] my-[auto]"
                      alt="arrow_left"
                      onClick={handleBackNavigate}
                    />
                  }
                  size="2xl"
                  variant="OutlineGray300"
                ></Input>

                <Column className="flex flex-col items-center justify-start md:mt-[12px] mt-[24px] sm:mt-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[97%]">
                  <Grid className="sm:gap-[11px] md:gap-[15px] gap-[30px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 min-h-[auto] w-[100%] p-[20px]">
                    {googleApiData?.files?.map((apiDataResponseEle, index) => {
                      {
                        if (
                          apiDataResponseEle?.parents == location?.state?.data?.id
                        ) {
                          return (
                            <React.Fragment key={`apiDataResponseEle${index}`}>
                              <Column className="bg-white_A700 flex flex-col items-center justify-start md:p-[15px] sm:p-[15px] p-[30px] rounded-radius12 shadow-bs1 w-[100%]">
                                <Row className="flex flex-row w-[7%] ml-[190px]">
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
                                <Column className="flex flex-col items-center justify-start md:mb-[12px] mb-[25px] sm:mb-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[32%]">
                                  {apiDataResponseEle?.["mimeType"] ==
                                    "application/vnd.google-apps.folder" ? (
                                    <Img
                                      src="/images/img_folder_white_A700.png"
                                      className="common-pointer max-w-[100%] w-[100%]"
                                      alt="Folder"
                                      onClick={() =>
                                        handleNavigateToFiles(
                                          apiDataResponseEle,
                                          location?.state?.title
                                        )
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

                                  <Text className="font-medium text-sm md:mt-[12px] mt-[12px] sm:mt-[9px] text-black_901 w-[max-content]">
                                    {apiDataResponseEle?.name}
                                  </Text>
                                </Column>
                              </Column>
                            </React.Fragment>
                          );
                        }
                      }
                    })}
                  </Grid>
                </Column>
              </Column>
            </Column>
          ) : // ========================> Dropbox <=========================

            location?.state?.title == 3 ? (
              <Column className="bg-white_A700 flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px] my-[32px] sm:mx-[0] sm:py-[15px] py-[18px] md:py-[9px] rounded-radius8 sm:w-[100%] w-[97%]">
                <Column className="flex flex-col items-center justify-start sm:mb-[129px] md:mb-[167px] mb-[100px] w-[100%]">
                  <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[97%]">
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
                      className="common-pointer flex items-center justify-center md:ml-[358px] min-w-[fit-content] ml-[auto] sm:ml-[277px] text-center w-[max-content] p-[10px]"
                      onClick={() => {
                        setLocationData(`${location?.state?.data?.path_lower}`);
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
                      className="common-pointer flex items-center justify-center md:ml-[12px] min-w-[fit-content] ml-[24px] sm:ml-[9px] text-center w-[max-content] p-[10px]"
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
                      className="common-pointer flex items-center justify-center md:ml-[12px] min-w-[fit-content] ml-[24px] mr-[10px] sm:ml-[9px] text-center w-[max-content] p-[10px]"
                      onClick={() => {
                        setLocationData(`${location?.state?.data?.path_lower}`),
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
                  <Input
                    className="font-medium p-[0] text-[16px] placeholder:text-black_901 text-black_901 w-[100%]"
                    wrapClassName="flex md:mt-[8px] mt-[16px] sm:mt-[6px] w-[100%]"
                    name="Group3615"
                    placeholder={`${location?.state?.data?.name}`}
                    prefix={
                      <Img
                        src="/images/img_arrowleft_gray_900.svg"
                        className="common-pointer ml-[10px] mr-[12px] sm:mr-[4px] sm:ml-[3px] md:mr-[6px] md:ml-[5px] my-[auto]"
                        alt="arrow_left"
                        onClick={handleBackNavigate}
                      />
                    }
                    size="2xl"
                    variant="OutlineGray300"
                  ></Input>

                  <Column className="flex flex-col items-center justify-start md:mt-[12px] mt-[24px] sm:mt-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[97%]">
                    <Grid className="sm:gap-[11px] md:gap-[15px] gap-[30px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 min-h-[auto] w-[100%] p-[20px]">
                      {dropboxApiData?.entries?.map((apiDataResponseEle, index) => {
                        return (
                          <React.Fragment key={`apiDataResponseEle${index}`}>
                            <Column className="bg-white_A700 flex flex-col items-center justify-start md:p-[15px] sm:p-[15px] p-[30px] rounded-radius12 shadow-bs1 w-[100%]">
                              <Row className="flex flex-row w-[7%] ml-[190px]">
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
                              <Column className="flex flex-col items-center justify-start md:mb-[12px] mb-[25px] sm:mb-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[32%]">
                                {apiDataResponseEle?.[".tag"] == "folder" ? (
                                  <Img
                                    src="/images/img_folder_white_A700.png"
                                    className="common-pointer max-w-[100%] w-[100%]"
                                    alt="Folder"
                                    onClick={() =>
                                      handleNavigateToFiles(
                                        apiDataResponseEle,
                                        location?.state?.title
                                      )
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

                                <Text className="font-medium text-sm md:mt-[12px] mt-[12px] sm:mt-[9px] text-black_901 w-[max-content]">
                                  {apiDataResponseEle?.name}
                                </Text>
                              </Column>
                            </Column>
                          </React.Fragment>
                        );
                      })}
                    </Grid>
                  </Column>
                </Column>
              </Column>
            ) : undefined
      }

      {isOpenDeleteFolderModal ? (
        <DeleteFolderModal
          data={indexData}
          location={locationData}
          uploadedOn={uploadingData}
          isOpen={isOpenDeleteFolderModal}
          apiCall={callApi}
          onRequestClose={handleCloseDeleteFolderModal}
        />
      ) : null}
      {isOpenCreateNewFolderModal ? (
        <CreateNewFolderModal
          location={locationData}
          uploadedOn={uploadingData}
          isOpen={isOpenCreateNewFolderModal}
          apiCall={callApi}
          onRequestClose={handleCloseCreateNewFolderModal}
        />
      ) : null}
      {isOpenUploadFileModal ? (
        <UploadFileModal
          location={locationData}
          uploadedOn={location?.state?.title}
          isOpen={isOpenUploadFileModal}
          apiCall={callApi}
          onRequestClose={handleCloseUploadFileModal}
        />
      ) : null}
      {isOpenEditFolderModal ? (
        <EditFolderModal
          data={indexData}
          location={locationData}
          uploadedOn={uploadingData}
          isOpen={isOpenEditFolderModal}
          apiCall={callApi}
          onRequestClose={handleCloseEditFolderModal}
        />
      ) : null}
      <ToastContainer />
    </Base>
  );
};

export default FilesPage;
