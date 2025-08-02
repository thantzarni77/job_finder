import { create } from "zustand";

export type SingleEmployer = {
  id: number;
  user_id: number;
  company_name: string | null;
  company_address: string | null;
  company_phone: string | null;
  company_email: string | null;
  company_image: string | null;
  company_type: string | null;
  company_description: string | null;
  verification: string;
  created_at: string;
  updated_at: string;
};

export type EmployerWithUserID = {
  id: number;
  company_name: string | null;
  company_address: string | null;
  company_phone: string | null;
  company_email: string | null;
  company_image: string | null;
  company_type: string | null;
  company_description: string | null;
  verification: string;
  created_at: string;
  updated_at: string;
  user_id: {
    id: number;
    name: string;
    email: string;
    phone: null | string;
    address: null | string;
    user_type: string;
    profile_picture: null | string;
  };
};

type Employer = {
  singleEmployer: null | SingleEmployer;
};

type SingleEmployerActions = {
  setSingleEmployer: (value: SingleEmployer) => void;
};

export const useSingleEmployerStore = create<Employer & SingleEmployerActions>(
  (set) => ({
    singleEmployer: null,
    setSingleEmployer: (valueFromServer: SingleEmployer) => {
      set({ singleEmployer: valueFromServer });
    },
  }),
);
