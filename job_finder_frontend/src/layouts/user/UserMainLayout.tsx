import { Alert, Box, Typography } from "@mui/material";
import Header from "../../components/user/Header";
import { Link, Outlet } from "react-router";
import AppDrawer from "../../components/user/AppDrawer";
import ScrollToTop from "../../helper/ScrollToTop";
import Footer from "../../components/user/Footer";
import { useUserStore } from "../../store/UserStore";
import { useProfileStore } from "../../store/ProfileStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  getEmployerProfile,
  getSeekerProfile,
} from "../../helper/profileApiFunctions";
import { getSingleUserData } from "../../helper/userApiFunctions";
import { useUserDataStore } from "../../store/UserDataStore";

export default function UserMainLayout() {
  const user = useUserStore((state) => state.user);
  const setUserData = useUserDataStore((state) => state.setUserData);
  const seekerData = useProfileStore((state) => state.seekerProfile);
  const setSeekerProfile = useProfileStore((state) => state.setSeekerProfile);
  const employerData = useProfileStore((state) => state.employerProfile);
  const setEmployerProfile = useProfileStore(
    (state) => state.setEmployerProfile,
  );

  const employerProfileQuery = useQuery({
    enabled: user?.user_type == "employer" && !employerData.id,
    queryKey: ["employerProfile", user?.user_id],
    queryFn: () => {
      return getEmployerProfile(user?.user_id);
    },
  });

  useEffect(() => {
    if (employerProfileQuery.data && employerProfileQuery.isSuccess) {
      setEmployerProfile(employerProfileQuery.data.data.data[0]);
    }
  }, [
    employerProfileQuery.data,
    employerProfileQuery.isSuccess,
    setEmployerProfile,
  ]);

  const seekerProfileQuery = useQuery({
    enabled: user?.user_type == "seeker" && !seekerData.id,
    queryKey: ["seekerProfile", user?.user_id],
    queryFn: () => {
      return getSeekerProfile(user?.user_id);
    },
  });

  useEffect(() => {
    if (seekerProfileQuery.data && seekerProfileQuery.isSuccess) {
      setSeekerProfile(seekerProfileQuery.data.data.data[0]);
    }
  }, [seekerProfileQuery.data, seekerProfileQuery.isSuccess, setSeekerProfile]);

  const userDataQuery = useQuery({
    queryKey: ["userSingleData", user?.user_id],
    queryFn: getSingleUserData,
  });

  useEffect(() => {
    if (userDataQuery.data && userDataQuery.isSuccess) {
      setUserData(userDataQuery.data.data);
    }
  }, [userDataQuery.data, userDataQuery.isSuccess, setUserData]);

  return (
    <Box sx={{ bgcolor: "backgroud.default" }}>
      <ScrollToTop />
      <Header
        isLoading={
          seekerProfileQuery.isFetching ||
          employerProfileQuery.isFetching ||
          userDataQuery.isFetching
        }
      />
      {user?.user_type == "employer" &&
        employerData.verification == "pending" && (
          <Alert variant="filled" severity="info" id="verification">
            <Typography variant="body1">
              You will only have limited access until we finished verifying your
              account.
            </Typography>
          </Alert>
        )}
      {user?.user_type == "employer" &&
        employerData.verification == "rejected" && (
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
