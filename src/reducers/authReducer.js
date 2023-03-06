import { createSlice } from "@reduxjs/toolkit";
import { SUPABSE_CREDS } from "../constant";
import { encryptStorage } from "../util/encryptStorage";
const initialState = {
  userAccessToken: null,
  userType: null,
  userData: {},
}
const authenticationReducer = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.userAccessToken = payload?.access_token || null;
    },
    logout: (state) => {
      state.userAccessToken = {};
      state.userType = null;
      state.userData = {};
      encryptStorage.remove("access_token");
      encryptStorage.remove(`sb-${SUPABSE_CREDS.PROJECT_REFERENCE_ID}-auth-token`);
      encryptStorage.remove("google_access_token");
    },
    setUserType: (state, { payload }) => {
      state.userType = payload || null;
    },
    setUserData: (state, { payload }) => {
      state.userData = payload || null;
    },
  },
});
const { reducer, actions } = authenticationReducer;
export const { login, logout, setUserType, setUserData } = actions;

export const selectUser = (state) => state.user.userAccessToken;

export default reducer;
