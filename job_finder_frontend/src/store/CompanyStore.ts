import { create } from "zustand";
type TypeCompanyPaginateStore = {
  page: number;
  setPage: (page: number) => void;
};
export const useCompanyPaginateStore = create<TypeCompanyPaginateStore>(
  (set) => ({
    page: 1,
    setPage: (page: number) => {
      set({ page });
    },
  }),
);

export type EmployerUser = {
  id: number;
  name: string;
  phone: string;
  address: string;
};

export type Employer = {
  id: number;
  company_name: string;
  company_address: string;
  company_phone: string;
  company_email: string;
  company_image: string;
  company_type: string;
  verification: string;
  created_at: string;
  user_id: EmployerUser;
};

type CompanyStoreType = {
  companiesData: Employer[] | [];
  setCompaniesData: (companies: Employer[]) => void;
};

export const useCompanyStore = create<CompanyStoreType>((set) => ({
  companiesData: [],
  setCompaniesData: (companiesData: Employer[]) => {
    set({ companiesData });
  },
}));

type SearchByCompanyNameType = {
  searchCompanyName: string;
  setSearchCompanyName: (name: string) => void;
};
export const useSearchByCompanyName = create<SearchByCompanyNameType>(
  (set) => ({
    searchCompanyName: "",
    setSearchCompanyName: (searchCompanyName: string) => {
      set({ searchCompanyName });
    },
  }),
);
