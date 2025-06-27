import { createTheme, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router";
import { router } from "./Routes.tsx";

export default function Theme() {
  const mode = "light";
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#5f6caf" : "#1976d2",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}
