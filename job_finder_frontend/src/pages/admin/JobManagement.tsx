import {
  Box,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AdminJobCard from "../../components/admin/AdminJobCard";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getAllJobs } from "../../helper/postJob";
import { useJobStore } from "../../store/JobStore";
import { useEffect, useState, useMemo } from "react";
import { format } from "date-fns";
import FullScreenLoader from "../../components/FullScreenLoader";

const JobManagement = () => {
  const navigate = useNavigate();

  const allJobs = useJobStore((state) => state.jobs);
  const setJobs = useJobStore((state) => state.setJobs);

  // Create state for the search query and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const allJobsQuery = useQuery({
    // enabled: allJobs.length === 0,
    queryKey: ["pureJobPosts"],
    queryFn: getAllJobs,
    placeholderData: (previousData) => previousData || { data: allJobs },
  });

  useEffect(() => {
    if (allJobsQuery.data && allJobsQuery.isSuccess) {
      setJobs(allJobsQuery.data.data);
    }
  }, [allJobsQuery.data, allJobsQuery.isSuccess, setJobs]);

  // a memoized list of filtered jobs
  const filteredJobs = useMemo(() => {
    if (!searchQuery) {
      return allJobs;
    }
    return allJobs.filter((job) => {
      // Make search case-insensitive
      const query = searchQuery.toLowerCase();
      // Check against job title, company, or any other field

      return (
        job.job_title.toLowerCase().includes(query) ||
        job.employer.company_name?.toLowerCase().includes(query) ||
        job.job_code?.toLowerCase().includes(query)
      );
    });
  }, [allJobs, searchQuery]);

  const paginatedJobs = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredJobs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredJobs, page, itemsPerPage]);

  const pageCount = useMemo(() => {
    return Math.ceil(filteredJobs.length / itemsPerPage);
  }, [filteredJobs, itemsPerPage]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  if (allJobsQuery.isFetching) {
    return (
      <FullScreenLoader
        open={allJobsQuery.isFetching}
        message="Getting jobs data"
      />
    );
  }

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Job Management
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 400, mb: 2 }}>
        {format(new Date(), "dd MMM yyyy")}
      </Typography>
      {/* jobs */}
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "75%",
            flexWrap: "wrap",
            gap: 5,
          }}
        >
          <Box
            onClick={() => navigate("/admin/jobs/manage/pending")}
            sx={{
              backgroundColor: "background.paper",
              width: "200px",
              p: 3,
              height: "fit-content",
              borderRadius: "15px",
              ":hover": {
                cursor: "pointer",
                bgcolor: "background.hover",
              },
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "primary.main" }}
            >
              Pending Jobs
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {allJobs.filter((job) => job.posting_status == "pending").length}
            </Typography>
          </Box>
          <Box
            onClick={() => navigate("/admin/jobs/manage/verified")}
            sx={{
              backgroundColor: "background.paper",
              width: "200px",
              p: 3,
              height: "fit-content",
              borderRadius: "15px",
              ":hover": {
                cursor: "pointer",
                bgcolor: "background.hover",
              },
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "success.main" }}
            >
              Verified Jobs
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {allJobs.filter((job) => job.posting_status == "approved").length}
            </Typography>
          </Box>
          <Box
            onClick={() => navigate("/admin/jobs/manage/rejected")}
            sx={{
              backgroundColor: "background.paper",
              width: "200px",
              p: 3,
              height: "fit-content",
              borderRadius: "15px",
              ":hover": {
                cursor: "pointer",
                bgcolor: "background.hover",
              },
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "error.main" }}
            >
              Rejected Jobs
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {allJobs.filter((job) => job.posting_status == "rejected").length}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* search job */}
      <Box sx={{ my: 3 }}>
        {/* --- Search and Filter Section --- */}
        <Stack direction="row" alignItems="center" spacing={4}>
          {/* Connect the TextField to state */}
          <TextField
            placeholder={"Search by job title, company..."}
            size="small"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            InputProps={{
              // Changed from slotProps
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: "primary.main" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: "300px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "background.paper",
              },
              "& fieldset": {
                borderColor: "primary.main",
              },
            }}
          />
          {/* Filter Button */}
          {/* <Button
            variant="outlined"
            endIcon={<FilterListIcon />}
            sx={{
              textTransform: "none",
              borderColor: "primary.main",
              color: "primary.main",
              borderRadius: "8px",
              bgcolor: "background.paper",
            }}
          >
            Filter
          </Button> */}
        </Stack>

        {/* --- jobs --- */}
        <Box sx={{ mt: 4 }}>
          <Box
            sx={{
              width: "80%",
              display: "flex",
              alignItems: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            {/* Render the paginated & filtered jobs */}
            {paginatedJobs.map((job) => {
              return <AdminJobCard key={job.id} job={job} />;
            })}
          </Box>
        </Box>
      </Box>
      <Stack>
        {/*  Make Pagination dynamic */}
        {pageCount > 1 && (
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            shape="rounded"
            variant="outlined"
            color="primary"
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
              mb: 2,
              "& .MuiPaginationItem-root": {
                color: "#5f6caf",
                borderColor: "#5f6caf",
              },
            }}
          />
        )}
      </Stack>
    </Box>
  );
};

export default JobManagement;
