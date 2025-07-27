import {
  Alert,
  Box,
  Button,
  FormHelperText,
  IconButton,
  List,
  ListItem,
  ListItemText,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams } from "react-router";
import JobCard from "./JobCard";
import CustomFIleUpload from "../../custom_svg/CustomFIleUpload";
import { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  useJobCategoryFilter,
  useJobRoleFilter,
  useJobSalaryFilter,
  useJobStore,
  useJobTypeFilter,
} from "../../../store/JobStore";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { applyJob } from "../../../helper/jobApiFunctions";
import { useProfileStore } from "../../../store/ProfileStore";
import { getAllJobPosts } from "../../../helper/postJob";
import { isAxiosError } from "axios";

type ApplyFormData = {
  salary: string;
  message: string;
  document: File[];
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

const ApplyJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const allJobs = useJobStore((state) => state.jobs);
  const setJobs = useJobStore((state) => state.setJobs);

  const { selectedJobRole } = useJobRoleFilter();
  const { selectedJobType } = useJobTypeFilter();
  const { selectedJobCategory } = useJobCategoryFilter();
  const { selectedSalary } = useJobSalaryFilter();

  const [serverErrors, setServerErrors] = useState<string | null>(null);

  const allJobsQuery = useQuery({
    queryKey: [
      "jobPosts",
      selectedJobRole,
      selectedJobType,
      selectedJobCategory,
      selectedSalary,
    ],
    queryFn: () =>
      getAllJobPosts(
        selectedJobRole,
        selectedJobType,
        selectedJobCategory,
        selectedSalary,
      ),
  });

  const currentJob = allJobs.filter((single) => single.id == Number(id));

  const seekerData = useProfileStore((state) => state.seekerProfile);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ApplyFormData>({
    mode: "onBlur",
    defaultValues: {
      document: [],
    },
  });

  const applyJobMutation = useMutation({
    mutationFn: applyJob,
    onSuccess: (data) => {
      if (data.status == "success") {
        navigate(`/job/${id}/apply/confirm`);
      }
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        setServerErrors(err.response?.data.message);
      }
    },
  });

  const applyJobHandler = (data: ApplyFormData) => {
    const applyJobFormData = new FormData();

    applyJobFormData.append("post_job_id", String(currentJob[0].id));
    applyJobFormData.append("employer_id", String(currentJob[0].employer_id));
    applyJobFormData.append("seeker_id", String(seekerData.id));
    applyJobFormData.append("expected_salary", data.salary);
    applyJobFormData.append("message", data.message);

    if (data.document && data.document.length > 0) {
      data.document.forEach((file) => {
        applyJobFormData.append("document[]", file);
      });
    }

    applyJobMutation.mutate(applyJobFormData);
  };

  useEffect(() => {
    if (allJobsQuery.data && allJobsQuery.isSuccess) {
      setJobs(allJobsQuery.data);
    }
  }, [
    allJobsQuery.data,
    allJobsQuery.isSuccess,
    setJobs,
    allJobs,
    selectedJobRole,
    selectedJobType,
  ]);

  return (
    <Box sx={{ width: "90%", mx: "auto", mb: 15 }}>
      {/* Form Title & back button */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mt: 5,
          mb: 4,
        }}
      >
        <IconButton onClick={() => navigate(`/job/${id}`)}>
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
        <Typography variant="h5" sx={{ fontWeight: 600, mx: "auto" }}>
          Application Form
        </Typography>
      </Box>
      {/* form and job card */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "column", lg: "row" },
          alignItems: { xs: "center", md: "center", lg: "flex-start" },
          gap: { xs: 0, md: 0, lg: 5 },
        }}
      >
        <JobCard job={currentJob[0]} />

        {/* application form */}
        <Box
          component="form"
          onSubmit={handleSubmit(applyJobHandler)}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: { xs: "90%", md: "60%", lg: "35%" },
            gap: 3,
            mx: { xs: "auto", md: 0 },
          }}
        >
          {/* ... Expected Salary... */}
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
              htmlFor="salary"
              sx={{
                fontWeight: 300,
              }}
            >
              Expected Salary
            </Typography>
            <TextField
              {...register("salary", {
                required: "Expected Salary is required",
              })}
              id="salary"
              variant="outlined"
              fullWidth
              error={!!errors.salary}
              placeholder="Please enter your expected salary"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "background.paper",
                  borderRadius: "13px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.light",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "primary.main",
                  fontSize: "13px",
                  fontWeight: 400,
                },
              }}
            />
            {errors.salary && (
              <FormHelperText error>{errors.salary.message}</FormHelperText>
            )}
          </Box>
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
              htmlFor="message"
              sx={{
                fontWeight: 300,
              }}
            >
              Message to employer
            </Typography>
            <TextField
              {...register("message", {
                required: "Message to employer is required",
                maxLength: {
                  value: 300,
                  message: "Message can't be more than 300 words",
                },
              })}
              multiline
              minRows={4}
              id="message"
              variant="outlined"
              fullWidth
              error={!!errors.message}
              placeholder="Please enter your message to employer"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "background.paper",
                  borderRadius: "13px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.light",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "primary.main",
                  fontSize: "13px",
                  fontWeight: 400,
                },
              }}
            />
            {errors.message && (
              <FormHelperText error>{errors.message.message}</FormHelperText>
            )}
          </Box>

          {/* documents upload  */}
          <Controller
            name="document"
            control={control}
            rules={{
              validate: (files) =>
                files.length > 0 || "At least one document is required.",
            }}
            render={({ field: { onChange, value: selectedFiles } }) => {
              const handleRemoveFile = (indexToRemove: number) => {
                const updatedFiles = selectedFiles.filter(
                  (_, index) => index !== indexToRemove,
                );
                onChange(updatedFiles);
              };

              return (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    width: "100%",
                  }}
                >
                  <Typography component="label" sx={{ fontWeight: 300 }}>
                    Upload your documents (CV , Certificates, etc..)
                  </Typography>

                  {/* Upload Area */}
                  <Box
                    onClick={() => fileInputRef.current?.click()}
                    sx={{
                      width: "100%",
                      height: "50px",
                      border: "1px dashed",
                      borderColor: "primary.main",
                      borderRadius: "13px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "background.paper",
                      cursor: "pointer",
                      transition: "background-color 0.2s ease",
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    <VisuallyHiddenInput
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files) {
                          const newFiles = Array.from(e.target.files);
                          onChange([...selectedFiles, ...newFiles]);
                        }
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        color: "text.secondary",
                      }}
                    >
                      <CustomFIleUpload />
                      <Typography>Click to add files</Typography>
                    </Box>
                  </Box>

                  {/* List of Uploaded Files */}
                  {selectedFiles.length > 0 && (
                    <List dense>
                      {selectedFiles.map((file, index) => (
                        <ListItem
                          key={index}
                          secondaryAction={
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => handleRemoveFile(index)}
                            >
                              <CloseIcon />
                            </IconButton>
                          }
                          sx={{
                            backgroundColor: "background.paper",
                            borderRadius: "8px",
                            mb: 1,
                          }}
                        >
                          <ListItemText
                            primary={file.name}
                            secondary={`${(file.size / 1024).toFixed(2)} KB`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}

                  {errors.document && (
                    <FormHelperText error sx={{ mt: 1 }}>
                      {errors.document.message}
                    </FormHelperText>
                  )}
                  {serverErrors && (
                    <Alert
                      sx={{ borderRadius: 3 }}
                      variant="outlined"
                      severity="error"
                      onClose={() => {
                        setServerErrors(null);
                      }}
                    >
                      {serverErrors}
                    </Alert>
                  )}
                </Box>
              );
            }}
          />

          <Button
            type="submit"
            loading={applyJobMutation.isPending}
            variant="contained"
            sx={{
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
            Apply Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ApplyJob;
