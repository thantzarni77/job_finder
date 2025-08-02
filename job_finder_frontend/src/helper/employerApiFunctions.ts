import axiosClient from "./axiosClient";

export const getSingleEmployerData = async (id: undefined | number) => {
  const { data } = await axiosClient.get(`/employer-data/${id}`);
  return data;
};

export async function getAdminEmployers(page: number) {
  const { data } = await axiosClient.get("/employer", {
    params: {
      page,
    },
  });
  return data;
}

export async function verifyByAdmin(id: number, status: string) {
  const { data } = await axiosClient.post(`/employer/verify/${id}`, { status });
  return data;
}
