import axiosClient from "./axiosClient";

export const getUserProfile = async () => {
  const { data } = await axiosClient.get("/profile");
  return data;
};

export const getSeekerProfile = async (userID: number | undefined | null) => {
  const data = await axiosClient.get(`/seeker-data/${userID}`);
  return data;
};

export const getSeekerProfileWithSeekerID = async (
  seekerID: number | undefined | null,
) => {
  const data = await axiosClient.get(`/seeker/${seekerID}`);
  return data;
};

export const updateSeekerProfile = async ({
  seekerID,
  seekerData,
}: {
  seekerID: number | null;
  seekerData: FormData;
}) => {
  const data = await axiosClient.post(`/seeker/${seekerID}`, seekerData);
  return data;
};

export const getEmployerProfile = async (userID: number | undefined) => {
  const { data } = await axiosClient.get(`/employer-data/${userID}`);
  return data;
};

export const updateEmployerProfile = async ({
  employerID,
  employerData,
}: {
  employerID: number | null;
  employerData: FormData;
}) => {
  const { data } = await axiosClient.post(
    `/employer/${employerID}`,
    employerData,
  );
  return data;
};
