import { Box, Container, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router";

const Security = () => {
  const navigate = useNavigate();
  return (
    <Container
      onClick={() => navigate("/settings/user/1/security")}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        width: "100%",
        height: "fit-content",
        bgcolor: "background.paper",
        borderRadius: "20px",
        my: 2,
        p: 2,
        ":hover": {
          bgcolor: "background.hover",
          cursor: "pointer",
        },
      }}
    >
      <LockOutlinedIcon sx={{ mt: 1, mr: 2, color: "primary.main" }} />
      <Box>
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, color: "text.secondary" }}
        >
          Security
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, color: "text.secondary" }}
        >
          Manage your profile
        </Typography>
      </Box>
    </Container>
  );
};

export default Security;
