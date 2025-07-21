import { Alert, Box, Typography } from "@mui/material";
import Header from "../../components/user/Header";
import { Outlet } from "react-router";
import AppDrawer from "../../components/user/AppDrawer";
import ScrollToTop from "../../helper/ScrollToTop";
import Footer from "../../components/user/Footer";
import { useUserStore } from "../../store/UserStore";
import { useProfileStore } from "../../store/ProfileStore";

export default function UserMainLayout() {
  const user = useUserStore((state) => state.user);
  const employerData = useProfileStore((state) => state.employerProfile);

  return (
    <Box sx={{ bgcolor: "backgroud.default" }}>
      <ScrollToTop />
      <Header />
      {user && employerData.verification == "pending" && (
        <Alert variant="filled" severity="info" id="verification">
          <Typography variant="body1">
            You will only have limited access until we finished verifying your
            account.
          </Typography>
        </Alert>
      )}
      <AppDrawer />
      <Outlet />
      <Footer />
    </Box>
  );
}
