import { Avatar, Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useProfileStore } from "../../store/ProfileStore";
import { useParams } from "react-router";
import { getEmployerProfile } from "../../helper/profileApiFunctions";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../store/UserStore";
import { getSingleUserData } from "../../helper/userApiFunctions";
import { useUserDataStore } from "../../store/UserDataStore";
import FullScreenLoader from "../../components/FullScreenLoader";

export default function EmployerProfile() {
  const { id } = useParams();
  const user_id = Number(id);

  const user = useUserStore((state) => state.user);

  const userData = useUserDataStore((state) => state.userData);
  const setUserData = useUserDataStore((state) => state.setUserData);

  const employerData = useProfileStore((state) => state.employerProfile);
  const setEmployerProfile = useProfileStore(
    (state) => state.setEmployerProfile,
  );

  const employerProfileQuery = useQuery({
    queryKey: ["employerProfile", user_id],
    queryFn: () => {
      return getEmployerProfile(user_id);
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

  const userDataQuery = useQuery({
    enabled: !employerData.company_name,
    queryKey: ["userSingleData", user?.user_id],
    queryFn: getSingleUserData,
  });

  useEffect(() => {
    if (userDataQuery.data && userDataQuery.isSuccess) {
      setUserData(userDataQuery.data.data);
    }
  }, [userDataQuery.data, userDataQuery.isSuccess, setUserData]);

  if (employerProfileQuery.isLoading || userDataQuery.isLoading) {
    return (
      <FullScreenLoader
        open={employerProfileQuery.isLoading}
        message="Loading..."
      />
    );
  }
  return (
    <>
      <Box sx={{ pt: 3, pb: 5, mb: 2, width: "90%", mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            mt: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {!employerData.company_image && (
              <Avatar
                sx={{ width: { xs: 50, md: 80 }, height: { xs: 50, md: 80 } }}
              />
            )}

            {employerData.company_image && (
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/${employerData.company_image}`}
                alt="employerProfile"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
              />
            )}
            <Box>
              <Typography sx={{ fontWeight: 600 }}>
                {employerData.company_name
                  ? employerData.company_name
                  : user?.user_name}
              </Typography>
              <Typography variant="body2" sx={{ color: "primary.light" }}>
                {employerData.company_type}
              </Typography>
            </Box>
          </Box>
        </Box>
        {employerData.company_description && (
          <Box sx={{ mt: 4 }}>
            <Typography sx={{ fontWeight: 600 }}>Description</Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
              {employerData.company_description}
            </Typography>
          </Box>
        )}
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 600 }}>Address</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <LocationOnIcon color="primary" />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {employerData.company_address
                ? employerData.company_address
                : userData.address}
            </Typography>
          </Box>
        </Box>
        {employerData.company_type && (
          <Box sx={{ mt: 4 }}>
            <Typography sx={{ fontWeight: 600 }}>Company Type</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <AccountBalanceIcon color="primary" />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {employerData.company_type}
              </Typography>
            </Box>
          </Box>
        )}

        {/* <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 600 }}> Number of Employees</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <GroupsIcon color="primary" />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              1000+
            </Typography>
          </Box>
        </Box> */}

        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 600 }}>Contact Us</Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              mt: 1,
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmailOutlinedIcon color="primary" />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {employerData.company_email
                  ? employerData.company_email
                  : userData.email}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneInTalkIcon color="primary" />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {employerData.company_phone
                  ? employerData.company_phone
                  : userData.phone}
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 600 }}>Company Website</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <LanguageOutlinedIcon color="primary" />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              https://www.companywebsite.com
            </Typography>
          </Box>
        </Box> */}
      </Box>
    </>
  );
}
