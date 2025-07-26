import {
  Container,
  Box,
  IconButton,
  Typography,
  OutlinedInput,
  InputLabel,
  Button,
  Autocomplete,
  TextField,
  FormHelperText,
} from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

import { useUserStore } from "../../../store/UserStore";
import { postAJob } from "../../../helper/postJob";
import { useEffect, useState } from "react";
import type { Job } from "../../../store/JobStore";
import {
  getAllCategories,
  getAllRoles,
  getAllTypes,
} from "../../../helper/talentTypeAndRoleApiFunctions";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";

type JobTypeAndRole = {
  id: number;
  name: string;
};

type Category = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

const genders = ["Male", "Female", "Both"];

export default function PostAJob() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  const [jobTypes, setJobTypes] = useState<JobTypeAndRole[] | null>();
  const [roles, setRoles] = useState<JobTypeAndRole[] | null>();
  const [categories, setCategories] = useState<Category[] | null>();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Job>({
    mode: "onBlur",
  });

  const typeQuery = useQuery({
    queryKey: ["jobTypes"],
    queryFn: getAllTypes,
  });

  const roleQuery = useQuery({
    queryKey: ["jobRoles"],
    queryFn: getAllRoles,
  });

  const categoryQuery = useQuery({
    queryKey: ["jobCategories"],
    queryFn: getAllCategories,
  });

  const postAJobMutation = useMutation({
    mutationFn: postAJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobPosts"] });
      navigate("/jobs");
    },
    onError: (res) => console.log(res),
  });

  const onSubmit = (data: Job) => {
    const {
      employer_id,
      job_title,
      salary,
      location,
      vacancy,
      requirements,
      description,
      benefits,
      note,
      category_id,
      gender,
      type,
      role,
      deadline,
    } = data;

    const postJobData = new FormData();

    postJobData.append("employer_id", employer_id.toString());
    postJobData.append(" job_title", job_title);
    postJobData.append("salary", salary);
    postJobData.append("location", location);
    postJobData.append("vacancy", vacancy);
    postJobData.append("requirements", requirements);
    postJobData.append("description", description);
    postJobData.append("benefits", benefits);
    postJobData.append("note", note);
    if (category_id) postJobData.append("category_id", category_id.toString());
    postJobData.append("gender", gender);
    postJobData.append("type", type);
    postJobData.append("role", role);
    postJobData.append("deadline", format(deadline, "yyyy-MM-dd"));

    postAJobMutation.mutate(postJobData);
  };

  useEffect(() => {
    if (typeQuery.data && typeQuery.isSuccess) {
      setJobTypes(typeQuery.data.original.data);
    }
  }, [typeQuery.data, typeQuery.isSuccess]);

  useEffect(() => {
    if (roleQuery.data && roleQuery.isSuccess) {
      setRoles(roleQuery.data.data.data);
    }
  }, [roleQuery.data, roleQuery.isSuccess]);

  useEffect(() => {
    if (categoryQuery.data && categoryQuery.isSuccess) {
      setCategories(categoryQuery.data.data);
    }
  }, [categoryQuery.data, categoryQuery.isSuccess]);

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
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          action=""
          sx={{
            width: "100%",
          }}
        >
          <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
            {/* job title  */}
            <Box>
              <input
                type="hidden"
                value={user?.user_id}
                {...register("employer_id", { required: true })}
              />
              {errors.employer_id && (
                <Typography
                  variant="caption"
                  sx={{ display: "block" }}
                  color="error"
                >
                  Employer Field is required
                </Typography>
              )}

              <InputLabel htmlFor="title" sx={{ mb: 1 }}>
                Job Title
              </InputLabel>
              <OutlinedInput
                sx={{
                  mb: 1,

                  "& .MuiOutlinedInput-input": {
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  },

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "1px",
                    borderColor: "primary.main",
                  },
                }}
                type="text"
                id="title"
                placeholder="Please Enter Your Job Title"
                size="small"
                fullWidth
                {...register("job_title", { required: true })}
                error={!!errors.job_title}
              />
              {errors.job_title && (
                <Typography
                  variant="caption"
                  sx={{ display: "block" }}
                  color="error"
                >
                  Job Title Field is required
                </Typography>
              )}
            </Box>

            {/* category  */}
            <Box>
              <InputLabel htmlFor="category_id" sx={{ mb: 1 }}>
                Category
              </InputLabel>
              <Controller
                name="category_id"
                control={control}
                rules={{ required: "Choose a category" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    options={categories || []}
                    getOptionLabel={(option) => option.name || ""}
                    value={
                      categories?.find((single) => single.id == value) || null
                    }
                    onChange={(_, newValue) => {
                      onChange(newValue ? newValue.id : null);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Please Select A Category"
                        size="small"
                        error={!!error}
                      />
                    )}
                    sx={{
                      mb: 1,
                      "& .MuiInputBase-root": {
                        bgcolor: "background.paper",
                        borderRadius: 2,
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderWidth: "1px",
                        borderColor: "primary.main",
                      },
                    }}
                  />
                )}
              />
              {errors.category_id && (
                <Typography
                  variant="caption"
                  sx={{ display: "block" }}
                  color="error"
                >
                  {errors.category_id.message}
                </Typography>
              )}
            </Box>

            {/* gender  */}
            <Box>
              <InputLabel htmlFor="gender" sx={{ mb: 1 }}>
                Gender
              </InputLabel>
              <Autocomplete
                sx={{
                  mb: 1,
                  "& .MuiInputBase-root": {
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  },
                  "& .MuiOutlinedInput-input": {
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  },

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "1px",
                    borderColor: "primary.main",
                  },
                }}
                options={genders}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    type="text"
                    id="gender"
                    placeholder="Please Choose a gender"
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
                  Gender is required
                </Typography>
              )}
            </Box>

            {/* job type  */}
            <Box>
              <InputLabel htmlFor="position" sx={{ mb: 1 }}>
                Job Type
              </InputLabel>
              <Autocomplete
                sx={{
                  mb: 1,
                  "& .MuiInputBase-root": {
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  },
                  "& .MuiOutlinedInput-input": {
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  },

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "1px",
                    borderColor: "primary.main",
                  },
                }}
                options={jobTypes ? jobTypes?.map((single) => single.name) : []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    type="text"
                    id="type"
                    placeholder="Please Enter Job Type"
                    size="small"
                    fullWidth
                    {...register("type", { required: true })}
                    error={!!errors.type}
                  />
                )}
              />
              {errors.type && (
                <Typography
                  variant="caption"
                  sx={{ display: "block" }}
                  color="error"
                >
                  Job Type is required
                </Typography>
              )}
            </Box>

            {/* roles  */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <InputLabel htmlFor="education">Role</InputLabel>
              <Box>
                <Autocomplete
                  sx={{
                    mb: 1,
                    "& .MuiInputBase-root": {
                      bgcolor: "background.paper",
                      borderRadius: 2,
                    },
                    "& .MuiOutlinedInput-input": {
                      bgcolor: "background.paper",
                      borderRadius: 2,
                    },

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderWidth: "1px",
                      borderColor: "primary.main",
                    },
                  }}
                  options={roles ? roles.map((single) => single.name) : []}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      type="text"
                      id="role"
                      placeholder="Please Enter Role"
                      size="small"
                      fullWidth
                      {...register("role", { required: true })}
                      error={!!errors.role}
                    />
                  )}
                />
                {errors.role && (
                  <Typography
                    variant="caption"
                    sx={{ display: "block" }}
                    color="error"
                  >
                    Choose a role
                  </Typography>
                )}
              </Box>
            </Box>

            {/* salary  */}
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
                  sx={{
                    flex: 1,
                    mb: 1,
                    "& .MuiOutlinedInput-input": {
                      bgcolor: "background.paper",
                      borderRadius: 2,
                    },

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderWidth: "1px",
                      borderColor: "primary.main",
                    },
                  }}
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

            {/* location  */}
            <Box>
              <InputLabel htmlFor="address" sx={{ mb: 1 }}>
                Location
              </InputLabel>
              <OutlinedInput
                sx={{
                  mb: 1,
                  "& .MuiOutlinedInput-input": {
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  },

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "1px",
                    borderColor: "primary.main",
                  },
                }}
                type="text"
                id="location"
                placeholder="Please Enter Your Location"
                size="small"
                fullWidth
                {...register("location", { required: true })}
                error={!!errors.location}
              />
              {errors.location && (
                <Typography
                  variant="caption"
                  sx={{ display: "block" }}
                  color="error"
                >
                  Location Field is required
                </Typography>
              )}
            </Box>

            {/* deadline  */}
            <Box>
              <InputLabel htmlFor="deadline" sx={{ mb: 1 }}>
                Application Deadline
              </InputLabel>
              <Controller
                name="deadline"
                control={control}
                rules={{ required: "Deadline is required." }}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <>
                      <Box display="flex" flexDirection="column">
                        <DatePicker
                          value={field.value ? new Date(field.value) : null}
                          onChange={field.onChange}
                          minDate={new Date(Date.now())}
                          slotProps={{
                            textField: {
                              onBlur: field.onBlur,
                              error: !!error,
                            },
                          }}
                          sx={{
                            bgcolor: "background.paper",
                            borderRadius: 2,
                            borderColor: "primary.main",
                          }}
                        />
                        {errors.deadline && (
                          <FormHelperText error>
                            {errors.deadline.message}
                          </FormHelperText>
                        )}
                      </Box>
                    </>
                  );
                }}
              />
            </Box>

            {/* vacancy  */}
            <Box>
              <InputLabel htmlFor="job_code" sx={{ mb: 1 }}>
                Vacancy
              </InputLabel>
              <OutlinedInput
                sx={{
                  mb: 1,

                  "& .MuiOutlinedInput-input": {
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  },

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "1px",
                    borderColor: "primary.main",
                  },
                }}
                type="number"
                id="vacancy"
                fullWidth
                size="small"
                placeholder="Select vacancy"
                {...register("vacancy", { required: true })}
                error={!!errors.vacancy}
              />
              {errors.vacancy && (
                <Typography
                  variant="caption"
                  sx={{ display: "block" }}
                  color="error"
                >
                  Vacancy is required
                </Typography>
              )}
            </Box>

            {/* requirements  */}
            <Box>
              <InputLabel htmlFor="requirements" sx={{ mb: 1 }}>
                Requirements
              </InputLabel>
              <TextField
                sx={{
                  mb: 1,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  },

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "1px",
                    borderColor: "primary.main",
                  },
                }}
                type="text"
                id="requirements"
                placeholder="Please Enter Your Requirements"
                fullWidth
                multiline
                minRows={4}
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

            {/* decriptions  */}
            <Box>
              <InputLabel htmlFor="description" sx={{ mb: 1 }}>
                Descriptions
              </InputLabel>
              <TextField
                sx={{
                  mb: 1,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  },

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "1px",
                    borderColor: "primary.main",
                  },
                }}
                type="text"
                id="description"
                placeholder="Please Enter Your Descriptions"
                fullWidth
                multiline
                minRows={4}
                {...register("description", { required: true })}
                error={!!errors.description}
              />
              {errors.description && (
                <Typography
                  variant="caption"
                  sx={{ display: "block" }}
                  color="error"
                >
                  Descriptions Field is required
                </Typography>
              )}
            </Box>

            {/* benefits  */}
            <Box>
              <InputLabel htmlFor="decriptions" sx={{ mb: 1 }}>
                Benefits
              </InputLabel>
              <TextField
                sx={{
                  mb: 1,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  },

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "1px",
                    borderColor: "primary.main",
                  },
                }}
                type="text"
                id="decriptions"
                placeholder="Please Enter Benefits"
                fullWidth
                multiline
                minRows={4}
                {...register("benefits", { required: true })}
                error={!!errors.benefits}
              />
              {errors.benefits && (
                <Typography
                  variant="caption"
                  sx={{ display: "block" }}
                  color="error"
                >
                  Benefits is required
                </Typography>
              )}
            </Box>

            {/* note  */}
            <Box>
              <InputLabel htmlFor="note" sx={{ mb: 1 }}>
                Note
              </InputLabel>
              <OutlinedInput
                sx={{
                  mb: 1,
                  "& .MuiOutlinedInput-input": {
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  },

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "1px",
                    borderColor: "primary.main",
                  },
                }}
                type="text"
                id="note"
                placeholder="Please Enter Your Notes"
                size="small"
                fullWidth
                {...register("note", { required: true })}
                error={!!errors.note}
              />
              {errors.note && (
                <Typography
                  variant="caption"
                  sx={{ display: "block" }}
                  color="error"
                >
                  Note Field is required
                </Typography>
              )}
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              my: 3,
              borderRadius: 2,
              textTransform: "none",
              boxShadow: "none",
              ":hover": {
                boxShadow: "none",
              },
            }}
          >
            Post Now
          </Button>
        </Box>
      </Container>
    </>
  );
}
