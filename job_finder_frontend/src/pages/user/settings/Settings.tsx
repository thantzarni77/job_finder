import { Box, Container, Typography } from "@mui/material";
import Security from "./Security";
import Bookmark from "./Bookmark";
import AppliedJobs from "./AppliedJobs";
import { useUserStore } from "../../../store/UserStore";

const Settings = () => {
  const user = useUserStore((state) => state.user);
  return (
    <Container
      sx={{
        mx: "auto",
        p: 2,
        mt: 5,
        mb: 15,
        width: { xs: "90%", md: "70%" },
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, textAlign: "center" }}>
        Settings
      </Typography>
      <Box sx={{ my: 4 }}>
        <Security />
        {user?.user_type == "seeker" && <Bookmark />}
        {user?.user_type == "seeker" && <AppliedJobs />}
      </Box>
    </Container>
  );
};

export default Settings;
