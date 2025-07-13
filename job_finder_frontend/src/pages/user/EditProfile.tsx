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
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  education: string;
  experience: string;
  cv?: FileList;
  socialMedia?: string;
};
export default function EditProfile() {
  const [checked, setChecked] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    alert(JSON.stringify(data));
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
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
          Edit Profile
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Avatar
                sx={{ width: 70, height: 70, cursor: "pointer" }}
                onClick={() => {
                  document.getElementById("fileInput")?.click();
                }}
              />

              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  boxShadow: 1,
                }}
                onClick={() => {
                  document.getElementById("fileInput")?.click();
                }}
              >
                <CameraAltIcon fontSize="small" />
              </IconButton>
              <input type="file" id="fileInput" style={{ display: "none" }} />
            </Box>
            <Typography>Upload Picture</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              pl: 3,
              mt: 3,
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>Avaliable for Work</Typography>
            <Switch checked={checked} onChange={handleChange} />
          </Box>
          <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <InputLabel
                htmlFor="name"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                Your Name
              </InputLabel>
              <OutlinedInput
                type="text"
                id="name"
                placeholder="Please Enter Your Name"
                size="small"
                fullWidth
                sx={{ bgcolor: "background.paper" }}
                {...register("name", { required: true })}
                error={!!errors.name}
              />
              {errors.name && (
                <Typography
                  variant="caption"
                  sx={{ display: "block" }}
                  color="error"
                >
                  Name Field is required
                </Typography>
              )}
            </Box>
            <Box>
              <InputLabel
                htmlFor="jobTitle"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                Job Title
              </InputLabel>
              <OutlinedInput
                type="text"
                id="jobTitle"
                placeholder="Please Enter Your Job Title"
                size="small"
                sx={{ bgcolor: "background.paper" }}
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <InputLabel htmlFor="education" sx={{ color: "text.secondary" }}>
                Education
              </InputLabel>
              <Box>
                <OutlinedInput
                  type="text"
                  id="education"
                  placeholder="Please Enter Your Education"
                  size="small"
                  fullWidth
                  {...register("education", { required: true })}
                  error={!!errors.education}
                  sx={{ flex: 1, bgcolor: "background.paper" }}
                />
                {errors.education && (
                  <Typography
                    variant="caption"
                    sx={{ display: "block" }}
                    color="error"
                  >
                    Education Field is required
                  </Typography>
                )}
              </Box>
              <Box>
                <OutlinedInput
                  type="text"
                  placeholder="+ Optional"
                  id="education"
                  size="small"
                  fullWidth
                  sx={{
                    bgcolor: "background.paper",
                    "& input::placeholder": {
                      textAlign: "center",
                    },
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <InputLabel htmlFor="experience" sx={{ color: "text.secondary" }}>
                Experience
              </InputLabel>
              <Box>
                <OutlinedInput
                  type="text"
                  id="experience"
                  placeholder="Please Enter Your Experience"
                  size="small"
                  fullWidth
                  {...register("experience", { required: true })}
                  error={!!errors.experience}
                  sx={{ flex: 1, bgcolor: "background.paper" }}
                />
                {errors.experience && (
                  <Typography
                    variant="caption"
                    sx={{ display: "block" }}
                    color="error"
                  >
                    Experience Field is required
                  </Typography>
                )}
              </Box>
              <Box>
                <OutlinedInput
                  type="text"
                  placeholder="+ Optional"
                  size="small"
                  fullWidth
                  sx={{
                    bgcolor: "background.paper",
                    "& input::placeholder": {
                      textAlign: "center",
                    },
                  }}
                />
              </Box>
            </Box>

            <Box>
              <InputLabel
                htmlFor="email"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                Email Address
              </InputLabel>
              <OutlinedInput
                type="email"
                id="email"
                placeholder="Please Enter Your Email Address"
                size="small"
                fullWidth
                sx={{ bgcolor: "background.paper" }}
                {...register("email", { required: true })}
                error={!!errors.email}
              />
              {errors.email && (
                <Typography
                  variant="caption"
                  sx={{ display: "block" }}
                  color="error"
                >
                  Email Field is required
                </Typography>
              )}
            </Box>

            <Box>
              <InputLabel
                htmlFor="phone"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                Phone Number
              </InputLabel>
              <OutlinedInput
                type="tel"
                id="phone"
                placeholder="Please Enter Your Phone Number"
                size="small"
                fullWidth
                sx={{ bgcolor: "background.paper" }}
                {...register("phone", { required: true })}
                error={!!errors.phone}
              />
              {errors.phone && (
                <Typography
                  variant="caption"
                  sx={{ display: "block" }}
                  color="error"
                >
                  Phone Field is required
                </Typography>
              )}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <InputLabel
                htmlFor="socialMedia"
                sx={{ color: "text.secondary" }}
              >
                Social Media
              </InputLabel>
              <Box>
                <OutlinedInput
                  type="text"
                  id="socialMedia"
                  placeholder="Please Enter Your Social Media"
                  size="small"
                  fullWidth
                  {...register("socialMedia", { required: true })}
                  error={!!errors.socialMedia}
                  sx={{ flex: 1, bgcolor: "background.paper" }}
                />
                {errors.socialMedia && (
                  <Typography
                    variant="caption"
                    sx={{ display: "block" }}
                    color="error"
                  >
                    Social Media Field is required
                  </Typography>
                )}
              </Box>
              <Box>
                <OutlinedInput
                  type="text"
                  placeholder="+ Optional"
                  size="small"
                  fullWidth
                  sx={{
                    bgcolor: "background.paper",
                    "& input::placeholder": {
                      textAlign: "center",
                    },
                  }}
                />
              </Box>
            </Box>

            <Box>
              <InputLabel htmlFor="cv" sx={{ color: "text.secondary", mb: 1 }}>
                CV
              </InputLabel>
              <OutlinedInput
                sx={{
                  bgcolor: "background.paper",
                  height: 200,
                  "& input::placeholder": {
                    textAlign: "center",
                  },
                }}
                fullWidth
                id="cv"
                placeholder="Please Upload Your CV"
              />
            </Box>
          </Box>
          <Box>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                boxShadow: "none",
                ":hover": {
                  boxShadow: "none",
                },
              }}
            >
              Save
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
}
