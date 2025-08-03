import {
  Avatar,
  Box,
  Button,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useProfileStore } from "../../store/ProfileStore";
import { useNavigate, useParams } from "react-router";
import { getEmployerProfile } from "../../helper/profileApiFunctions";
import { useEffect, useState, type ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../store/UserStore";
import { getSingleUserData } from "../../helper/userApiFunctions";
import { useUserDataStore } from "../../store/UserDataStore";
import FullScreenLoader from "../../components/FullScreenLoader";
import { useJobStore } from "../../store/JobStore";
import JobCard from "../../components/user/jobs/JobCard";
import { getAllJobs } from "../../helper/postJob";

export default function EmployerProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const user_id = Number(id);

  const user = useUserStore((state) => state.user);

  const userData = useUserDataStore((state) => state.userData);
  const setUserData = useUserDataStore((state) => state.setUserData);

  const employerData = useProfileStore((state) => state.employerProfile);
  const setEmployerProfile = useProfileStore(
    (state) => state.setEmployerProfile,
  );

  console.log(employerData);

  const allJobs = useJobStore((state) => state.jobs);
  const setJobs = useJobStore((state) => state.setJobs);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentJobs = allJobs
    .filter((job) => job.employer_id == employerData.id)
    .slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const pageCount = Math.ceil(currentJobs?.length / ITEMS_PER_PAGE);

  const allJobsQuery = useQuery({
    queryKey: ["pureJobPosts"],
    queryFn: getAllJobs,
    placeholderData: (previousData) => previousData || { data: allJobs },
  });

  useEffect(() => {
    if (allJobsQuery.data && allJobsQuery.isSuccess) {
      setJobs(allJobsQuery.data.data);
    }
  }, [allJobsQuery.data, allJobsQuery.isSuccess, setJobs, allJobs]);

  const { data: employerProfileQuery, isPending } = useQuery({
    queryKey: ["employerProfile", user_id],
    queryFn: () => getEmployerProfile(user_id),
  });
  if (!isPending) {
    console.log(employerProfileQuery);
  }

  useEffect(() => {
    if (employerProfileQuery && !isPending) {
      setEmployerProfile(employerProfileQuery.data[0]);
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {!employerData.company_image && !userData.profile_picture && (
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
            {userData.profile_picture && (
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/${userData.profile_picture}`}
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
                  : userData.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "primary.light" }}>
                {employerData.company_type}
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", gap: 2, flexDirection: "column", mx: 2 }}
            >
              <Button
                disabled={
                  employerData.verification == "pending" ||
                  employerData.verification == "rejected"
                }
                variant="outlined"
                sx={{
                  width: { xs: "20px", sm: " 150px", md: "150px" },
                  height: "30px",
                }}
                onClick={() => navigate(`/employer-profile/${user_id}/edit`)}
              >
                <EditIcon sx={{ fontSize: "20px" }} />
                <Typography
                  variant="subtitle2"
                  sx={{
                    mx: 1,
                    textTransform: "none",
                    display: {
                      xs: "none",
                      sm: "inline-flex",
                      md: "inline-flex",
                    },
                  }}
                >
                  Edit Profile
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
        {employerData.company_name && (
          <Box sx={{ mt: 4 }}>
            <Typography sx={{ fontWeight: 600 }}>User Name</Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
              {userData.name}
            </Typography>
          </Box>
        )}
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

              {!employerData.company_address && !userData.address && "No Data"}
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
                {!employerData.company_phone && !userData.phone && "No Data"}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* employer posted jobs */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: 2,
            my: 5,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, mt: 1, mb: 3 }}>
            Open Vacancies
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "column", lg: "row" },
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: { xs: "center", lg: "start" },
              width: "100%",
              gap: 6,
            }}
          >
            {currentJobs.length == 0 && (
              <Typography variant="h6">No Job Posted Currently</Typography>
            )}
            {currentJobs.map((single) => {
              return <JobCard job={single} />;
            })}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 5,
              mb: 20,
            }}
          >
            <Stack>
              {pageCount > 1 && (
                <Pagination
                  count={pageCount}
                  page={currentPage}
                  onChange={handlePageChange}
                  shape="rounded"
                  variant="outlined"
                  color="primary"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "#5f6caf",
                      borderColor: "#5f6caf",
                    },
                  }}
                />
              )}
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}
