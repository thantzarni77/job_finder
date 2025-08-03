import {
  Box,
  Button,
  Pagination,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import JobFilter from "../../../components/user/jobs/JobFilter";
import JobCard from "../../../components/user/jobs/JobCard";
import { type ChangeEvent, useEffect } from "react";
import SearchBox from "../../../components/user/SearchBox";
import { useJobFilterStore } from "../../../store/Appstore";
import JobFilterDrawer from "../../../components/user/JobFilterDrawer";
import { useJobStore } from "../../../store/JobStore";
import { getAllJobPosts } from "../../../helper/postJob";
import { useQuery } from "@tanstack/react-query";
import {
  useJobRoleFilter,
  useJobTypeFilter,
  useJobCategoryFilter,
  useJobSalaryFilter,
} from "../../../store/JobStore";
import { getJobTypes, getRoles } from "../../../helper/postJob";
import FullScreenLoader from "../../../components/FullScreenLoader";
import {
  useCompanyPaginateStore,
  type Job,
  useSearchJobTitle,
} from "../../../store/JobStore";

const Jobs = () => {
  const allJobs = useJobStore((state) => state.jobs);
  const setJobs = useJobStore((state) => state.setJobs);

  const showJobFilterDrawer = useJobFilterStore(
    (state) => state.showJobFilterDrawer,
  );
  const setShowJobFilterDrawer = useJobFilterStore(
    (state) => state.setShowJobFilterDrawer,
  );

  const { selectedJobRole } = useJobRoleFilter();
  const { selectedJobType } = useJobTypeFilter();
  const { selectedJobCategory } = useJobCategoryFilter();
  const { selectedSalary } = useJobSalaryFilter();

  // for pagination
  const { page, setPage } = useCompanyPaginateStore();

  const jobTitle = useSearchJobTitle((state) => state.jobTitle);

  const { data: jobs, isPending: isJobsPending } = useQuery({
    queryKey: [
      "jobPosts",
      selectedJobRole,
      selectedJobType,
      selectedJobCategory,
      selectedSalary,
      page,
      jobTitle,
    ],
    queryFn: () =>
      getAllJobPosts(
        selectedJobRole,
        selectedJobType,
        selectedJobCategory,
        selectedSalary,
        page,
        jobTitle,
      ),
  });

  const { data: jobTypes, isFetching: isJobTypesPending } = useQuery({
    queryKey: ["jobTypes"],
    queryFn: getJobTypes,
  });

  const { data: roles, isFetching: isRolesPending } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  // to handle paginated pages
  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (jobs && !isJobsPending) {
      setJobs(jobs.data);
    }
  }, [jobs, isJobsPending, setJobs, allJobs, selectedJobRole, selectedJobType]);

  if (isJobsPending) {
    return <FullScreenLoader open={true} message={"Loading"} />;
  }

  return (
    <Box
      sx={{
        my: 3,
        p: { xs: 0, sm: 2, md: 2, lg: 4 },
        width: { xs: "100", sm: "100%", md: "95%" },
        mx: "auto",
      }}
    >
      {/* search input && filter button*/}
      <Box
        sx={{
          display: { xs: "flex", sm: "flex" },
          alignItems: "center",
          width: "95%",
          mx: "auto",
        }}
      >
        <SearchBox searchType={"Job"} />
        <Button
          variant="contained"
          onClick={() => setShowJobFilterDrawer(!showJobFilterDrawer)}
          sx={{
            mx: { xs: "auto", sm: "none" },
            display: { xs: "block", md: "none" },
            color: "primary.main",
            boxShadow: "none",
            p: "5px",
            my: 2,
            ":hover": {
              boxShadow: "none",
            },
          }}
        >
          <Typography
            sx={{
              display: { xs: "none", sm: "inline" },
              color: "white",
              mx: 1,
              textTransform: "none",
              boxShadow: "none",
              ":hover": {
                boxShadow: "none",
              },
            }}
          >
            Filter
          </Typography>
          <FilterListIcon sx={{ color: "white" }} />
        </Button>
      </Box>

      {/* job posts and filter */}
      <Box
        sx={{
          textAlign: "center",
          my: 3,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "start" },
          width: "100%",
          gap: 6,
        }}
      >
        {!isJobTypesPending && !isRolesPending && (
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <JobFilter filterType={"Job"} jobTypes={jobTypes} roles={roles} />
          </Box>
        )}
        {isJobTypesPending && isRolesPending && (
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Skeleton
              variant="rounded"
              width={"320px"}
              height={"500px"}
              sx={{ borderRadius: 2 }}
            />
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* job posts section header */}
          <Box
            sx={{
              width: { xs: "82%", sm: "90%", md: "90%" },
              display: "flex",
              alignItems: { xs: "center", md: "start" },
              justifyContent: { xs: "center", md: "space-between " },
              mb: 2,
            }}
          >
            <Typography variant="caption" sx={{ color: "primary.light" }}>
              {allJobs &&
                allJobs.filter((job) => job.posting_status == "approved")
                  .length}
              + jobs are found
            </Typography>
            {/* filter box */}
          </Box>
          {/* jobs */}
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: { xs: "100%", sm: "90%", md: "100%" },
                justifyContent: {
                  xs: "center",
                  sm: "center",
                  md: "center",
                },
                gap: { xs: 2, md: 4 },
                flexWrap: "wrap",
              }}
            >
              {isJobsPending && (
                <>
                  {[...Array(10)].map((_, index) => {
                    return (
                      <Skeleton
                        variant="rounded"
                        width={375}
                        height={150}
                        sx={{ borderRadius: "20px" }}
                        key={index}
                      />
                    );
                  })}
                </>
              )}

              {!isJobsPending &&
                allJobs.map((job: Job) => {
                  if (job.posting_status == "approved") {
                    return <JobCard key={job.id} job={job} />;
                  }
                })}
            </Box>
            {/* pagination */}
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 10 }}
            >
              <Stack>
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
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
      {!isJobTypesPending && !isRolesPending && (
        <JobFilterDrawer jobTypes={jobTypes} roles={roles} />
      )}
    </Box>
  );
};

export default Jobs;
