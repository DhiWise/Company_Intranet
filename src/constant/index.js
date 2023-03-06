export const SUPABSE_CREDS = {
  COMMON_URL: process.env.REACT_APP_SUPABSE_COMMON_URL,
  PROJECT_REFERENCE_ID: process.env.REACT_APP_PROJECT_REFERENCE_ID,
  PUBLIC_API_KEY: process.env.REACT_APP_PUBLIC_API_KEY,  //anon
  SECRET_API_KEY: process.env.REACT_APP_SECRET_API_KEY,  // Service role
};

// Keka Credentials here
export const KEKA_ORGANISATION_NAME = "ENTER_YOUR_KEKA_ORGANIZATION_NAME_HERE";

export const KEKA_CREDS = {
  KEKA_API_KEY: process.env.REACT_APP_KEKA_API_KEY,
  KEKA_CLIENT_ID: process.env.REACT_APP_KEKA_CLIENT_ID,
  KEKA_CLIENT_SECRET_KEY: process.env.REACT_APP_KEKA_CLIENT_SECRET_KEY,
};

export const EMAIL_TEMPLATE_SUBJECT = "ENTER_YOUR_EMAIL_SUBJECT_HERE";
export const EMAIL_TEMPLATE_CONTENT = "ENTER_YOUR_EMAIL_CONTENT_HERE";

// Supabase Credentials here
export const FRESHTEAM_ORGANISATION_NAME = "ENTER_YOUR_FRESHTEAM_ORGANIZATION_NAME_HERE";
export const FRESHTEAM_TOKEN = process.env.REACT_APP_FRESHTEAM_TOKEN;


export const BACKEND_URL = "http://localhost:8045/";

export const GOOGLE_FORM_TOKEN = "Bearer ENTER_YOUR_GOOGLE_FORM_TOKEN_HERE";

export const gender = [
  {
    value: 0,
    label: "NotSpecified",
  },
  {
    value: 1,
    label: "Male",
  },
  {
    value: 2,
    label: "Female",
  },
  {
    value: 3,
    label: "Others",
  },
];

export const USER_TYPE = {
  Admin: 2,
  User: 3,
  Guest: 4,
};

export const userDropdown = [
  {
    value: 2,
    label: "Admin",
  },
  {
    value: 3,
    label: "User",
  },
  {
    value: 4,
    label: "Guest",
  },
];

export const ADMIN_ROUTES = [
  "/admin/employeedirectory",
  "/admin/employeelist",
  "/admin/documents",
  "/admin/documentsone",
  "/admin/files",
  "/admin/filesone",
  "/admin/spacemanagement",
  "/admin/bookspacedaily",
  "/admin/bookspaceweekly",
  "/admin/bookspacemonthly",
  "/admin/viewbooking",
  "/admin/employeepage",
  "/admin/invitation",
  "/admin/toolsettings",
  "/admin/datasettings",
  "/admin/resourcedata",
  "/admin/dashboard",
  "/admin/ats",
  "/admin/atsflutter",
  "/admin/myProfile",
];

export const USER_ROUTES = [
  "/employeedirectory",
  "/spacemanagement",
  "/bookspacedaily",
  "/documents",
  "/files",
  "/votes",
  "/myvotes",
  "/allapplication",
  "/dashboard",
  "/votehere",
  "/bookings",
  "/myProfile",
];

export const VOTES_CONST = {
  ACCEPTED: "Accepted",
  ACCEPTED_COLOR: "text-green-500",
  REJECTED: "Rejected",
  REJECTED_COLOR: "text-red-500",
};

// Enter the tag names here accroding to freshteam
export const TECH_TAG = [
  { job_title: "react", tech_tag: "react" },
  { job_title: "react (remote)", tech_tag: "react" },
  { job_title: "flutter", tech_tag: "flutter" },
  { job_title: "flutter (remote)", tech_tag: "flutter" },
  { job_title: "node", tech_tag: "node" },
  { job_title: "node (remote)", tech_tag: "flutter" },
  { job_title: "android", tech_tag: "android" },
  { job_title: "android (remote)", tech_tag: "flutter" },
  { job_title: "ios", tech_tag: "ios" },
  { job_title: "ios (remote)", tech_tag: "ios" },
  { job_title: "chief everything officer ", tech_tag: "ceo" },
  { job_title: "chief everything officer (remote)", tech_tag: "ceo" },
  { job_title: "chief everything officer python", tech_tag: "python" },
  { job_title: "chief everything officer python (remote)", tech_tag: "python" },
  { job_title: "demo job", tech_tag: "react" },
  { job_title: "demo job (remote))", tech_tag: "react" },
];

export const FILE_FOLDER_CONST = {
  DEL_FILE: "Delete file",
  DEL_FOLDER: "Delete folder",
  FOLDER_IMAGE: "/images/img_folder_white_A700.png",
  FILE_IMAGE: "/images/img_paper.png",
};

export const FILE_FOLDER_TOKEN_CONST = {
  ONE_DRIVE_TOKEN: {
    CLIENT_ID: "onedriveClientId",
    REDIRECT_URI: "onedriveRediretUri",
    CLIENT_SECRET: "onedriveClientSecret",
    CODE: "onedriveCode",
    ACCESS_TOKEN: "onedriveAccessToken",
    REFRESH_TOKEN: "onedriveRefreshToken",
  },
  GOOGLE_DRIVE_TOKEN: {
    CLIENT_ID: "googleDriveClientId",
    REDIRECT_URI: "googleDriveRediretUri",
    CLIENT_SECRET: "googleDriveClientSecret",
    CODE: "googleDriveCode",
    ACCESS_TOKEN: "googleDriveAccessToken",
    REFRESH_TOKEN: "googleDriveRefreshToken",
  },
  DROPBOX_TOKEN: {
    CLIENT_ID: "dropboxClientId",
    REDIRECT_URI: "dropboxRediretUri",
    CLIENT_SECRET: "dropboxClientSecret",
    CODE: "dropboxCode",
    ACCESS_TOKEN: "dropboxAccessToken",
    REFRESH_TOKEN: "dropboxRefreshToken",
  },
};
