import axiosClient from "./axiosClient";

export const getSeekerProjects = async () => {
  const { data } = await axiosClient.get("/project");
  return data;
};
