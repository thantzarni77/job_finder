import axiosClient from "./axiosClient";

export const registerStepOne = async (userData: FormData) => {
  const { data } = await axiosClient.post("/registerstepone", userData);
  return data;
};

export const registerStepTwo = async ({
  userID,
  userData,
}: {
  userID: number | null;
  userData: FormData;
}) => {
  const response = await axiosClient.post(
    `/registersteptwo/${userID}`,
    userData,
  );
  return response;
};
