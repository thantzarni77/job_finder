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
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Typography component="label" htmlFor="password" sx={{ fontWeight: 300 }}>
        Password
      </Typography>
      <OutlinedInput
        {...register("password", {
          required: "Password is required",
          // maxLength: {
          //   value: 100,
          //   message: "Shouldn't be more than 100 words",
          // },
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
  );
};

export default PasswordInputFields;
