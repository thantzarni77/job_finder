import { Box, FormHelperText, OutlinedInput, Typography } from "@mui/material";
import FormWrapper from "./FormWrapper";
import React from "react";
import { useFormContext } from "react-hook-form";

const UserDetailsForm = ({ children }: { children?: React.ReactNode }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <FormWrapper>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography component="label" htmlFor="name" sx={{ fontWeight: 300 }}>
          Your name
        </Typography>
        <OutlinedInput
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
          id="name"
          fullWidth
          placeholder="Please enter your name"
          error={!!errors.name}
        />
        {errors.name && (
          <FormHelperText error id="name">
            {errors.name.message as string}
          </FormHelperText>
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography component="label" htmlFor="email" sx={{ fontWeight: 300 }}>
          Email
        </Typography>
        <OutlinedInput
          {...register("email", {
            required: "Email is required",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid email",
            },
          })}
          id="email"
          type="email"
          fullWidth
          placeholder="Please enter your email"
          error={!!errors.email}
        />
        {errors.email && (
          <FormHelperText error id="email">
            {errors.email.message as string}
          </FormHelperText>
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography component="label" htmlFor="phone" sx={{ fontWeight: 300 }}>
          Phone Number<span style={{ color: "#ef4444" }}>*</span>
        </Typography>
        <OutlinedInput
          {...register("phone", {
            maxLength: {
              value: 12,
              message: "Invalid Phone Number",
            },
          })}
          id="phone"
          type="tel"
          fullWidth
          placeholder="eg : +95 9 123 456 78"
          error={!!errors.phone}
        />
        {errors.phone && (
          <FormHelperText error id="phone">
            {errors.phone.message as string}
          </FormHelperText>
        )}
      </Box>
      {children}
    </FormWrapper>
  );
};

export default UserDetailsForm;
