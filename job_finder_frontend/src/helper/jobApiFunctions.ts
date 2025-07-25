import axiosClient from "./axiosClient";

export const doSaveJob = async (payload: {
  seeker_id: number | null;
  post_job_id: number | undefined;
}) => {
  const { data } = await axiosClient.post("/save-job", payload);
  return data;
};

export const undoSaveJob = async (id: number | undefined) => {
  const { data } = await axiosClient.delete(`/save-job/${id}`);
  return data;
};

export const isSaved = async (payload: {
  seeker_id: number | null;
  post_job_id: number | undefined;
}) => {
  const response = await axiosClient.post("/save-job/check", payload);
  return response;
};
