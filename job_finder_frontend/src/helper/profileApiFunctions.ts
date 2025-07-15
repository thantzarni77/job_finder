import axiosClient from "./axiosClient";

export const getSeekerProfile = async () => {
  const data = await axiosClient.get("/seeker");
  return data;
};
