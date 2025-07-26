import axiosClient from "./axiosClient";

export const getSingleEmployerData = async (id: undefined | number) => {
  const { data } = await axiosClient.get(`/employer-data/${id}`);
  return data;
};
