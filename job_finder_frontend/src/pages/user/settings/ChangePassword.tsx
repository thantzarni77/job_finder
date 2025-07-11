import { Box, Button, TextField, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router";

const ChangePassword = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "90%", mx: "auto", p: 2, mt: 5, mb: 10 }}>
      {/* Form Title & back button */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ArrowBackIosIcon
          onClick={() => navigate("/settings/user/1/security")}
          sx={{
            color: "primary.main",
            fontSize: 32,
            ":hover": {
              color: "secondary.main",
              cursor: "pointer",
            },
          }}
        />
        <Typography variant="h5" sx={{ fontWeight: 600, mx: "auto" }}>
          Password
        </Typography>
      </Box>

      {/* application form */}
      <Box
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
            htmlFor="currentPassword"
            sx={{
              fontWeight: 300,
            }}
          >
            Current Password
            <span style={{ color: "#ef4444" }}>*</span>
          </Typography>
          <TextField
            id="currentPassword"
            variant="outlined"
            fullWidth
            placeholder="Please enter your current password"
            sx={{
              // root of the OutlinedInput
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#ffffff",
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
            htmlFor="newPassword"
            sx={{
              fontWeight: 300,
            }}
          >
            New Password
            <span style={{ color: "#ef4444" }}>*</span>
          </Typography>
          <TextField
            id="newPassword"
            variant="outlined"
            fullWidth
            placeholder="Please enter your new password"
            sx={{
              // root of the OutlinedInput
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#ffffff",
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
          <Typography
            variant="caption"
            sx={{ fontWeight: 400, color: "primary.light" }}
          >
            new password must be different from the current one
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
            htmlFor="confirmNewPassword"
            sx={{
              fontWeight: 300,
            }}
          >
            Confirm New Password
            <span style={{ color: "#ef4444" }}>*</span> {/* Red asterisk */}
          </Typography>
          <TextField
            id="confirmNewPassword"
            variant="outlined"
            fullWidth
            placeholder="Please confirm your new password"
            sx={{
              // root of the OutlinedInput
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#ffffff",
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
        </Box>

        <Button
          onClick={() => navigate("/settings/user/1/security")}
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

export default ChangePassword;
