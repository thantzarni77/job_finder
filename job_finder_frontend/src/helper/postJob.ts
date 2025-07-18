import type { Job } from "../store/JobStore";
import axiosClient from "./axiosClient";

export const getAllJobPosts = async () => {
  const { data } = await axiosClient.get("/post-jobs");
  return data.data;
};

export const postAJob = async (data: Job) => {
  const res = await axiosClient.post("/post-jobs", data);
  return res.data;
};
