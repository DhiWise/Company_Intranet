import React, { useState } from "react";

import {
  Button,
  CheckBox,
  Column,
  Img,
  Input,
  List,
  Row,
  Text
} from "components";
import { ConfirmSync } from "modals/confirmSync";
import "react-circular-progressbar/dist/styles.css";
import Confetti from "react-confetti";
import { toast, ToastContainer } from "react-toastify";
import useWindowSize from "react-use/lib/useWindowSize";
import { getToolsselect, patchToolstooleqKeka } from "service/api";
import Base from "../../../components/Base";
import { LoaderPercentage } from "../../../components/LoaderPercentage";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import {
  BACKEND_URL,
  FILE_FOLDER_TOKEN_CONST,
  KEKA_CREDS,
  KEKA_ORGANISATION_NAME
} from "../../../constant";

import useForm from "hooks/useForm";
import { isEmpty } from "lodash";
import localStorage from "redux-persist/es/storage";
import * as yup from "yup";
import {
  deleteToolEmployees,
  getEmployeeByWorkEmail,
  getEmployeeFromKeka,
  getSettings,
  patchSettings,
  postDropboxAccessToken,
  postGoogleDriveAccessToken,
  postInvite,
  postOneDriveAccessToken,
  postToken,
  updateToolEmployee
} from "../../../service/api";

export var one_drive_token = {
  client_id: "Hello",
  scope: "files.readwrite.all offline_access",
  client_secret: "",
  redirect_uri: "",
  response_type: "code",
  code: "",
  grant_type: "authorization_code", // "refresh_token" for refresh token
  refresh_token: "",
  is_data_filled: false,
};

const ToolSettingsPage = () => {
  const { width, height } = useWindowSize();
  const [inputvalue, setInputvalue] = React.useState("");
  const [isConfettiVisible, setConfettiVisible] = React.useState(false);
  const [toolData, settoolData] = React.useState();
  const [isOpenConfirmSyncModal, setisOpenConfirmSyncModal] =
    React.useState(false);
  const [kekaData, setKekaData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoaderPercentage, setisLoaderPercentage] = React.useState(false);
  const [kekaAccessToken, setkekaAccessToken] = React.useState();

  // Google drvie token data
  const [googleDriveTokenItem, setGoogleDriveTokenItem] = React.useState();
  // dropbox token data
  const [dropboxTokenItem, setDropboxTokenItem] = React.useState();

  React.useEffect(() => {
    // localStorage.setItem(
    //   "ABCD",
    //   JSON.stringify("ABCDABCD")
    // );
    console.log(getDataFromLocalStorage("onedriveClientId"));
    console.log(getDataFromLocalStorage("onedriveRediretUri"));
    console.log(getDataFromLocalStorage("onedriveClientSecret"));
    console.log(getDataFromLocalStorage("onedriveCode"));
  }, []);

  const [emailDiff, setEmaildiff] = React.useState();
  const [dataDiff, setDataDiff] = React.useState();
  const [empData, setempData] = React.useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    display_name: "",
    gender: "",
    joining_date: null,
    phone_number: "",
    work_email: "",
    job_title: "",
    employee_number: "",
    id: "",
    image: [],
  });
  const [percentage, setpercentage] = React.useState(0);
  const [invited, setinvited] = React.useState(0);
  const [isOnedriveChecked, setIsOneDriveChecked] = useState();
  const [isGoogledriveChecked, setIsGoogleDriveChecked] = useState();
  const [isDropboxChecked, setIsDropboxeChecked] = useState();

  const getData = (data) => {
    const newData = data?.map((x) => {
      return {
        first_name: x?.firstName,
        middle_name: x?.middleName,
        last_name: x?.lastName,
        display_name: x?.displayName,
        gender: x?.gender,
        joining_date: x?.joiningDate,
        phone_number: x?.mobilePhone,
        work_email: x?.email,
        personal_email: x?.personalEmail,
        job_title: x?.jobTitle?.title,
        employee_number: x?.employeeNumber,
        id: x?.id,
        image: [x?.image?.thumbs],
        secondary_job_title: x?.secondaryJobTitle,
        time_type: x?.timeType,
        birth_date: x?.dateOfBirth,
      };
    });
    setempData(newData);
  };

  React.useEffect(() => {
    getData(dataDiff);
  }, [dataDiff]);

  function handleOpenFilterModal() {
    setisOpenConfirmSyncModal(true);
  }

  function handleCloseFilterModal() {
    setisOpenConfirmSyncModal(false);
  }

  React.useEffect(() => {
    callApi();
    getKekaAccessToken();
  }, []);

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

  // =================> ONEDRIVE FORM & VALIDATION SCHEMA =================

  const formValidationSchema = yup.object().shape({
    client_id: yup.string().required("Client Id is required"),
    redirect_uri: yup.string().required("URL is required"),
    client_secret: yup.string().required("Client Secret is required"),
  });

  const onedriveForm = useForm(
    {
      client_id: "",
      redirect_uri: "",
      client_secret: "",
    },

    {
      validate: true,
      validateSchema: formValidationSchema,
      validationOnChange: true,
    }
  );

  // =================> GOOGLEDRIVE FORM & VALIDATION SCHEMA =================

  const googleDriveformValidationSchema = yup.object().shape({
    client_id: yup.string().required("Client Id is required"),
    redirect_uri: yup.string().required("URL is required"),
    client_secret: yup.string().required("Client Secret is required"),
  });

  const googleDriveForm = useForm(
    {
      client_id: "",
      redirect_uri: "",
      client_secret: "",
    },

    {
      validate: true,
      validateSchema: googleDriveformValidationSchema,
      validationOnChange: true,
    }
  );

  // =================> DROPBOX FORM & VALIDATION SCHEMA =================

  const dropboxformValidationSchema = yup.object().shape({
    client_id: yup.string().required("Client Id is required"),
    redirect_uri: yup.string().required("URL is required"),
    client_secret: yup.string().required("Client Secret is required"),
  });

  const dropboxForm = useForm(
    {
      client_id: "",
      redirect_uri: "",
      client_secret: "",
    },
    {
      validate: true,
      validateSchema: dropboxformValidationSchema,
      validationOnChange: true,
    }
  );

  // ============================> CHECK QUERYSTRING <==========================

  React.useEffect(() => {
    window.location.search != "" && checkQueryParam();
  }, []);

  function checkQueryParam() {
    const queryParams = new URLSearchParams(window.location.search);
    const urlCode = queryParams.get("code");
    if (queryParams.get("code")) {
      if (!isEmpty(urlCode)) {
        // Check if "OneDrive" client id is not null then add code and call token api
        if (
          !isEmpty(
            getDataFromLocalStorage(
              FILE_FOLDER_TOKEN_CONST.ONE_DRIVE_TOKEN.CLIENT_ID
            )
          )
        ) {
          setDataToLocalStorage(
            FILE_FOLDER_TOKEN_CONST.ONE_DRIVE_TOKEN.CODE,
            urlCode
          );
          callpostOneDriveAccessTokenApi();
        }
        // Check if "GoogleDrive" client id is not null then add code and call token api
        if (
          !isEmpty(
            getDataFromLocalStorage(
              FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN.CLIENT_ID
            )
          )
        ) {
          setDataToLocalStorage(
            FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN.CODE,
            urlCode
          );
          callpostGoogleDriveAccessTokenApi();
        }
        // Check if "DropBox" client id is not null then add code and call token api
        if (
          !isEmpty(
            getDataFromLocalStorage(
              FILE_FOLDER_TOKEN_CONST.DROPBOX_TOKEN.CLIENT_ID
            )
          )
        ) {
          setDataToLocalStorage(
            FILE_FOLDER_TOKEN_CONST.DROPBOX_TOKEN.CODE,
            urlCode
          );
          callpostDropboxAccessTokenApi();
        }

        // window.close();
      } else {
        window.close();
        toast.error("Invalid Crendential!");
      }
    } else {
      // window.close();
      RemoveDataFromLocalStorage(
        FILE_FOLDER_TOKEN_CONST.ONE_DRIVE_TOKEN.CLIENT_ID
      );
      RemoveDataFromLocalStorage(
        FILE_FOLDER_TOKEN_CONST.ONE_DRIVE_TOKEN.CLIENT_SECRET
      );
      RemoveDataFromLocalStorage(
        FILE_FOLDER_TOKEN_CONST.ONE_DRIVE_TOKEN.REDIRECT_URI
      );
      RemoveDataFromLocalStorage(
        FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN.CLIENT_ID
      );
      RemoveDataFromLocalStorage(
        FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN.CLIENT_SECRET
      );
      RemoveDataFromLocalStorage(
        FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN.REDIRECT_URI
      );
      RemoveDataFromLocalStorage(
        FILE_FOLDER_TOKEN_CONST.DROPBOX_TOKEN.CLIENT_ID
      );
      RemoveDataFromLocalStorage(
        FILE_FOLDER_TOKEN_CONST.DROPBOX_TOKEN.CLIENT_SECRET
      );
      RemoveDataFromLocalStorage(
        FILE_FOLDER_TOKEN_CONST.DROPBOX_TOKEN.REDIRECT_URI
      );
    }
  }

  function openNewTab(url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  // =================================> ONEDRIVE SYNC API <================================

  function handleOnedriveTokenData() {
    setDataToLocalStorage(
      FILE_FOLDER_TOKEN_CONST.ONE_DRIVE_TOKEN.CLIENT_ID,
      onedriveForm?.values?.["client_id"]
    );
    setDataToLocalStorage(
      FILE_FOLDER_TOKEN_CONST.ONE_DRIVE_TOKEN.CLIENT_SECRET,
      onedriveForm?.values?.["client_secret"]
    );
    setDataToLocalStorage(
      FILE_FOLDER_TOKEN_CONST.ONE_DRIVE_TOKEN.REDIRECT_URI,
      onedriveForm?.values?.["redirect_uri"]
    );
    callOneDriveCodeApi();
  }

  function callOneDriveCodeApi() {
    let tokenUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${onedriveForm?.values?.["client_id"]}&scope=files.readwrite.all offline_access&response_type=code&redirect_uri=${onedriveForm?.values?.["redirect_uri"]}`;
    openNewTab(tokenUrl);
  }

  function callpostOneDriveAccessTokenApi() {
    const data = JSON.stringify({
      method: "post",
      url: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      // params: payload?.params,
      data: {
        client_id: getDataFromLocalStorage(
          FILE_FOLDER_TOKEN_CONST.ONE_DRIVE_TOKEN.CLIENT_ID
        ),
        redirect_uri: getDataFromLocalStorage(
          FILE_FOLDER_TOKEN_CONST.ONE_DRIVE_TOKEN.REDIRECT_URI
        ),
        client_secret: getDataFromLocalStorage(
          FILE_FOLDER_TOKEN_CONST.ONE_DRIVE_TOKEN.CLIENT_SECRET
        ),
        code: getDataFromLocalStorage(
          FILE_FOLDER_TOKEN_CONST.ONE_DRIVE_TOKEN.CODE
        ),
        grant_type: "authorization_code",
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

    postOneDriveAccessToken(config)
      .then((res) => {
        RemoveDataFromLocalStorage(
          FILE_FOLDER_TOKEN_CONST.ONE_DRIVE_TOKEN.CODE
        );
        setDataToLocalStorage(
          FILE_FOLDER_TOKEN_CONST.ONE_DRIVE_TOKEN.ACCESS_TOKEN,
          res?.["access_token"]
        );
        setDataToLocalStorage(
          FILE_FOLDER_TOKEN_CONST.ONE_DRIVE_TOKEN.REFRESH_TOKEN,
          res?.["refresh_token"]
        );
        callPatchSettingsApi(1, true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // =================================> GOOGLEDRIVE SYNC API <================================

  function handleGoogledriveTokenData() {
    setDataToLocalStorage(
      FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN.CLIENT_ID,
      googleDriveForm?.values?.["client_id"]
    );
    setDataToLocalStorage(
      FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN.CLIENT_SECRET,
      googleDriveForm?.values?.["client_secret"]
    );
    setDataToLocalStorage(
      FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN.REDIRECT_URI,
      googleDriveForm?.values?.["redirect_uri"]
    );
    callGoogleDriveCodeApi();
  }

  function callGoogleDriveCodeApi() {
    let tokenUrl = `https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/drive&response_type=code&access_type=offline&redirect_uri=${googleDriveForm?.values?.["redirect_uri"]}&client_id=${googleDriveForm?.values?.["client_id"]}`;
    openNewTab(tokenUrl);
  }

  function callpostGoogleDriveAccessTokenApi() {
    const data = JSON.stringify({
      method: "post",
      url: "https://oauth2.googleapis.com/token",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: {
        grant_type: "authorization_code",
        code: getDataFromLocalStorage(
          FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN.CODE
        ),
        client_id: getDataFromLocalStorage(
          FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN.CLIENT_ID
        ),
        client_secret: getDataFromLocalStorage(
          FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN.CLIENT_SECRET
        ),
        redirect_uri: getDataFromLocalStorage(
          FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN.REDIRECT_URI
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

    postGoogleDriveAccessToken(config)
      .then((res) => {
        RemoveDataFromLocalStorage(
          FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN.CODE
        );
        setDataToLocalStorage(
          FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN.ACCESS_TOKEN,
          res?.["access_token"]
        );
        setDataToLocalStorage(
          FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN.REFRESH_TOKEN,
          res?.["refresh_token"]
        );
        callPatchSettingsApi(2, true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // =================================> DROPBOX SYNC API <================================

  function handleDropboxTokenData() {
    setDataToLocalStorage(
      FILE_FOLDER_TOKEN_CONST.DROPBOX_TOKEN.CLIENT_ID,
      dropboxForm?.values?.["client_id"]
    );
    setDataToLocalStorage(
      FILE_FOLDER_TOKEN_CONST.DROPBOX_TOKEN.CLIENT_SECRET,
      dropboxForm?.values?.["client_secret"]
    );
    setDataToLocalStorage(
      FILE_FOLDER_TOKEN_CONST.DROPBOX_TOKEN.REDIRECT_URI,
      dropboxForm?.values?.["redirect_uri"]
    );
    callDropboxCodeApi();
  }

  function callDropboxCodeApi() {
    let tokenUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${dropboxForm?.values?.["client_id"]}&token_access_type=offline&response_type=code&redirect_uri=${dropboxForm?.values?.["redirect_uri"]}`;
    openNewTab(tokenUrl);
  }

  function callpostDropboxAccessTokenApi() {
    const data = JSON.stringify({
      method: "post",
      url: "https://api.dropboxapi.com/oauth2/token",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: {
        code: getDataFromLocalStorage(
          FILE_FOLDER_TOKEN_CONST.DROPBOX_TOKEN.CODE
        ),
        grant_type: "authorization_code",
        redirect_uri: getDataFromLocalStorage(
          FILE_FOLDER_TOKEN_CONST.DROPBOX_TOKEN.REDIRECT_URI
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
        RemoveDataFromLocalStorage(FILE_FOLDER_TOKEN_CONST.DROPBOX_TOKEN.CODE);
        setDataToLocalStorage(
          FILE_FOLDER_TOKEN_CONST.DROPBOX_TOKEN.ACCESS_TOKEN,
          res?.["access_token"]
        );
        setDataToLocalStorage(
          FILE_FOLDER_TOKEN_CONST.DROPBOX_TOKEN.REFRESH_TOKEN,
          res?.["refresh_token"]
        );
        callPatchSettingsApi(3, true);
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
          FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN.DROPBOX_TOKEN,
          res?.["access_token"]
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    callSettingsApi();
  }, []);

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

        is_selected
          ? toast.success("Sync Successfully")
          : toast.success("Unsync Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function callApi() {
    const req = { params: { select: "*" } };

    getToolsselect(req)
      .then((res) => {
        settoolData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function toolIntegration(data) {
    data = data?.map((obj) => {
      return { ...obj, is_synced: obj?.integration_status };
    });
    const req = {
      data: data,
    };

    patchToolstooleqKeka(req)
      .then((res) => {
        settoolData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function deleteIntegration(toolID) {
    const data = toolData?.map((obj) => {
      if (obj?.id === toolID) {
        return {
          ...obj,
          integration_status: !obj?.integration_status,
          is_synced: !obj?.is_synced,
        };
      }
      return obj;
    });
    setIsLoading(true);
    settoolData(data);
    const req = {
      params: { tool: `eq.${toolID}` },
    };

    deleteToolEmployees(req)
      .then((res) => {
        toolIntegration(data);
        // setapiData(res);
        setIsLoading(false);
        toast.success("Employees Deleted Successfully");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function inviteEmployee(i = 0) {
    let email = empData[i]?.work_email;
    const req = { data: { email: email } };
    setisLoaderPercentage(true);
    await postInvite(req)
      .then((res) => {
        updateEmployee(empData[i]);
        setpercentage(((i + 1) / empData?.length) * 100);
        i + 1 < empData?.length
          ? (inviteEmployee(i + 1), setinvited(i + 1))
          : (resetLoader(), toolIntegration(toolData));
      })
      .catch((err) => {
        console.error(err);
        updateEmployee(empData[i]);
        setpercentage(((i + 1) / empData?.length) * 100);
        i + 1 < empData?.length
          ? (inviteEmployee(i + 1), setinvited(i + 1))
          : (resetLoader(), toolIntegration(toolData));
      });
  }

  function resetLoader() {
    setisLoaderPercentage(false),
      setConfettiVisible(true),
      setpercentage(0),
      setinvited(0);
  }

  function updateEmployee(data) {
    const req = {
      data: { ...data, tool: 1 },
      params: { work_email: `eq.${data?.work_email}` },
    };
    updateToolEmployee(req)
      .then((res) => { })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleChange = (e) => {
    const data = toolData?.map((obj) => {
      if (obj?.tool === e.target.name) {
        return { ...obj, integration_status: e.target.checked };
      }
      return obj;
    });
    settoolData(data);
  };

  const getKekaAccessToken = React.useCallback(() => {
    const req = {
      data: new URLSearchParams({
        grant_type: "kekaapi",
        scope: "kekaapi",
        api_key: KEKA_CREDS.KEKA_API_KEY,
        client_id: KEKA_CREDS.KEKA_CLIENT_ID,
        client_secret: KEKA_CREDS.KEKA_CLIENT_SECRET_KEY,
      }),
    };

    postToken(req)
      .then((res) => {
        setkekaAccessToken(res?.access_token);
        // getKekaEmployees();
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const getKekaEmployees = () => {
    const data = JSON.stringify({
      method: "get",
      url: `https://${KEKA_ORGANISATION_NAME}.keka.com/api/v1/hris/employees`,
      headers: {
        accept: "application/json",
        authorization: `Bearer ${kekaAccessToken}`,
      },
      params: {
        inProbation: false,
        inNoticePeriod: false,
        pageSize: "200",
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
    setIsLoading(true);
    getEmployeeFromKeka(config)
      .then((res) => {
        if (res?.status === 401) {
          getKekaAccessToken();
        } else {
          setKekaData(res);
          getSupabaseData(res?.data);
          handleOpenFilterModal();
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err.response?.data?.message);
        if (err?.response?.status === 401) {
          getKekaAccessToken();
        }
        toast.error(err.response?.data?.message);
        setIsLoading(false);
      });
  };

  function getSupabaseData(data) {
    const email = data
      ?.map((e) => {
        return e?.email;
      })
      .join(",");
    const req = {
      params: {
        select: "*",
        work_email: `in.(${email})`,
      },
    };
    setIsLoading(true);
    getEmployeeByWorkEmail(req)
      .then((res) => {
        getDifference(data, res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const getDifference = (data, supaEmail) => {
    const kekaEmail = data?.map((data) => {
      return data?.email;
    });
    const emailData = supaEmail?.map((data) => {
      return data?.work_email;
    });
    let difference = kekaEmail.filter((x) => !emailData.includes(x));
    let diff = data.filter(
      ({ email: email1 }) =>
        !supaEmail.some(({ work_email: email2 }) => email1 === email2)
    );

    setDataDiff(
      diff?.filter((el) => {
        return el?.email != null;
      })
    );
    setEmaildiff(
      difference?.filter((el) => {
        return el != null;
      })
    );
  };

  React.useEffect(() => {
    setTimeout(() => {
      setConfettiVisible(false);
    }, 4000);
  }, [isConfettiVisible]);

  return (
    <Base title="Tool Settings">
      {isConfettiVisible && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          tweenDuration={4000}
          numberOfPieces={400}
          gravity={1.5}
        />
      )}
      {isLoaderPercentage ? (
        <LoaderPercentage
          percentage={percentage}
          total={empData.length}
          invites={invited}
        />
      ) : null}

      <Column className="flex flex-col font-inter items-center justify-start mx-[auto] sm:pb-[15px] md:pb-[195px] w-[100%] min-h-screen">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Column className="flex flex-col items-center justify-start max-w-[1640px] ml-[auto] mr-[auto] sm:mx-[0] sm:pl-[15px] sm:pr-[15px] sm:px-[0] w-[100%]">
            <Column className="bg-white_A700 flex flex-col items-center justify-center sm:mt-[12px] md:mt-[16px] mt-[32px] sm:mx-[0] sm:p-[15px] md:p-[33px] p-[64px] rounded-radius483 sm:w-[100%] w-[97%]">
              <Text
                className="font-medium text-bluegray_900 w-[auto]"
                as="h2"
                variant="h2"
              >
                Manage Employee
              </Text>
              <List
                className="sm:gap-[14px] md:gap-[18px] gap-[36px] grid min-h-[auto] sm:mt-[14px] md:mt-[18px] mt-[36px] sm:w-[100%] w-[68%]"
                orientation="vertical"
              >
                {toolData?.map((data) => {
                  return (
                    <Column className="flex flex-col items-center justify-center w-[100%]">
                      <Column className="flex flex-col justify-center items-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[82%]">
                        <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[27%] py-[2%]">
                          <CheckBox
                            className="font-medium flex lg:mt-[10px] xl:mt-[13px] 2xl:mt-[15px] 3xl:mt-[18px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-bluegray_402"
                            inputClassName="h-[24px] mr-[5px] w-[24px]"
                            name={data?.tool}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            checked={data?.integration_status}
                            value={data?.id}
                            label={data?.tool}
                            shape="RoundedBorder2"
                            variant="OutlineBluegray101"
                          ></CheckBox>
                        </Row>
                      </Column>
                      {data?.is_synced ? (
                        <Row className="flex justify-center flex-row md:flex-wrap sm:flex-wrap items-center ml-[auto] mt-[16px] sm:mt-[6px] md:mt-[8px] sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[100%]">
                          <Button
                            className="common-pointer font-medium xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-center w-[25%]"
                            onClick={() => {
                              // toolIntegration(toolData),
                              getKekaEmployees();
                              // handleOpenFilterModal()
                            }}
                          >
                            Resync {data?.tool}
                          </Button>
                          {/* <Button
                              className="common-pointer font-medium xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-center w-[43%]"
                              onClick={() => deleteIntegration(data?.id)}
                            >
                              Delete
                            </Button> */}
                        </Row>
                      ) : (
                        <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-center justify-end ml-[auto] mt-[16px] sm:mt-[6px] md:mt-[8px] sm:mx-[0] sm:px-[0] rounded-radius8 sm:w-[100%] w-[86%]">
                          <Button
                            className="common-pointer font-medium xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-center w-[25%]"
                            onClick={() => {
                              getKekaEmployees();
                            }}
                          >
                            Sync {data?.tool}
                          </Button>
                        </Row>
                      )}
                    </Column>
                  );
                })}
              </List>
            </Column>

            <Column className="bg-white_A700 flex flex-col items-center justify-start sm:mt-[12px] md:mt-[16px] my-[32px] sm:mx-[0] sm:p-[15px] md:p-[33px] p-[64px] rounded-radius483 sm:w-[100%] w-[97%]">
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
                      setIsOneDriveChecked(!isOnedriveChecked);

                      !isEmpty(
                        getDataFromLocalStorage(
                          FILE_FOLDER_TOKEN_CONST.ONE_DRIVE_TOKEN.ACCESS_TOKEN
                        )
                      ) && callPatchSettingsApi(1, false);
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
                      setIsOneDriveChecked(!isOnedriveChecked);
                      !isEmpty(
                        getDataFromLocalStorage(
                          FILE_FOLDER_TOKEN_CONST.ONE_DRIVE_TOKEN.ACCESS_TOKEN
                        )
                      ) && callPatchSettingsApi(1, true);
                      // !isEmpty(getDataFromLocalStorage("onedriveAccessToken"))
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

              {isOnedriveChecked ? (
                isEmpty(
                  getDataFromLocalStorage(
                    FILE_FOLDER_TOKEN_CONST.ONE_DRIVE_TOKEN.ACCESS_TOKEN
                  )
                ) ? (
                  <Column className="flex flex-col md:flex-wrap sm:flex-wrap items-center justify-center sm:mt-[14px] md:mt-[18px] mt-[36px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[90%]">
                    <Row className="justify-between  items-center flex flex-row rounded-radius8  w-full p-[10px]">
                      <Text
                        className="font-medium text-black_900"
                        as="h5"
                        variant="h5"
                      >
                        Client Id:
                      </Text>
                      <Input
                        className="placeholder:text-gray_500 w-[100%]"
                        wrapClassName="w-[70%] p-[2px] mr-[10px]"
                        type="text"
                        onChange={(e) => {
                          onedriveForm.handleChange(
                            "client_id",
                            e.target.value
                          );
                        }}
                        // errors={onedriveForm?.errors?.["client_id"]}
                        value={onedriveForm?.values?.["client_id"]}
                        name="client_id"
                        placeholder="Enter Client Id"
                        shape="RoundedBorder8"
                        variant="FillBluegray50"
                      ></Input>
                    </Row>
                    <Row className="justify-end items-center flex flex-row rounded-radius8 w-full h-[15px]">
                      <Text
                        className="font-normal text-[11px] text-red-600 w-[max-content] mr-[20px]"
                        wrapClassName="w-2/3 "
                        as="h5"
                        variant="h5"
                      >
                        {onedriveForm?.errors?.["client_id"]}
                      </Text>
                    </Row>
                    <Row className="justify-between  items-center flex flex-row rounded-radius8  w-full p-[10px]">
                      <Text
                        className="font-medium text-black_900"
                        as="h5"
                        variant="h5"
                      >
                        Redirect URI:
                      </Text>
                      <Input
                        className="placeholder:text-gray_500 w-[100%]"
                        wrapClassName="w-[70%] p-[2px] mr-[10px]"
                        type="text"
                        onChange={(e) => {
                          onedriveForm.handleChange(
                            "redirect_uri",
                            e.target.value
                          );
                        }}
                        // errors={onedriveForm?.errors?.["redirect_uri"]}
                        value={onedriveForm?.values?.["redirect_uri"]}
                        name="redirect_uri"
                        placeholder="Enter Redirect URI"
                        shape="RoundedBorder8"
                        variant="FillBluegray50"
                      ></Input>
                    </Row>
                    <Row className="justify-end items-center flex flex-row rounded-radius8 w-full h-[15px]">
                      <Text
                        className="font-normal text-[11px] text-red-600 w-[max-content] mr-[20px]"
                        wrapClassName="w-2/3 "
                        as="h5"
                        variant="h5"
                      >
                        {onedriveForm?.errors?.["redirect_uri"]}
                      </Text>
                    </Row>
                    <Row className="justify-between  items-center flex flex-row rounded-radius8  w-full p-[10px]">
                      <Text
                        className="font-medium text-black_900"
                        as="h5"
                        variant="h5"
                      >
                        Client Secret:
                      </Text>
                      <Input
                        className="placeholder:text-gray_500 w-[100%]"
                        wrapClassName="w-[70%] p-[2px] mr-[10px]"
                        type="text"
                        onChange={(e) => {
                          onedriveForm.handleChange(
                            "client_secret",
                            e.target.value
                          );
                        }}
                        // errors={onedriveForm?.errors?.["client_secret"]}
                        value={onedriveForm?.values?.["client_secret"]}
                        name="client_secret"
                        placeholder="Enter Client Secret"
                        shape="RoundedBorder8"
                        variant="FillBluegray50"
                      ></Input>
                    </Row>
                    <Row className="justify-end items-center flex flex-row rounded-radius8 w-full h-[15px]">
                      <Text
                        className="font-normal text-[11px] text-red-600 w-[max-content] mr-[20px]"
                        wrapClassName="w-2/3 "
                        as="h5"
                        variant="h5"
                      >
                        {onedriveForm?.errors?.["client_secret"]}
                      </Text>
                    </Row>
                    <Row className="justify-end  items-center flex flex-row rounded-radius8  w-full p-[10px] mt-[10px]">
                      <Button
                        className="common-pointer font-normal xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-center w-[20%] mr-[10px]"
                        onClick={() => {
                          onedriveForm.handleSubmit(handleOnedriveTokenData);
                        }}
                      >
                        Sync One Drive
                      </Button>
                    </Row>
                  </Column>
                ) : null
              ) : null}

              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-end justify-center sm:mt-[14px] md:mt-[18px] mt-[36px] sm:mx-[0] sm:px-[0] sm:w-[100%]">
                {isGoogledriveChecked ? (
                  <Button
                    className="flex sm:h-[13px] md:h-[17px] h-[32px] items-center justify-center sm:w-[12px] md:w-[16px] w-[32px]"
                    shape="icbRoundedBorder4"
                    size="smIcn"
                    onClick={() => {
                      setIsGoogleDriveChecked(!isGoogledriveChecked);
                      !isEmpty(
                        getDataFromLocalStorage(
                          FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN
                            .ACCESS_TOKEN
                        )
                      ) && callPatchSettingsApi(2, false);
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
                      setIsGoogleDriveChecked(!isGoogledriveChecked);

                      !isEmpty(
                        getDataFromLocalStorage(
                          FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN
                            .ACCESS_TOKEN
                        )
                      ) && callPatchSettingsApi(2, true);
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

              {isGoogledriveChecked ? (
                isEmpty(
                  getDataFromLocalStorage(
                    FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN.ACCESS_TOKEN
                  )
                ) ? (
                  <Column className="flex flex-col md:flex-wrap sm:flex-wrap items-center justify-center sm:mt-[14px] md:mt-[18px] mt-[36px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[90%]">
                    <Row className="justify-between  items-center flex flex-row rounded-radius8  w-full p-[10px]">
                      <Text
                        className="font-medium text-black_900"
                        as="h5"
                        variant="h5"
                      >
                        Client Id:
                      </Text>
                      <Input
                        className="placeholder:text-gray_500 w-[100%]"
                        wrapClassName="w-[70%] p-[2px] mr-[10px]"
                        type="text"
                        onChange={(e) => {
                          googleDriveForm.handleChange(
                            "client_id",
                            e.target.value
                          );
                        }}
                        // errors={onedriveForm?.errors?.["client_id"]}
                        value={googleDriveForm?.values?.["client_id"]}
                        name="client_id"
                        placeholder="Enter Client Id"
                        shape="RoundedBorder8"
                        variant="FillBluegray50"
                      ></Input>
                    </Row>
                    <Row className="justify-end items-center flex flex-row rounded-radius8 w-full h-[15px]">
                      <Text
                        className="font-normal text-[11px] text-red-600 w-[max-content] mr-[20px]"
                        wrapClassName="w-2/3 "
                        as="h5"
                        variant="h5"
                      >
                        {googleDriveForm?.errors?.["client_id"]}
                      </Text>
                    </Row>
                    <Row className="justify-between  items-center flex flex-row rounded-radius8  w-full p-[10px]">
                      <Text
                        className="font-medium text-black_900"
                        as="h5"
                        variant="h5"
                      >
                        Redirect URI:
                      </Text>
                      <Input
                        className="placeholder:text-gray_500 w-[100%]"
                        wrapClassName="w-[70%] p-[2px] mr-[10px]"
                        type="text"
                        onChange={(e) => {
                          googleDriveForm.handleChange(
                            "redirect_uri",
                            e.target.value
                          );
                        }}
                        // errors={onedriveForm?.errors?.["redirect_uri"]}
                        value={googleDriveForm?.values?.["redirect_uri"]}
                        name="redirect_uri"
                        placeholder="Enter Redirect URI"
                        shape="RoundedBorder8"
                        variant="FillBluegray50"
                      ></Input>
                    </Row>
                    <Row className="justify-end items-center flex flex-row rounded-radius8 w-full h-[15px]">
                      <Text
                        className="font-normal text-[11px] text-red-600 w-[max-content] mr-[20px]"
                        wrapClassName="w-2/3 "
                        as="h5"
                        variant="h5"
                      >
                        {googleDriveForm?.errors?.["redirect_uri"]}
                      </Text>
                    </Row>
                    <Row className="justify-between  items-center flex flex-row rounded-radius8  w-full p-[10px]">
                      <Text
                        className="font-medium text-black_900"
                        as="h5"
                        variant="h5"
                      >
                        Client Secret:
                      </Text>
                      <Input
                        className="placeholder:text-gray_500 w-[100%]"
                        wrapClassName="w-[70%] p-[2px] mr-[10px]"
                        type="text"
                        onChange={(e) => {
                          googleDriveForm.handleChange(
                            "client_secret",
                            e.target.value
                          );
                        }}
                        // errors={onedriveForm?.errors?.["client_secret"]}
                        value={googleDriveForm?.values?.["client_secret"]}
                        name="client_secret"
                        placeholder="Enter Client Secret"
                        shape="RoundedBorder8"
                        variant="FillBluegray50"
                      ></Input>
                    </Row>
                    <Row className="justify-end items-center flex flex-row rounded-radius8 w-full h-[15px]">
                      <Text
                        className="font-normal text-[11px] text-red-600 w-[max-content] mr-[20px]"
                        wrapClassName="w-2/3 "
                        as="h5"
                        variant="h5"
                      >
                        {googleDriveForm?.errors?.["client_secret"]}
                      </Text>
                    </Row>
                    <Row className="justify-end  items-center flex flex-row rounded-radius8  w-full p-[10px] mt-[10px]">
                      <Button
                        className="common-pointer font-normal xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-center w-[20%] mr-[10px]"
                        onClick={() => {
                          googleDriveForm.handleSubmit(
                            handleGoogledriveTokenData
                          );
                        }}
                      >
                        Sync Google Drive
                      </Button>
                    </Row>
                  </Column>
                ) : null
              ) : null}

              <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-end justify-center sm:mt-[14px] md:mt-[18px] mt-[36px] sm:mx-[0] sm:px-[0] sm:w-[100%]">
                {isDropboxChecked ? (
                  <Button
                    className="flex sm:h-[13px] md:h-[17px] h-[32px] items-center justify-center sm:w-[12px] md:w-[16px] w-[32px]"
                    shape="icbRoundedBorder4"
                    size="smIcn"
                    onClick={() => {
                      setIsDropboxeChecked(!isDropboxChecked);

                      !isEmpty(
                        getDataFromLocalStorage(
                          FILE_FOLDER_TOKEN_CONST.DROPBOX_TOKEN.ACCESS_TOKEN
                        )
                      ) && callPatchSettingsApi(3, false);
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
                      setIsDropboxeChecked(!isDropboxChecked);

                      !isEmpty(
                        getDataFromLocalStorage(
                          FILE_FOLDER_TOKEN_CONST.GOOGLE_DRIVE_TOKEN
                            .ACCESS_TOKEN
                        )
                      ) && callPatchSettingsApi(3, true);
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

              {isDropboxChecked ? (
                isEmpty(
                  getDataFromLocalStorage(
                    FILE_FOLDER_TOKEN_CONST.DROPBOX_TOKEN.ACCESS_TOKEN
                  )
                ) ? (
                  <Column className="flex flex-col md:flex-wrap sm:flex-wrap items-center justify-center sm:mt-[14px] md:mt-[18px] mt-[36px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[90%]">
                    <Row className="justify-between  items-center flex flex-row rounded-radius8  w-full p-[10px]">
                      <Text
                        className="font-medium text-black_900"
                        as="h5"
                        variant="h5"
                      >
                        Client Id:
                      </Text>
                      <Input
                        className="placeholder:text-gray_500 w-[100%]"
                        wrapClassName="w-[70%] p-[2px] mr-[10px]"
                        type="text"
                        onChange={(e) => {
                          dropboxForm.handleChange("client_id", e.target.value);
                        }}
                        // errors={onedriveForm?.errors?.["client_id"]}
                        value={dropboxForm?.values?.["client_id"]}
                        name="client_id"
                        placeholder="Enter Client Id"
                        shape="RoundedBorder8"
                        variant="FillBluegray50"
                      ></Input>
                    </Row>
                    <Row className="justify-end items-center flex flex-row rounded-radius8 w-full h-[15px]">
                      <Text
                        className="font-normal text-[11px] text-red-600 w-[max-content] mr-[20px]"
                        wrapClassName="w-2/3 "
                        as="h5"
                        variant="h5"
                      >
                        {dropboxForm?.errors?.["client_id"]}
                      </Text>
                    </Row>
                    <Row className="justify-between  items-center flex flex-row rounded-radius8  w-full p-[10px]">
                      <Text
                        className="font-medium text-black_900"
                        as="h5"
                        variant="h5"
                      >
                        Redirect URI:
                      </Text>
                      <Input
                        className="placeholder:text-gray_500 w-[100%]"
                        wrapClassName="w-[70%] p-[2px] mr-[10px]"
                        type="text"
                        onChange={(e) => {
                          dropboxForm.handleChange(
                            "redirect_uri",
                            e.target.value
                          );
                        }}
                        // errors={onedriveForm?.errors?.["redirect_uri"]}
                        value={dropboxForm?.values?.["redirect_uri"]}
                        name="redirect_uri"
                        placeholder="Enter Redirect URI"
                        shape="RoundedBorder8"
                        variant="FillBluegray50"
                      ></Input>
                    </Row>
                    <Row className="justify-end items-center flex flex-row rounded-radius8 w-full h-[15px]">
                      <Text
                        className="font-normal text-[11px] text-red-600 w-[max-content] mr-[20px]"
                        wrapClassName="w-2/3 "
                        as="h5"
                        variant="h5"
                      >
                        {dropboxForm?.errors?.["redirect_uri"]}
                      </Text>
                    </Row>
                    <Row className="justify-between  items-center flex flex-row rounded-radius8  w-full p-[10px]">
                      <Text
                        className="font-medium text-black_900"
                        as="h5"
                        variant="h5"
                      >
                        Client Secret:
                      </Text>
                      <Input
                        className="placeholder:text-gray_500 w-[100%]"
                        wrapClassName="w-[70%] p-[2px] mr-[10px]"
                        type="text"
                        onChange={(e) => {
                          dropboxForm.handleChange(
                            "client_secret",
                            e.target.value
                          );
                        }}
                        // errors={onedriveForm?.errors?.["client_secret"]}
                        value={dropboxForm?.values?.["client_secret"]}
                        name="client_secret"
                        placeholder="Enter Client Secret"
                        shape="RoundedBorder8"
                        variant="FillBluegray50"
                      ></Input>
                    </Row>
                    <Row className="justify-end items-center flex flex-row rounded-radius8 w-full h-[15px]">
                      <Text
                        className="font-normal text-[11px] text-red-600 w-[max-content] mr-[20px]"
                        wrapClassName="w-2/3 "
                        as="h5"
                        variant="h5"
                      >
                        {dropboxForm?.errors?.["client_secret"]}
                      </Text>
                    </Row>
                    <Row className="justify-end  items-center flex flex-row rounded-radius8  w-full p-[10px] mt-[10px]">
                      <Button
                        className="common-pointer font-normal xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[8px] text-center w-[20%] mr-[10px]"
                        onClick={() => {
                          dropboxForm.handleSubmit(handleDropboxTokenData);
                        }}
                      >
                        Sync Dropbox
                      </Button>
                    </Row>
                  </Column>
                ) : null
              ) : null}
            </Column>
          </Column>
        )}
      </Column>

      {isOpenConfirmSyncModal && !isLoading ? (
        <ConfirmSync
          tool="Keka"
          sync={() => {
            inviteEmployee(), handleCloseFilterModal();
          }}
          count={kekaData?.totalRecords}
          isOpen={isOpenConfirmSyncModal}
          onRequestClose={handleCloseFilterModal}
        />
      ) : null}
      <ToastContainer />
    </Base>
  );
};

export default ToolSettingsPage;
