import { Box, Container, Typography } from "@mui/material";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import { useNavigate } from "react-router";

const Language = () => {
  const navigate = useNavigate();
  return (
    <Container
      onClick={() => navigate("")}
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
      <TranslateOutlinedIcon sx={{ mt: 1, mr: 2, color: "primary.main" }} />
      <Box>
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, color: "secondary.main" }}
        >
          Language
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, color: "secondary.main" }}
        >
          Manage your language
        </Typography>
      </Box>
    </Container>
  );
};

export default Language;
