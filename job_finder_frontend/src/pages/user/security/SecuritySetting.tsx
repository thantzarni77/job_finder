import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Email from "./Email";
import Password from "./Password";
import { useNavigate } from "react-router";

const SecuritySetting = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        mx: "auto",
        p: 2,
        mt: 5,
        mb: 15,
        width: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton onClick={() => navigate("/settings/user/1/")}>
          <ArrowBackIosIcon
            sx={{
              fontSize: "32px",
              color: "primary.main",
              ":hover": { cursor: "pointer" },
            }}
          />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 600, mx: "auto" }}>
          Security
        </Typography>
      </Box>
      <Box
        sx={{
          my: 4,
          width: { xs: "100%", md: "70%" },
        }}
      >
        <Email />
        <Password />
      </Box>
    </Box>
  );
};

export default SecuritySetting;
