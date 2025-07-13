import {
  Box,
  Button,
  Divider,
  IconButton,
  OutlinedInput,
  Typography,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { useState } from "react";

const EmployerRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box
      component="form"
      sx={{
        width: { xs: "85%", sm: "80%", md: "75%", lg: "65%" },
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {/* info */}
      <Typography variant="subtitle2">
        If you are a standalone, do not enter company details
      </Typography>
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
          Your Name
        </Typography>
        <OutlinedInput
          id="name"
          type="text"
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
      {/* company name */}
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
          htmlFor="companyName"
          sx={{
            fontWeight: 300,
          }}
        >
          Company name
          <span style={{ color: "#ef4444" }}>*</span> {/* Red asterisk */}
        </Typography>
        <OutlinedInput
          id="companyName"
          fullWidth
          placeholder="Please enter your company name"
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
      {/* company location */}
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
          htmlFor="companyLocation"
          sx={{
            fontWeight: 300,
          }}
        >
          Company Location
          <span style={{ color: "#ef4444" }}>*</span> {/* Red asterisk */}
        </Typography>
        <OutlinedInput
          id="companyLocation"
          type="text"
          fullWidth
          placeholder="Please enter your Company Location"
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
      {/* industry */}
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
          htmlFor="industry"
          sx={{
            fontWeight: 300,
          }}
        >
          Industry
          <span style={{ color: "#ef4444" }}>*</span> {/* Red asterisk */}
        </Typography>
        <OutlinedInput
          id="industry"
          type="text"
          fullWidth
          placeholder="Please enter your industry"
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
      <Divider flexItem sx={{ width: "100%", bgcolor: "primary.main" }} />
      <Typography sx={{ textAlign: "center" }}>
        Already have an account ?{" "}
        <MuiLink component={RouterLink} to={"/login"}>
          Login
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default EmployerRegister;
