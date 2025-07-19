import { ArrowBackIosNew as ArrowBackIcon } from "@mui/icons-material";
import {
  Container,
  Typography,
  Box,
  IconButton,
  TextField,
  InputLabel,
  Button,
  styled,
  FormHelperText,
  Alert,
} from "@mui/material";
import { OutlinedInput } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import CustomFIleUpload from "../../components/custom_svg/CustomFIleUpload";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { seekerAddProject } from "../../helper/seekerProjectApiFunctions";
import { isAxiosError } from "axios";

export type Project = {
  image: File;
  title: string;
  description: string;
  link: string;
};

type UploadError = {
  message: string;
  status: string;
};

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

export default function AddNewProject() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadErrors, setUploadErrors] = useState<UploadError | null>();

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Project>({
    defaultValues: {
      title: "",
      description: "",
      link: "",
      image: undefined,
    },
  });

  const addProjectMutation = useMutation({
    mutationFn: (data: FormData) => {
      return seekerAddProject(data);
    },
    onSuccess: (responseData) => {
      if (responseData.statusText == "Created") {
        return navigate(-1);
      }
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        setUploadErrors(err.response?.data);
      }
    },
  });

  const uploadProjectHandler = (data: Project) => {
    const projectData = new FormData();
    projectData.append("title", data.title);
    projectData.append("description", data.description);
    projectData.append("link", data.link);
    projectData.append("image", data.image);
    addProjectMutation.mutate(projectData);
  };

  return (
    <Box sx={{ mb: 25 }}>
      <Box
        sx={{
          my: 3,
          alignItems: "center",
          display: "flex",
          position: "relative",
        }}
      >
        <IconButton onClick={() => navigate(-1)} sx={{ ml: 5 }}>
          <ArrowBackIcon fontSize="large" />
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
          Add New Project
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(uploadProjectHandler)}>
        <Container maxWidth="md">
          <Box
            sx={{
              p: 3,
              border: 1,
              borderColor: "#5f6caf",
              borderRadius: 2,
              width: "100%",
            }}
          >
            <Controller
              name="image"
              control={control}
              rules={{ required: "Cover photo is required" }}
              render={({ field: { onChange, value: selectedFile } }) => {
                const previewUrl = selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : null;

                const handleContainerClick = () => {
                  if (!previewUrl) {
                    fileInputRef.current?.click();
                  }
                };

                const handleClear = (
                  event: React.MouseEvent<HTMLButtonElement>,
                ) => {
                  event.stopPropagation();
                  onChange(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                };

                return (
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <Box
                        onClick={handleContainerClick}
                        sx={{
                          width: { xs: "35%", md: "30%" },
                          height: { xs: "150px", md: "300px" },
                          border: "1px dashed",
                          borderRadius: "13px",
                          borderColor: errors.image
                            ? "error.main"
                            : "primary.light",
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
                      <Typography
                        component="label"
                        sx={{
                          color: "text.secondary",
                        }}
                      >
                        Upload Cover Photo
                      </Typography>
                    </Box>
                    {errors.image && (
                      <FormHelperText error sx={{ mt: 1 }}>
                        {errors.image.message}
                      </FormHelperText>
                    )}
                  </Box>
                );
              }}
            />

            {/*Project title */}
            <Box sx={{ mt: 2 }}>
              <InputLabel
                htmlFor="title"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                Project Title
              </InputLabel>
              <OutlinedInput
                {...register("title", {
                  required: "Project title is required",
                  maxLength: {
                    value: 30,
                    message: "Project title shouldn't be more than 30 words",
                  },
                })}
                fullWidth
                id="title"
                sx={{ bgcolor: "background.paper" }}
                error={!!errors.title}
              />
              {errors.title && (
                <FormHelperText error id="title">
                  {errors.title.message as string}
                </FormHelperText>
              )}
            </Box>

            {/* project description */}
            <Box sx={{ mt: 2 }}>
              <InputLabel
                htmlFor="description"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                Project Description
              </InputLabel>
              <TextField
                {...register("description", {
                  required: "Project description is required",
                  maxLength: {
                    value: 200,
                    message:
                      "Project description shouldn't be more than 200 words",
                  },
                })}
                fullWidth
                multiline
                rows={4}
                id="description"
                sx={{
                  bgcolor: "background.paper",
                  borderRadius: 3,
                }}
                error={!!errors.description}
              />
              {errors.description && (
                <FormHelperText error id="description">
                  {errors.description.message as string}
                </FormHelperText>
              )}
            </Box>

            {/* project link  */}
            <Box sx={{ mt: 2 }}>
              <InputLabel
                htmlFor="link"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                Link
              </InputLabel>
              <OutlinedInput
                {...register("link", {
                  required: "Project link is required",
                })}
                fullWidth
                id="link"
                sx={{ bgcolor: "background.paper" }}
                error={!!errors.link}
              />
              {errors.link && (
                <FormHelperText error id="link">
                  {errors.link.message as string}
                </FormHelperText>
              )}
            </Box>
            {uploadErrors && (
              <Alert
                sx={{ borderRadius: 3, my: 2 }}
                variant="outlined"
                severity="error"
                onClose={() => {
                  setUploadErrors(null);
                }}
              >
                {uploadErrors.message}
              </Alert>
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 4,
              borderRadius: 2,
              textTransform: "none",
              boxShadow: "none",
              ":hover": {
                boxShadow: "none",
              },
            }}
          >
            Upload
          </Button>
        </Container>
      </form>
    </Box>
  );
}
