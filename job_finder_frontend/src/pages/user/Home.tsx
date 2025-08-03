import HomeCarousel from "../../components/user/HomeCarousel";
import {
  Box,
  Button,
  Typography,
  Stack,
  Pagination,
  Container,
} from "@mui/material";

import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getAllJobs } from "../../helper/postJob";
import { useEffect, useState, type ChangeEvent } from "react";
import { useJobStore } from "../../store/JobStore";
import JobCard from "../../components/user/jobs/JobCard";
import { getAdminEmployers } from "../../helper/employerApiFunctions";
import FullScreenLoader from "../../components/FullScreenLoader";
import CompanyCard from "../../components/employer/CompanyCard";
import type { Employer } from "../../store/CompanyStore";

export default function Home() {
  const navigate = useNavigate();
  const allJobs = useJobStore((state) => state.jobs);
  const setJobs = useJobStore((state) => state.setJobs);

  const jobsToDisplay = allJobs.slice(0, 10);

  const [currentPage, setCurrentPage] = useState(1);
  const JOBS_PER_PAGE = 3;

  const pageCount = Math.ceil(jobsToDisplay.length / JOBS_PER_PAGE);

  const indexOfLastJob = currentPage * JOBS_PER_PAGE;
  const indexOfFirstJob = indexOfLastJob - JOBS_PER_PAGE;
  const currentJobs = jobsToDisplay.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const [page, setPage] = useState(1);
  const { data: employers, isPending: isEmployersPending } = useQuery({
    queryKey: ["adminEmployers", page],
    queryFn: () => getAdminEmployers(page),
  });

  const allJobsQuery = useQuery({
    queryKey: ["pureJobPosts"],
    queryFn: getAllJobs,
    placeholderData: (previousData) => previousData || { data: allJobs },
  });

  useEffect(() => {
    if (allJobsQuery.data && allJobsQuery.isSuccess) {
      setJobs(allJobsQuery.data.data);
    }
  }, [allJobsQuery.data, allJobsQuery.isSuccess, setJobs]);

  // to handle paginated pages
  const handlePageChangeEmployer = (
    _event: ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  if (allJobsQuery.isFetching) {
    return (
      <FullScreenLoader
        open={allJobsQuery.isFetching}
        message="Getting Jobs."
      />
    );
  }

  if (isEmployersPending) {
    return <FullScreenLoader open={true} message={"Loading"} />;
  }

  return (
    <Box>
      <HomeCarousel />
      <Container>
        <Typography
          sx={{
            fontSize: { xs: "18px", md: "30px" },
            fontWeight: 600,
            textAlign: "center",
            my: 3,
          }}
        >
          Find Your Dream Job Or Top Talent - All In One Place
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mb: 5 }}>
          <Button
            onClick={() => navigate("/jobs")}
            variant="contained"
            sx={{
              boxShadow: "none",
              width: { xs: "170px", sm: "200px", md: "250px" },
              height: { xs: "30px", sm: "40px", md: "45px" },
              borderRadius: "8px",
              p: 1,
              textTransform: "none",
              ":hover": {
                boxShadow: "none",
              },
            }}
          >
            Search Jobs
          </Button>
          <Button
            onClick={() => navigate("/talents")}
            variant="outlined"
            sx={{
              boxShadow: "none",
              width: { xs: "170px", sm: "200px", md: "250px" },
              height: { xs: "30px", sm: "40px", md: "45px" },
              borderRadius: "8px",
              p: 1,
              textTransform: "none",
              ":hover": {
                boxShadow: "none",
              },
            }}
          >
            Find Talent
          </Button>
        </Box>

        <Typography
          variant="h6"
          sx={{ mb: 2, textAlign: "center", fontWeight: 600 }}
        >
          Recommended Jobs For You
        </Typography>

        <Box className="flex flex-wrap items-start gap-3 md:justify-center">
          {currentJobs.map((single) => {
            if (single.posting_status == "approved") {
              return <JobCard key={single.id} job={single} />;
            }
          })}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 10 }}>
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

        <Typography sx={{ textAlign: "center", mb: 3, fontWeight: 600 }}>
          Top Employers
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 4,
          }}
        >
          {employers.data.map((employer: Employer) => {
            if (employer.company_name) {
              if (employer.verification == "verified") {
                return <CompanyCard key={employer.id} company={employer} />;
              }
            }
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
            <Pagination
              count={employers.meta.last_page}
              page={employers.meta.current_page}
              onChange={handlePageChangeEmployer}
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
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
