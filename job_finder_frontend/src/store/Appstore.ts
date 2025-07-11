import { create } from "zustand";
import type { PaletteMode } from "@mui/material";

type AppDrawerStore = {
  showDrawer: boolean;
  setShowDrawer: (value: boolean) => void;
};

export const useAppStore = create<AppDrawerStore>((set) => ({
  showDrawer: false,
  setShowDrawer: (userValue) => {
    set({ showDrawer: userValue });
  },
}));

type JobFilterDrawerStore = {
  showJobFilterDrawer: boolean;
  setShowJobFilterDrawer: (value: boolean) => void;
};

export const useJobFilterStore = create<JobFilterDrawerStore>((set) => ({
  showJobFilterDrawer: false,
  setShowJobFilterDrawer: (userValue) => {
    set({ showJobFilterDrawer: userValue });
  },
}));

type CompanyFilterDrawerStore = {
  showCompanyFilterDrawer: boolean;
  setShowCompanyFilterDrawer: (value: boolean) => void;
};

export const useCompanyFilterStore = create<CompanyFilterDrawerStore>(
  (set) => ({
    showCompanyFilterDrawer: false,
    setShowCompanyFilterDrawer: (userValue) => {
      set({ showCompanyFilterDrawer: userValue });
    },
  }),
);

// light mode dark mode
type ThemeStore = {
  mode: PaletteMode;
  setMode: (mode: PaletteMode) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  mode: (localStorage.getItem("mode") as PaletteMode) || "light",
  setMode: (mode) => {
    set({ mode });
    localStorage.setItem("mode", mode);
  },
}));
