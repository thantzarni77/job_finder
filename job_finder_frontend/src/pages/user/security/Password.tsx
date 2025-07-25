import { Box, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import CustomKey from "../../../components/custom_svg/CustomKey";

const Password = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  return (
    <Container
      onClick={() => navigate(`/settings/user/${id}/security/changePassword`)}
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
      <Box sx={{ mt: 1, mr: 2, color: "primary.main" }}>
        <CustomKey />
      </Box>
      <Box>
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, color: "text.secondary" }}
        >
          Password
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, color: "text.secondary" }}
        >
          Manage your password
        </Typography>
      </Box>
    </Container>
  );
};

export default Password;
