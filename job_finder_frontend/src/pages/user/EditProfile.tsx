import {
  Container,
  Box,
  Avatar,
  IconButton,
  Typography,
  OutlinedInput,
  InputLabel,
  Button,
  Divider,
  FormHelperText,
  Autocomplete,
  TextField,
  Alert,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useUserStore } from "../../store/UserStore";
import { useProfileStore } from "../../store/ProfileStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSeekerProfile,
  updateSeekerProfile,
} from "../../helper/profileApiFunctions";
import {
  getAllRoles,
  getAllTalents,
} from "../../helper/talentTypeAndRoleApiFunctions";
import { updateUser } from "../../helper/userApiFunctions";
import FullScreenLoader from "../../components/FullScreenLoader";
import { isAxiosError } from "axios";

type Inputs = {
  name: string;
  email: string | undefined;
  phone: string;
  address: string;
  role: string;
  talent: string;
  bio: string;
  skills: { value: string }[];
  image?: File | string;
  education: {
    degree: string;
    year: string;
  }[];
  experience: {
    workPos: string;
    year: string;
  }[];
  social_media_link: { value: string }[];
};

type SingleTalent = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

type SingleRole = {
  id: number;
  name: string;
};

export default function EditProfile() {
  const queryClient = useQueryClient();

  const { id } = useParams();
  const user_id = Number(id);
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);

  const [roles, setRoles] = useState<SingleRole[]>([]);
  const [talents, setTalents] = useState<SingleTalent[]>([]);

  const userData = useUserStore((state) => state.user);
  const seekerProfile = useProfileStore((state) => state.seekerProfile);
  const setSeekerProfile = useProfileStore((state) => state.setSeekerProfile);

  const talentsQuery = useQuery({
    queryKey: ["talents"],
    queryFn: getAllTalents,
  });

  const rolesQuery = useQuery({
    queryKey: ["userRoles"],
    queryFn: getAllRoles,
  });

  const seekerProfileQuery = useQuery({
    queryKey: ["seekerProfile", user_id],
    queryFn: () => {
      return getSeekerProfile(user_id);
    },
  });

  useEffect(() => {
    if (seekerProfileQuery.data && seekerProfileQuery.isSuccess) {
      setSeekerProfile(seekerProfileQuery.data.data.data[0]);
    }
  }, [seekerProfileQuery.data, seekerProfileQuery.isSuccess, setSeekerProfile]);

  useEffect(() => {
    if (talentsQuery.data && talentsQuery.isSuccess) {
      setTalents(talentsQuery.data.data.data);
    }
  }, [talentsQuery.data, talentsQuery.isSuccess]);

  useEffect(() => {
    if (rolesQuery.data && rolesQuery.isSuccess) {
      setRoles(rolesQuery.data.data.data);
    }
  }, [rolesQuery.data, rolesQuery.isSuccess]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
    defaultValues: {
      skills: [{ value: "" }],
      education: [{ degree: "", year: "" }],
      experience: [{ workPos: "", year: "" }],
      social_media_link: [{ value: "" }],
    },
  });
  const {
    fields: skillFileds,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({ control, name: "skills" });
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({ control, name: "education" });
  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({ control, name: "experience" });
  const {
    fields: socialMediaFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({ control, name: "social_media_link" });

  useEffect(() => {
    if (seekerProfile && seekerProfile.user_id) {
      setValue("name", seekerProfile.user_id.name || "");
      setValue("email", userData?.user_email || "");
      setValue("phone", seekerProfile.user_id.phone || "");
      setValue("address", seekerProfile.user_id.address || "");
      setValue("role", seekerProfile.role || "");
      setValue("talent", seekerProfile.talent || "");
      setValue("bio", seekerProfile.bio || "");
      setValue("image", seekerProfile.image);

      if (seekerProfile.image) {
        setImagePreview(seekerProfile.image);
      }

      const educationData =
        seekerProfile.education && seekerProfile.education.length > 0
          ? seekerProfile.education
          : [{ degree: "", year: "" }];
      setValue("education", educationData);

      const experienceData =
        seekerProfile.work_experience &&
        seekerProfile.work_experience.length > 0
          ? seekerProfile.work_experience
          : [{ workPos: "", year: "" }];
      setValue("experience", experienceData);

      //skills from db
      const skillsFromApi = seekerProfile.skills;
      // social media links from the db
      const socialLinksFromApi = seekerProfile.social_media_link;

      //  transform into rhf form
      const formattedSkills =
        skillsFromApi && skillsFromApi.length > 0
          ? skillsFromApi.map((link) =>
              typeof link === "string" ? { value: link } : link,
            )
          : [{ value: "" }];

      setValue("skills", formattedSkills);

      //  transform into rhf form
      const formattedSocialLinks =
        socialLinksFromApi && socialLinksFromApi.length > 0
          ? socialLinksFromApi.map((link) =>
              typeof link === "string" ? { value: link } : link,
            )
          : [{ value: "" }];

      setValue("social_media_link", formattedSocialLinks);
    }
  }, [seekerProfile, userData, setValue]);

  const userUpdateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {},
    onError: (err) => {
      if (isAxiosError(err)) {
        setFileUploadError(err.response?.data.message);
      }
    },
  });

  const seekerUpdateMutation = useMutation({
    mutationFn: updateSeekerProfile,
    onSuccess: (response) => {
      if (response.status == 200) {
        queryClient.invalidateQueries({ queryKey: ["seekerProfile", user_id] });
      }
      navigate(-1);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const {
      name,
      email,
      phone,
      address,
      role,
      talent,
      bio,
      skills,
      social_media_link,
      image,
      education,
      experience,
    } = data;

    const userInfo = new FormData();

    if (name) userInfo.append("name", name);
    if (email) userInfo.append("email", email);
    if (phone) userInfo.append("phone", phone);
    if (address) userInfo.append("address", address);

    const seekerInfo = new FormData();

    if (role) seekerInfo.append("role", role);
    if (talent) seekerInfo.append("talent", talent);
    if (bio) seekerInfo.append("bio", bio);
    if (image instanceof File) {
      seekerInfo.append("image", image);
    }

    if (skills && skills.length > 0) {
      const skillValues = skills.map((s) => s.value).filter(Boolean);
      if (skillValues.length > 0) {
        skillValues.forEach((skill, index) => {
          seekerInfo.append(`skills[${index}]`, skill);
        });
      }
    }

    if (education && education.length > 0) {
      const validEducation = education.filter((edu) => edu.degree && edu.year);
      if (validEducation.length > 0) {
        validEducation.forEach((edu, index) => {
          seekerInfo.append(`education[${index}][degree]`, edu.degree);
          seekerInfo.append(`education[${index}][year]`, edu.year);
        });
      }
    }

    if (experience && experience.length > 0) {
      const validExperience = experience.filter(
        (exp) => exp.workPos && exp.year,
      );
      if (validExperience.length > 0) {
        validExperience.forEach((exp, index) => {
          seekerInfo.append(`work_experience[${index}][workPos]`, exp.workPos);
          seekerInfo.append(`work_experience[${index}][year]`, exp.year);
        });
      }
    }

    if (social_media_link && social_media_link.length > 0) {
      const socialValues = social_media_link
        .map((s) => s.value)
        .filter(Boolean);
      if (socialValues.length > 0) {
        socialValues.forEach((link, index) => {
          seekerInfo.append(`social_media_link[${index}]`, link);
        });
      }
    }

    seekerUpdateMutation.mutate({
      seekerID: seekerProfile.id,
      seekerData: seekerInfo,
    });
    userUpdateMutation.mutate({
      userID: userData?.user_id,
      userFormData: userInfo,
    });
  };

  if (talentsQuery.data && rolesQuery.data && seekerProfileQuery.data) {
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
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ ml: { xs: 1, sm: 5 } }}
          >
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
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            {/* --- Profile Picture --- */}
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange } }) => (
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <Box sx={{ position: "relative", display: "inline-block" }}>
                    <Avatar
                      src={
                        imagePreview
                          ? imagePreview.startsWith("blob:")
                            ? imagePreview
                            : `${import.meta.env.VITE_API_BASE_URL}/${imagePreview}`
                          : undefined
                      }
                      sx={{ width: 70, height: 70, cursor: "pointer" }}
                      onClick={() => document.getElementById("image")?.click()}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        boxShadow: 1,
                        bgcolor: "white",
                        "&:hover": { bgcolor: "white" },
                      }}
                      onClick={() => document.getElementById("image")?.click()}
                    >
                      <CameraAltIcon fontSize="small" />
                    </IconButton>

                    <input
                      type="file"
                      id="image"
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          onChange(file);
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </Box>
                  <Typography>Upload Picture</Typography>
                </Box>
              )}
            />

            <Box
              sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2.5 }}
            >
              {/* ---name --- */}
              <Box>
                <InputLabel
                  htmlFor="name"
                  sx={{ color: "text.secondary", mb: 0.5 }}
                >
                  Your Name
                </InputLabel>
                <OutlinedInput
                  {...register("name", { required: "Name is required" })}
                  id="name"
                  placeholder="Please Enter Your Name"
                  size="small"
                  fullWidth
                  sx={{ bgcolor: "background.paper" }}
                  error={!!errors.name}
                />
                {errors.name && (
                  <FormHelperText error>{errors.name.message}</FormHelperText>
                )}
              </Box>

              {/* role  */}
              <Box>
                <InputLabel htmlFor="role" sx={{ mb: 1 }}>
                  Role
                </InputLabel>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: "You must select a role" }}
                  render={({ field, fieldState: { error } }) => {
                    const { onChange, value } = field;
                    const selectedRole =
                      roles.find((r) => r.name === value) || null;
                    return (
                      <Autocomplete
                        value={selectedRole}
                        options={roles}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, val) =>
                          option.id === val.id
                        }
                        onChange={(_, newValue) => {
                          onChange(newValue ? newValue.name : "");
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select a role"
                            size="small"
                            error={!!error}
                            helperText={error?.message}
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
                    );
                  }}
                />
                {errors.role && (
                  <Typography
                    variant="caption"
                    sx={{ display: "block" }}
                    color="error"
                  >
                    {errors.role.message}
                  </Typography>
                )}
              </Box>

              {/* talent  */}
              <Box>
                <InputLabel htmlFor="talent" sx={{ mb: 1 }}>
                  Talent
                </InputLabel>
                <Controller
                  name="talent"
                  control={control}
                  rules={{ required: "You must select a talent" }}
                  render={({ field, fieldState: { error } }) => {
                    const { onChange, value } = field;
                    const selectedTalent =
                      talents.find((t) => t.name === value) || null;
                    return (
                      <Autocomplete
                        value={selectedTalent}
                        options={talents}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, val) =>
                          option.id === val.id
                        }
                        onChange={(_, newValue) => {
                          onChange(newValue ? newValue.name : "");
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select a talent"
                            size="small"
                            error={!!error}
                            helperText={error?.message}
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
                    );
                  }}
                />
                {errors.role && (
                  <Typography
                    variant="caption"
                    sx={{ display: "block" }}
                    color="error"
                  >
                    {errors.role.message}
                  </Typography>
                )}
              </Box>

              {/* ---bio --- */}
              <Box>
                <InputLabel
                  htmlFor="bio"
                  sx={{ color: "text.secondary", mb: 0.5 }}
                >
                  Bio
                </InputLabel>
                <TextField
                  {...register("bio", { required: "bio is required" })}
                  id="bio"
                  placeholder="Please Enter Your bio"
                  size="small"
                  fullWidth
                  multiline
                  minRows={4}
                  sx={{
                    "& .MuiInputBase-root": {
                      bgcolor: "background.paper",
                    },
                  }}
                  error={!!errors.bio}
                />
                {errors.bio && (
                  <FormHelperText error>{errors.bio.message}</FormHelperText>
                )}
              </Box>
              <Divider sx={{ my: 1 }} />

              {/* --- skills  --- */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 400 }}>
                    Skills
                  </Typography>
                  <IconButton
                    type="button"
                    onClick={() => appendSkill({ value: "" })}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Box>
                {skillFileds.map((field, index) => (
                  <Box
                    key={field.id}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <OutlinedInput
                      {...register(`skills.${index}.value`)}
                      placeholder="Enter your skill"
                      fullWidth
                      size="small"
                      sx={{ bgcolor: "background.paper" }}
                    />
                    {skillFileds.length > 1 && (
                      <IconButton onClick={() => removeSkill(index)}>
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </Box>

              {/* --- Education  --- */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 400 }}>
                    Education
                  </Typography>
                  <IconButton
                    type="button"
                    onClick={() => appendEducation({ degree: "", year: "" })}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Box>
                {educationFields.map((field, index) => (
                  <Box
                    key={field.id}
                    sx={{
                      p: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                    }}
                  >
                    {educationFields.length > 1 && (
                      <IconButton
                        onClick={() => removeEducation(index)}
                        sx={{ position: "absolute", top: 8, right: 8 }}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    )}
                    <Box sx={{ my: 1 }}>
                      <InputLabel
                        htmlFor={`education.${index}.degree`}
                        sx={{ color: "text.secondary", fontSize: "0.9rem" }}
                      >
                        Degree / Certificate
                      </InputLabel>
                      <OutlinedInput
                        {...register(`education.${index}.degree`, {
                          required: "Degree is required",
                        })}
                        fullWidth
                        size="small"
                        sx={{ bgcolor: "background.paper" }}
                        error={!!errors.education?.[index]?.degree}
                      />
                      {errors.education?.[index]?.degree && (
                        <FormHelperText error>
                          {errors.education?.[index]?.degree?.message}
                        </FormHelperText>
                      )}
                    </Box>
                    <Box>
                      <InputLabel
                        htmlFor={`education.${index}.year`}
                        sx={{ color: "text.secondary", fontSize: "0.9rem" }}
                      >
                        Year
                      </InputLabel>
                      <OutlinedInput
                        {...register(`education.${index}.year`, {
                          required: "Year is required",
                        })}
                        fullWidth
                        size="small"
                        sx={{ bgcolor: "background.paper" }}
                        error={!!errors.education?.[index]?.year}
                      />
                      {errors.education?.[index]?.year && (
                        <FormHelperText error>
                          {errors.education?.[index]?.year?.message}
                        </FormHelperText>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 1 }} />

              {/* --- Experience --- */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 400 }}>
                    Experience
                  </Typography>
                  <IconButton
                    type="button"
                    onClick={() => appendExperience({ workPos: "", year: "" })}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Box>
                {experienceFields.map((field, index) => (
                  <Box
                    key={field.id}
                    sx={{
                      p: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                    }}
                  >
                    {experienceFields.length > 1 && (
                      <IconButton
                        onClick={() => removeExperience(index)}
                        sx={{ position: "absolute", top: 8, right: 8 }}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    )}
                    <Box sx={{ my: 1 }}>
                      <InputLabel
                        htmlFor={`experience.${index}.workPos`}
                        sx={{ color: "text.secondary", fontSize: "0.9rem" }}
                      >
                        Position
                      </InputLabel>
                      <OutlinedInput
                        {...register(`experience.${index}.workPos`)}
                        fullWidth
                        size="small"
                        sx={{ bgcolor: "background.paper" }}
                        error={!!errors.experience?.[index]?.workPos}
                      />
                      {errors.experience?.[index]?.workPos && (
                        <FormHelperText error>
                          {errors.experience?.[index]?.workPos?.message}
                        </FormHelperText>
                      )}
                    </Box>
                    <Box>
                      <InputLabel
                        htmlFor={`experience.${index}.year`}
                        sx={{ color: "text.secondary", fontSize: "0.9rem" }}
                      >
                        Year
                      </InputLabel>
                      <OutlinedInput
                        {...register(`experience.${index}.year`)}
                        fullWidth
                        size="small"
                        sx={{ bgcolor: "background.paper" }}
                        error={!!errors.experience?.[index]?.year}
                      />
                      {errors.experience?.[index]?.year && (
                        <FormHelperText error>
                          {errors.experience?.[index]?.year?.message}
                        </FormHelperText>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 1 }} />

              {/* --- Contact Info --- */}
              <Box>
                <InputLabel
                  htmlFor="email"
                  sx={{ color: "text.secondary", mb: 0.5 }}
                >
                  Email Address
                </InputLabel>
                <OutlinedInput
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  id="email"
                  placeholder="Please Enter Your Email Address"
                  size="small"
                  fullWidth
                  sx={{ bgcolor: "background.paper" }}
                  error={!!errors.email}
                />
                {errors.email && (
                  <FormHelperText error>{errors.email.message}</FormHelperText>
                )}
              </Box>
              <Box>
                <InputLabel
                  htmlFor="phone"
                  sx={{ color: "text.secondary", mb: 0.5 }}
                >
                  Phone Number
                </InputLabel>
                <OutlinedInput
                  type="tel"
                  {...register("phone")}
                  id="phone"
                  placeholder="Please Enter Your Phone Number"
                  size="small"
                  fullWidth
                  sx={{ bgcolor: "background.paper" }}
                  error={!!errors.phone}
                />
                {errors.phone && (
                  <FormHelperText error>{errors.phone.message}</FormHelperText>
                )}
              </Box>

              <Box>
                <InputLabel
                  htmlFor="address"
                  sx={{ color: "text.secondary", mb: 0.5 }}
                >
                  Address
                </InputLabel>
                <OutlinedInput
                  {...register("address")}
                  id="address"
                  placeholder="Please Enter Your Address"
                  size="small"
                  fullWidth
                  sx={{ bgcolor: "background.paper" }}
                  error={!!errors.address}
                />
                {errors.address && (
                  <FormHelperText error>
                    {errors.address.message}
                  </FormHelperText>
                )}
              </Box>

              <Divider sx={{ my: 1 }} />

              {/* --- Social Media  --- */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 400 }}>
                    Social Media
                  </Typography>
                  <IconButton
                    type="button"
                    onClick={() => appendSocial({ value: "" })}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Box>
                {socialMediaFields.map((field, index) => (
                  <Box
                    key={field.id}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <OutlinedInput
                      {...register(`social_media_link.${index}.value`)}
                      placeholder="e.g., https://github.com/user"
                      fullWidth
                      size="small"
                      sx={{ bgcolor: "background.paper" }}
                    />
                    {socialMediaFields.length > 1 && (
                      <IconButton onClick={() => removeSocial(index)}>
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </Box>
              {fileUploadError && (
                <Alert
                  sx={{ borderRadius: 3, my: 2 }}
                  variant="outlined"
                  severity="error"
                  onClose={() => {
                    setFileUploadError(null);
                  }}
                >
                  {fileUploadError}
                </Alert>
              )}
            </Box>
            <Box>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                loading={
                  userUpdateMutation.isPending || seekerUpdateMutation.isPending
                }
                sx={{
                  mt: 4,
                  py: 1,
                  textTransform: "none",
                  borderRadius: 2,
                  boxShadow: "none",
                  ":hover": { boxShadow: "none" },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </form>
        </Container>
      </>
    );
  } else {
    return (
      <FullScreenLoader
        open={
          talentsQuery.isSuccess ||
          rolesQuery.isSuccess ||
          seekerProfileQuery.isSuccess
        }
        message="Getting Data..."
      />
    );
  }
}
