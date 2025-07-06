import { create } from "zustand";
import type { PaletteMode } from "@mui/material";

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
