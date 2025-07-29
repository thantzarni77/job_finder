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
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import VerifiedIcon from "@mui/icons-material/Verified";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { useNavigate, useParams } from "react-router";
import EmployerCard from "../../../components/employer/EmployerCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleJob } from "../../../helper/postJob";
import { useEffect, useState } from "react";
import {
  useAppliedJobStore,
  useJobStore,
  type JobWithJobDetail,
} from "../../../store/JobStore";
import FullScreenLoader from "../../../components/FullScreenLoader";
import { useUserStore } from "../../../store/UserStore";
import {
  doSaveJob,
  getSeekerAppliedJobs,
  isSaved,
  undoSaveJob,
} from "../../../helper/jobApiFunctions";
import { useProfileStore } from "../../../store/ProfileStore";
import JobCard from "../../../components/user/jobs/JobCard";
import { getIndividualDataForJob } from "../../../helper/userApiFunctions";
import IndividualCard from "../../../components/employer/IndividualCard";
import JobCloseCard from "../../../components/user/jobs/JobCloseCard";
import type { IndividualJob } from "../../../store/UserDataStore";
import { isBefore, isSameDay } from "date-fns";

const JobDetail = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const user = useUserStore((state) => state.user);

  const allJobs = useJobStore((state) => state.jobs);
  const seekerData = useProfileStore((state) => state.seekerProfile);

  const seekerAppliedJobs = useAppliedJobStore(
    (state) => state.seekerAppliedJobs,
  );
  const setAppliedJobs = useAppliedJobStore((state) => state.setAppliedJobs);

  const jobDetailQuery = useQuery({
    queryKey: ["jobDetail", id],
    queryFn: () => {
      return getSingleJob(id);
    },
  });

  const jobDetails: JobWithJobDetail = jobDetailQuery.data?.data;

  const savedCheckQuery = useQuery({
    enabled:
      !!seekerData?.id && !!jobDetails?.id && user?.user_type != "employer",
    queryKey: ["savedCheck", seekerData.id, jobDetails?.id],
    queryFn: () => {
      return isSaved({
        seeker_id: seekerData.id,
        post_job_id: jobDetails?.id,
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

  const alreadyAppliedCheck = seekerAppliedJobs.filter(
    (job) => job.post_job_id == Number(id),
  );

  const navigate = useNavigate();

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

  const userIdForIndividualQuery = jobDetailQuery.data?.data.employer.user_id;
  const isIndividualJob =
    jobDetailQuery.data?.data.employer.company_name === null;

  const { data: IndividualData, isPending: individualPending } = useQuery({
    enabled: !!userIdForIndividualQuery && isIndividualJob,
    queryKey: ["individualJob", userIdForIndividualQuery],
    queryFn: () => {
      return getIndividualDataForJob(userIdForIndividualQuery);
    },
  });

  const individualJobData: IndividualJob = IndividualData?.data;

  const saveJobHandler = () => {
    if (!seekerData.id || !jobDetails?.id) return;
    const payload = {
      seeker_id: seekerData.id,
      post_job_id: jobDetails?.id,
    };
    saveJobMutation.mutate(payload);
  };

  const undoSaveJobHandler = () => {
    if (!savedJobRecordId) return;
    undoSaveJobMutation.mutate(savedJobRecordId);
  };

  let isSameDate = false;
  let isOlderDate = false;
  if (jobDetails) {
    isSameDate = isSameDay(
      new Date(jobDetails.job_detail.deadline),
      new Date(Date.now()).setHours(0, 0, 0, 0),
    );
    isOlderDate = isBefore(
      new Date(jobDetails.job_detail.deadline),
      new Date(Date.now()).setHours(0, 0, 0, 0),
    );
  }

  if (isIndividualJob && individualPending) {
    return (
      <FullScreenLoader
        open={individualPending}
        message="Getting employer data..."
      />
    );
  }

  if (jobDetailQuery.isPending) {
    return (
      <FullScreenLoader
        open={jobDetailQuery.isPending}
        message="Getting Job Details..."
      />
    );
  }

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
      {jobDetails?.employer &&
        jobDetails?.employer.user_id != user?.user_id && (
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
            {user?.user_id && user.user_type == "seeker" && (
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
            )}

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
        )}

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

          {/* jobs code */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mt: 3,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Job Code
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "text.secondary" }}
            >
              {jobDetails?.job_code}
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

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mb: 3,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Benefits
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 400,
                color: "text.secondary",
                width: { xs: "100%", md: "100%", lg: "100%" },
              }}
            >
              {jobDetails?.job_detail.benefits}
            </Typography>
          </Box>

          <Button
            disabled={
              user?.user_type == "employer" ||
              alreadyAppliedCheck.length != 0 ||
              !user?.user_id ||
              isSameDate ||
              isOlderDate
            }
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
            {user?.user_id &&
              (!isOlderDate || !isSameDate) &&
              (alreadyAppliedCheck.length != 0 ? "Applied" : "Apply Now")}
            {user?.user_id &&
              alreadyAppliedCheck.length == 0 &&
              (isOlderDate || isSameDate) &&
              "Job has excedded deadline date"}
            {!user?.user_id && "Create an account or login to apply"}
          </Button>
        </Box>
        {/* employer card */}
        <Box sx={{ mt: { xs: 4, md: 4, lg: 0 } }}>
          {jobDetails?.employer &&
            jobDetails?.employer.user_id == user?.user_id && (
              <>
                <JobCloseCard
                  applicantCount={jobDetails?.job_detail.apply_count}
                  deadline={jobDetails?.job_detail.deadline}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                    gap: 2,
                    my: 2,
                  }}
                >
                  <Button
                    endIcon={<AccountBoxIcon />}
                    onClick={() => navigate("applicant-list")}
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      boxShadow: "none",
                      ":hover": {
                        boxShadow: "none",
                      },
                      borderRadius: 2,
                    }}
                  >
                    View Applicant List
                  </Button>
                </Box>
              </>
            )}
          {jobDetails?.employer &&
            jobDetails?.employer.user_id != user?.user_id &&
            jobDetails?.employer.company_name && (
              <EmployerCard employerData={jobDetails.employer} />
            )}
          {jobDetails?.employer &&
            !jobDetails?.employer?.company_name &&
            individualJobData &&
            individualJobData.id != user?.user_id && (
              <IndividualCard individualData={individualJobData} />
            )}
        </Box>
      </Box>

      {/* similar jobs */}
      {jobDetails?.employer && (
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
            {allJobs.map((single) => {
              if (single.category_id == jobDetails?.category_id) {
                if (single.id != Number(id)) {
                  return <JobCard key={single.id} job={single} />;
                }
              }
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default JobDetail;
