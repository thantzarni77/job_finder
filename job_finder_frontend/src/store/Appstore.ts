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

type FilterDrawerStore = {
  showFilterDrawer: boolean;
  setShowFilterDrawer: (value: boolean) => void;
};

export const useFilterStore = create<FilterDrawerStore>((set) => ({
  showFilterDrawer: false,
  setShowFilterDrawer: (userValue) => {
    set({ showFilterDrawer: userValue });
  },
}));

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
