import CryptoJS from "crypto-js";

const SECRET_KEY = 'JAYSHREERAM';

const encryptData = (text) => {
  const data = CryptoJS.AES.encrypt(
    JSON.stringify(text),
    SECRET_KEY
  ).toString();
  return data;
};

const decryptData = (text) => {
  const bytes = CryptoJS.AES.decrypt(text, SECRET_KEY);
  const data = bytes.toString(CryptoJS.enc.Utf8);
  return data;
};

export const encryptStorage = {
  set: (key, value) => {
    const setValue = encryptData(value);
    localStorage.setItem(key, setValue);
  },
  get: (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(decryptData(data)) : null;
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
};
