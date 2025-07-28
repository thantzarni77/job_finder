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
