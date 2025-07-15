import { create } from "zustand";

export type User = {
  user_id: number;
  user_name: string;
  user_email: string;
  user_type: string;
  token: string;
};

type UserStore = {
  user: User | null;
  setUserData: (loginData: User) => void;
  logout: () => void;
};

type UserError = {
  errMessage: string | null;
  setErrMessage: (message: string) => void;
  removeErrMessage: () => void;
};

export const useUserStore = create<UserStore & UserError>((set) => ({
  user: null,
  errMessage: null,
  setErrMessage: (message) => {
    set({ errMessage: message });
  },
  removeErrMessage: () => {
    set({ errMessage: null });
  },
  setUserData: (loginData) => {
    set({ user: loginData });
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem("token");
  },
}));
