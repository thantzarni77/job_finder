import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { useNavigate } from "react-router";
import AdminJobCard from "../../components/admin/AdminJobCard";
import { useJobStore } from "../../store/JobStore";
import { useQuery } from "@tanstack/react-query";
import { getAllJobs } from "../../helper/postJob";
import { useEffect } from "react";
import FullScreenLoader from "../../components/FullScreenLoader";

const VerifiedJobs = () => {
  const navigate = useNavigate();

  const allJobs = useJobStore((state) => state.jobs);
  const setJobs = useJobStore((state) => state.setJobs);

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
        message="Getting jobs data"
      />
    );
  }
  return (
    <Box sx={{ width: "94%", mx: 6 }}>
      {/* back arrow and top part */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIosIcon
              sx={{
                color: "primary.main",
                fontSize: 32,
                ":hover": {
                  color: "text.primary",
                  cursor: "pointer",
                },
              }}
            />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Verified Jobs
          </Typography>
        </Box>
      </Box>
      <Box>
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
            {allJobs
              .filter((job) => job.posting_status == "approved")
              .map((single) => {
                return <AdminJobCard key={single.id} job={single} />;
              })}
            {allJobs.filter((job) => job.posting_status == "approved").length ==
              0 && <Typography>No Verified Job</Typography>}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VerifiedJobs;
