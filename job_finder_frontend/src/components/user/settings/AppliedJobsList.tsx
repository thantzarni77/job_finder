import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import JobCard from "../jobs/JobCard";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useProfileStore } from "../../../store/ProfileStore";
import { getSeekerAppliedJobs } from "../../../helper/jobApiFunctions";
import { useEffect, useState } from "react";
import { useSeekerSavedJobs } from "../../../store/SavedJobStore";
import { useAppliedJobStore, type Job } from "../../../store/JobStore";
import { getAllJobs } from "../../../helper/postJob";

const AppliedJobsList = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const seekerData = useProfileStore((state) => state.seekerProfile);

  const setAppliedJobs = useAppliedJobStore((state) => state.setAppliedJobs);

  const [filterAppliedJobs, setFilterAppliedJobs] = useState<Job[]>([]);
  const setSeekerSavedJobs = useSeekerSavedJobs(
    (state) => state.setSeekerSavedJobs,
  );
  const allJobsQuery = useQuery({
    queryKey: ["pureJobPosts"],
    queryFn: getAllJobs,
  });

  const seekerAppliedJobsQuery = useQuery({
    queryKey: ["seekerAppliedJobs", seekerData.id],
    queryFn: getSeekerAppliedJobs,
  });

  useEffect(() => {
    if (seekerAppliedJobsQuery.data && seekerAppliedJobsQuery.isSuccess) {
      setAppliedJobs(seekerAppliedJobsQuery.data.data);
    }
  }, [
    seekerAppliedJobsQuery.data,
    seekerAppliedJobsQuery.isSuccess,
    setAppliedJobs,
  ]);

  useEffect(() => {
    const foundJobs: Job[] = [];
    if (seekerAppliedJobsQuery.data && seekerAppliedJobsQuery.isSuccess) {
      if (allJobsQuery.data) {
        for (const job of allJobsQuery.data.data) {
          for (const saved of seekerAppliedJobsQuery.data.data) {
            if (saved.post_job_id == job.id) {
              foundJobs.push(job);
            }
          }
        }
        setFilterAppliedJobs(foundJobs);
      }
      setAppliedJobs(seekerAppliedJobsQuery.data.data);
    }
  }, [
    seekerAppliedJobsQuery.data,
    seekerAppliedJobsQuery.isSuccess,
    setSeekerSavedJobs,
    allJobsQuery.data,
    setAppliedJobs,
  ]);

  return (
    <Box
      sx={{
        mx: "auto",
        p: 2,
        mt: 5,
        mb: 15,
        width: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton onClick={() => navigate(`/settings/user/${id}`)}>
          <ArrowBackIosIcon
            sx={{
              fontSize: "32px",
              color: "primary.main",
              ":hover": { cursor: "pointer" },
            }}
          />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 600, mx: "auto" }}>
          Your applied jobs
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          justifyContent: "center",
          flexWrap: "wrap",
          my: 4,
          width: { xs: "100%", md: "70%" },
        }}
      >
        {filterAppliedJobs.length == 0 && (
          <Typography variant="h5" sx={{ mt: 10 }}>
            You Have No Applied Jobs
          </Typography>
        )}
        {filterAppliedJobs.map((single) => {
          return <JobCard key={single.id} job={single} />;
        })}
      </Box>
    </Box>
  );
};

export default AppliedJobsList;
