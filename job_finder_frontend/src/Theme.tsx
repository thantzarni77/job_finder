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
            main: "#5f6caf", //purple
            light: "#898989", //light gray
          },
          secondary: {
            main: "#33373B", //dark gray
            light: "#f5f5f5", //bg white
          },
          error: {
            main: "#EA4335",
          },
          success: {
            main: "#75C149",
          },
        }),
      },
      components: {
        // MuiButtonBase: {
        //   defaultProps: {
        //     disableRipple: true,
        //   },
        // },
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
                fontSize: "12px",
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
