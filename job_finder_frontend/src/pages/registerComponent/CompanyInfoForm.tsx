import {
  Box,
  FormHelperText,
  IconButton,
  OutlinedInput,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useFormContext } from "react-hook-form";
import React, { useEffect, useRef, useState } from "react";

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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    //prevent memory leak
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      setSelectedFiles(files);

      //create preview url for first file
      const firstFile = files[0];
      const newPreviewUrl = URL.createObjectURL(firstFile);

      // clean up the old URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(newPreviewUrl);
    }
  };

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setSelectedFiles([]);
    setPreviewUrl(null);
    //  reset the file input value  so the user can re-select the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleContainerClick = () => {
    if (!previewUrl) {
      fileInputRef.current?.click();
    }
  };

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
          {...register("companyPhone", {
            required: "Company phone is required",
            maxLength: {
              value: 12,
              message: "Invalid Phone Number",
            },
          })}
          component="label"
          htmlFor="companyPhone"
          sx={{ fontWeight: 300 }}
        >
          Company Phone
        </Typography>
        <OutlinedInput
          id="companyPhone"
          type="text"
          fullWidth
          placeholder="Please enter your company phone no"
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
      </Box>

      {/* seeker profile  */}
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
          htmlFor="cv"
          sx={{
            fontWeight: 300,
          }}
        >
          Upload Company Profile
          <span style={{ color: "#ef4444" }}>*</span>
        </Typography>

        {/* company image */}
        <Box
          onClick={handleContainerClick}
          sx={{
            width: "100%",
            height: "220px",
            border: "1px solid",
            borderColor: "primary.main",
            borderRadius: "13px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "background.paper",
            cursor: previewUrl ? "default" : "pointer", // Change cursor based on state
            transition: "background-color 0.2s ease",
            position: "relative",
            overflow: "hidden",
            "&:hover": {
              backgroundColor: previewUrl
                ? "background.paper"
                : "backgorund.default",
            },
          }}
        >
          <VisuallyHiddenInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />

          {previewUrl ? (
            // --- Preview State ---
            <>
              <img
                src={previewUrl}
                alt="Image preview"
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
              {selectedFiles.length > 1 && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                  }}
                >
                  + {selectedFiles.length - 1} more
                </Box>
              )}
            </>
          ) : (
            // --- Initial State ---
            <Box sx={{ textAlign: "center", color: "text.secondary" }}>
              <FileUploadIcon />
            </Box>
          )}
        </Box>
      </Box>

      {/* Company Descripton */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
      </Box>

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
          placeholder="Please enter your company type"
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
