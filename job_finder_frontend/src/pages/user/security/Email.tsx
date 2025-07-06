import { Box, Container, Typography } from "@mui/material";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { useNavigate } from "react-router";

const Email = () => {
  const navigate = useNavigate();
  return (
    <Container
      onClick={() => navigate("/settings/user/1/security/changeEmail")}
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
      <MailOutlineOutlinedIcon sx={{ mt: 1, mr: 2, color: "primary.main" }} />
      <Box>
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, color: "secondary.main" }}
        >
          Email
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, color: "secondary.main" }}
        >
          Manage your email
        </Typography>
      </Box>
    </Container>
  );
};

export default Email;
