import { create } from "zustand";

type AppStore = {
  showDrawer: boolean;
  setShowDrawer: (value: boolean) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  showDrawer: false,
  setShowDrawer: (userValue) => {
    set({ showDrawer: userValue });
  },
}));
