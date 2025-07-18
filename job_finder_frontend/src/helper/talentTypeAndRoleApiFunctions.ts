import axiosClient from "./axiosClient";

export const getAllTalents = async () => {
  const response = await axiosClient.get("/talent");
  return response;
};

export const getAllRoles = async () => {
  const response = await axiosClient.get("/roles");
  return response;
};

export const getAllTypes = async () => {
  const { data } = await axiosClient.get("/types");
  return data;
};
