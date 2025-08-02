import axiosClient from "./axiosClient";

export const getAllContacts = async () => {
  const { data } = await axiosClient.get("/contact/all");
  return data;
};

export const sendContact = async (payload: {
  user_id: number;
  title: string;
  message: string;
}) => {
  const { data } = await axiosClient.post("/contact/send", payload);
  return data;
};
