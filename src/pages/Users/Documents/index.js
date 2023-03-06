import React from "react";

import { Column, Grid, Img, Line, Row, Text } from "components";
import { useNavigate } from "react-router-dom";
import {
  getGoogleDriveFolders,
  getOneDriveFolders,
  getSettings,
  getTemporaryLinkOfDropbox,
  postEmbededPreviewOneDriveFile,
  postOneDropboxFileFolders,
  postPreviewDropboxFile
} from "service/api";
import Base from "../../../components/Base";

const DocumentsPage = () => {
  const [inputvalue, setInputvalue] = React.useState("");

  const [indexData, setIndexData] = React.useState();
  const [locationData, setLocationData] = React.useState();
  const [uploadingData, setUploadingData] = React.useState();

  const [apiData, setapiData] = React.useState();
  const [googleApiData, setGoogleApiData] = React.useState();
  const [dropboxApiData, setDropboxApiData] = React.useState();
  const [isOnedriveChecked, setIsOneDriveChecked] = React.useState();
  const [isGoogledriveChecked, setIsGoogleDriveChecked] = React.useState();
  const [isDropboxChecked, setIsDropboxeChecked] = React.useState();
  const navigate = useNavigate();

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
      });
  }

  function callPreviewDropboxFileApi(path) {
    const req = {
      data: {
        path: path,
      },
    };
    postPreviewDropboxFile(req)
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
    const req = { path: downloadPath };
    getTemporaryLinkOfDropbox(req)
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
        console.log(err);
      });
  }

  function callGoogleApi() {
    const req = {};
    getGoogleDriveFolders(req)
      .then((res) => {
        setGoogleApiData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function callDropBoxApi() {
    const req = {
      data: {
        path: "",
      },
    };
    postOneDropboxFileFolders(req)
      .then((res) => {
        setDropboxApiData(res);
      })
      .catch((err) => {
      });
  }
  function handleNavigateToFiles(indexData, title = 1) {
    navigate("/files", { state: { title: title, data: indexData } });
  }
  function fileDownloading(exportFormat) {
    window.open(exportFormat, "_blank", "noopener,noreferrer");
  }

  return (
    <Base title="Documents" headerType={2}>
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
            </Row>
            <Line className="bg-bluegray_100 h-[1px] mt-[18px] sm:mt-[7px] md:mt-[9px] w-[100%]" />
            <Column className="flex flex-col items-center justify-start sm:mt-[19px] md:mt-[25px] mt-[50px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[98%]">
              <Grid className="sm:gap-[11px] md:gap-[15px] gap-[30px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 min-h-[auto] w-[100%]">
                {apiData?.value?.map((apiDataResponseEle, index) => {
                  return (
                    <React.Fragment key={`apiDataResponseEle${index}`}>
                      <Column className="bg-white_A700 flex flex-col items-center justify-center md:p-[15px] sm:p-[15px] p-[30px] rounded-radius12 shadow-bs1 w-[100%]">
                        <Column className="flex flex-col items-center justify-center sm:mb-[11px] md:mb-[15px] mb-[30px] sm:mx-[0] pb-[3px] sm:px-[0] sm:w-[100%] w-[68%]">
                          {apiDataResponseEle?.[
                            "@microsoft.graph.downloadUrl"
                          ] ? (
                            <Img
                              src="/images/img_download_30X30.svg"
                              className="common-pointer sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] sm:ml-[101px] md:ml-[130px] ml-[240px] md:w-[12px] w-[24px] sm:w-[9px]"
                              alt="overflowmenu One"
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
        <Column className="bg-white_A700  flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px] my-[32px] sm:mx-[0] sm:p-[15px] p-[18px] md:p-[9px] rounded-radius8 sm:w-[100%] w-[97%]">
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
            </Row>
            <Line className="bg-bluegray_100 h-[1px] mt-[18px] sm:mt-[7px] md:mt-[9px] w-[100%]" />
            <Column className="flex flex-col items-center justify-start sm:mt-[19px] md:mt-[25px] mt-[50px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[98%]">
              <Grid className="sm:gap-[11px] md:gap-[15px] gap-[30px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 min-h-[auto] w-[100%]">
                {googleApiData?.files?.map((apiDataResponseEle, index) => {
                  if (apiDataResponseEle?.parents?.[0].length == 19) {
                    return (
                      <React.Fragment key={`apiDataResponseEle${index}`}>
                        <Column className="bg-white_A700 flex flex-col items-center justify-center md:p-[15px] sm:p-[15px] p-[30px] rounded-radius12 shadow-bs1 w-[100%]">
                          <Column className="flex flex-col items-center justify-center sm:mb-[11px] md:mb-[15px] mb-[30px] sm:mx-[0] pb-[3px] sm:px-[0] sm:w-[100%] w-[68%]">
                            {apiDataResponseEle?.["mimeType"] !=
                              "application/vnd.google-apps.folder" ? (
                              <Img
                                src="/images/img_download_30X30.svg"
                                className="common-pointer sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] sm:ml-[101px] md:ml-[130px] ml-[240px] md:w-[12px] w-[24px] sm:w-[9px]"
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
                                    switch (apiDataResponseEle?.["mimeType"]) {
                                      case "application/vnd.google-apps.document":
                                        fileDownloading(
                                          apiDataResponseEle?.["exportLinks"]?.[
                                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                          ]
                                        );
                                        break;

                                      case "application/vnd.google-apps.spreadsheet":
                                        fileDownloading(
                                          apiDataResponseEle?.["exportLinks"]?.[
                                          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                          ]
                                        );
                                        break;

                                      case "application/vnd.google-apps.presentation":
                                        fileDownloading(
                                          apiDataResponseEle?.["exportLinks"]?.[
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
            </Row>
            <Line className="bg-bluegray_100 h-[1px] mt-[18px] sm:mt-[7px] md:mt-[9px] w-[100%]" />
            <Column className="flex flex-col items-center justify-start sm:mt-[19px] md:mt-[25px] mt-[50px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[98%]">
              <Grid className="sm:gap-[11px] md:gap-[15px] gap-[30px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 min-h-[auto] w-[100%]">
                {dropboxApiData?.entries?.map((apiDataResponseEle, index) => {
                  return (
                    <React.Fragment key={`apiDataResponseEle${index}`}>
                      <Column className="bg-white_A700 flex flex-col items-center justify-center md:p-[15px] sm:p-[15px] p-[30px] rounded-radius12 shadow-bs1 w-[100%]">
                        <Column className="flex flex-col items-center justify-center sm:mb-[11px] md:mb-[15px] mb-[30px] sm:mx-[0] pb-[3px] sm:px-[0] sm:w-[100%] w-[68%]">
                          {apiDataResponseEle?.[".tag"] == "file" ? (
                            <Img
                              src="/images/img_download_30X30.svg"
                              className="common-pointer sm:h-[10px] md:h-[13px] h-[24px] max-w-[100%] sm:ml-[101px] md:ml-[130px] ml-[240px] md:w-[12px] w-[24px] sm:w-[9px]"
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
    </Base>
  );
};

export default DocumentsPage;
