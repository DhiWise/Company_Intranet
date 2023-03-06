import React, { useState } from "react";

import { Button, Column, Img, Row, Text } from "components";
import Sidebar from "components/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import { getSettings, patchSettings } from "service/api";
import { Footer } from "../../../components/index.js";

const DataSettingsPage = () => {
  const [inputvalue, setInputvalue] = React.useState("");
  const [isOnedriveChecked, setIsOneDriveChecked] = useState();
  const [isGoogledriveChecked, setIsGoogleDriveChecked] = useState();
  const [isDropboxChecked, setIsDropboxeChecked] = useState();

  React.useEffect(() => {
    callApi();
  }, []);

  function callApi() {
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

  function callPatchSettingsApi(id, is_selected) {
    const req = {
      id: `eq.${id}`,
      data: {
        is_selected: is_selected,
      },
    };
    patchSettings(req)
      .then((res) => {
        id == 1
          ? setIsOneDriveChecked(res[0]["is_selected"])
          : id == 2
            ? setIsGoogleDriveChecked(res[0]["is_selected"])
            : id == 3
              ? setIsDropboxeChecked(res[0]["is_selected"])
              : undefined;

        is_selected ?
          toast.success("Sync Successfully") :
          toast.success("Unsync Successfully")
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Column className="bg-gray_100 flex flex-col font-inter items-center justify-start mx-[auto] sm:pb-[15px] md:pb-[195px] pb-[379px] w-[100%]">
        <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start justify-evenly w-[100%]">
          <Sidebar className="w-[18%]" />
          <Column className="flex flex-col items-center justify-start max-w-[1640px] ml-[auto] mr-[auto] sm:mx-[0] sm:pl-[15px] sm:pr-[15px] sm:px-[0] w-[100%]">
            <Header>Data Settings</Header>
            <Column className="bg-white_A700 border-bw06 border-gray_300 border-solid flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px] mt-[32px] sm:mx-[0] sm:p-[15px] md:p-[33px] p-[64px] rounded-radius483 sm:w-[100%] w-[46%]">
              <Text
                className="font-medium text-bluegray_900 w-[auto]"
                as="h2"
                variant="h2"
              >
                Manage Files
              </Text>
              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-end justify-center sm:mt-[14px] md:mt-[18px] mt-[36px] sm:mx-[0] sm:px-[0] sm:w-[100%]">
                {isOnedriveChecked ? (
                  <Button
                    className="flex sm:h-[13px] md:h-[17px] h-[32px] items-center justify-center sm:w-[12px] md:w-[16px] w-[32px]"
                    shape="icbRoundedBorder4"
                    size="smIcn"
                    onClick={() => {
                      callPatchSettingsApi(1, false),
                        setIsOneDriveChecked(!isOnedriveChecked);
                    }}
                    variant="icbFillIndigo600"
                  >
                    <Img
                      src="/images/img_checkmark.svg"
                      className="h-[26px] sm:h-[11px] md:h-[14px] flex items-center justify-center"
                      alt="checkmark"
                    />
                  </Button>
                ) : (
                  <div
                    onClick={() => {
                      callPatchSettingsApi(1, true),
                        setIsOneDriveChecked(!isOnedriveChecked);
                    }}
                    className="common-pointer bg-white_A700 border-bluegray_51 border-bw133 border-solid sm:h-[13px] md:h-[17px] h-[32px] rounded-radius4 sm:w-[12px] md:w-[16px] w-[32px]"
                  ></div>
                )}
                <Text
                  className="font-normal mb-[4px] ml-[14px] sm:ml-[5px] md:ml-[7px] sm:mt-[3px] md:mt-[4px] mt-[8px] not-italic text-black_901 w-[auto]"
                  as="h4"
                  variant="h4"
                >
                  OneDrive
                </Text>
              </Row>

              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-end justify-center sm:mt-[14px] md:mt-[18px] mt-[36px] sm:mx-[0] sm:px-[0] sm:w-[100%]">
                {isGoogledriveChecked ? (
                  <Button
                    className="flex sm:h-[13px] md:h-[17px] h-[32px] items-center justify-center sm:w-[12px] md:w-[16px] w-[32px]"
                    shape="icbRoundedBorder4"
                    size="smIcn"
                    onClick={() => {
                      callPatchSettingsApi(2, false),
                        setIsGoogleDriveChecked(!isGoogledriveChecked);
                    }}
                    variant="icbFillIndigo600"
                  >
                    <Img
                      src="/images/img_checkmark.svg"
                      className="h-[26px] sm:h-[11px] md:h-[14px] flex items-center justify-center"
                      alt="checkmark"
                    />
                  </Button>
                ) : (
                  <div
                    onClick={() => {
                      callPatchSettingsApi(2, true),
                        setIsGoogleDriveChecked(!isGoogledriveChecked);
                    }}
                    className="common-pointer bg-white_A700 border-bluegray_51 border-bw133 border-solid sm:h-[13px] md:h-[17px] h-[32px] rounded-radius4 sm:w-[12px] md:w-[16px] w-[32px]"
                  ></div>
                )}
                <Text
                  className="font-normal mb-[4px] ml-[14px] sm:ml-[5px] md:ml-[7px] sm:mt-[3px] md:mt-[4px] mt-[8px] not-italic text-black_901 w-[auto]"
                  as="h4"
                  variant="h4"
                >
                  Google Drive
                </Text>
              </Row>

              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-end justify-center sm:mt-[14px] md:mt-[18px] mt-[36px] sm:mx-[0] sm:px-[0] sm:w-[100%]">
                {isDropboxChecked ? (
                  <Button
                    className="flex sm:h-[13px] md:h-[17px] h-[32px] items-center justify-center sm:w-[12px] md:w-[16px] w-[32px]"
                    shape="icbRoundedBorder4"
                    size="smIcn"
                    onClick={() => {
                      callPatchSettingsApi(3, false),
                        setIsDropboxeChecked(!isDropboxChecked);
                    }}
                    variant="icbFillIndigo600"
                  >
                    <Img
                      src="/images/img_checkmark.svg"
                      className="h-[26px] sm:h-[11px] md:h-[14px] flex items-center justify-center"
                      alt="checkmark"
                    />
                  </Button>
                ) : (
                  <div
                    onClick={() => {
                      callPatchSettingsApi(3, true),
                        setIsDropboxeChecked(!isDropboxChecked);
                    }}
                    className="common-pointer bg-white_A700 border-bluegray_51 border-bw133 border-solid sm:h-[13px] md:h-[17px] h-[32px] rounded-radius4 sm:w-[12px] md:w-[16px] w-[32px]"
                  ></div>
                )}
                <Text
                  className="font-normal mb-[4px] ml-[14px] sm:ml-[5px] md:ml-[7px] sm:mt-[3px] md:mt-[4px] mt-[8px] not-italic text-black_901 w-[auto]"
                  as="h4"
                  variant="h4"
                >
                  Dropbox
                </Text>
              </Row>

            </Column>
          </Column>
        </Row>
      </Column>
      <Footer />

      <ToastContainer />
    </>
  );
};

export default DataSettingsPage;
