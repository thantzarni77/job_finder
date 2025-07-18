import { Box, Container, Typography } from "@mui/material";
import Security from "./Security";
import Bookmark from "./Bookmark";
import Language from "./Language";

const Settings = () => {
  return (
    <Container
      sx={{ mx: "auto", p: 2, mt: 5, mb: 15, width: { xs: "90%", md: "70%" } }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, textAlign: "center" }}>
        Settings
      </Typography>
      <Box sx={{ my: 4 }}>
        <Security />
        <Bookmark />
        <Language />
      </Box>
    </Container>
  );
};

export default Settings;
