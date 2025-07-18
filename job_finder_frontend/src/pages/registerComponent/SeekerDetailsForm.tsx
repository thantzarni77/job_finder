import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  OutlinedInput,
  Radio,
  RadioGroup,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomFIleUpload from "../../components/custom_svg/CustomFIleUpload";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {
  getAllRoles,
  getAllTalents,
} from "../../helper/talentTypeAndRoleApiFunctions";

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

type SeekerFormValues = {
  skills: { value: string }[];
  education: { degree: string; year: string }[];
  work_experience: { value: string }[];
  role: string;
  bio: string;
  talent: string;
  social_media_link: { value: string }[];
  image: File;
  seekerPassword: string;
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

const SeekerDetailsFrom = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);

  const [talents, setTalents] = useState<SingleTalent[]>([]);
  const [roles, setRoles] = useState<SingleRole[]>([]);

  const talentsQuery = useQuery({
    queryKey: ["talents"],
    queryFn: getAllTalents,
  });

  const rolesQuery = useQuery({
    queryKey: ["roles"],
    queryFn: getAllRoles,
  });

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<SeekerFormValues>();

  const {
    fields: skillFields,
    append: skillAppend,
    remove: skillRemove,
  } = useFieldArray({
    control,
    name: "skills",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  const {
    fields: workExpFields,
    append: workExpAppend,
    remove: workExpRemove,
  } = useFieldArray({
    control,
    name: "work_experience",
  });

  const {
    fields: socialField,
    append: socialAppend,
    remove: socialRemove,
  } = useFieldArray({
    control,
    name: "social_media_link",
  });

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
      {/* skill */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography component="label" sx={{ fontWeight: 300 }}>
            Skills
          </Typography>
          <IconButton
            type="button" // Important: Prevents form submission
            aria-label="add skill"
            onClick={() => skillAppend({ value: "" })}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {/* Map over the fields array to render each input */}
          {skillFields.map((field, index) => {
            const skillError = errors.skills?.[index]?.value;

            return (
              <Box key={field.id}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <OutlinedInput
                    {...register(`skills.${index}.value`, {
                      required: "Skill cannot be empty",
                    })}
                    placeholder="Enter skill"
                    error={!!skillError}
                    sx={{ width: { xs: "100%", sm: "200px" } }}
                  />
                  <IconButton
                    type="button"
                    aria-label="remove skill"
                    onClick={() => skillRemove(index)}
                    disabled={skillFields.length === 1}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Box>
                {skillError && (
                  <FormHelperText error sx={{ pl: "14px" }}>
                    {skillError.message}
                  </FormHelperText>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>

      <Divider flexItem />

      {/* education  */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography component="label" sx={{ fontWeight: 300 }}>
            Education
          </Typography>
          <IconButton
            type="button"
            aria-label="add education"
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
              display: "flex",
              flexDirection: "column",
              gap: 2,
              position: "relative",
            }}
          >
            <IconButton
              aria-label="remove education"
              onClick={() => removeEducation(index)}
              disabled={educationFields.length <= 1}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>

            {/* Input for the Degree */}
            <Box>
              <Typography
                component="label"
                htmlFor={`education.${index}.degree`}
                sx={{ fontWeight: 300, fontSize: "0.9rem" }}
              >
                Degree / Certificate
              </Typography>
              <OutlinedInput
                {...register(`education.${index}.degree`, {
                  required: "Degree is required",
                })}
                id={`education.${index}.degree`}
                fullWidth
                placeholder="e.g., B.S. in Computer Science"
                error={!!errors.education?.[index]?.degree}
              />
              {errors.education?.[index]?.degree && (
                <FormHelperText error>
                  {errors.education?.[index]?.degree?.message}
                </FormHelperText>
              )}
            </Box>

            {/* Input for the year */}
            <Box>
              <Typography
                component="label"
                htmlFor={`education.${index}.year`}
                sx={{ fontWeight: 300, fontSize: "0.9rem" }}
              >
                Year
              </Typography>
              <OutlinedInput
                {...register(`education.${index}.year`, {
                  required: "Year is required",
                })}
                id={`education.${index}.year`}
                fullWidth
                placeholder="e.g., 2016-2023"
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

      <Divider flexItem />

      {/* work exp */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography component="label" sx={{ fontWeight: 300 }}>
            Work experience
          </Typography>
          <IconButton
            type="button" // Important: Prevents form submission
            aria-label="add work exp"
            onClick={() => workExpAppend({ value: "" })}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {/* Map over the fields array to render each input */}
          {workExpFields.map((field, index) => {
            const work_experience_errors =
              errors.work_experience?.[index]?.value;

            return (
              <Box key={field.id}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <OutlinedInput
                    {...register(`work_experience.${index}.value`, {
                      required: "Work experience cannot be empty",
                    })}
                    placeholder="Enter work experience"
                    error={!!work_experience_errors}
                    sx={{ width: { xs: "100%", sm: "200px" } }}
                  />
                  <IconButton
                    type="button"
                    aria-label="remove work exp"
                    onClick={() => workExpRemove(index)}
                    disabled={workExpFields.length === 1}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Box>
                {work_experience_errors && (
                  <FormHelperText error sx={{ pl: "14px" }}>
                    {work_experience_errors.message}
                  </FormHelperText>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>

      <Divider flexItem />

      {/* role */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography component="label" htmlFor="role" sx={{ fontWeight: 300 }}>
          Choose Seeker Role
        </Typography>
        <Controller
          name="role"
          control={control}
          defaultValue=""
          rules={{ required: "You must select a role" }}
          render={({ field, fieldState: { error } }) => (
            <FormControl error={!!error}>
              <RadioGroup
                {...field}
                row
                aria-labelledby="role-radio-buttons-group-label"
                name="role-radio-buttons-group"
              >
                {roles.map((role) => (
                  <FormControlLabel
                    key={role.id}
                    value={role.name}
                    control={<Radio />}
                    label={role.name}
                    sx={{
                      "& .MuiTypography-root": {
                        fontWeight: 300,
                        fontSize: 15,
                      },
                    }}
                  />
                ))}
              </RadioGroup>
              {error && (
                <FormHelperText sx={{ ml: 0 }}>{error.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      <Divider flexItem />

      {/* bio */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography component="label" htmlFor="bio" sx={{ fontWeight: 300 }}>
          Bio
        </Typography>
        <TextField
          {...register("bio", {
            required: "Bio is required",
            maxLength: {
              value: 100,
              message: "Shouldn't be more than 100 words",
            },
          })}
          multiline
          fullWidth
          id="bio"
          minRows={4}
          placeholder="Please enter your bio"
          error={!!errors.bio}
        />
        {errors.bio && (
          <FormHelperText error id="bio">
            {errors.bio.message as string}
          </FormHelperText>
        )}
      </Box>

      <Divider flexItem />

      {/* talent */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography component="label" sx={{ fontWeight: 300 }}>
          Select your talent
        </Typography>
        <Controller
          name="talent"
          control={control}
          defaultValue=""
          rules={{ required: "You must select a talent" }}
          render={({ field, fieldState: { error } }) => (
            <FormControl error={!!error}>
              <RadioGroup
                {...field}
                row
                aria-labelledby="talent-radio-buttons-group-label"
                name="talent-radio-buttons-group"
              >
                {talents.map((talent) => (
                  <FormControlLabel
                    key={talent.id}
                    value={talent.name}
                    control={<Radio />}
                    label={talent.name}
                    sx={{
                      "& .MuiTypography-root": {
                        fontWeight: 300,
                        fontSize: 15,
                      },
                    }}
                  />
                ))}
              </RadioGroup>
              {error && (
                <FormHelperText sx={{ ml: 0 }}>{error.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      <Divider flexItem />

      {/* social link */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography component="label" sx={{ fontWeight: 300 }}>
            Social Media Links
          </Typography>
          <IconButton
            type="button" // Important: Prevents form submission
            aria-label="add social"
            onClick={() => socialAppend({ value: "" })}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {/* Map over the fields array to render each input */}
          {socialField.map((field, index) => {
            const socialErrors = errors.social_media_link?.[index]?.value;

            return (
              <Box key={field.id}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <OutlinedInput
                    {...register(`social_media_link.${index}.value`)}
                    placeholder="eg. www.facebook.com/seekerprofile"
                    error={!!socialErrors}
                    sx={{ width: "100%" }}
                  />
                  <IconButton
                    type="button"
                    aria-label="remove social"
                    onClick={() => socialRemove(index)}
                    disabled={socialField.length === 1}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Box>
                {socialErrors && (
                  <FormHelperText error sx={{ pl: "14px" }}>
                    {socialErrors.message}
                  </FormHelperText>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>

      <Divider flexItem />

      {/* seeker profile  */}
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
                Upload your profile
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
              {errors.image && (
                <FormHelperText error sx={{ mt: 1 }}>
                  {errors.image.message}
                </FormHelperText>
              )}
            </Box>
          );
        }}
      />

      <Divider flexItem />

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
          htmlFor="seekerPassword"
          sx={{
            fontWeight: 300,
          }}
        >
          Password
        </Typography>
        <OutlinedInput
          {...register("seekerPassword", {
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
          id="seekerPassword"
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
          error={!!errors.seekerPassword}
        />
        {errors.seekerPassword && (
          <FormHelperText error id="seekerPassword">
            {errors.seekerPassword.message as string}
          </FormHelperText>
        )}
      </Box>
    </Box>
  );
};

export default SeekerDetailsFrom;
