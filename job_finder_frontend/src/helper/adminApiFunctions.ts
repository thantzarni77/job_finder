import type { AdminForm } from "../pages/admin/AddAdmin";
import axiosClient from "./axiosClient";

export const getAllAdmins = async () => {
  const { data } = await axiosClient.get("/admin");
  return data;
};

export const createAdmin = async (payload: AdminForm) => {
  const { data } = await axiosClient.post("/admin", payload);
  return data;
};

export const removeAdmin = async (adminID: number) => {
  const { data } = await axiosClient.delete(`/admin/${adminID}`);
  return data;
};
