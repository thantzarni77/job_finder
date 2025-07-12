import { create } from "zustand";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};
type UserStore = {
  user: User | null;
  login: () => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  login: () => {
    set({
      user: {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        role: "user",
      },
    });
  },
  logout: () => {
    set({ user: null });
  },
}));
