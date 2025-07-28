import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../../store/UserStore";
import { useForm } from "react-hook-form";
import { getUserProfile } from "../../../helper/profileApiFunctions";
import { changeEmail } from "../../../helper/changeSecurityApiFunctions";

type ChangeEmailForm = {
  currentEmail: string;
  newEmail: string;
  confirmNewEmail: string;
};

const ChangeEmail = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const user = useUserStore((state) => state.user);
  const setUserData = useUserStore((state) => state.setUserData);

  const profileQuery = useQuery({
    enabled: !user?.user_id,
    queryKey: ["userProfile", id],
    queryFn: getUserProfile,
  });

  useEffect(() => {
    if (profileQuery.data && profileQuery.isSuccess) {
      setUserData(profileQuery.data.data);
    }
  }, [profileQuery.data, profileQuery.isSuccess, setUserData]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ChangeEmailForm>({
    mode: "onBlur",
  });

  const newEmail = watch("newEmail");

  const changeEmailMutation = useMutation({
    mutationFn: changeEmail,
    onSuccess: (res) => {
      const { id, name, email, user_type } = res.data;
      setUserData({
        user_id: id,
        user_name: name,
        user_email: email,
        user_type: user_type,
      });
      queryClient.invalidateQueries();
      navigate(-1);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const changeEmailHandler = (data: ChangeEmailForm) => {
    const { newEmail } = data;

    changeEmailMutation.mutate({
      email: newEmail,
    });
  };

  useEffect(() => {
    if (user?.user_email) {
      setValue("currentEmail", user.user_email);
    }
  }, [setValue, user?.user_email]);

  return (
    <Box sx={{ width: "90%", mx: "auto", p: 2, mt: 5, mb: 15 }}>
      {/* Form Title & back button */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton onClick={() => navigate("/settings/user/1/security")}>
          <ArrowBackIosIcon
            sx={{
              color: "primary.main",
              fontSize: 32,
              ":hover": {
                color: "text.secondary",
                cursor: "pointer",
              },
            }}
          />
        </IconButton>

        <Typography variant="h5" sx={{ fontWeight: 600, mx: "auto" }}>
          Email
        </Typography>
      </Box>

      {/* application form */}

      <Box
        component={"form"}
        onSubmit={handleSubmit(changeEmailHandler)}
        sx={{
          width: { xs: "100%", md: "60%", lg: "40%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mx: "auto",
          alignItems: "center",
          gap: 2,
          mb: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
            mt: 3,
          }}
        >
          <Typography
            component="label"
            htmlFor="currentEmail"
            sx={{
              fontWeight: 300,
            }}
          >
            Current Email
            <span style={{ color: "#ef4444" }}>*</span>
          </Typography>
          <TextField
            {...register("currentEmail", {
              required: true,
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email",
              },
            })}
            id="currentEmail"
            variant="outlined"
            fullWidth
            placeholder="Please enter your current email"
            error={!!errors.currentEmail}
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
          />
          {errors.currentEmail && (
            <FormHelperText error>{errors.currentEmail.message}</FormHelperText>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
          }}
        >
          <Typography
            component="label"
            htmlFor="newEmail"
            sx={{
              fontWeight: 300,
            }}
          >
            New Email
            <span style={{ color: "#ef4444" }}>*</span>
          </Typography>
          <TextField
            {...register("newEmail", {
              required: "New Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email",
              },
            })}
            id="newEmail"
            variant="outlined"
            fullWidth
            placeholder="Please enter your new email"
            error={!!errors.newEmail}
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
          />
          {errors.newEmail && (
            <FormHelperText error>{errors.newEmail.message}</FormHelperText>
          )}
          <Typography
            variant="caption"
            sx={{ fontWeight: 400, color: "primary.light" }}
          >
            new email must be different from the current one
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
          }}
        >
          <Typography
            component="label"
            htmlFor="confirmNewEmail"
            sx={{
              fontWeight: 300,
            }}
          >
            Confirm New Email
            <span style={{ color: "#ef4444" }}>*</span> {/* Red asterisk */}
          </Typography>
          <TextField
            {...register("confirmNewEmail", {
              required: "Confirmation Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email",
              },
              validate: (val: string) => {
                if (val != newEmail) {
                  return "Emails do not match";
                }
              },
            })}
            id="confirmNewEmail"
            variant="outlined"
            fullWidth
            placeholder="Please confirm your new email"
            error={!!errors.confirmNewEmail}
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
          />
          {errors.confirmNewEmail && (
            <FormHelperText error>
              {errors.confirmNewEmail.message}
            </FormHelperText>
          )}
        </Box>

        <Button
          loading={changeEmailMutation.isPending}
          type="submit"
          variant="contained"
          sx={{
            width: "100%",
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
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ChangeEmail;
