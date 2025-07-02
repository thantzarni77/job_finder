import { Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import CustomKey from "../../../components/custom_svg/CustomKey";

const Password = () => {
  const navigate = useNavigate();
  return (
    <Container
      onClick={() => navigate("/settings/user/1/security")}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        width: "100%",
        height: "fit-content",
        bgcolor: "#ffffff",
        borderRadius: "20px",
        my: 2,
        p: 2,
        ":hover": {
          bgcolor: "#eeeeee",
          cursor: "pointer",
        },
      }}
    >
      <Box sx={{ mt: 1, mr: 2, color: "primary.main" }}>
        <CustomKey />
      </Box>
      <Box>
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, color: "secondary.main" }}
        >
          Password
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, color: "secondary.main" }}
        >
          Manage your password
        </Typography>
      </Box>
    </Container>
  );
};

export default Password;
