import {
  Box,
  Button,
  Divider,
  Typography,
  Tooltip,
  Stack,
  Paper,
  IconButton,
} from "@mui/material";

import ScheduleIcon from "@mui/icons-material/Schedule";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CampaignIcon from "@mui/icons-material/Campaign";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams } from "react-router";
import { adminGetAJob, verifyJobPost } from "../../helper/postJob";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FullScreenLoader from "../../components/FullScreenLoader";
import { format } from "date-fns";

export default function JobDetailManage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { id } = useParams();
  const jobId = Number(id);

  const { data: job, isPending } = useQuery({
    queryKey: ["adminJob", jobId],
    queryFn: () => adminGetAJob(jobId),
  });

  const jobMutate = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      verifyJobPost(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminJob", jobId] });
    },
  });
  const handleApprove = () => {
    jobMutate.mutate({ id: jobId, status: "approved" });
  };

  const handleReject = () => {
    jobMutate.mutate({ id: jobId, status: "rejected" });
  };

  if (isPending) {
    return <FullScreenLoader open={true} message="Loading" />;
  } else {
    console.log(job);
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
              {job.job_title}
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
                <Typography component="span">{job.posting_status}</Typography>
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
                  {format(new Date(job.created_at), "PPP")}
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
                  {job.job_detail.apply_count}
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
              <Typography>Job Code : {job.job_code}</Typography>
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
              <Typography>Position : {job.role}</Typography>
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
              <Typography>Working type : {job.type}</Typography>
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
              <AccessTimeIcon sx={{ fontSize: 18, color: "#5f68d7" }} />
              <Typography>Dead Line : {job.job_detail.deadline}</Typography>
            </Box>
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
              {job.job_detail.benefits}
            </Paper>
          </Box>

          {/* Responsibilities Section */}
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              color="#0f172a"
              sx={{ mb: 1 }}
            >
              Responsibilities
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
              {job.job_detail.description}
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
              {job.job_detail.requirements}
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
            <Button
              variant="outlined"
              size="large"
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
              onClick={handleReject}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{
                fontWeight: 600,
                borderRadius: 2,
                px: 6,
                textTransform: "none",
                minWidth: 140,
              }}
              onClick={handleApprove}
            >
              Approve
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
