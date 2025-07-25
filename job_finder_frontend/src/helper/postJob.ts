import axiosClient from "./axiosClient";

export const getAllJobPosts = async (
  selectedJobRole: string[],
  selectedJobType: string[],
  selectedJobCategory: string[],
  selectedSalary: { min: number; max: number | null } | null,
) => {
  const { data } = await axiosClient.get("/post-jobs", {
    params: {
      type: selectedJobType,
      role: selectedJobRole,
      category: selectedJobCategory,
      salary: selectedSalary,
    },
  });

  return data.data;
};

export const getSingleJob = async (jobID: string | undefined) => {
  const { data } = await axiosClient.get(`/post-jobs/${jobID}`);
  return data;
};

export const postAJob = async (data: FormData) => {
  const res = await axiosClient.post("/post-jobs", data);
  return res.data;
};

// getting categories name from backend
export const getCategories = async () => {
  const { data } = await axiosClient.get("/job-categories");
  return data.data;
};
