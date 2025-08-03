import { Box, Typography, Stack, Pagination, IconButton } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import JobCard from "../../../components/user/jobs/JobCard";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getEmployerProfile } from "../../../helper/profileApiFunctions";
import type { EmployerProfile } from "../../../store/ProfileStore";
import FullScreenLoader from "../../../components/FullScreenLoader";
import { useEffect, useState, type ChangeEvent } from "react";
import { useJobStore } from "../../../store/JobStore";
import { getAllJobs } from "../../../helper/postJob";

export default function CompanyDetail() {
  const { id } = useParams();
  const jobId = Number(id);
  const navigate = useNavigate();

  const userID = Number(id);
  const employerProfileQuery = useQuery({
    queryKey: ["employerProfile", userID],
    queryFn: () => {
      return getEmployerProfile(userID);
    },
  });

  const employerData: EmployerProfile = employerProfileQuery.data?.data.data[0];

  const allJobs = useJobStore((state) => state.jobs);
  const setJobs = useJobStore((state) => state.setJobs);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentJobs =
    allJobs &&
    employerData &&
    allJobs
      .filter((job) => job.employer_id == employerData.id)
      .slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const pageCount = Math.ceil(currentJobs?.length / ITEMS_PER_PAGE);

  const allJobsQuery = useQuery({
    enabled: allJobs.length == 0,
    queryKey: ["pureJobPosts"],
    queryFn: getAllJobs,
  });

  useEffect(() => {
    if (allJobsQuery.data && allJobsQuery.isSuccess) {
      setJobs(allJobsQuery.data.data);
    }
  }, [allJobsQuery.data, allJobsQuery.isSuccess, setJobs, allJobs]);

  if (allJobsQuery.isFetching) {
    return (
      <FullScreenLoader
        open={allJobsQuery.isFetching}
        message="Getting jobs data.."
      />
    );
  }

  if (employerProfileQuery.isFetching) {
    return (
      <FullScreenLoader
        open={employerProfileQuery.isFetching}
        message="Getting employer data.."
      />
    );
  }

  return (
    <>
      <Box sx={{ pt: 3, pb: 5, mb: 2, width: "90%", mx: "auto" }}>
        <IconButton onClick={() => navigate("/companies")}>
          <ArrowBackIosIcon
            sx={{
              color: "primary.main",
              fontSize: 32,
              ":hover": {
                color: "text.secondary",
                cursor: "pointer",
              },
            }}
          />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            mt: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}/${employerData.company_image}`}
              alt={"Employer Profile"}
              style={{
                width: "70px",
                height: "auto",
                backgroundSize: "cover",
                borderRadius: 3,
              }}
            />
            <Box>
              <Typography sx={{ fontWeight: 600 }}></Typography>
              <Typography variant="body2" sx={{ color: "primary.light" }}>
                {employerData.company_type}
              </Typography>
            </Box>
          </Box>
          {/* <Button
            variant="outlined"
            size="small"
            sx={{ backgroundColor: "background.paper", textTransform: "none" }}
          >
            + Follow
          </Button> */}
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 600 }}>Description</Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
            {employerData.company_description}
          </Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 600 }}>Address</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <LocationOnIcon color="primary" />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {employerData.company_address}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 600 }}>Company Type</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <AccountBalanceIcon color="primary" />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {employerData.company_type}
            </Typography>
          </Box>
        </Box>

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
                {employerData.company_email}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneInTalkIcon color="primary" />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {employerData.company_phone}
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
