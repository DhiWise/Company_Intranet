import { apis } from "service";
import {
  BACKEND_URL,
  FRESHTEAM_ORGANISATION_NAME,
  FRESHTEAM_TOKEN,
  KEKA_ORGANISATION_NAME,
  SUPABSE_CREDS
} from "../constant/index";
import { encryptStorage } from "../util/encryptStorage";

const COMMON_URL = SUPABSE_CREDS.COMMON_URL;
const PUBLIC_API_KEY = SUPABSE_CREDS.PUBLIC_API_KEY;
const SECRET_API_KEY = SUPABSE_CREDS.SECRET_API_KEY;

//Freshteam
export const FRESHTEAM_URL = `https://${FRESHTEAM_ORGANISATION_NAME}.freshteam.com/`;
export const FRESHTEAM_TOKN = `Bearer ${FRESHTEAM_TOKEN}`;

const BEARER_TOKEN = `Bearer ${localStorage.getItem("onedriveAccessToken") || ""}`;

const GOOGLE_BEARER_TOKEN = `Bearer ${localStorage.getItem("googleDriveAccessToken") || ""}`;

const DROPBOX_BEARER_TOKEN = `Bearer ${localStorage.getItem("dropboxAccessToken") || ""}`;

const accessToken = encryptStorage.get("google_access_token");

const API_URLS = {
  GET_SETTINGS: `${COMMON_URL}rest/v1/settings`,
  GET_TOOLSSELECT: `${COMMON_URL}rest/v1/tools`,
  POST_TOKENGRANTTYPEPASSWORD: `${COMMON_URL}auth/v1/token`,

  //Space Booking
  GET_SPACE_BOOKING_INVITEES: `${COMMON_URL}rest/v1/space_booking_invitees`,
  GET_SPACE_BOOKING: `${COMMON_URL}rest/v1/space_booking`,
  GET_SPACE_RESOURCE: `${COMMON_URL}rest/v1/space_resource`,
  GET_SPACE: `${COMMON_URL}rest/v1/space`,
  GET_RESOURCE: `${COMMON_URL}rest/v1/resource`,

  //Folder
  GET_FOLDER: `${COMMON_URL}rest/v1/folders`,
  GET_FILESPARENTIDEQ3SELECT: `${COMMON_URL}rest/v1/files`,
  POST_IMAGESJPEG: `${COMMON_URL}storage/v1/object/file-folders/uploaded_files_folders/images.jpeg`,

  //Employee
  GET_EMPLOYEE: `${COMMON_URL}rest/v1/employee`,
  GET_EMPLOYEE_SUPABSE: `${COMMON_URL}rest/v1/employe`,
  GET_STATUS_UPDATE: `${COMMON_URL}rest/v1/status_update`,
  GET_JOBTITLEPOSITIONSELECT: `${COMMON_URL}rest/v1/jobtitle_position`,
  GET_DEPARTMENTJOBTITLESELECT: `${COMMON_URL}rest/v1/department_jobtitle`,
  GET_EMPLOYMENTSTATUSSELECT: `${COMMON_URL}rest/v1/employment_status`,
  GET_DEPARTMENTSELECT: `${COMMON_URL}rest/v1/department`,
  POST_INVITE: `${COMMON_URL}auth/v1/invite`,
  GET_USERTYPESELECT: `${COMMON_URL}rest/v1/user_type`,
  PUT_USER: `${COMMON_URL}auth/v1/user`,

  //ATS
  GET_APPLICANTS: `${COMMON_URL}rest/v1/applicants`,
  GET_GOOGLE_RESPONSE: `${COMMON_URL}rest/v1/google_response`,
  GET_NOTIFICATIONS: `${COMMON_URL}rest/v1/notification`,
  GET_APPLICANTSCATEGORY1: `${FRESHTEAM_URL}hire/jobs/6000136767/applicants`,
  GET_APPLICANTSCATEGORY2: `${FRESHTEAM_URL}hire/jobs/6000136821/applicants`,
  GET_RESPONSES: `https://forms.googleapis.com/v1/forms/1uTo1q-lzhlo4iNoFwTasVw6T9B4owcbEdiEdD4M2-5I/responses`,
  GET_KEKA_EMPLOYEES: `https://${KEKA_ORGANISATION_NAME}.keka.com/api/v1/hris/employees`,
  POST_TOKEN: `https://login.keka.com/connect/token`,
  POST_MAIL: `${BACKEND_URL}sendMail`,

  POST_RECOVER: `${COMMON_URL}auth/v1/recover`,
  POST_COUNTAPPLICANTSTECHNOLOGYWISE: `${COMMON_URL}rest/v1/rpc/countapplicantstechnologywise`,
};

export const readNotification = (payload) =>
  apis.patch(API_URLS.GET_NOTIFICATIONS, {
    ...payload,
    params: { ...payload?.params },
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=minimal",
      ...payload?.headers,
    },
  });

export const getNotifications = (payload) =>
  apis.get(API_URLS.GET_NOTIFICATIONS, {
    ...payload,
    params: { select: "*", ...payload?.params },
    headers: {
      ...payload?.headers,
    },
  });

export const updateSentXyzStatus = (payload) =>
  apis.patch(API_URLS.GET_APPLICANTS, {
    ...payload,
    params: { ...payload?.params },
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=minimal",
      ...payload?.headers,
    },
  });

export const sendXYZEmail = (payload) =>
  apis.post(API_URLS.POST_MAIL, {
    ...payload,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const postGoogleResposne = (payload) =>
  apis.post(API_URLS.GET_GOOGLE_RESPONSE, {
    ...payload,
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

export const getApplicantselectedById = (payload) =>
  apis.get(API_URLS.GET_APPLICANTS, {
    ...payload,
    params: { select: "id,email,sent_xyz", ...payload?.params },
  });

export const getResponses = (payload) =>
  apis.get(API_URLS.GET_RESPONSES, {
    ...payload,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...payload?.headers,
    },
  });

export const getGoogleresponseselect = (payload) =>
  apis.get(API_URLS.GET_GOOGLE_RESPONSE, {
    ...payload,
    params: { select: "*", ...payload?.params },
  });

export const getNotificationselect = (payload) =>
  apis.get(API_URLS.GET_NOTIFICATIONS, {
    ...payload,
    params: { select: "*", ...payload?.params },
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      ...payload?.headers,
    },
  });

export const getNotificationNames = (payload) =>
  apis.get(API_URLS.GET_NOTIFICATIONS, {
    ...payload,
    params: { ...payload?.params },
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      ...payload?.headers,
    },
  });

export const getApplicantscategory2 = (payload) =>
  apis.get(API_URLS.GET_APPLICANTSCATEGORY2, {
    ...payload,
    params: {
      category_id: "3",
      filter_id: "6007152174",
      includes:
        "applicant_state,stage,offer,job,interviews.feedback,interviews.stage,job,lead.positions,lead.ratings,lead.owner,lead.owner.avatar,requisition,lead.source,lead.medium",
      sort: "leads.updated_at",
      sort_type: "desc",
      ...payload?.params,
    },
    headers: {
      Authorization: FRESHTEAM_TOKN,
      ...payload?.headers,
    },
  });

export const postApplicantsFromFreshteam = (payload) =>
  apis.post(API_URLS.GET_APPLICANTS, {
    ...payload,
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
      ...payload?.headers,
    },
  });

export const getApplicantscategory1 = (payload) =>
  apis.get(API_URLS.GET_APPLICANTSCATEGORY1, {
    ...payload,
    params: {
      category_id: "3",
      filter_id: "6007152174",
      includes:
        "applicant_state,stage,offer,job,interviews.feedback,interviews.stage,job,lead.positions,lead.ratings,lead.owner,lead.owner.avatar,requisition,lead.source,lead.medium",
      sort: "leads.updated_at",
      sort_type: "desc",
      ...payload?.params,
    },
    headers: {
      Authorization: FRESHTEAM_TOKN,
      ...payload?.headers,
    },
  });

// ======> Files <======
export const deleteGoogleDriveFileFolder = (payload) =>
  apis.delete(`https://www.googleapis.com/drive/v3/files/${payload?.path}`, {
    ...payload,
  });

export const postCreateGoogleDriveFolder = (payload) =>
  apis.post(`https://www.googleapis.com/drive/v3/files`, {
    ...payload,
    headers: {
      Authorization: GOOGLE_BEARER_TOKEN,
      ...payload?.headers,
    },
    data: payload?.data,
  });

export const deleteOneDriveFileFolder = (payload) =>
  apis.delete(`https://graph.microsoft.com/v1.0/me/drive/${payload?.path}`, {
    ...payload,
    headers: {
      Authorization: BEARER_TOKEN,
      ...payload?.headers,
    },
  });

export const postCreateOneDriveFolder = (payload) =>
  apis.post(
    `https://graph.microsoft.com/v1.0/me/drive/${payload?.path}/children`,
    {
      ...payload,
      headers: {
        Authorization: BEARER_TOKEN,
        ...payload?.headers,
      },
      data: payload?.data,
    }
  );

export const postDropboxAccessToken = (payload) =>
  apis.post("https://api.dropboxapi.com/oauth2/token", {
    ...payload,
  });

export const postGoogleDriveAccessToken = (payload) =>
  apis.post("https://oauth2.googleapis.com/token", {
    ...payload,
  });

export const postOneDriveAccessToken = (payload) =>
  apis.post("https://login.microsoftonline.com/common/oauth2/v2.0/token", {
    ...payload,
  });

export const postResource = (payload) =>
  apis.post(API_URLS.GET_RESOURCE, {
    ...payload,
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
      ...payload?.headers,
    },
  });

export const deleteResourceideq3 = (payload) =>
  apis.delete(API_URLS.GET_RESOURCE, {
    ...payload,
    params: { ...payload?.params },
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      ...payload?.headers,
    },
  });

export const patchSettings = (payload) =>
  apis.patch(API_URLS.GET_SETTINGS, {
    ...payload,
    params: { id: payload?.id, ...payload?.params },
    data: payload?.data,
    headers: {
      apikey: SECRET_API_KEY,
      Authorization: `Bearer ${SECRET_API_KEY}`,
      ...payload?.headers,
    },
  });

export const getSettings = (payload) =>
  apis.get(API_URLS.GET_SETTINGS, {
    ...payload,
    params: { select: "*", order: "id.asc", ...payload?.params },
    headers: {
      apikey: SECRET_API_KEY,
      Authorization: `Bearer ${SECRET_API_KEY}`,
      ...payload?.headers,
    },
  });

export const postPreviewDropboxFile = (payload) =>
  apis.post(
    "https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings",
    {
      ...payload,
    }
  );

export const getTemporaryLinkOfDropbox = (payload) =>
  apis.post("https://api.dropboxapi.com/2/files/get_temporary_link", {
    ...payload,
  });

export const uploadFileToDropbox = (payload) =>
  apis.post("https://content.dropboxapi.com/2/files/upload", {
    ...payload,
  });

export const postOneDropboxFileFolders = (payload) =>
  apis.post("https://api.dropboxapi.com/2/files/list_folder", {
    ...payload,
  });

export const renameFileToGoogleDrive = (payload) =>
  payload.parameter == ""
    ? apis.patch(
      `https://www.googleapis.com/drive/v3/files/${payload?.fileId}`,
      {
        ...payload,
      }
    )
    : apis.patch(
      `https://www.googleapis.com/drive/v3/files/${payload?.fileId}`,
      {
        ...payload,
      }
    );

export const uploadFileToGoogleDrive = (payload) =>
  apis.post("https://www.googleapis.com/upload/drive/v3/files", {
    ...payload,
    headers: {
      Authorization: GOOGLE_BEARER_TOKEN,
      ...payload?.headers,
    },
    data: payload?.file,
  });

export const getGoogleDriveFolders = (payload) =>
  apis.get("https://www.googleapis.com/drive/v3/files?fields=*", {
    ...payload,
  });

export const postEmbededPreviewOneDriveFile = (payload) =>
  apis.post(
    `https://graph.microsoft.com/v1.0/me/drive/items/${payload?.itemId}/createLink`,
    {
      data: {
        type: "view",
      },
      headers: {
        Authorization: BEARER_TOKEN,
      },
    }
  );

export const uploadFileToOneDrive = (payload) =>
  apis.put(
    `https://graph.microsoft.com/v1.0/me/drive/${payload?.root}:/${payload?.fileName}:/content`,
    {
      ...payload,
      headers: {
        apikey: PUBLIC_API_KEY,
        Authorization: BEARER_TOKEN,
        "Content-Type": payload?.type,
        ...payload?.headers,
      },
      data: payload?.file,
    }
  );

export const postUserProfile = (payload) =>
  apis.post(
    `${COMMON_URL}storage/v1/object/employee-profile/user-profile/${payload?.fileName}`,
    {
      headers: {
        apikey: PUBLIC_API_KEY,
        Authorization: `Bearer ${PUBLIC_API_KEY}`,
        "Content-Type": "image/jpeg",
        Accept: "*/*",
      },
      data: payload?.file,
    }
  );

export const getOneDriveChildFolders = (payload) =>
  apis.get(
    `https://graph.microsoft.com/v1.0/me/drive/items/${payload?.id}/children`,
    {
      ...payload,
      headers: {
        Authorization: BEARER_TOKEN,
        ...payload?.headers,
      },
    }
  );

export const getOneDriveFolders = (payload) =>
  apis.get("https://graph.microsoft.com/v1.0/me/drive/root/children", {
    ...payload,
    headers: {
      Authorization: BEARER_TOKEN,
      ...payload?.headers,
    },
  });

// ======> Files <========

export const deleteUserProfile = (payload) =>
  apis.delete(`${COMMON_URL}storage/v1/object/${payload?.fileName}`, {
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      "Content-Type": "image/jpeg",
      Accept: "*/*",
    },
    data: payload?.file,
  });

export const updateToolEmployee = (payload) =>
  apis.patch(API_URLS.GET_EMPLOYEE_SUPABSE, {
    ...payload,
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
      ...payload?.headers,
    },
  });

export const patchSpaceideq15 = (payload) =>
  apis.patch(API_URLS.GET_SPACE, {
    ...payload,
    params: { id: `eq.${payload?.data?.id}`, ...payload?.params },
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

export const postToken = (payload) =>
  apis.post(API_URLS.POST_TOKEN, {
    ...payload,
    headers: {
      accept: "application/json",
      "content-type": "application/x-www-form-urlencoded",
      ...payload?.headers,
    },
  });

export const patchToolstooleqKeka = (payload) =>
  apis.patch(API_URLS.GET_TOOLSSELECT, {
    ...payload,
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
      ...payload?.headers,
    },
  });

export const getEmployeeByWorkEmail = (payload) =>
  apis.get(API_URLS.GET_EMPLOYEE_SUPABSE, {
    ...payload,
    params: {
      select: "*",
      ...payload?.params,
    },
    headers: {
      apikey: PUBLIC_API_KEY,
      ...payload?.headers,
    },
  });

export const getEmployeeFromKeka = (payload) =>
  apis.get(API_URLS.GET_KEKA_EMPLOYEES, {
    ...payload,
  });

export const deleteToolEmployees = (payload) =>
  apis.delete(API_URLS.GET_EMPLOYEE_SUPABSE, {
    ...payload,
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      ...payload?.headers,
    },
  });

export const deleteSpaceideq24 = (payload) =>
  apis.delete(API_URLS.GET_SPACE, {
    ...payload,
    params: { ...payload?.params },
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      ...payload?.headers,
    },
  });

export const getSpaceByID = (payload) =>
  apis.get(API_URLS.GET_SPACE, {
    ...payload,
    params: { select: "*", id: "eq.1", ...payload?.params },
    headers: {
      apikey: SECRET_API_KEY,
      Authorization: `Bearer ${SECRET_API_KEY}`,
      ...payload?.headers,
    },
  });

export const deleteSpaceresourcespaceideq24 = (payload) =>
  apis.delete(API_URLS.GET_SPACE_RESOURCE, {
    ...payload,
    params: { ...payload?.params },
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      ...payload?.headers,
    },
  });

export const postSpaceresource = (payload) =>
  apis.post(API_URLS.GET_SPACE_RESOURCE, {
    ...payload,
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      "Content-Type": "application/json",
      ...payload?.headers,
    },
  });
export const updateEmployee = (payload) =>
  apis.patch(API_URLS.GET_EMPLOYEE_SUPABSE, {
    ...payload,
    params: { id: `eq.${payload?.data?.id}` },
    headers: {
      Authorization: `Bearer ${SECRET_API_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...payload?.headers,
    },
  });

export const getEmployeeselect = (payload) =>
  apis.get(
    `${API_URLS.GET_EMPLOYEE_SUPABSE}?${payload?.filterURL ? payload?.filterURL : ""
    }`,
    {
      ...payload,
      headers: {
        Authorization: `Bearer ${SECRET_API_KEY}`,
        ...payload?.headers,
      },
    }
  );

export const getSearchEmployeeList = (payload) =>
  apis.get(API_URLS.GET_EMPLOYEE_SUPABSE, {
    ...payload,
    params: {
      ...payload?.params,
    },
    headers: {
      Authorization: `Bearer ${SECRET_API_KEY}`,
      ...payload?.headers,
    },
  });

export const getEmployeesCount = (payload) =>
  apis.get(
    `${API_URLS.GET_EMPLOYEE_SUPABSE}?${payload?.filterURL ? payload?.filterURL : ""
    }`,
    {
      ...payload,
      params: {
        select: "count",
        ...payload?.params,
      },
      headers: {
        Authorization: `Bearer ${SECRET_API_KEY}`,
        ...payload?.headers,
      },
    }
  );

export const getEmployeesByID = (payload) =>
  apis.get(API_URLS.GET_EMPLOYEE_SUPABSE, {
    ...payload,
    params: { select: "*", ...payload?.params },
    headers: {
      apikey: SECRET_API_KEY,
      Authorization: `Bearer ${SECRET_API_KEY}`,
      ...payload?.headers,
    },
  });

export const updateUser = (payload) =>
  apis.put(API_URLS.PUT_USER, {
    ...payload,
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${payload?.token}`,
      "Content-Type": "application/json",
      ...payload?.headers,
    },
  });

export const getToolsselect = (payload) =>
  apis.get(API_URLS.GET_TOOLSSELECT, {
    ...payload,
    params: { select: "*", ...payload?.params },
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      ...payload?.headers,
    },
  });

export const deleteSpacebookinginviteesbookingideq30 = (payload) =>
  apis.delete(API_URLS.GET_SPACE_BOOKING_INVITEES, {
    ...payload,
    params: { booking_id: "eq.30", ...payload?.params },
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      ...payload?.headers,
    },
  });

export const getSpacebookinginviteesideq50selectemployeeemployeeidfirstnamemiddlenamelastname =
  (payload) =>
    apis.get(API_URLS.GET_SPACE_BOOKING_INVITEES, {
      ...payload,
      params: {
        ...payload?.params,
      },
      headers: {
        apikey: PUBLIC_API_KEY,
        Authorization: `Bearer ${PUBLIC_API_KEY}`,
        Range: "0-9",
        ...payload?.headers,
      },
    });

export const getFilesFromSupabase = (payload) =>
  apis.get(API_URLS.GET_FILESPARENTIDEQ3SELECT, {
    ...payload,
    params: { parent_id: "eq.3", select: "*", ...payload?.params },
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      ...payload?.headers,
    },
  });

export const getSpacebookingselectideq15 = (payload) =>
  apis.get(API_URLS.GET_SPACE_BOOKING, {
    ...payload,
    params: { select: "*", id: "eq.15", ...payload?.params },
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      ...payload?.headers,
    },
  });

export const postInvite = (payload) =>
  apis.post(API_URLS.POST_INVITE, {
    ...payload,
    headers: {
      apikey: SECRET_API_KEY,
      Authorization: `Bearer ${SECRET_API_KEY}`,
      "Content-Type": "application/json",
      ...payload?.headers,
    },
  });

export const deleteSpacebookingideq19 = (payload) =>
  apis.delete(API_URLS.GET_SPACE_BOOKING, {
    ...payload,
    params: { ...payload?.params },
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      ...payload?.headers,
    },
  });

export const deleteSpacebookinginviteesbookingideq19 = (payload) =>
  apis.delete(API_URLS.GET_SPACE_BOOKING_INVITEES, {
    ...payload,
    params: { ...payload?.params },
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      ...payload?.headers,
    },
  });

export const getUserType = (payload) =>
  apis.get(API_URLS.GET_USERTYPESELECT, {
    ...payload,
    params: { select: "*", ...payload?.params },
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      ...payload?.headers,
    },
  });

export const getSpacebookingselect = (payload) =>
  apis.get(
    `${API_URLS.GET_SPACE_BOOKING}?${payload?.filterURL ? payload?.filterURL : ""
    }`,
    {
      ...payload,
      params: {
        ...payload?.params,
        order: "booking_from.desc",
      },

      headers: {
        apikey: PUBLIC_API_KEY,
        Authorization: `Bearer ${PUBLIC_API_KEY}`,
        ...payload?.headers,
      },
    }
  );

export const getSpacebookingInviteesselect = (payload) =>
  apis.get(
    `${API_URLS.GET_SPACE_BOOKING_INVITEES}?${payload?.filterURL ? payload?.filterURL : ""
    }`,
    {
      ...payload,
      params: {
        ...payload?.params,
      },

      headers: {
        apikey: PUBLIC_API_KEY,
        Authorization: `Bearer ${PUBLIC_API_KEY}`,
        ...payload?.headers,
      },
    }
  );

export const getSpaceinvitationselect = (payload) =>
  apis.get(
    `${API_URLS.GET_SPACE_BOOKING_INVITEES}?${payload?.filterURL ? payload?.filterURL : ""
    }`,
    {
      ...payload,
      params: {
        ...payload?.params,
      },

      headers: {
        apikey: PUBLIC_API_KEY,
        Authorization: `Bearer ${PUBLIC_API_KEY}`,
        ...payload?.headers,
      },
    }
  );

export const getSpacebookingInviteselect = (payload) =>
  apis.get(
    `${API_URLS.GET_SPACE_BOOKING_INVITEES}?${payload?.filterURL ? payload?.filterURL : ""
    }`,
    {
      ...payload,
      params: {
        ...payload?.params,
      },

      headers: {
        apikey: PUBLIC_API_KEY,
        Authorization: `Bearer ${PUBLIC_API_KEY}`,
        ...payload?.headers,
      },
    }
  );

export const postTokengranttypepassword = (payload) =>
  apis.post(API_URLS.POST_TOKENGRANTTYPEPASSWORD, {
    ...payload,
    params: { grant_type: "password", ...payload?.params },
    headers: {
      apikey: PUBLIC_API_KEY,
      "Content-Type": "application/json",
      ...payload?.headers,
    },
  });

export const getSpaceresourceselectresourceresourceidresourcespaceideq55 = (
  payload
) =>
  apis.get(API_URLS.GET_SPACE_RESOURCE, {
    ...payload,
    params: {
      select: "*,resource:resource_id(resource)",
      space_id: "eq.55",
      ...payload?.params,
    },
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      ...payload?.headers,
    },
  });

export const postSpacebooking = (payload) =>
  apis.post(API_URLS.GET_SPACE_BOOKING, {
    ...payload,
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...payload?.headers,
    },
  });

export const postImagesjpeg = (payload) =>
  apis.post(
    `${COMMON_URL}storage/v1/object/space-management/admin/${payload?.fileName}`,
    {
      ...payload,
      headers: {
        apikey: PUBLIC_API_KEY,
        Authorization: `Bearer ${PUBLIC_API_KEY}`,
        "Content-Type": "image/jpeg",
        ...payload?.headers,
      },
      data: payload?.file,
    }
  );

export const getSpaceresourceselectresourceidspaceideq15 = (payload) =>
  apis.get(API_URLS.GET_SPACE_RESOURCE, {
    ...payload,
    params: { select: "resource_id", space_id: "eq.15", ...payload?.params },
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      ...payload?.headers,
    },
  });

export const getSpaceselect = (payload) =>
  apis.get(API_URLS.GET_SPACE, {
    ...payload,
    params: { select: "*", order: "created_at.desc", ...payload?.params },
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      ...payload?.headers,
    },
  });

export const deleteFoldersideq3 = (payload) =>
  apis.delete(API_URLS.GET_FOLDER, {
    ...payload,
    params: { id: "eq.3", ...payload?.params },
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      ...payload?.headers,
    },
  });

export const patchEmployeeid = (payload) =>
  apis.patch(API_URLS.GET_EMPLOYEE, {
    ...payload,
    params: { id: "eq.11", ...payload?.params },
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...payload?.headers,
    },
  });

export const postFolders = (payload) =>
  apis.post(API_URLS.GET_FOLDER, {
    ...payload,
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...payload?.headers,
    },
  });

export const getFoldersselect = (payload) =>
  apis.get(API_URLS.GET_FOLDER, {
    ...payload,
    params: { select: "*", ...payload?.params },
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      ...payload?.headers,
    },
  });

export const getEmployeeselectideq30 = (payload) =>
  apis.get(API_URLS.GET_EMPLOYEE, {
    ...payload,
    params: { select: "*", id: "eq.30", ...payload?.params },
    headers: {
      apikey: SECRET_API_KEY,
      Authorization: `Bearer ${SECRET_API_KEY}`,
      ...payload?.headers,
    },
  });

export const getResourceselect = (payload) =>
  apis.get(API_URLS.GET_RESOURCE, {
    ...payload,
    params: { select: "*", ...payload?.params },
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      ...payload?.headers,
    },
  });

export const postSpace = (payload) =>
  apis.post(API_URLS.GET_SPACE, {
    ...payload,
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...payload?.headers,
    },
  });

export const getJobtitlepositionselect = (payload) =>
  apis.get(API_URLS.GET_JOBTITLEPOSITIONSELECT, {
    ...payload,
    params: { select: "*", ...payload?.params },
    headers: {
      apikey: SECRET_API_KEY,
      Authorization: `Bearer ${SECRET_API_KEY}`,
      ...payload?.headers,
    },
  });

export const getDepartmentjobtitleselect = (payload) =>
  apis.get(API_URLS.GET_DEPARTMENTJOBTITLESELECT, {
    ...payload,
    params: { select: "*", ...payload?.params },
    headers: {
      apikey: SECRET_API_KEY,
      Authorization: `Bearer ${SECRET_API_KEY}`,
      ...payload?.headers,
    },
  });

export const getEmploymentstatusselect = (payload) =>
  apis.get(API_URLS.GET_EMPLOYMENTSTATUSSELECT, {
    ...payload,
    params: { select: "*", ...payload?.params },
    headers: {
      apikey: SECRET_API_KEY,
      Authorization: `Bearer ${SECRET_API_KEY}`,
      ...payload?.headers,
    },
  });

export const getDepartmentselect = (payload) =>
  apis.get(API_URLS.GET_DEPARTMENTSELECT, {
    ...payload,
    params: { select: "*", ...payload?.params },
    headers: {
      apikey: SECRET_API_KEY,
      Authorization: `Bearer ${SECRET_API_KEY}`,
      ...payload?.headers,
    },
  });

export const postEmployee = (payload) =>
  apis.post(API_URLS.GET_EMPLOYEE_SUPABSE, {
    ...payload,
    headers: {
      apikey: SECRET_API_KEY,
      Authorization: `Bearer ${SECRET_API_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...payload?.headers,
    },
  });

export const getSpacebookingselectCount = (payload) =>
  apis.get(
    `${API_URLS.GET_SPACE_BOOKING}?${payload?.filterURL ? payload?.filterURL : ""
    }`,
    {
      ...payload,
      params: {
        select: "count",
        ...payload?.params,
      },
      headers: {
        apikey: PUBLIC_API_KEY,

        Authorization: `Bearer ${SECRET_API_KEY}`,
        ...payload?.headers,
      },
    }
  );

export const getSpacebookingInviteselectCount = (payload) =>
  apis.get(
    `${API_URLS.GET_SPACE_BOOKING_INVITEES}?${payload?.filterURL ? payload?.filterURL : ""
    }`,
    {
      ...payload,
      params: {
        select: "count",
        ...payload?.params,
      },
      headers: {
        apikey: PUBLIC_API_KEY,

        Authorization: `Bearer ${SECRET_API_KEY}`,
        ...payload?.headers,
      },
    }
  );

export const getMySpacebookingselectCount = (payload) =>
  apis.get(
    `${API_URLS.GET_SPACE_BOOKING}?${payload?.filterURL ? payload?.filterURL : ""
    }`,
    {
      ...payload,
      params: {
        select: "count",
        ...payload?.params,
      },
      headers: {
        apikey: PUBLIC_API_KEY,

        Authorization: `Bearer ${SECRET_API_KEY}`,
        ...payload?.headers,
      },
    }
  );

export const getMySpaceInvitationselectCount = (payload) =>
  apis.get(
    `${API_URLS.GET_SPACE_BOOKING_INVITEES}?${payload?.filterURL ? payload?.filterURL : ""
    }`,
    {
      ...payload,
      params: {
        select: "count",
        ...payload?.params,
      },
      headers: {
        apikey: PUBLIC_API_KEY,

        Authorization: `Bearer ${SECRET_API_KEY}`,
        ...payload?.headers,
      },
    }
  );

export const getSpaceideq1 = (payload) =>
  apis.get(API_URLS.GET_SPACE, {
    ...payload,

    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      ...payload?.headers,
    },
  });
export const getSpaceresourcespaceideq55 = (payload) =>
  apis.get(API_URLS.GET_SPACE_RESOURCE, {
    ...payload,
    params: {
      select: "*,resource:resource_id(resource)",

      ...payload?.params,
    },
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      ...payload?.headers,
    },
  });
export const postBookingInvitees = (payload) =>
  apis.post(API_URLS.GET_SPACE_BOOKING_INVITEES, {
    ...payload,
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      "Content-Type": "application/json",
      ...payload?.headers,
    },
  });
export const patchSpacebookingideq26 = (payload) =>
  apis.patch(API_URLS.GET_SPACE_BOOKING, {
    ...payload,
    params: { id: `eq.${payload?.data?.id}`, ...payload?.params },
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...payload?.headers,
    },
  });

export const deleteSpaceideq4 = (payload) =>
  apis.delete(API_URLS.GET_SPACE, {
    ...payload,
    params: { id: "eq.4", ...payload?.params },
  });
export const forgotPassword = (payload) =>
  apis.post(API_URLS.POST_RECOVER, {
    ...payload,
    headers: {
      apikey: PUBLIC_API_KEY,
      "Content-Type": "application/json",
      ...payload?.headers,
    },
  });

export const getStatusupdateselectemployevoteridfirstnamelastnameapplicantideq1 =
  (payload) =>
    apis.get(API_URLS.GET_STATUS_UPDATE, {
      ...payload,
      params: {
        ...payload?.params,
      },
    });
export const getApplicantsideq1 = (payload) =>
  apis.get(API_URLS.GET_APPLICANTS, {
    ...payload,
    params: { ...payload?.params },
  });
export const getGoogleresponseideq2 = (payload) =>
  apis.get(API_URLS.GET_GOOGLE_RESPONSE, {
    ...payload,
    params: { id: "eq.2", ...payload?.params },
  });

export const postStatusupdate = (payload) =>
  apis.post(API_URLS.GET_STATUS_UPDATE, {
    ...payload,
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=minimal",
      ...payload?.headers,
    },
    data: payload?.data,
  });
export const getApplicantsselectjobideq1 = (payload) =>
  apis.get(API_URLS.GET_APPLICANTS, {
    ...payload,
    params: { ...payload?.params },
  });
export const getEmployeeVotes = (payload) =>
  apis.get(API_URLS.GET_EMPLOYEE_SUPABSE, {
    ...payload,
    params: { ...payload?.params },
  });

// ===============> Files <===============

export const postCreateDropboxFolder = (payload) =>
  apis.post("https://api.dropboxapi.com/2/files/create_folder_v2", {
    ...payload,
  });

export const deleteDropboxFileFolder = (payload) =>
  apis.post("https://api.dropboxapi.com/2/files/delete_v2", {
    ...payload,
  });

export const patchRenameOneDriveFolders = (payload) =>
  apis.patch(
    `https://graph.microsoft.com/v1.0/me/drive/items/${payload?.path}`,
    {
      ...payload,
      headers: {
        Authorization: BEARER_TOKEN,
        ...payload?.headers,
      },
      data: payload?.data,
    }
  );

export const patchRenameFileToGoogleDrive = (payload) =>
  apis.patch(`https://www.googleapis.com/drive/v3/files/${payload?.path}`, {
    ...payload,
    data: payload?.data,
    headers: {
      Authorization: GOOGLE_BEARER_TOKEN,
      ...payload?.headers,
    },
  });

export const patchRenameDropboxFileFolder = (payload) =>
  apis.post("https://api.dropboxapi.com/2/files/move_v2", {
    ...payload,
  });

// ===============> Files <===============

export const getEmployeselectcounttechtageqreact = (payload) =>
  apis.get(API_URLS.GET_EMPLOYEE_SUPABSE, {
    ...payload,
    params: { select: "count", ...payload?.params },
  });
export const getNotificationCount = (payload) =>
  apis.get(API_URLS.GET_NOTIFICATIONS, {
    ...payload,
    params: { select: "count", ...payload?.params },
  });
export const getStatusUpdateselectcounttechtageqreact = (payload) =>
  apis.get(API_URLS.GET_STATUS_UPDATE, {
    ...payload,
    params: { ...payload?.params },
  });

export const postApplicants = (payload) =>
  apis.post(API_URLS.GET_APPLICANTS, {
    ...payload,
    headers: {
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",

      ...payload?.headers,
    },
    data: payload?.data,
  });

export const getApplicantsselectjobtitleeqChiefEverythingOfficerPythonRemote = (
  payload
) =>
  apis.get(API_URLS.GET_APPLICANTS, {
    ...payload,
    params: {
      select: "*",
      ...payload?.params,
    },
    headers: {
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      ...payload?.headers,
    },
  });

export const postCountapplicantstechnologywise = (payload) =>
  apis.post(API_URLS.POST_COUNTAPPLICANTSTECHNOLOGYWISE, {
    ...payload,
    headers: {
      "Content-Type": "application/json",
      apikey: PUBLIC_API_KEY,
      Authorization: `Bearer ${PUBLIC_API_KEY}`,
      ...payload?.headers,
    },
  });

export const postBookingNotification = (payload) =>
  apis.post(API_URLS.GET_NOTIFICATIONS, {
    ...payload,
    headers: {
      apikey: SECRET_API_KEY,
      Authorization: `Bearer ${SECRET_API_KEY}`,
      "Content-Type": "application/json",
      ...payload?.headers,
    },
  });
