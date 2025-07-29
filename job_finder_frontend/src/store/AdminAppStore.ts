import { create } from "zustand";
type AdminMenuStore = {
  showMenu: boolean;
  setShowMenu: (value: boolean) => void;
};
export const useAdminMenuStore = create<AdminMenuStore>((set) => ({
  showMenu: false,
  setShowMenu: (value: boolean) => {
    set({ showMenu: value });
  },
}));
