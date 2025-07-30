import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  Paper,
  Snackbar,
  SnackbarContent,
  Typography,
  type SnackbarCloseReason,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import VerifiedIcon from "@mui/icons-material/Verified";
import { NavLink } from "react-router";
import { format } from "date-fns";
import type { Job } from "../../../store/JobStore";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useProfileStore } from "../../../store/ProfileStore";
import {
  doSaveJob,
  isSaved,
  undoSaveJob,
} from "../../../helper/jobApiFunctions";
import { useUserStore } from "../../../store/UserStore";
import { getIndividualDataForJob } from "../../../helper/userApiFunctions";
import type { IndividualJob } from "../../../store/UserDataStore";

const JobCard = ({ job }: { job: Job }) => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  const seekerData = useProfileStore((state) => state.seekerProfile);

  // const employerDataQuery = useQuery({
  //   enabled: job.employer_id != 0,
  //   queryKey: ["employerDetail", job.employer.user_id],
  //   queryFn: () => {
  //     return getSingleEmployerData(job.employer.user_id);
  //   },
  // });

  // const employerData: EmployerProfile = employerDataQuery.data?.data[0];

  const { data: IndividualData } = useQuery({
    enabled: !job.employer.company_name,
    queryKey: ["individualJob", job.employer.user_id],
    queryFn: () => {
      return getIndividualDataForJob(job.employer.user_id);
    },
  });

  const individualJobData: IndividualJob = IndividualData?.data;

  const [open, setOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const savedCheckQuery = useQuery({
    enabled: !!seekerData?.id && !!job?.id,
    queryKey: ["savedCheck", seekerData.id, job?.id],
    queryFn: () => {
      return isSaved({
        seeker_id: seekerData.id,
        post_job_id: job.id,
      });
    },
  });

  const isJobSaved = savedCheckQuery.data?.data.status;
  const savedJobRecordId = savedCheckQuery.data?.data?.data?.id;

  const saveJobMutation = useMutation({
    mutationFn: doSaveJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedCheck"] });
      queryClient.invalidateQueries({ queryKey: ["savedJobs", seekerData.id] });
      setSnackMessage("Bookmarked !");
      handleClick();
    },
  });

  const undoSaveJobMutation = useMutation({
    mutationFn: undoSaveJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedCheck"] });
      queryClient.invalidateQueries({
        queryKey: ["savedJobs", seekerData.id],
      });
      setSnackMessage("Removed form Bookmark !");
      handleClick();
    },
  });

  const saveJobHandler = () => {
    if (!seekerData.id || !job.id) return;
    const payload = {
      seeker_id: seekerData.id,
      post_job_id: job.id,
    };
    saveJobMutation.mutate(payload);
  };

  const undoSaveJobHandler = () => {
    if (!savedJobRecordId) return;
    undoSaveJobMutation.mutate(savedJobRecordId);
  };

  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        sx={{ marginTop: "50px" }}
      >
        <SnackbarContent
          sx={{ backgroundColor: "success.main" }}
          message={snackMessage}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Snackbar>
      <Paper
        elevation={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "325px", md: "375px" },
          borderRadius: "20px",
          boxShadow: "none",
          px: 3,
          py: 2,
        }}
      >
        <Box>
          {/* image title bookmark */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {job.employer &&
                job.employer.company_name &&
                job.employer?.company_image && (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/${job.employer?.company_image}`}
                    style={{
                      backgroundColor: "primary.main",
                      borderRadius: "12px",
                      width: "50px",
                      height: "50px",
                    }}
                  />
                )}
              {job.employer &&
                !job.employer.company_name &&
                individualJobData?.profile_picture && (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/${individualJobData?.profile_picture}`}
                    style={{
                      backgroundColor: "primary.main",
                      borderRadius: "12px",
                      width: "50px",
                      height: "50px",
                    }}
                  />
                )}
              {job.employer &&
                !job.employer.company_name &&
                !individualJobData?.profile_picture && (
                  <Avatar
                    variant="rounded"
                    sx={{ width: "45px", height: "45px" }}
                  />
                )}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "700",
                    color: "text.secondary",
                    ":hover": { cursor: "pointer", color: "primary.main" },
                  }}
                >
                  <NavLink to={`/job/${job.id}`}>{job.job_title}</NavLink>
                </Typography>
                {user?.user_type == "employer" && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {job.posting_status == "pending" && (
                      <PendingOutlinedIcon
                        sx={{ fontSize: "22px", color: "text.primary" }}
                      />
                    )}

                    {job.posting_status == "approved" && (
                      <VerifiedIcon
                        sx={{ fontSize: "22px", color: "success.main" }}
                      />
                    )}
                    {job.posting_status == "rejected" && (
                      <DoDisturbAltOutlinedIcon
                        sx={{ fontSize: "22px", color: "error.main" }}
                      />
                    )}

                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 400, fontSize: "14px" }}
                    >
                      {job.posting_status}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            {user?.user_id && user.user_type == "seeker" && (
              <Checkbox
                onClick={() => {
                  if (isJobSaved) {
                    undoSaveJobHandler();
                  } else {
                    saveJobHandler();
                  }
                }}
                disabled={
                  saveJobMutation.isPending || undoSaveJobMutation.isPending
                }
                checked={isJobSaved}
                sx={{
                  "& .MuiSvgIcon-root": { fontSize: 26, mr: -2 },
                  color: "primary.main",
                  "&.Mui-checked": {
                    color: "primary.main",
                  },
                }}
                icon={<BookmarkBorderOutlinedIcon />}
                checkedIcon={<BookmarkIcon />}
                name={"bookmark"}
              />
            )}
          </Box>
          {/* location date */}
          <Box sx={{ my: 1 }}>
            <Box
              sx={{
                display: "flex",
                textAlign: "left",
                alignItems: "start",
                gap: 1,
              }}
            >
              <LocationOnOutlinedIcon
                sx={{ color: "primary.light", fontSize: 22 }}
              />

              <Typography
                variant="caption"
                sx={{ color: "primary.light", width: "250px" }}
              >
                {job.location}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "left",
                gap: 1,
              }}
            >
              <QueryBuilderIcon sx={{ color: "primary.light", fontSize: 22 }} />
              <Typography variant="caption" sx={{ color: "primary.light" }}>
                posted on {format(new Date(job.created_at), "PPp")}
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* tags */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
            mb: 2,
          }}
        >
          <Chip
            sx={{
              borderRadius: "4px",
              backgroundColor: "primary.main",
              color: "background.paper",
              width: "fit-content",
              height: "28px",
            }}
            label={job.type}
          />
          <Chip
            sx={{
              borderRadius: "4px",
              backgroundColor: "primary.main",
              color: "background.paper",
              width: "fit-content",
              height: "28px",
            }}
            label={job.role}
          />
          <Chip
            sx={{
              borderRadius: "4px",
              backgroundColor: "primary.main",
              color: "background.paper",
              width: "fit-content",
              height: "28px",
            }}
            label={job.category?.name}
          />
        </Box>
        <Divider flexItem />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: "text.secondary" }}
          >
            Salary
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: "text.secondary" }}
          >
            {job.salary}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default JobCard;
