import { create } from "zustand";

type UserData = {
  id: number;
  name: string;
  email: string;
  phone: null | string;
  address: null | string;
  user_type: string;
  profile_picture: null | string;
};

type UserDataValue = {
  userData: UserData;
};

type UserDataActions = {
  setUserData: (value: UserData) => void;
};

const initialValue = {
  id: 0,
  name: "",
  email: "",
  phone: null,
  address: null,
  user_type: "",
  profile_picture: null,
};

export const useUserDataStore = create<UserDataValue & UserDataActions>(
  (set) => ({
    userData: initialValue,
    setUserData: (dataFromServer: UserData) => {
      set({ userData: dataFromServer });
    },
  }),
);
