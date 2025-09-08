import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import JobCard from "../jobs/JobCard";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useProfileStore } from "../../../store/ProfileStore";
import { getSeekerSavedJobs } from "../../../helper/jobApiFunctions";
import { useEffect, useState } from "react";
import { useSeekerSavedJobs } from "../../../store/SavedJobStore";
import { type Job } from "../../../store/JobStore";
import { getAllJobs } from "../../../helper/postJob";

const Bookmarks = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const seekerData = useProfileStore((state) => state.seekerProfile);
  const [isLoading, setIsLoading] = useState(false);

  const [filterSavedJos, setFilterSavedJobs] = useState<Job[]>([]);
  const setSeekerSavedJobs = useSeekerSavedJobs(
    (state) => state.setSeekerSavedJobs,
  );

  const allJobsQuery = useQuery({
    queryKey: ["pureJobPosts"],
    queryFn: getAllJobs,
  });

  const savedJobsQuery = useQuery({
    queryKey: ["savedJobs", seekerData.id],
    queryFn: getSeekerSavedJobs,
  });

  useEffect(() => {
    const foundJobs: Job[] = [];
    if (savedJobsQuery.data && savedJobsQuery.isSuccess) {
      if (allJobsQuery.data) {
        for (const job of allJobsQuery.data.data) {
          for (const saved of savedJobsQuery.data.data) {
            if (saved.post_job_id == job.id) {
              setIsLoading(true);
              foundJobs.push(job);
            }
          }
        }
        setFilterSavedJobs(foundJobs);
        setIsLoading(false);
      }
      setSeekerSavedJobs(savedJobsQuery.data.data);
    }
  }, [
    savedJobsQuery.data,
    savedJobsQuery.isSuccess,
    setSeekerSavedJobs,
    allJobsQuery.data,
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
          Bookmarks
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
        {isLoading && (
          <Typography variant="h5" sx={{ mt: 10 }}>
            Loading Data
          </Typography>
        )}
        {!allJobsQuery.isPending &&
          !savedJobsQuery.isPending &&
          !isLoading &&
          filterSavedJos.length == 0 && (
            <Typography variant="h5" sx={{ mt: 10 }}>
              You Have No Saved Jobs
            </Typography>
          )}
        {!isLoading &&
          filterSavedJos.map((single) => {
            return <JobCard key={single.id} job={single} />;
          })}
      </Box>
    </Box>
  );
};

export default Bookmarks;
