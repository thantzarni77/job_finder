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

export const applyJob = async (payload: FormData) => {
  const { data } = await axiosClient.post("/apply-job", payload);
  return data;
};

export const getSeekerAppliedJobs = async () => {
  const { data } = await axiosClient.get("/apply-job/seeker");
  return data;
};

export const getSeekerSavedJobs = async () => {
  const { data } = await axiosClient.get("/save-job/seeker-save-list");
  return data;
};

export const getAppliedSeekers = async (postID: string | undefined) => {
  const { data } = await axiosClient.get(`/apply-job/${postID}`);
  return data;
};

export const addToShortlist = async (postJobID: number | undefined) => {
  const { data } = await axiosClient.patch(`/apply-job/shortlist/${postJobID}`);
  return data;
};

export const changeStatus = async (payload: {
  postID: number;
  status: string;
}) => {
  const { data } = await axiosClient.post(
    `/admin/post-verification/${payload.postID}`,
    payload,
  );
  return data;
};

export const sendMail = async (payload: {
  post_job_id: number | undefined;
  seeker_id: string | undefined;
}) => {
  const { data } = await axiosClient.post("/apply-job/mail", payload);
  return data;
};
