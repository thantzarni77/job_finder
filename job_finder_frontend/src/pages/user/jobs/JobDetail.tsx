import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Snackbar,
  SnackbarContent,
  Typography,
  type SnackbarCloseReason,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import VerifiedIcon from "@mui/icons-material/Verified";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { useNavigate, useParams } from "react-router";
import EmployerCard from "../../../components/employer/EmployerCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSingleJob } from "../../../helper/postJob";
import { useEffect, useState } from "react";
import { useJobDetailStore } from "../../../store/JobStore";
import { useSingleEmployerStore } from "../../../store/EmployerStore";
import { getSingleEmployerData } from "../../../helper/employerApiFunctions";
import FullScreenLoader from "../../../components/FullScreenLoader";
import { useUserStore } from "../../../store/UserStore";
import {
  doSaveJob,
  isSaved,
  undoSaveJob,
} from "../../../helper/jobApiFunctions";
import { useProfileStore } from "../../../store/ProfileStore";
import { useSavedSingleJobStore } from "../../../store/SavedJobStore";

const JobDetail = () => {
  const user = useUserStore((state) => state.user);
  const seekerData = useProfileStore((state) => state.seekerProfile);
  const jobDetails = useJobDetailStore((state) => state.jobDetails);
  const setJobDetails = useJobDetailStore((state) => state.setJobDetails);

  const savedJob = useSavedSingleJobStore((state) => state.saveJob);
  const setSingleSavedJob = useSavedSingleJobStore(
    (state) => state.setSingleSavedJob,
  );

  const employerData = useSingleEmployerStore((state) => state.singleEmployer);
  const setSingleEmployer = useSingleEmployerStore(
    (state) => state.setSingleEmployer,
  );

  const savedCheckQuery = useQuery({
    queryKey: ["savedCheckQuery", seekerData.id, jobDetails?.id],
    queryFn: () => {
      return isSaved({
        seeker_id: seekerData.id,
        post_job_id: jobDetails?.id,
      });
    },
  });

  const [isJobSaved, setIsSaved] = useState(
    savedCheckQuery.isSuccess ? true : false,
  );

  const saveJobMutation = useMutation({
    mutationFn: doSaveJob,
    onSuccess: () => {
      setIsSaved(true);
    },
  });

  const undoSaveJobMutation = useMutation({
    mutationFn: undoSaveJob,
    onSuccess: () => {
      setIsSaved(false);
    },
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const [open, setOpen] = useState(false);

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

  const jobDetailQuery = useQuery({
    queryKey: ["jobDetail", id],
    queryFn: () => {
      return getSingleJob(id);
    },
  });

  useEffect(() => {
    if (jobDetailQuery.data && jobDetailQuery.isSuccess) {
      setJobDetails(jobDetailQuery.data.data);
    }
  }, [jobDetailQuery.data, jobDetailQuery.isSuccess, setJobDetails]);

  const employerDataQuery = useQuery({
    enabled: jobDetails?.employer_id != 0,
    queryKey: ["employerDetail", jobDetails?.employer_id],
    queryFn: () => {
      return getSingleEmployerData(jobDetails?.employer_id);
    },
  });

  useEffect(() => {
    if (employerDataQuery.data && employerDataQuery.isSuccess) {
      setSingleEmployer(employerDataQuery.data.data[0]);
    }
  }, [employerDataQuery.data, employerDataQuery.isSuccess, setSingleEmployer]);

  useEffect(() => {
    if ((savedCheckQuery.isSuccess, savedCheckQuery.data)) {
      setIsSaved(true);
      setSingleSavedJob(savedCheckQuery.data.data.data);
    }
  }, [savedCheckQuery.isSuccess, savedCheckQuery.data, setSingleSavedJob]);

  if (jobDetailQuery.isPending) {
    return (
      <FullScreenLoader
        open={jobDetailQuery.isPending}
        message="Getting data..."
      />
    );
  }

  const saveJobHandler = () => {
    console.log("clicked");

    const payload = {
      seeker_id: seekerData.id,
      post_job_id: jobDetails?.id,
    };
    saveJobMutation.mutate(payload);
  };

  const undoSaveJobHandler = () => {
    undoSaveJobMutation.mutate(savedJob?.id);
  };

  return (
    <Box sx={{ width: "90%", mx: "auto" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        sx={{ marginTop: "50px" }}
      >
        <SnackbarContent
          sx={{ backgroundColor: "success.main" }}
          message={isJobSaved ? "Bookmarked" : "Removed from Bookmark"}
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
      {/* Job title & back button */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mt: 5,
          mb: 4,
        }}
      >
        <IconButton onClick={() => navigate("/jobs")}>
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

        <Typography variant="h6" sx={{ fontWeight: 600, mx: "auto" }}>
          Job Details
        </Typography>
      </Box>

      {/* Job badge */}
      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          display: { xs: "none", md: "none", lg: "flex" },
          alignItems: "center",
          gap: 2,
          my: 2,
        }}
      >
        {/* verify icon */}
        <Box
          sx={{
            display: "flex",
            width: "fit-content",
            alignItems: "center",
            bgcolor: "primary.main",
            border: 1,
            color: "background.paper",
            borderRadius: "4px",
            height: "28px",
            px: "5px",
            py: "5px",
          }}
        >
          <VerifiedIcon sx={{ color: "success.main" }} />
          <Typography variant="caption">
            {jobDetails?.posting_status == "approved" && "Verified"}
          </Typography>
        </Box>

        {/* bookmark icon */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "fit-content",
            bgcolor: isJobSaved ? "primary.main" : "background.paper",
            border: 1,
            color: isJobSaved ? "background.paper" : "text.primary",
            borderColor: "primary.main",
            borderRadius: "4px",
            height: "28px",
            px: "5px",
            py: "5px",
          }}
        >
          <Checkbox
            disableRipple
            onClick={() => {
              if (!isJobSaved) {
                saveJobHandler();
                handleClick();
              } else {
                undoSaveJobHandler();
                handleClick();
              }
            }}
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 22, ml: -1 },
              color: "primary.main",
              "&.Mui-checked": {
                color: "primary.main",
              },
            }}
            icon={<BookmarkBorderOutlinedIcon />}
            checkedIcon={
              <BookmarkIcon
                sx={{
                  color: isJobSaved ? "background.paper" : "text.primary",
                }}
              />
            }
            name={"bookMark"}
          />
          <Typography variant="caption">
            {isJobSaved ? "Saved" : "Save this"}
          </Typography>
        </Box>

        {/* appilicant icon */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "primary.main",
            color: "background.paper",
            borderRadius: "4px",
            height: "28px",
            px: "5px",
            py: "5px",
            gap: "5px",
          }}
        >
          <GroupsOutlinedIcon />
          <Typography variant="caption">
            {jobDetails?.job_detail.apply_count} applicants
          </Typography>
        </Box>

        {/* deadline icon */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "primary.main",
            color: "background.paper",
            borderRadius: "4px",
            height: "28px",
            px: "5px",
            py: "5px",
            gap: "5px",
          }}
        >
          <QueryBuilderIcon sx={{ fontSize: "20px" }} />
          <Typography variant="caption">
            Deadline {jobDetails?.job_detail.deadline}
          </Typography>
        </Box>
      </Box>

      {/* Job Contents and Employer Card */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "column", lg: "row" },
          alignItems: { xs: "center", md: "center", lg: "flex-start" },
        }}
      >
        {/* Jobs */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            width: "100%",
          }}
        >
          {/* jobs title */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Job Title
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "text.secondary" }}
            >
              {jobDetails?.job_title}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mt: 3,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Position
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "text.secondary" }}
            >
              {jobDetails?.role}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mt: 3,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Gender
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "text.secondary" }}
            >
              {jobDetails?.job_detail.gender}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mt: 3,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Salary
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "text.secondary" }}
            >
              {jobDetails?.salary}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mt: 3,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Address
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "text.secondary" }}
            >
              {jobDetails?.location}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mt: 3,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Working Type
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "text.secondary" }}
            >
              {jobDetails?.type}
            </Typography>
          </Box>

          {/* <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mt: 3,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Working hour
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "text.secondary" }}
            >
              9:00 am to 5:00 pm
            </Typography>
          </Box> */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mt: 3,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Descriptions
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 400,
                color: "text.secondary",
                width: { xs: "100%", md: "100%", lg: "70%" },
              }}
            >
              {jobDetails?.job_detail.description}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              my: 3,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Requirements
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 400,
                color: "text.secondary",
                width: { xs: "100%", md: "100%", lg: "70%" },
              }}
            >
              {jobDetails?.job_detail.requirements}
            </Typography>
          </Box>

          <Button
            disabled={user?.user_type == "employer"}
            onClick={() => navigate(`/job/${id}/apply`)}
            variant="contained"
            sx={{
              width: { xs: "100%", md: "100%", lg: "73%" },
              boxShadow: "none",
              textTransform: "none",
              fontWeight: 400,
              borderRadius: "8px",
              p: 1,
              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            Apply Now
          </Button>
        </Box>

        {/* employer card */}
        <Box sx={{ mt: { xs: 4, md: 4, lg: 0 } }}>
          <EmployerCard employerData={employerData} />
        </Box>
      </Box>

      {/* similar jobs */}
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
          Similar Jobs
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "column", lg: "row" },
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: 6,
          }}
        >
          {/* <JobCard />
          <JobCard />
          <JobCard /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default JobDetail;
