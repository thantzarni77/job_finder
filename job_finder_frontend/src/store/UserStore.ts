import { create } from "zustand";

type LoginUser = {
  user_id: number;
  user_name: string;
  user_email: string;
  user_type: string;
};

type UserStore = {
  user: null | LoginUser;
  token: null | string;
  setToken: (token: string) => void;
  setUserData: (loginData: LoginUser | null) => void;
  logout: () => void;
};

type UserError = {
  errMessage: string | null;
  setErrMessage: (message: string) => void;
  removeErrMessage: () => void;
};

export const useUserStore = create<UserStore & UserError>((set) => ({
  user: null,
  token: null,
  setToken: (tokenFromServer: string) => {
    set({ token: tokenFromServer });
    localStorage.setItem("token", tokenFromServer);
  },
  setUserData: (loginData) => {
    set({ user: loginData });
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem("token");
  },
  errMessage: null,
  setErrMessage: (message) => {
    set({ errMessage: message });
  },
  removeErrMessage: () => {
    set({ errMessage: null });
  },
}));
