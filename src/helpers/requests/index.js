import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_BACKEND_URL_LOCAL
    : process.env.REACT_APP_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL,
});

export const post = async (url, param) =>
  await axiosInstance.post(`/${url}`, param);

export const get = async (url, param) =>
  await axiosInstance.get(`/${url}`, param);
