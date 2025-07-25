import { Box, Container, Typography } from "@mui/material";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { useNavigate, useParams } from "react-router";

const Email = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <Container
      onClick={() => navigate(`/settings/user/${id}/security/changeEmail`)}
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
      <MailOutlineOutlinedIcon sx={{ mt: 1, mr: 2, color: "primary.main" }} />
      <Box>
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, color: "text.secondary" }}
        >
          Email
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, color: "text.secondary" }}
        >
          Manage your email
        </Typography>
      </Box>
    </Container>
  );
};

export default Email;
