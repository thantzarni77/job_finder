import {
  Box,
  Button,
  Divider,
  Typography,
  Stack,
  Paper,
  IconButton,
} from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import CampaignIcon from "@mui/icons-material/Campaign";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleJob } from "../../helper/postJob";
import FullScreenLoader from "../../components/FullScreenLoader";
import type { JobWithJobDetail } from "../../store/JobStore";
import { format } from "date-fns";
import { changeStatus } from "../../helper/jobApiFunctions";

export default function JobDetailManage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const jobDetailQuery = useQuery({
    queryKey: ["jobDetail", id],
    queryFn: () => {
      return getSingleJob(id);
    },
  });

  const jobDetails: JobWithJobDetail = jobDetailQuery.data?.data;

  const changeStatusMutation = useMutation({
    mutationFn: changeStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobDetail"] });
      queryClient.invalidateQueries({ queryKey: ["pureJobPosts"] });
      queryClient.invalidateQueries({ queryKey: ["jobPosts"] });
      navigate(-1);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  if (jobDetailQuery.isFetching) {
    return (
      <FullScreenLoader
        open={jobDetailQuery.isFetching}
        message="Getting Job Details"
      />
    );
  }

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", width: "94%", mx: 6, py: 2 }}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          maxWidth: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box component="span">
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
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
            }}
          >
            Job detail view
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* <Tooltip title="Edit">
            <Button
              startIcon={<EditIcon />}
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: 1.5,
                borderColor: "#d1d5db",
                fontWeight: 600,
                px: 2,
                fontSize: "0.875rem",
                color: "#334155",
                minWidth: "90px",
                "&:hover": {
                  borderColor: "#5f68d7",
                  backgroundColor: "rgba(95, 104, 215, 0.1)",
                },
              }}
            >
              Edit
            </Button>
          </Tooltip> */}
        </Box>

        <Stack spacing={2} sx={{ flexGrow: 1, overflowY: "auto" }}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "white",
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 1, sm: 4 },
              alignItems: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "#0f172a", flexBasis: "100%" }}
            >
              {jobDetails.job_title} ({jobDetails.job_code})
            </Typography>

            <Stack
              direction="row"
              spacing={3}
              sx={{
                fontSize: "0.875rem",
                color: "#64748b",
                userSelect: "none",
              }}
              flexWrap="wrap"
              alignItems="center"
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  whiteSpace: "nowrap",
                }}
              >
                <CampaignIcon sx={{ fontSize: 18, color: "#5f68d7" }} />
                <Typography
                  component="span"
                  color="text.primary"
                  fontWeight={600}
                >
                  Status :
                </Typography>
                <Typography component="span">
                  {jobDetails.posting_status}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  whiteSpace: "nowrap",
                }}
              >
                <ScheduleIcon sx={{ fontSize: 18, color: "#5f68d7" }} />
                <Typography
                  component="span"
                  color="text.primary"
                  fontWeight={600}
                >
                  Posted :
                </Typography>
                <Typography component="span">
                  {format(new Date(jobDetails.created_at), "dd MMM yyyy")}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  whiteSpace: "nowrap",
                }}
              >
                <PeopleOutlineIcon sx={{ fontSize: 18, color: "#5f68d7" }} />
                <Typography
                  component="span"
                  color="text.primary"
                  fontWeight={600}
                >
                  Applicants :
                </Typography>
                <Typography component="span">
                  {jobDetails.job_detail.apply_count}
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {/* Company & Working Details */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "white",
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 1, sm: 4 },
              color: "#475569",
              fontSize: "0.875rem",
              userSelect: "none",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                whiteSpace: "nowrap",
                minWidth: 130,
                flexShrink: 0,
              }}
            >
              <BusinessIcon sx={{ fontSize: 18, color: "#5f68d7" }} />
              <Typography>
                Company : {jobDetails.employer.company_name}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                whiteSpace: "nowrap",
                minWidth: 140,
                flexShrink: 0,
              }}
            >
              <WorkIcon sx={{ fontSize: 18, color: "#5f68d7" }} />
              <Typography>Position : {jobDetails.role}</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                whiteSpace: "nowrap",
                minWidth: 140,
                flexShrink: 0,
              }}
            >
              <SettingsRemoteIcon sx={{ fontSize: 18, color: "#5f68d7" }} />
              <Typography>Working type : {jobDetails.type}</Typography>
            </Box>

            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                whiteSpace: "nowrap",
                minWidth: 180,
              }}
            >
              <AccessTimeIcon sx={{ fontSize: 18, color: "#5f68d7" }} />
              <Typography>Working hour : 9:00am to 5:00pm</Typography>
            </Box> */}
          </Paper>

          {/* Applicants */}
          {/* <Box>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              color="#0f172a"
              sx={{ mb: 1 }}
            >
              Applicants
            </Typography>

            <FormControl
              fullWidth
              size="small"
              sx={{
                bgcolor: "white",
                borderRadius: 2,
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSelect-select": {
                  py: 1,
                },
              }}
            >
              <Select
                value={selectedApplicant}
                displayEmpty
                onChange={handleApplicantChange}
                IconComponent={ArrowDropDownIcon}
                renderValue={(selected) => selected}
                sx={{
                  fontWeight: 500,
                  color: "#0f172a",
                }}
                fullWidth
              >
                <MenuItem value="1. Mr.Jhon (pending)">
                  1. Mr.Jhon (pending)
                </MenuItem>
              </Select>
            </FormControl>
          </Box> */}

          {/* Benefit Section */}
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              color="#0f172a"
              sx={{ mb: 1 }}
            >
              Benifit
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "white",
                borderRadius: 2,
                color: "#334155",
                fontSize: "0.875rem",
                lineHeight: 1.4,
                maxWidth: "100%",
                wordBreak: "break-word",
              }}
            >
              {jobDetails.job_detail.benefits}
            </Paper>
          </Box>

          {/* descripitons Section */}
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              color="#0f172a"
              sx={{ mb: 1 }}
            >
              Descriptions
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "white",
                borderRadius: 2,
                color: "#334155",
                fontSize: "0.875rem",
                lineHeight: 1.4,
                wordBreak: "break-word",
              }}
            >
              {jobDetails.job_detail.description}
            </Paper>
          </Box>

          {/* Requirements Section */}
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              color="#0f172a"
              sx={{ mb: 1 }}
            >
              Requirements
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "white",
                borderRadius: 2,
                color: "#334155",
                fontSize: "0.875rem",
                lineHeight: 1.4,
                wordBreak: "break-word",
              }}
            >
              {jobDetails.job_detail.requirements}
            </Paper>
          </Box>

          {/* Note Section */}
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              color="#0f172a"
              sx={{ mb: 1 }}
            >
              Note
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "white",
                borderRadius: 2,
                color: "#334155",
                fontSize: "0.875rem",
                lineHeight: 1.4,
                wordBreak: "break-word",
              }}
            >
              {jobDetails.job_detail.note}
            </Paper>
          </Box>

          {/* Action Buttons */}

          <Box
            sx={{
              display: "flex",
              gap: 4,
              mt: 3,
              flexWrap: "wrap",
              maxWidth: "600px",
              width: "100%",
            }}
          >
            {(jobDetails.posting_status == "approved" ||
              jobDetails.posting_status != "rejected") && (
              <Button
                loading={changeStatusMutation.isPending}
                variant="outlined"
                size="large"
                onClick={() => {
                  changeStatusMutation.mutate({
                    postID: Number(id),
                    status: "rejected",
                  });
                }}
                sx={{
                  borderColor: "#5f68d7",
                  color: "#ef4444",
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 4,
                  textTransform: "none",
                  minWidth: 140,
                  "&:hover": {
                    borderColor: "#7f85da",
                    backgroundColor: "rgba(239,68,68,0.1)",
                  },
                }}
              >
                Reject
              </Button>
            )}
            {jobDetails.posting_status != "approved" && (
              <Button
                loading={changeStatusMutation.isPending}
                onClick={() => {
                  changeStatusMutation.mutate({
                    postID: Number(id),
                    status: "approved",
                  });
                }}
                variant="contained"
                size="large"
                sx={{
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 6,
                  textTransform: "none",
                  minWidth: 140,
                }}
              >
                Approve
              </Button>
            )}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
