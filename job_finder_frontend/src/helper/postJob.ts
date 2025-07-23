import type { Job } from "../store/JobStore";
import axiosClient from "./axiosClient";

export const getAllJobPosts = async (
  selectedJobRole: string[],
  selectedJobType: string[],
  selectedJobCategory: string[],
) => {
  const { data } = await axiosClient.get("/post-jobs", {
    params: {
      type: selectedJobType,
      role: selectedJobRole,
      category: selectedJobCategory,
    },
  });

  return data.data;
};

export const postAJob = async (data: Job) => {
  const res = await axiosClient.post("/post-jobs", data);
  return res.data;
};

// getting categories name from backend
export const getCategories = async () => {
  const { data } = await axiosClient.get("/job-categories");
  return data.data;
};
