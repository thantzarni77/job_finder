import {
  Alert,
  Box,
  Button,
  FormHelperText,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePassword } from "../../../helper/changeSecurityApiFunctions";
import { useState } from "react";
import { isAxiosError } from "axios";

type ChangePasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [wrongOldPasswordErr, setWrongOldPasswordErr] = useState<string | null>(
    null,
  );

  const { id } = useParams();

  const user_id = Number(id);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    mode: "onBlur",
  });

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate(-1);
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        setWrongOldPasswordErr(err.response?.data.message);
      }
    },
  });

  const changePasswordHandler = (data: ChangePasswordForm) => {
    const { currentPassword, newPassword } = data;
    changePasswordMutation.mutate({
      payload: {
        old_password: currentPassword,
        password: newPassword,
      },
      userID: user_id,
    });
  };
  return (
    <Box sx={{ width: "90%", mx: "auto", p: 2, mt: 5, mb: 10 }}>
      {/* Form Title & back button */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton onClick={() => navigate("/settings/user/1/security")}>
          <ArrowBackIosIcon
            sx={{
              color: "primary.main",
              fontSize: 32,
              ":hover": {
                color: "text.secondary",
                cursor: "pointer",
              },
            }}
          />
        </IconButton>

        <Typography variant="h5" sx={{ fontWeight: 600, mx: "auto" }}>
          Password
        </Typography>
      </Box>

      {/* application form */}
      <Box
        component="form"
        onSubmit={handleSubmit(changePasswordHandler)}
        sx={{
          width: { xs: "100%", md: "60%", lg: "40%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mx: "auto",
          alignItems: "center",
          gap: 2,
          mb: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
            mt: 3,
          }}
        >
          <Typography
            component="label"
            htmlFor="currentPassword"
            sx={{
              fontWeight: 300,
            }}
          >
            Current Password
            <span style={{ color: "#ef4444" }}>*</span>
          </Typography>
          <TextField
            {...register("currentPassword", {
              required: "Current password is required.",
            })}
            id="currentPassword"
            variant="outlined"
            fullWidth
            placeholder="Please enter your current password"
            error={!!errors.currentPassword}
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
          {errors.currentPassword && (
            <FormHelperText error>
              {errors.currentPassword.message}
            </FormHelperText>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
          }}
        >
          <Typography
            component="label"
            htmlFor="newPassword"
            sx={{
              fontWeight: 300,
            }}
          >
            New Password
            <span style={{ color: "#ef4444" }}>*</span>
          </Typography>
          <TextField
            {...register("newPassword", {
              required: "New password is required.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long.",
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
            id="newPassword"
            variant="outlined"
            fullWidth
            placeholder="Please enter your new password"
            error={!!errors.newPassword}
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
          {errors.newPassword && (
            <FormHelperText error>{errors.newPassword.message}</FormHelperText>
          )}
          <Typography
            variant="caption"
            sx={{ fontWeight: 400, color: "primary.light" }}
          >
            new password must be different from the current one
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
          }}
        >
          <Typography
            component="label"
            htmlFor="confirmNewPassword"
            sx={{
              fontWeight: 300,
            }}
          >
            Confirm New Password
            <span style={{ color: "#ef4444" }}>*</span> {/* Red asterisk */}
          </Typography>
          <TextField
            {...register("confirmNewPassword", {
              required: "Confirmation password is required.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long.",
              },
              validate: {
                isSamePassword: (val: string) => {
                  if (val != watch("newPassword")) {
                    return "Passwords must be same";
                  }
                },
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
            id="confirmNewPassword"
            variant="outlined"
            fullWidth
            placeholder="Please confirm your new password"
            error={!!errors.confirmNewPassword}
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
          {errors.confirmNewPassword && (
            <FormHelperText error>
              {errors.confirmNewPassword.message}
            </FormHelperText>
          )}
          {wrongOldPasswordErr && (
            <Alert
              sx={{ borderRadius: 3, mt: 2 }}
              variant="outlined"
              severity="error"
              onClose={() => {
                setWrongOldPasswordErr(null);
              }}
            >
              {wrongOldPasswordErr}
            </Alert>
          )}
        </Box>

        <Button
          type="submit"
          variant="contained"
          loading={changePasswordMutation.isPending}
          sx={{
            width: "100%",
            my: 2,
            boxShadow: "none",
            textTransform: "none",
            fontWeight: 400,
            borderRadius: "8px",
            p: 1,
            "&:hover": {
              boxShadow: "none",
            },
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ChangePassword;
