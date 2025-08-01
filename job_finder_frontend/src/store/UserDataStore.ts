import { create } from "zustand";

export type UserData = {
  id: number;
  name: string;
  email: string;
  phone: null | string;
  address: null | string;
  user_type: string;
  profile_picture: null | string;
};

type AllUserSingle = {
  id: number;
  name: string;
  email: string;
  phone: null | string;
  address: null | string;
  user_type: string;
  profile_picture: null | string;
  employer?: {
    id: number;
    user_id: number;
    company_name: null | string;
    company_address: null | string;
    company_phone: null | string;
    company_email: null | string;
    company_image: null | string;
    company_type: null | string;
    company_description: null | string;
    verification: string;
    created_at: string;
    updated_at: string;
  };
};

type UserDataValue = {
  allUsers: AllUserSingle[];
  userData: UserData;
};

type UserDataActions = {
  setAllUsers: (value: AllUserSingle[]) => void;
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
    allUsers: [],
    userData: initialValue,
    setAllUsers: (data: AllUserSingle[]) => {
      set({ allUsers: data });
    },
    setUserData: (dataFromServer: UserData) => {
      set({ userData: dataFromServer });
    },
  }),
);

export type IndividualJob = {
  id: number;
  name: string;
  email: string;
  phone: null | string;
  address: null | string;
  user_type: string;
  profile_picture: null | string;
};

type IndividualJobData = {
  individualJobData: IndividualJob;
};

type EmployerJobActions = {
  setIndividualJobData: (value: IndividualJob) => void;
};

const initialValueForEmp = {
  id: 0,
  name: "",
  email: "",
  phone: null,
  address: null,
  user_type: "",
  profile_picture: null,
};

export const useIndividualJobStore = create<
  IndividualJobData & EmployerJobActions
>((set) => ({
  individualJobData: initialValueForEmp,
  setIndividualJobData: (dataFromServer: IndividualJob) => {
    set({ individualJobData: dataFromServer });
  },
}));
