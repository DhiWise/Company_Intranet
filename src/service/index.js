import Axios from "axios";
import { SUPABSE_CREDS } from "../constant";
const defaultAxios = Axios.create({
  headers: {
    "Content-Type": "application/json",
    Prefer: "return=representation",
    apikey:
      `${SUPABSE_CREDS.PUBLIC_API_KEY}`,
    Authorization: `Bearer ${SUPABSE_CREDS.PUBLIC_API_KEY}`,
  },
});
defaultAxios.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export function apiClient(method, url, options = {}) {
  const { data = {}, headers = {}, params = {}, ...rest } = options;
  return defaultAxios({
    url,
    data,
    method,
    params,
    headers,
    ...rest,
  });
}

export const apis = {
  get: (url, args) => apiClient("get", url, args),
  post: (url, args) => apiClient("post", url, args),
  put: (url, args) => apiClient("put", url, args),
  patch: (url, args) => apiClient("patch", url, args),
  delete: (url, args) => apiClient("delete", url, args),
};
