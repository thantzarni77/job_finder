import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from "@mui/material";

import { RouterProvider } from "react-router";
import { router } from "./Routes.tsx";
import { useThemeStore } from "./store/Appstore";
import { useMemo } from "react";
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
  const mode = useThemeStore((state) => state.mode);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        ...(mode === "light" && {
          primary: {
            main: "#5f6caf",
            light: "#898989",
          },
          secondary: {
            main: "#33373B",
          },
        }),
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
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              borderRadius: "10px",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#5f6caf",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#5f6caf",
              },
            },
          },
        },
      },
    });
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {inputGlobalStyles}
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}
