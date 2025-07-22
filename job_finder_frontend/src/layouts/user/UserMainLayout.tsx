import { Alert, Box, Typography } from "@mui/material";
import Header from "../../components/user/Header";
import { Link, Outlet } from "react-router";
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
      {user && employerData.verification == "rejected" && (
        <Alert variant="filled" severity="error" id="verification">
          <Typography variant="body1">
            Your account didn't pass our verification. Click{" "}
            <Link to={""}>
              <span style={{ textDecoration: "underline" }}>here </span>
            </Link>
            to contact to administrator
          </Typography>
        </Alert>
      )}
      <AppDrawer />
      <Outlet />
      <Footer />
    </Box>
  );
}
