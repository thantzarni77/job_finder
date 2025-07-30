import { create } from "zustand";

export type Admin = {
  id: number;
  name: string;
  email: string;
  phone: null | string;
  address: null | string;
  user_type: string;
  profile_picture: null | string;
  created_at: string;
};

type AllAdmins = {
  allAdmins: Admin[];
};

type AllAdminsActions = {
  setAllAdmins: (value: Admin[]) => void;
};

export const useAdminStore = create<AllAdmins & AllAdminsActions>((set) => ({
  allAdmins: [],
  setAllAdmins: (value: Admin[]) => {
    set({ allAdmins: value });
  },
}));

export type Category = {
  id: number;
  name: string;
};

type Categories = {
  categories: Category[];
};

type CategoryActions = {
  setCategory: (value: Category[]) => void;
};

export const useCategoryStore = create<Categories & CategoryActions>((set) => ({
  categories: [],
  setCategory: (value: Category[]) => {
    set({ categories: value });
  },
}));
