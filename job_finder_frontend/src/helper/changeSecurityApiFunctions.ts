import axiosClient from "./axiosClient";

export const changeEmail = async (payload: { email: string }) => {
  const { data } = await axiosClient.post("/update-mail", payload);
  return data;
};

export const changePassword = async ({
  payload,
  userID,
}: {
  payload: { old_password: string; password: string };
  userID: number | undefined;
}) => {
  const { data } = await axiosClient.post(
    `/change-password/${userID}`,
    payload,
  );
  return data;
};
