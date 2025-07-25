import type { LoginData } from "../pages/Login";
import axiosClient from "./axiosClient";

export const loginUser = async (payload: LoginData) => {
  const { data } = await axiosClient.post("login", payload);
  return data;
};

export const logoutUser = async () => {
  const response = await axiosClient.post("/logout");
  return response;
};
