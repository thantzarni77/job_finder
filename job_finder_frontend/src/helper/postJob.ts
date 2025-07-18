import { useQuery } from "@tanstack/react-query";
import axiosClient from "./axiosClient";

export type Job = {
  id: number;
  employer_id: number;
  category_id: number | null;
  job_title: string;
  job_code: string;
  location: string;
  salary: string;
  posting_status: string;
  role: string;
  type: string;
  view_count: number;
  created_at: string;
  updated_at: string;
};

const jobs = async (): Promise<Job[]> => {
  const res = await axiosClient.get("/post-jobs");
  return res.data.data;
};

export const getAllJobPosts = () => {
  return useQuery<Job[]>({ queryKey: ["jobPosts"], queryFn: jobs });
};

export const postAJob = async (data: Job) => {
  const res = await axiosClient.post("/post-jobs", data);
  return res.data;
};
