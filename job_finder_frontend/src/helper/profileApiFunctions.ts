import axiosClient from "./axiosClient";

export const getSeekerProfile = async (userID: string | undefined) => {
  const data = await axiosClient.get(`/seeker/${userID}`);
  return data;
};
