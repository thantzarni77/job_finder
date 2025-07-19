import {
  Alert,
  Box,
  FormHelperText,
  IconButton,
  OutlinedInput,
  styled,
  Typography,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import CustomFIleUpload from "../../components/custom_svg/CustomFIleUpload";
import { Controller, useFormContext } from "react-hook-form";
import React, { useRef, useState } from "react";
import { useRegisterStore } from "../../store/RegisterStore";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CompanyInfoForm = () => {
  const registerErrors = useRegisterStore((state) => state.errors);
  const removeErrMessage = useRegisterStore(
    (state) => state.removeRegisterErrors,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    control,
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
      {/* company name */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography
          component="label"
          htmlFor="companyName"
          sx={{ fontWeight: 300 }}
        >
          Company Name
        </Typography>
        <OutlinedInput
          {...register("companyName", {
            required: "Company Name is required",
            maxLength: {
              value: 50,
              message: "Company name shouldn't be more than 50 words ",
            },
          })}
          id="companyName"
          fullWidth
          placeholder="Please enter your company name"
          error={!!errors.companyName}
        />
        {errors.companyName && (
          <FormHelperText error id="companyName">
            {errors.companyName.message as string}
          </FormHelperText>
        )}
      </Box>

      {/* company address */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography
          component="label"
          htmlFor="companyAddress"
          sx={{ fontWeight: 300 }}
        >
          Company Location
        </Typography>
        <OutlinedInput
          {...register("companyAddress", {
            required: "Company address is required",
            maxLength: {
              value: 200,
              message: "Company name shouldn't be more than 200 words ",
            },
          })}
          id="companyAddress"
          type="text"
          fullWidth
          placeholder="Please enter your company address"
          error={!!errors.companyAddress}
        />
        {errors.companyAddress && (
          <FormHelperText error id="companyAddress">
            {errors.companyAddress.message as string}
          </FormHelperText>
        )}
      </Box>
      {/* company phone */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography
          component="label"
          htmlFor="companyPhone"
          sx={{ fontWeight: 300 }}
        >
          Company Phone
        </Typography>
        <OutlinedInput
          {...register("companyPhone", {
            required: "Company phone is required",
            maxLength: {
              value: 12,
              message: "Invalid Phone Number",
            },
          })}
          id="companyPhone"
          type="text"
          fullWidth
          placeholder="Please enter your company phone number"
          error={!!errors.companyPhone}
        />
        {errors.companyPhone && (
          <FormHelperText error id="companyPhone">
            {errors.companyPhone.message as string}
          </FormHelperText>
        )}
      </Box>

      {/* Company email */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography
          component="label"
          htmlFor="companyEmail"
          sx={{ fontWeight: 300 }}
        >
          Company Email
        </Typography>
        <OutlinedInput
          {...register("companyEmail", {
            required: "Company email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email",
            },
          })}
          id="companyEmail"
          type="email"
          placeholder="Please enter your email"
          error={!!errors.email}
        />
        {errors.companyEmail && (
          <FormHelperText error id="companyEmail">
            {errors.companyEmail.message as string}
          </FormHelperText>
        )}
        {registerErrors && registerErrors.company_email && (
          <Alert
            sx={{ borderRadius: 3 }}
            variant="outlined"
            severity="error"
            onClose={() => {
              removeErrMessage();
            }}
          >
            {registerErrors.company_email}
          </Alert>
        )}
      </Box>

      {/* company profile  */}
      <Controller
        name="companyProfile"
        control={control}
        rules={{ required: "Company profile is required" }}
        render={({ field: { onChange, value: selectedFile } }) => {
          const previewUrl = selectedFile
            ? URL.createObjectURL(selectedFile)
            : null;

          const handleContainerClick = () => {
            if (!previewUrl) {
              fileInputRef.current?.click();
            }
          };

          const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            onChange(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          };

          return (
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
                sx={{
                  fontWeight: 300,
                }}
              >
                Upload Company Image
              </Typography>

              {/* Image Preview Section */}
              <Box
                onClick={handleContainerClick}
                sx={{
                  width: "50%",
                  height: { xs: "150px", md: "300px" },
                  border: "1px dashed",
                  borderRadius: "13px",
                  borderColor: errors.image ? "error.main" : "primary.light",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "background.paper",
                  cursor: previewUrl ? "default" : "pointer",
                  transition: "background-color 0.2s ease",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    backgroundColor: previewUrl
                      ? "background.paper"
                      : "action.hover",
                  },
                }}
              >
                <VisuallyHiddenInput
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    onChange(e.target.files ? e.target.files[0] : null)
                  }
                />

                {previewUrl ? (
                  <>
                    <img
                      src={previewUrl}
                      alt="Image preview"
                      onLoad={() => URL.revokeObjectURL(previewUrl)}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <IconButton
                      onClick={handleClear}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                        },
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                    {/* CHANGE 4: Removed the "+X more" badge */}
                  </>
                ) : (
                  <Box
                    sx={{
                      textAlign: "center",
                      color: "text.secondary",
                    }}
                  >
                    <CustomFIleUpload />
                  </Box>
                )}
              </Box>
              {errors.companyProfile && (
                <FormHelperText error sx={{ mt: 1 }}>
                  {errors.companyProfile.message as string}
                </FormHelperText>
              )}
            </Box>
          );
        }}
      />

      {/* Company Descripton */}
      {/* <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography
          component="label"
          htmlFor="companyDescription"
          sx={{ fontWeight: 300 }}
        >
          Company Description
        </Typography>
        <TextField
          {...register("companyDescription", {
            required: "Company description is required",
            maxLength: {
              value: 200,
              message: "Shouldn't be more than 200 words",
            },
          })}
          multiline
          fullWidth
          id="companyDescription"
          minRows={4}
          placeholder="Please enter your company description"
          error={!!errors.companyDescription}
        />
        {errors.companyDescription && (
          <FormHelperText error id="companyDescription">
            {errors.companyDescription.message as string}
          </FormHelperText>
        )}
      </Box> */}

      {/* company type */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography
          component="label"
          htmlFor="companyType"
          sx={{ fontWeight: 300 }}
        >
          Company Type
        </Typography>
        <OutlinedInput
          {...register("companyType", {
            required: "Company type is required",
            maxLength: {
              value: 20,
              message: "Company name shouldn't be more than 20 words ",
            },
          })}
          id="companyType"
          type="text"
          fullWidth
          placeholder="eg. IT, Media, Sporting, "
          error={!!errors.companyType}
        />
        {errors.companyType && (
          <FormHelperText error id="companyType">
            {errors.companyType.message as string}
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
          {...register("companyPassword", {
            required: "Password is required.",
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
          id="companyPassword"
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
          error={!!errors.companyPassword}
        />
        {errors.companyPassword && (
          <FormHelperText error id="companyPassword">
            {errors.companyPassword.message as string}
          </FormHelperText>
        )}
      </Box>
    </Box>
  );
};

export default CompanyInfoForm;
