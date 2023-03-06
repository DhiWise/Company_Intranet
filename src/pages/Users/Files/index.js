import React from "react";

import { Button, Column, Grid, Img, Input, Row, Text } from "components";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getGoogleDriveFolders,
  getOneDriveChildFolders,
  getTemporaryLinkOfDropbox,
  postEmbededPreviewOneDriveFile,
  postOneDropboxFileFolders,
  postPreviewDropboxFile
} from "service/api";
import Base from "../../../components/Base";

const FilesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [apiData, setapiData] = React.useState("");
  const [googleApiData, setGoogleApiData] = React.useState("");
  const [dropboxApiData, setDropboxApiData] = React.useState("");
  const [locationData, setLocationData] = React.useState();
  React.useEffect(() => {
    callApi();
  }, [location?.state]);

  function handleNavigateToFiles(indexData, title) {
    navigate("/files", { state: { title: title, data: indexData } });
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
      const req = {};
      getGoogleDriveFolders(req)
        .then((res) => {
          setGoogleApiData(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (location?.state?.title == 3) {
      const req = {
        data: {
          path: location?.state?.data?.path_lower,
        },
      };
      postOneDropboxFileFolders(req)
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

  return (
    <Base title="Documents" headerType={2}>
      {
        // ==========================> OneDrive <==========================
        location?.state?.title == 1 ? (
          <Column className="bg-white_A700  flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px] my-[32px] sm:mx-[0] sm:py-[15px] py-[18px] md:py-[9px] rounded-radius8 sm:w-[100%] w-[97%]">
            <Column className="flex flex-col items-center justify-start sm:mb-[129px] md:mb-[167px] mb-[100px] w-[100%]">
              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[97%]">
                <Row className="flex p-[10px] flex-row md:flex-wrap sm:flex-wrap items-center justify-between rounded-radius4 w-[100%]">
                  <Text
                    className="font-medium text-black_901 ml-[10px] w-[auto]"
                    as="h5"
                    variant="h5"
                  >
                    OneDrive
                  </Text>
                </Row>
              </Row>
              <Input
                className="font-medium text-[16px] placeholder:text-black_901 text-black_901 w-[100%]"
                wrapClassName="flex md:mt-[8px] mt-[16px] sm:mt-[6px] w-[100%]"
                name="Group3615"
                placeholder={`${location?.state?.data?.name}`}
                prefix={
                  <Img
                    src="images/img_arrowleft.svg"
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
                          <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:px-[0] w-[100%]">
                            {apiDataResponseEle?.[
                              "@microsoft.graph.downloadUrl"
                            ] ? (
                              <Button
                                className="bg-white_A700 flex sm:h-[12px] md:h-[16px] h-[30px] items-center justify-center sm:ml-[119px] md:ml-[153px] ml-[250px] sm:w-[11px] md:w-[15px] w-[30px]"
                                shape="icbRoundedBorder4"
                                size="smIcn"
                                variant="icbFillIndigo600"
                              >
                                <Img
                                  src="/images/img_download_30X30.svg"
                                  className="h-[24px] sm:h-[7px] md:h-[9px] flex items-center justify-center"
                                  alt="download"
                                  onClick={() =>
                                    fileDownloading(
                                      apiDataResponseEle?.[
                                      "@microsoft.graph.downloadUrl"
                                      ]
                                    )
                                  }
                                />
                              </Button>
                            ) : (
                              <div className=" h-[30px]"></div>
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
            <Column className="bg-white_A700 solid flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px] my-[32px] sm:mx-[0] sm:py-[15px] py-[18px] md:py-[9px] rounded-radius8 sm:w-[100%] w-[97%]">
              <Column className="flex flex-col items-center justify-start sm:mb-[129px] md:mb-[167px] mb-[100px] w-[100%]">
                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[97%]">
                  <Row className="flex p-[10px]  flex-row md:flex-wrap sm:flex-wrap items-center justify-between rounded-radius4 w-[100%]">
                    <Text
                      className="font-medium text-black_901 ml-[10px] w-[auto]"
                      as="h5"
                      variant="h5"
                    >
                      GoogleDrive
                    </Text>
                  </Row>
                </Row>
                <Input
                  className="font-medium p-[10px] text-[16px] placeholder:text-black_901 text-black_901 w-[100%]"
                  wrapClassName="flex md:mt-[8px] mt-[16px] sm:mt-[6px] w-[100%]"
                  name="Group3615"
                  placeholder={`${location?.state?.data?.name}`}
                  prefix={
                    <Img
                      src="images/img_arrowleft.svg"
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
                                <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:px-[0] w-[100%]">
                                  {apiDataResponseEle?.["mimeType"] !=
                                    "application/vnd.google-apps.folder" ? (
                                    <Button
                                      className="bg-white_A700 flex sm:h-[12px] md:h-[16px] h-[30px] items-center justify-center sm:ml-[119px] md:ml-[153px] ml-[250px] sm:w-[11px] md:w-[15px] w-[30px]"
                                      shape="icbRoundedBorder4"
                                      size="smIcn"
                                      variant="icbFillIndigo600"
                                    >
                                      <Img
                                        src="/images/img_download_30X30.svg"
                                        className="common-pointer h-[16px] sm:h-[7px] md:h-[9px] flex items-center justify-center"
                                        alt="download"
                                        onClick={() => {
                                          if (
                                            apiDataResponseEle.hasOwnProperty(
                                              "webContentLink"
                                            )
                                          ) {
                                            fileDownloading(
                                              apiDataResponseEle?.[
                                              "webContentLink"
                                              ]
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
                                    </Button>
                                  ) : (
                                    <div className="h-[30px]"></div>
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
              <Column className="bg-white_A700  flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px] my-[32px] sm:mx-[0] sm:py-[15px] py-[18px] md:py-[9px] rounded-radius8 sm:w-[100%] w-[97%]">
                <Column className="flex flex-col items-center justify-start sm:mb-[129px] md:mb-[167px] mb-[100px] w-[100%]">
                  <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[97%]">
                    <Row className="flex p-[10px] flex-row md:flex-wrap sm:flex-wrap items-center justify-between rounded-radius4 w-[100%]">
                      <Text
                        className="font-medium text-black_901 ml-[10px] w-[auto]"
                        as="h5"
                        variant="h5"
                      >
                        Dropbox
                      </Text>
                    </Row>
                  </Row>
                  <Input
                    className="font-medium p-[10px] text-[16px] placeholder:text-black_901 text-black_901 w-[100%]"
                    wrapClassName="flex md:mt-[8px] mt-[16px] sm:mt-[6px] w-[100%]"
                    name="Group3615"
                    placeholder={`${location?.state?.data?.name}`}
                    prefix={
                      <Img
                        src="images/img_arrowleft.svg"
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
                              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center sm:px-[0] w-[100%]">
                                {apiDataResponseEle?.[".tag"] == "file" ? (
                                  <Button
                                    className="bg-white_A700 flex sm:h-[12px] md:h-[16px] h-[30px] items-center justify-center sm:ml-[119px] md:ml-[153px] ml-[250px] sm:w-[11px] md:w-[15px] w-[30px]"
                                    shape="icbRoundedBorder4"
                                    size="smIcn"
                                    variant="icbFillIndigo600"
                                  >
                                    <Img
                                      src="/images/img_download_30X30.svg"
                                      className="h-[16px] sm:h-[7px] md:h-[9px] flex items-center justify-center"
                                      alt="download"
                                      onClick={() => {
                                        callDownloadFileOfDropboxApi(
                                          apiDataResponseEle?.path_lower
                                        );
                                      }}
                                    />
                                  </Button>
                                ) : (
                                  <div className="h-[30px]"></div>
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
    </Base>
  );
};

export default FilesPage;
