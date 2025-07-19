import axiosClient from "./axiosClient";

export const seekerGetProject = async (seekerId: string | number) => {
  const { data } = await axiosClient.get(`/project/${seekerId}`);
  return data;
};

export const seekerAddProject = async (data: FormData) => {
  const response = await axiosClient.post("/project", data);
  return response;
};
