import {
  Box,
  FormHelperText,
  IconButton,
  OutlinedInput,
  Typography,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { useFormContext } from "react-hook-form";

type PasswordInputProps = {
  showPassword: boolean;
  onToggleVisibility: () => void;
};

const PasswordInputFields = ({
  showPassword,
  onToggleVisibility,
}: PasswordInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography
          component="label"
          htmlFor="password"
          sx={{ fontWeight: 300 }}
        >
          Password
        </Typography>
        <OutlinedInput
          {...register("password", {
            required: "Password is required",
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
          id="password"
          endAdornment={
            <IconButton onClick={onToggleVisibility}>
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          }
          type={showPassword ? "text" : "password"}
          fullWidth
          placeholder="Please enter your password"
          error={!!errors.password}
        />
        {errors.password && (
          <FormHelperText error id="password">
            {errors.password.message as string}
          </FormHelperText>
        )}
      </Box>
    </Box>
  );
};

export default PasswordInputFields;
