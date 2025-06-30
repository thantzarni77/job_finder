import { createTheme, GlobalStyles, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router";
import { router } from "./Routes.tsx";

//remove green box on input auto fill
const inputGlobalStyles = (
  <GlobalStyles
    styles={{
      "input:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 100px white inset",
        WebkitTextFillColor: "#000",
      },
    }}
  />
);

export default function Theme() {
  const mode = "light";
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#5f6caf" : "#1976d2",
        light: "#898989",
      },
      secondary: {
        main: mode === "light" ? "#33373B" : "#ffffff",
      },
    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiInput: {
        defaultProps: {
          disableUnderline: true,
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            "&::placeholder": {
              color: "#5f6caf",
              opacity: 1,
              fontWeight: "400",
            },
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      {inputGlobalStyles}
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}
