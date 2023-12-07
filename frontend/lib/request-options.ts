import { AxiosRequestConfig } from "axios";

export const requestOptions: AxiosRequestConfig = {
  withCredentials: true,
  headers: { Authorization: localStorage.getItem("sessionToken") },
};
