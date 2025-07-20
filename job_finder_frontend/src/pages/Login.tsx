import {
  Box,
  Button,
  Typography,
  OutlinedInput,
  IconButton,
  Container,
  FormHelperText,
  Alert,
} from "@mui/material";
import {
  Google as GoogleIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router";
import BG_IMG from "../assets/login_signup_bg.jpg";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../helper/authApiFunctions";
import { useUserStore } from "../store/UserStore";
import { isAxiosError } from "axios";

export type LoginData = {
  email: string;
  password: string;
};

export type LoginUserWithToken = {
  data: {
    user_id: number;
    user_name: string;
    user_email: string;
    user_type: string;
    token: string;
  };
};

export default function Login() {
  const queryClient = useQueryClient();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const setUserData = useUserStore((state) => state.setUserData);
  const setToken = useUserStore((state) => state.setToken);
  const errMessage = useUserStore((state) => state.errMessage);
  const setErrMessage = useUserStore((state) => state.setErrMessage);
  const removeErrMessage = useUserStore((state) => state.removeErrMessage);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ mode: "onBlur" });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ data }: LoginUserWithToken) => {
      setUserData(data);
      setToken(data.token);
      queryClient.invalidateQueries();
      navigate("/");
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        setErrMessage(err.response?.data.message);
      }
    },
  });

  const loginHandler = (payload: LoginData) => {
    loginMutation.mutate(payload);
  };
  return (
    <Box
      sx={{
        backgroundImage: `url(${BG_IMG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        alignItems: "center",
        flexDirection: "column",
        display: "flex",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
        LOGO
      </Typography>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Login to Job Finder
      </Typography>
      <Container
        sx={{
          width: { xs: "95%", sm: "75%", md: "65%", lg: "50%" },
          bgcolor: "background.paper",
          borderRadius: "12px",
          py: 5,
          mb: 5,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(loginHandler)}
          sx={{
            width: { xs: "85%", sm: "80%", md: "75%", lg: "65%" },
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
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
              <span style={{ color: "#ef4444" }}>*</span> {/* Red asterisk */}
            </Typography>
            <OutlinedInput
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address.",
                },
              })}
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
              error={!!errors.email}
            />
            {errors.email && (
              <FormHelperText error id="email">
                {errors.email.message as string}
              </FormHelperText>
            )}
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
              {...register("password", {
                required: "Password is required.",
              })}
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
              error={!!errors.password}
            />
            {errors.password && (
              <FormHelperText error id="password">
                {errors.password.message as string}
              </FormHelperText>
            )}
          </Box>
          {errMessage && (
            <Alert
              sx={{ borderRadius: 3 }}
              variant="outlined"
              severity="error"
              onClose={() => {
                removeErrMessage();
              }}
            >
              {errMessage}
            </Alert>
          )}
          <Typography sx={{ alignSelf: "center" }}>
            By continuing, you agree to{" "}
            <MuiLink component={RouterLink} to={""}>
              Terms & Conditions
            </MuiLink>
          </Typography>
          <Button
            loading={loginMutation.isPending}
            variant="contained"
            type="submit"
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
              Login
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
              width: { xs: "85%", sm: "75%", md: "70%", lg: "65%" },
              textTransform: "none",
              py: 1,
              borderRadius: 2,
            }}
          >
            <GoogleIcon sx={{ mx: 1, fontSize: "35px" }} />
            <Typography>Continue with google account</Typography>
          </Button>
        </Box>
        <Typography sx={{ textAlign: "center", my: 2 }}>
          Don't have an account?
          <MuiLink sx={{ mx: 1 }} component={RouterLink} to={"/register"}>
            Register here
          </MuiLink>
        </Typography>
      </Container>
    </Box>
  );
}
