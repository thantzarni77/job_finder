import axiosClient from "./axiosClient";

export const getAllTalents = async () => {
  const response = await axiosClient.get("/talent");
  return response;
};
