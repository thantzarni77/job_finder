import axiosClient from "./axiosClient";

export const updateUser = async ({
  userID,
  userFormData,
}: {
  userID: number | undefined;
  userFormData: FormData;
}) => {
  const data = await axiosClient.post(`/user/update/${userID}`, userFormData);
  return data;
};

export const getSingleUserData = async () => {
  const { data } = await axiosClient.get("/user/get");
  return data;
};

export const getIndividualDataForJob = async (
  employer_id: number | undefined,
) => {
  const { data } = await axiosClient.get(
    `/user/individual-employer/${employer_id}`,
  );
  return data;
};
