import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const JobApplyConfirm = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "80%",
        mx: "auto",
        my: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "primary.main", fontWeight: 700, width: "50%" }}
        >
          Thank you for applying. Your application for [Job Title] has been
          received. We’ll be in touch soon.
        </Typography>
        <Box sx={{ width: "30%" }}>
          <img src="/images/job_apply_confirm/job_apply_confirm.png" />
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 2,
          justifyContent: "center",
          my: 6,
        }}
      >
        <Button
          onClick={() => navigate("/")}
          sx={{
            width: "40%",
            boxShadow: "none",
            textTransform: "none",
            fontWeight: 400,
            border: 2,
            borderRadius: "8px",
            bgcolor: "#ffffff",
            p: 1,
            "&:hover": {
              boxShadow: "none",
            },
          }}
          variant="outlined"
        >
          Back to home
        </Button>
        <Button
          onClick={() => navigate("/jobs")}
          sx={{
            width: "40%",
            boxShadow: "none",
            textTransform: "none",
            fontWeight: 400,
            borderRadius: "8px",
            p: 1,
            "&:hover": {
              boxShadow: "none",
            },
          }}
          variant="contained"
        >
          Browse more jobs
        </Button>
      </Box>
    </Box>
  );
};

export default JobApplyConfirm;
