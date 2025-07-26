import { create } from "zustand";

export type SingleEmployer = {
  id: number;
  user_id: number;
  company_name: string;
  company_address: string;
  company_phone: string;
  company_email: string;
  company_image: string;
  company_type: string;
  company_description: string;
  verification: string;
  created_at: string;
  updated_at: string;
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
