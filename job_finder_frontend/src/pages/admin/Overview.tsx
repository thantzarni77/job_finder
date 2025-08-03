import { Box, Typography } from "@mui/material";
import { useEffect } from "react";

import { useNavigate } from "react-router";
import { useJobStore } from "../../store/JobStore";
import { useQuery } from "@tanstack/react-query";
import { getAllJobs } from "../../helper/postJob";
import FullScreenLoader from "../../components/FullScreenLoader";
import { format } from "date-fns";
import { useUserDataStore } from "../../store/UserDataStore";
import { getAllUsers } from "../../helper/userApiFunctions";

const Overview = () => {
  const allJobs = useJobStore((state) => state.jobs);
  const setJobs = useJobStore((state) => state.setJobs);

  const allUsers = useUserDataStore((state) => state.allUsers);
  const setAllUsers = useUserDataStore((state) => state.setAllUsers);

  const allUsersQuery = useQuery({
    enabled: allUsers.length == 0,
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  useEffect(() => {
    if (allUsersQuery.data) {
      setAllUsers(allUsersQuery.data.data);
    }
  }, [allUsersQuery.data, setAllUsers]);

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

  const navigate = useNavigate();

  if (allJobsQuery.isFetching) {
    return (
      <FullScreenLoader
        open={allJobsQuery.isFetching}
        message="Getting jobs data"
      />
    );
  }

  if (allUsersQuery.isFetching) {
    return (
      <FullScreenLoader
        open={allUsersQuery.isFetching}
        message="Getting jobs data"
      />
    );
  }
  return (
    <Box
      sx={{
        // width: "70%",
        // mx: "20%",
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Overview
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 400, mb: 2 }}>
        {format(new Date(), "dd MMM yyyy")}
      </Typography>
      {/* jobs */}
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, my: 1 }}>
          Jobs
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "75%",
            // justifyContent: "space-between",
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
      {/* users */}
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, my: 2 }}>
          Users
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "75%",
            // justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 5,
          }}
        >
          <Box
            sx={{
              backgroundColor: "background.paper",
              width: "200px",
              p: 3,
              height: "fit-content",
              borderRadius: "15px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "primary.main" }}
            >
              Total Users
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {
                allUsers.filter(
                  (user) =>
                    user.user_type != "admin" && user.user_type != "superadmin",
                ).length
              }
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "background.paper",
              width: "200px",
              p: 3,
              height: "fit-content",
              borderRadius: "15px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "primary.main" }}
            >
              Employers
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {allUsers.filter((user) => user.user_type == "employer").length}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "background.paper",
              width: "200px",
              p: 3,
              height: "fit-content",
              borderRadius: "15px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "primary.main" }}
            >
              Seekers
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {allUsers.filter((user) => user.user_type == "seeker").length}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "background.paper",
              width: "200px",
              p: 3,
              height: "fit-content",
              borderRadius: "15px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "primary.main" }}
            >
              Pending
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {
                allUsers.filter(
                  (user) => user.employer?.verification == "pending",
                ).length
              }
            </Typography>
          </Box>
          {/* <Box
            sx={{
              backgroundColor: "background.paper",
              width: "200px",
              p: 3,
              height: "fit-content",
              borderRadius: "15px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "primary.main" }}
            >
              New Users
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              100
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "background.paper",
              width: "200px",
              p: 3,
              height: "fit-content",
              borderRadius: "15px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "error.main" }}
            >
              Suspended Users
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              20
            </Typography>
          </Box> */}
        </Box>
      </Box>
      {/* jobs and users */}
    </Box>
  );
};

export default Overview;
