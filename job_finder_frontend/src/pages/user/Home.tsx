import HomeCarousel from "../../components/user/HomeCarousel";
import {
  Box,
  Button,
  Typography,
  Stack,
  Pagination,
  Container,
} from "@mui/material";
import Kpay from "../../assets/kpay.png";
import WaveMoney from "../../assets/wavemoney.png";
import Meta from "../../assets/meta.png";
import AyaBank from "../../assets/ayabank.jpeg";
import Xiaomi from "../../assets/Xiaomi.png";
import { useNavigate } from "react-router";
import {
  useJobCategoryFilter,
  useJobRoleFilter,
  useJobSalaryFilter,
  useJobStore,
  useJobTypeFilter,
  type Job,
} from "../../store/JobStore";
import JobCard from "../../components/user/jobs/JobCard";
import { useQuery } from "@tanstack/react-query";
import { getAllJobPosts } from "../../helper/postJob";
import { useState, type ChangeEvent } from "react";

export default function Home() {
  const navigate = useNavigate();
  const allJobs = useJobStore((state) => state.jobs);
  const setJobs = useJobStore((state) => state.setJobs);

  // const { selectedJobRole } = useJobRoleFilter();
  // const { selectedJobType } = useJobTypeFilter();
  // const { selectedJobCategory } = useJobCategoryFilter();
  // const { selectedSalary } = useJobSalaryFilter();
  // const [page, setPage] = useState(1);

  // const { data: jobs, isPending: isJobsPending } = useQuery({
  //   queryKey: [
  //     "jobPosts",
  //     selectedJobRole,
  //     selectedJobType,
  //     selectedJobCategory,
  //     selectedSalary,
  //     page,
  //   ],
  //   queryFn: () =>
  //     getAllJobPosts(
  //       selectedJobRole,
  //       selectedJobType,
  //       selectedJobCategory,
  //       selectedSalary,
  //       page,
  //     ),
  // });

  // to handle paginated pages
  // const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
  //   setPage(value);
  // };

  // useEffect(() => {
  //   if (allJobsQuery.data && allJobsQuery.isSuccess) {
  //     setJobs(allJobsQuery.data);
  //   }
  // }, [
  //   allJobsQuery.data,
  //   allJobsQuery.isSuccess,
  //   setJobs,
  //   allJobs,
  //   selectedJobRole,
  //   selectedJobType,
  // ]);
  // if (isJobsPending) {
  //   return;
  // }

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
          Recommeded Jobs For You
        </Typography>

        {/* <Box className="flex flex-wrap items-center gap-3 md:justify-center">
          {allJobs.map((single) => {
            if (single.id < 10) {
              return <JobCard key={single.id} job={single} />;
            }
          })}
        </Box> */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 10 }}>
          {/* <Stack>
            <Pagination
              count={jobs.last_page}
              page={jobs.current_page ?? 1}
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
          </Stack> */}
        </Box>

        <Typography sx={{ textAlign: "center", mb: 3, fontWeight: 600 }}>
          Top Employers
        </Typography>
        <Box className="lg-grid-cols-5 grid grid-cols-2 place-items-center gap-3 md:grid-cols-5">
          <img src={Kpay} alt="" style={{ width: "100px", height: "auto" }} />
          <img
            src={WaveMoney}
            alt=""
            style={{ width: "100px", height: "auto", borderRadius: "15px" }}
          />
          <img
            src={Meta}
            alt=""
            style={{ width: "100px", height: "auto", borderRadius: "15px" }}
          />
          <img
            src={AyaBank}
            alt=""
            style={{ width: "100px", height: "auto", borderRadius: "15px" }}
          />
          <img
            src={Xiaomi}
            alt=""
            style={{ width: "100px", height: "auto", borderRadius: "15px" }}
          />
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
              count={5}
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
