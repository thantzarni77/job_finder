import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router";

const ChangeEmail = () => {
  const navigate = useNavigate();
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
                color: "secondary.main",
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
            id="currentEmail"
            variant="outlined"
            fullWidth
            placeholder="Please enter your current email"
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
            htmlFor="newEmail"
            sx={{
              fontWeight: 300,
            }}
          >
            New Email
            <span style={{ color: "#ef4444" }}>*</span>
          </Typography>
          <TextField
            id="newEmail"
            variant="outlined"
            fullWidth
            placeholder="Please enter your new email"
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
            id="confirmNewEmail"
            variant="outlined"
            fullWidth
            placeholder="Please confirm your new email"
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

export default ChangeEmail;
