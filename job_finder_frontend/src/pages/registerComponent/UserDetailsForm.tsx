import {
  Box,
  FormHelperText,
  OutlinedInput,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useRegisterStore } from "../../store/RegisterStore";

const UserDetailsForm = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const registerErrors = useRegisterStore((state) => state.errors);
  const removeErrMessage = useRegisterStore(
    (state) => state.removeRegisterErrors,
  );

  //to update button style
  const userType = watch("userType");

  const handleUserTypeSelect = (type: "seeker" | "employer") => {
    // update the form's data when a button is clicked.
    setValue("userType", type, { shouldValidate: true, shouldDirty: true });
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography component="label" htmlFor="name" sx={{ fontWeight: 300 }}>
          Your name
        </Typography>
        <OutlinedInput
          {...register("name", { required: "Name is required" })}
          id="name"
          placeholder="Please enter your name"
          error={!!errors.name}
        />
        {errors.name && (
          <FormHelperText error>{errors.name.message as string}</FormHelperText>
        )}
      </Box>

      {/* Email Field */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography component="label" htmlFor="email" sx={{ fontWeight: 300 }}>
          Email
        </Typography>
        <OutlinedInput
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email",
            },
          })}
          id="email"
          type="email"
          placeholder="Please enter your email"
          error={!!errors.email}
        />
        {errors.email && (
          <FormHelperText error>
            {errors.email.message as string}
          </FormHelperText>
        )}
        {registerErrors && registerErrors.email && (
          <Alert
            sx={{ borderRadius: 3 }}
            variant="outlined"
            severity="error"
            onClose={() => {
              removeErrMessage();
            }}
          >
            {registerErrors.email}
          </Alert>
        )}
      </Box>

      {/* Phone Number Field */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography component="label" htmlFor="phone" sx={{ fontWeight: 300 }}>
          Phone Number <span style={{ color: "#888" }}>(Optional)</span>
        </Typography>
        <OutlinedInput
          {...register("phone")}
          id="phone"
          type="tel"
          placeholder="eg : +95 9 123 456 78"
          error={!!errors.phone}
        />
        {errors.phone && (
          <FormHelperText error>
            {errors.phone.message as string}
          </FormHelperText>
        )}
        {registerErrors && registerErrors.phone && (
          <Alert
            sx={{ borderRadius: 3 }}
            variant="outlined"
            severity="error"
            onClose={() => {
              removeErrMessage();
            }}
          >
            {registerErrors.phone}
          </Alert>
        )}
      </Box>

      {/* Address Field */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography
          component="label"
          htmlFor="address"
          sx={{ fontWeight: 300 }}
        >
          Your Address <span style={{ color: "#888" }}>(Optional)</span>
        </Typography>
        <OutlinedInput
          {...register("address")}
          id="address"
          type="text"
          placeholder="Enter your address"
          error={!!errors.address}
        />
        {errors.address && (
          <FormHelperText error>
            {errors.address.message as string}
          </FormHelperText>
        )}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography component="label" sx={{ fontWeight: 300 }}>
          I am registering as a...<span style={{ color: "#ef4444" }}>*</span>
        </Typography>

        <input
          type="hidden"
          {...register("userType", { required: "Please select a role." })}
        />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            variant={userType === "seeker" ? "contained" : "outlined"}
            onClick={() => handleUserTypeSelect("seeker")}
            sx={{
              flexGrow: 1,
              borderRadius: 2,
              boxShadow: "none",
              textTransform: "none",
              ":hover": {
                boxShadow: "none",
              },
            }}
          >
            Job Seeker
          </Button>
          <Button
            variant={userType === "employer" ? "contained" : "outlined"}
            onClick={() => handleUserTypeSelect("employer")}
            sx={{
              flexGrow: 1,
              borderRadius: 2,
              boxShadow: "none",
              textTransform: "none",
              ":hover": {
                boxShadow: "none",
              },
            }}
          >
            Employer
          </Button>
        </Box>
        {errors.userType && (
          <FormHelperText error>
            {errors.userType.message as string}
          </FormHelperText>
        )}
      </Box>
    </Box>
  );
};

export default UserDetailsForm;
