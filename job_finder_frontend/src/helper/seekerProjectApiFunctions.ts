import axiosClient from "./axiosClient";

export const seekerGetProject = async () => {
  const { data } = await axiosClient.get(`/project`);
  return data;
};

export const seekerAddProject = async (data: FormData) => {
  const response = await axiosClient.post("/project", data);
  return response;
};

export const eachSeekerGetProject = async (userID: number | null) => {
  const { data } = await axiosClient.get(`/project/${userID}`);
  return data;
};
