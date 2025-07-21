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
} from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { useUserStore } from "../../../store/UserStore";
import { postAJob } from "../../../helper/postJob";
import { useEffect, useState } from "react";
import type { Job } from "../../../store/JobStore";
import {
  getAllRoles,
  getAllTypes,
} from "../../../helper/talentTypeAndRoleApiFunctions";

type JobTypeAndRole = {
  id: number;
  name: string;
};

export default function PostAJob() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  const [jobTypes, setJobTypes] = useState<JobTypeAndRole[] | null>();
  const [roles, setRoles] = useState<JobTypeAndRole[] | null>();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Job>();

  const typeQuery = useQuery({
    queryKey: ["jobTypes"],
    queryFn: getAllTypes,
  });

  const roleQuery = useQuery({
    queryKey: ["jobRoles"],
    queryFn: getAllRoles,
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
    postAJobMutation.mutate(data);
  };

  const categories = [
    { id: 1, name: "Category one" },
    { id: 2, name: "Category two" },
  ];

  useEffect(() => {
    register("category_id", { required: true });
  }, [register]);

  useEffect(() => {
    if (typeQuery.data && typeQuery.isSuccess) {
      setJobTypes(typeQuery.data.original.data);
    }
  }, [typeQuery.data, typeQuery.isSuccess, jobTypes]);

  useEffect(() => {
    if (roleQuery.data && roleQuery.isSuccess) {
      setRoles(roleQuery.data.data.data);
    }
  }, [roleQuery.data, roleQuery.isSuccess, jobTypes]);

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
            <Box>
              <InputLabel htmlFor="job_code" sx={{ mb: 1 }}>
                Job Code
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
                id="job_code"
                fullWidth
                size="small"
                {...register("job_code", { required: true })}
                error={!!errors.job_code}
              />
              {errors.job_code && (
                <Typography
                  variant="caption"
                  sx={{ display: "block" }}
                  color="error"
                >
                  Job Code Field is required
                </Typography>
              )}
            </Box>
            <Box>
              <InputLabel htmlFor="category" sx={{ mb: 1 }}>
                Category
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
                options={categories}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(_, selectedOption) => {
                  setValue("category_id", selectedOption?.id ?? null);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    type="text"
                    id="category_id"
                    placeholder="Please Select Category"
                    size="small"
                    fullWidth
                  />
                )}
              />
              {errors.category_id && (
                <Typography
                  variant="caption"
                  sx={{ display: "block" }}
                  color="error"
                >
                  Category Field is required
                </Typography>
              )}
            </Box>
            <Box>
              <InputLabel htmlFor="position" sx={{ mb: 1 }}>
                Type
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
                  Type Field is required
                </Typography>
              )}
            </Box>
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
                    Role Field is required
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
                placeholder="Please Enter Your Address"
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
