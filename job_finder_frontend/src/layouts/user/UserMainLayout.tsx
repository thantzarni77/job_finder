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
import FullScreenLoader from "../../components/FullScreenLoader";

export default function UserMainLayout() {
  const user = useUserStore((state) => state.user);

  const setUserData = useUserDataStore((state) => state.setUserData);

  const setSeekerProfile = useProfileStore((state) => state.setSeekerProfile);

  const setEmployerProfile = useProfileStore(
    (state) => state.setEmployerProfile,
  );

  const { data: employerData, isPending: isEmployerDataPending } = useQuery({
    enabled: user?.user_type == "employer",
    queryKey: ["employerProfile", user?.user_id],
    queryFn: () => {
      return getEmployerProfile(user?.user_id);
    },
  });

  const seekerProfileQuery = useQuery({
    enabled: user?.user_type == "seeker",
    queryKey: ["seekerProfile", user?.user_id],
    queryFn: () => {
      return getSeekerProfile(user?.user_id);
    },
  });

  const userDataQuery = useQuery({
    queryKey: ["userSingleData", user?.user_id],
    queryFn: getSingleUserData,
  });

  const seekerData = seekerProfileQuery.data?.data.data[0];
  const userData = userDataQuery.data?.data;

  useEffect(() => {
    if (!isEmployerDataPending && employerData) {
      setEmployerProfile(employerData?.data[0]);
    }
  }, [employerData, isEmployerDataPending]);

  useEffect(() => {
    if (seekerData) setSeekerProfile(seekerData);
  }, [seekerData, setSeekerProfile]);

  useEffect(() => {
    if (userData) setUserData(userData);
  }, [userData, setUserData]);

  return (
    <Box sx={{ bgcolor: "backgroud.default" }}>
      <ScrollToTop />
      <Header
        isLoading={
          seekerProfileQuery.isFetching ||
          isEmployerDataPending ||
          userDataQuery.isFetching
        }
        employerProfile={employerData?.data[0]}
        seekerProfile={seekerData}
        userData={userData}
      />
      {user?.user_type == "employer" &&
        employerData?.verification == "pending" && (
          <Alert variant="filled" severity="info" id="verification">
            <Typography variant="body1">
              You will only have limited access until we finished verifying your
              account.
            </Typography>
          </Alert>
        )}
      {user?.user_type == "employer" &&
        employerData?.verification == "rejected" && (
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
      {/* <AppDrawer /> */}
      <Box sx={{ minHeight: 500 }}>
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}
