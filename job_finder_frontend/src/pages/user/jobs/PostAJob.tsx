import {
  Container,
  Box,
  Avatar,
  IconButton,
  Typography,
  Switch,
  OutlinedInput,
  InputLabel,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

type Inputs = {
  jobTitle: string;
  position: string;
  gender: string;
  salary: string;
  address: string;
  workingType: string;
  workingHourFrom: string;
  workingHourTo: string;
  responsibilities: string;
  requirements: string;
};
export default function PostAJob() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <>
      <Box
        sx={{
          my: 3,
          alignItems: "center",
          display: "flex",
          position: "relative",
        }}
      >
        <IconButton onClick={() => navigate(-1)} sx={{ ml: 5 }}>
          <ArrowBackIosNewIcon fontSize="large" />
        </IconButton>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Post a Job
        </Typography>
      </Box>
      <Container
        sx={{
          mb: 5,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
        maxWidth="sm"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          style={{ width: "100%" }}
        >
          <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <InputLabel htmlFor="title">Job Title</InputLabel>
              <OutlinedInput
                type="text"
                id="title"
                placeholder="Please Enter Your Job Title"
                size="small"
                fullWidth
                {...register("jobTitle", { required: true })}
                error={!!errors.jobTitle}
              />
              {errors.jobTitle && (
                <Typography
                  variant="caption"
                  sx={{ display: "block" }}
                  color="error"
                >
                  Job Title Field is required
                </Typography>
              )}
            </Box>
            <Box>
              <InputLabel htmlFor="position">Position</InputLabel>
              <OutlinedInput
                type="text"
                id="position"
                placeholder="Please Enter Your Job Title"
                size="small"
                fullWidth
                {...register("position", { required: true })}
                error={!!errors.position}
              />
              {errors.position && (
                <Typography
                  variant="caption"
                  sx={{ display: "block" }}
                  color="error"
                >
                  Position Field is required
                </Typography>
              )}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <InputLabel htmlFor="education">Gender</InputLabel>
              <Box>
                <Autocomplete
                  options={["gay"]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      type="text"
                      id="gender"
                      placeholder="Please Enter Your Gender"
                      size="small"
                      fullWidth
                      {...register("gender", { required: true })}
                      error={!!errors.gender}
                    />
                  )}
                />
                {errors.gender && (
                  <Typography
                    variant="caption"
                    sx={{ display: "block" }}
                    color="error"
                  >
                    Gender Field is required
                  </Typography>
                )}
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <InputLabel htmlFor="salary">Salary</InputLabel>
              <Box>
                <OutlinedInput
                  type="text"
                  id="salary"
                  placeholder="Please Enter Salary"
                  size="small"
                  fullWidth
                  {...register("salary", { required: true })}
                  error={!!errors.salary}
                  sx={{ flex: 1 }}
                />
                {errors.salary && (
                  <Typography
                    variant="caption"
                    sx={{ display: "block" }}
                    color="error"
                  >
                    Salary Field is required
                  </Typography>
                )}
              </Box>
            </Box>

            <Box>
              <InputLabel htmlFor="address">Address</InputLabel>
              <OutlinedInput
                type="text"
                id="address"
                placeholder="Please Enter Your Address"
                size="small"
                fullWidth
                {...register("address", { required: true })}
                error={!!errors.address}
              />
              {errors.address && (
                <Typography
                  variant="caption"
                  sx={{ display: "block" }}
                  color="error"
                >
                  Address Field is required
                </Typography>
              )}
            </Box>

            <Box>
              <InputLabel htmlFor="workingType">Working Type</InputLabel>
              <Autocomplete
                options={[
                  "Full-time",
                  "Part-time",
                  "Internship",
                  "Contract",
                  "Freelance",
                ]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    type="text"
                    id="workingType"
                    placeholder="Please Enter Your Working Type"
                    size="small"
                    fullWidth
                    {...register("workingType", { required: true })}
                    error={!!errors.workingType}
                  />
                )}
              />
              {errors.workingType && (
                <Typography
                  variant="caption"
                  sx={{ display: "block" }}
                  color="error"
                >
                  Working Type Field is required
                </Typography>
              )}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <InputLabel htmlFor="workingHour">
                Working Hour (From - To)
              </InputLabel>
              <Box sx={{ display: "flex", gap: 1 }}>
                <OutlinedInput
                  type="time"
                  id="workingHourFrom"
                  size="small"
                  fullWidth
                  {...register("workingHourFrom", { required: true })}
                  error={!!errors.workingHourFrom}
                  sx={{ flex: 1 }}
                />
                {errors.workingHourFrom && (
                  <Typography
                    variant="caption"
                    sx={{ display: "block" }}
                    color="error"
                  >
                    This Field is required
                  </Typography>
                )}

                <OutlinedInput
                  type="time"
                  id="workingHourTo"
                  size="small"
                  fullWidth
                  {...register("workingHourTo", { required: true })}
                  error={!!errors.workingHourTo}
                  sx={{ flex: 1 }}
                />
                {errors.workingHourTo && (
                  <Typography
                    variant="caption"
                    sx={{ display: "block" }}
                    color="error"
                  >
                    This Field is required
                  </Typography>
                )}
              </Box>
            </Box>

            <Box>
              <InputLabel htmlFor="responsibilities">
                Responsibilities
              </InputLabel>
              <OutlinedInput
                sx={{
                  height: 200,
                  "& input::placeholder": {
                    textAlign: "center",
                  },
                }}
                fullWidth
                id="responsibilities"
                placeholder="Please Enter Responsibilities"
                {...register("responsibilities", { required: true })}
                error={!!errors.responsibilities}
              />
              {errors.responsibilities && (
                <Typography
                  variant="caption"
                  sx={{ display: "block" }}
                  color="error"
                >
                  Responsibilities Field is required
                </Typography>
              )}
            </Box>
            <Box>
              <InputLabel htmlFor="requirements">Requirements</InputLabel>
              <OutlinedInput
                sx={{
                  height: 200,
                  "& input::placeholder": {
                    textAlign: "center",
                  },
                }}
                fullWidth
                id="requirements"
                placeholder="Please Enter Requirements"
                {...register("requirements", { required: true })}
                error={!!errors.requirements}
              />
              {errors.requirements && (
                <Typography
                  variant="caption"
                  sx={{ display: "block" }}
                  color="error"
                >
                  Requirements Field is required
                </Typography>
              )}
            </Box>
          </Box>
          <Box>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              Post Now
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
}
