import axiosClient from "./axiosClient";

export const getSingleCategory = async (categoryID: number | null) => {
  const { data } = await axiosClient.get(`/job-categories/${categoryID}`);
  return data;
};

export const addCategory = async (payload: { name: string }) => {
  const { data } = await axiosClient.post("/job-categories", payload);
  return data;
};

export const editCategory = async (
  id: number | null,
  payload: { name: string },
) => {
  const { data } = await axiosClient.put(`/job-categories/${id}`, payload);
  return data;
};

export const deleteCategory = async (id: number | null) => {
  const { data } = await axiosClient.delete(`/job-categories/${id}`);
  return data;
};
