import {
  Box,
  Button,
  IconButton,
  OutlinedInput,
  Typography,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Google as GoogleIcon,
} from "@mui/icons-material";
import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { useState } from "react";

const SeekerRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box
      sx={{
        width: { xs: "85%", sm: "80%", md: "75%", lg: "65%" },
        mx: "auto",
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* name */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "full",
          }}
        >
          <Typography
            component="label"
            htmlFor="name"
            sx={{
              fontWeight: 300,
            }}
          >
            Your name
          </Typography>
          <OutlinedInput
            id="name"
            fullWidth
            placeholder="Please enter your name"
            sx={{
              // root of the OutlinedInput
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.paper",
                borderRadius: "13px",

                //  border
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },

                // Style the border when focused
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.light", // Use theme's primary color on focus
                },
              },
              //  placeholder text
              "& .MuiInputBase-input::placeholder": {
                color: "primary.main",
                fontSize: "13px",
                fontWeight: 400,
              },
            }}
          />
        </Box>
        {/* email */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "full",
          }}
        >
          <Typography
            component="label"
            htmlFor="email"
            sx={{
              fontWeight: 300,
            }}
          >
            Email
          </Typography>
          <OutlinedInput
            id="email"
            type="email"
            fullWidth
            placeholder="Please enter your email"
            sx={{
              // root of the OutlinedInput
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.paper",
                borderRadius: "13px",

                //  border
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },

                // Style the border when focused
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.light", // Use theme's primary color on focus
                },
              },
              //  placeholder text
              "& .MuiInputBase-input::placeholder": {
                color: "primary.main",
                fontSize: "13px",
                fontWeight: 400,
              },
            }}
          />
        </Box>
        {/* password */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "full",
          }}
        >
          <Typography
            component="label"
            htmlFor="password"
            sx={{
              fontWeight: 300,
            }}
          >
            Password
          </Typography>
          <OutlinedInput
            id="password"
            endAdornment={
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            }
            type={showPassword ? "text" : "password"}
            fullWidth
            placeholder="Please enter your password"
            sx={{
              // root of the OutlinedInput
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.paper",
                borderRadius: "13px",

                //  border
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },

                // Style the border when focused
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.light", // Use theme's primary color on focus
                },
              },
              //  placeholder text
              "& .MuiInputBase-input::placeholder": {
                color: "primary.main",
                fontSize: "13px",
                fontWeight: 400,
              },
            }}
          />
        </Box>
        {/* phone number */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "full",
          }}
        >
          <Typography
            component="label"
            htmlFor="phone"
            sx={{
              fontWeight: 300,
            }}
          >
            Phone Number
            <span style={{ color: "#ef4444" }}>*</span> {/* Red asterisk */}
          </Typography>
          <OutlinedInput
            id="phone"
            type="phone"
            fullWidth
            placeholder="eg : +95 9 123 456 78"
            sx={{
              // root of the OutlinedInput
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.paper",
                borderRadius: "13px",

                //  border
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },

                // Style the border when focused
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.light", // Use theme's primary color on focus
                },
              },
              //  placeholder text
              "& .MuiInputBase-input::placeholder": {
                color: "primary.main",
                fontSize: "13px",
                fontWeight: 400,
              },
            }}
          />
        </Box>
        <Typography sx={{ alignSelf: "center" }}>
          By continuing, you agree to{" "}
          <MuiLink component={RouterLink} to={""}>
            Terms & Conditions{" "}
          </MuiLink>
        </Typography>
        <Button
          variant="contained"
          sx={{
            py: 2,
            borderRadius: 2,
            textTransform: "none",
            boxShadow: "none",
            ":hover": {
              boxShadow: "none",
            },
          }}
        >
          <Typography variant="body1" fontWeight={400}>
            Register
          </Typography>
        </Button>
      </Box>

      <Typography
        variant="subtitle2"
        sx={{ opacity: 0.5, textAlign: "center", my: 2 }}
      >
        OR
      </Typography>

      <Box
        sx={{
          mt: 2,
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            width: "100%",
            textTransform: "none",
            py: 1,
            borderRadius: 2,
          }}
        >
          <GoogleIcon sx={{ mx: 1, fontSize: "35px" }} />
          <Typography>Continue with google account</Typography>
        </Button>
      </Box>
      <Typography sx={{ textAlign: "center", my: 3 }}>
        Already have an account ?{" "}
        <MuiLink component={RouterLink} to={"/login"}>
          Login
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default SeekerRegister;
