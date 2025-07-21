import axiosClient from "./axiosClient";

export const getSeekerProfile = async (userID: number | undefined) => {
  const data = await axiosClient.get(`/seeker-data/${userID}`);
  return data;
};

export const getEmployerProfile = async (userID: number | undefined) => {
  const data = await axiosClient.get(`/employer-data/${userID}`);
  return data;
};
