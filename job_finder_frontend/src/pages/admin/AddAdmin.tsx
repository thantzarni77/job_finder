import {
  Alert,
  Box,
  Button,
  FormHelperText,
  IconButton,
  OutlinedInput,
  Typography,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdmin } from "../../helper/adminApiFunctions";
import { useState } from "react";
import { isAxiosError } from "axios";

export type AdminForm = {
  name: string;
  email: string;
  password: string;
};

const AddAdmin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errMessage, setErrMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminForm>({
    mode: "all",
  });

  const createAdminMutation = useMutation({
    mutationFn: createAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allAdmins"] });
      setErrMessage(null);
      navigate(-1);
    },
    onError: (err) => {
      console.log(err);
      if (isAxiosError(err)) {
        setErrMessage(err.response?.data.message);
      }
    },
  });

  const createAdminHandler = (data: AdminForm) => {
    createAdminMutation.mutate(data);
  };
  return (
    <Box sx={{ width: "100%", mx: 2 }}>
      {/* back arrow and top part */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIosIcon
              sx={{
                color: "primary.main",
                fontSize: 32,
                ":hover": {
                  color: "text.primary",
                  cursor: "pointer",
                },
              }}
            />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Add New Admin
          </Typography>
        </Box>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(createAdminHandler)}
        sx={{
          width: { xs: "85%", sm: "80%", md: "75%", lg: "65%" },
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          my: 2,
          mx: 8,
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
            Admin Name
          </Typography>
          <OutlinedInput
            {...register("name", {
              required: "Name is required",
            })}
            id="name"
            type="text"
            fullWidth
            placeholder="Please enter admin name"
            sx={{
              "& .MuiInputBase-input": {
                backgroundColor: "background.paper",
                borderRadius: "13px",
              },
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
            error={!!errors.name}
          />
          {errors.name && (
            <FormHelperText error id="name">
              {errors.name.message as string}
            </FormHelperText>
          )}
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
            Admin Email
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
            placeholder="Please enter admin email"
            sx={{
              "& .MuiInputBase-input": {
                backgroundColor: "background.paper",
                borderRadius: "13px",
              },
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
            Admin Password
          </Typography>
          <OutlinedInput
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 words",
              },
              validate: {
                hasNumber: (value) =>
                  /[0-9]/.test(value) ||
                  "Password must contain at least one number",
                hasUpperCase: (value) =>
                  /[A-Z]/.test(value) ||
                  "Password must contain at least one uppercase letter.",
                hasLowerCase: (value) =>
                  /[a-z]/.test(value) ||
                  "Password must contain at least one lowercase letter.",
                hasSpecialChar: (value) =>
                  /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                  "Password must contain at least one special character.",
              },
            })}
            id="password"
            endAdornment={
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            }
            type={showPassword ? "text" : "password"}
            fullWidth
            placeholder="Please enter admin password"
            sx={{
              "& .MuiInputBase-input": {
                backgroundColor: "background.paper",
                borderRadius: "13px",
              },
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
              setErrMessage(null);
            }}
          >
            {errMessage}
          </Alert>
        )}

        <Button
          loading={createAdminMutation.isPending}
          variant="contained"
          type="submit"
          sx={{
            width: "fit-content",
            py: 1,
            borderRadius: 2,
            textTransform: "none",
            boxShadow: "none",
            ":hover": {
              boxShadow: "none",
            },
          }}
        >
          <Typography variant="body1" fontWeight={400}>
            Create
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default AddAdmin;
