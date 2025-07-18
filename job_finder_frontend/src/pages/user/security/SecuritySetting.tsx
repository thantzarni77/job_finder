import { Box, Container, Typography } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import Email from "./Email";
import Password from "./Password";
import { useNavigate } from "react-router";

const SecuritySetting = () => {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        mx: "auto",
        p: 2,
        mt: 5,
        mb: 15,
        width: "100%",
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
        <ArrowBackIosNewOutlinedIcon
          onClick={() => navigate("/settings/user/1/")}
          sx={{
            fontSize: "30px",
            color: "primary.main",
            ":hover": { cursor: "pointer" },
          }}
        />
        <Typography variant="h5" sx={{ fontWeight: 600, mx: "auto" }}>
          Security
        </Typography>
      </Box>
      <Box
        sx={{
          my: 4,
          width: { xs: "90%", md: "70%" },
        }}
      >
        <Email />
        <Password />
      </Box>
    </Container>
  );
};

export default SecuritySetting;
