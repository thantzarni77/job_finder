import {
  Box,
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
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {
  getAllRoles,
  getAllTalents,
} from "../../helper/talentAndRoleApiFunctions";

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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
  } = useFormContext();

  useEffect(() => {
    //prevent memory leak
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
      {/* skill */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography component="label" htmlFor="skills" sx={{ fontWeight: 300 }}>
          Skill
        </Typography>
        <OutlinedInput
          {...register("skills", {
            required: "Skill is required",
          })}
          id="skills"
          fullWidth
          placeholder="Please enter your skills"
          error={!!errors.skills}
        />
        {errors.skills && (
          <FormHelperText error id="skills">
            {errors.skills.message as string}
          </FormHelperText>
        )}
      </Box>
      {/* education  */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography
          component="label"
          htmlFor="education"
          sx={{ fontWeight: 300 }}
        >
          Education
        </Typography>
        <OutlinedInput
          {...register("education", {
            required: "Education field is required",
            maxLength: {
              value: 100,
              message: "Shouldn't be more than 100 words",
            },
          })}
          id="education"
          type="text"
          fullWidth
          placeholder="Please enter your email"
          error={!!errors.education}
        />
        {errors.education && (
          <FormHelperText error id="education">
            {errors.education.message as string}
          </FormHelperText>
        )}
      </Box>
      {/* work exp  */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography
          component="label"
          htmlFor="work_experience"
          sx={{ fontWeight: 300 }}
        >
          Work Expericence
        </Typography>
        <OutlinedInput
          {...register("work_experience", {
            required: "Work experience is required",
            maxLength: {
              value: 100,
              message: "Shouldn't be more than 100 words",
            },
          })}
          id="work_experience"
          type="text"
          fullWidth
          placeholder="Please enter your work experience"
          error={!!errors.work_experience}
        />
        {errors.work_experience && (
          <FormHelperText error id="work_experience">
            {errors.work_experience.message as string}
          </FormHelperText>
        )}
      </Box>
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

      {/* talent */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography component="label" sx={{ fontWeight: 300 }}>
          Select your talent
        </Typography>
        <Controller
          name="talent"
          control={control}
          defaultValue="Developer"
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

      {/* social link */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography
          component="label"
          htmlFor="social_media_link"
          sx={{ fontWeight: 300 }}
        >
          Social Links
        </Typography>
        <OutlinedInput
          {...register("social_media_link", {
            required: "Bio is required",
            maxLength: {
              value: 100,
              message: "Shouldn't be more than 100 words",
            },
          })}
          id="social_media_link"
          type="text"
          fullWidth
          placeholder="Please enter your social links separated by ,"
          error={!!errors.social_media_link}
        />
        {errors.social_media_link && (
          <FormHelperText error id="social_media_link">
            {errors.social_media_link.message as string}
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
          Upload your profile
          <span style={{ color: "#ef4444" }}>*</span>
        </Typography>

        {/* Image Preview Section */}
        <Box
          onClick={handleContainerClick}
          sx={{
            width: "50%",
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
