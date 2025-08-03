import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  IconButton,
  Chip,
  Pagination,
  Stack,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate, useParams } from "react-router";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getSingleEmployerData,
  verifyByAdmin,
} from "../../helper/employerApiFunctions";
import FullScreenLoader from "../../components/FullScreenLoader";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { getStatusColor } from "../../components/admin/AdminEmployerCard";
import AdminJobCard from "../../components/admin/AdminJobCard";
import { useJobStore, type Job } from "../../store/JobStore";
import { getAllJobs } from "../../helper/postJob";
import { useEffect, useState } from "react";
import type { EmployerWithUser } from "../../store/EmployerStore";

export default function EmployerDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = Number(id);
  const queryClient = useQueryClient();

  const allJobs = useJobStore((state) => state.jobs);
  const setJobs = useJobStore((state) => state.setJobs);

  const allJobsQuery = useQuery({
    queryKey: ["pureJobPosts"],
    queryFn: getAllJobs,
    placeholderData: (previousData) => previousData || { data: allJobs },
  });

  useEffect(() => {
    if (allJobsQuery.data && allJobsQuery.isSuccess) {
      setJobs(allJobsQuery.data.data);
    }
  }, [allJobsQuery.data, allJobsQuery.isSuccess, setJobs, allJobs]);

  const employerJobs =
    allJobs && allJobs.filter((job) => job.employer.user_id == userId);

  const [currentPage, setCurrentPage] = useState(1);
  const JOBS_PER_PAGE = 3;

  const indexOfLastJob = currentPage * JOBS_PER_PAGE;
  const indexOfFirstJob = indexOfLastJob - JOBS_PER_PAGE;
  const currentEmployerJobs = employerJobs.slice(
    indexOfFirstJob,
    indexOfLastJob,
  );

  const pageCount = Math.ceil(employerJobs.length / JOBS_PER_PAGE);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  const adminEmployerQuery = useQuery({
    queryKey: ["adminEmployer", userId],
    queryFn: () => getSingleEmployerData(userId),
  });

  const employerData: EmployerWithUser = adminEmployerQuery.data?.data[0];

  const verifyMutate = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      verifyByAdmin(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminEmployer", userId] });
      queryClient.invalidateQueries({ queryKey: ["adminEmployers"] });
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  function handleReject() {
    verifyMutate.mutate({ id: employerData.id, status: "rejected" });
  }
  function handleApprove() {
    verifyMutate.mutate({ id: employerData.id, status: "verified" });
  }

  if (adminEmployerQuery.isFetching || allJobsQuery.isFetching) {
    return <FullScreenLoader open={true} message={"Loading"} />;
  }

  return (
    <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight="bold">
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIosIcon />
          </IconButton>
          Employer detail view
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ borderRadius: 2, p: 2, mb: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {employerData.company_name
            ? employerData.company_name
            : employerData.user.name}
        </Typography>
        <Box mt={1} display="flex" flexWrap="wrap" gap={2}>
          <Chip
            label={`Status : ${employerData.verification}`}
            size="small"
            icon={
              <RadioButtonCheckedIcon
                sx={{ fill: getStatusColor(employerData.verification) }}
              />
            }
          />
          <Chip
            label={`Registered Date : ${format(
              new Date(employerData.created_at),
              "PPP",
            )}`}
            size="small"
            icon={<AccessTimeIcon />}
          />
          <Chip
            label="Role : Employer"
            size="small"
            icon={<PersonIcon fontSize="small" />}
          />
        </Box>
      </Paper>

      {/* Company Info */}
      <Paper elevation={0} sx={{ borderRadius: 2, p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2">
              <BusinessIcon fontSize="small" sx={{ mr: 0.5 }} />
              {employerData.company_type ?? "Individual"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={1}>
              <EmailIcon fontSize="small" />
              <Typography variant="body2">
                {employerData.company_email
                  ? employerData.company_email
                  : employerData.user.email}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={1}>
              <PhoneIcon fontSize="small" />
              <Typography variant="body2">
                {employerData.company_phone && employerData.company_phone}
                {!employerData.company_phone && employerData.user.phone}
                {!employerData.company_phone &&
                  !employerData.user.phone &&
                  "No Data"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Profile Status */}
      <Paper elevation={0} sx={{ borderRadius: 2, p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2">
              <strong>Uploaded jobs</strong> : {employerJobs.length} &nbsp;
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Action Buttons */}
      {employerData.verification != "approved" && (
        <Box display="flex" gap={2} mt={2} flexWrap="wrap">
          {employerData.verification != "rejected" && (
            <Button
              variant="outlined"
              loading={verifyMutate.isPending}
              color="error"
              onClick={handleReject}
            >
              Reject
            </Button>
          )}
          <Button
            variant="outlined"
            loading={verifyMutate.isPending}
            color="primary"
            onClick={handleApprove}
          >
            Approve
          </Button>
        </Box>
      )}

      {/* ---- UPLOADED JOBS SECTION ---- */}
      <Box sx={{ mt: 3, mb: 5 }}>
        <Typography sx={{ textAlign: "center", my: 3 }} variant="h6">
          Uploaded Jobs
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 3,
            minHeight: "200px",
          }}
        >
          {currentEmployerJobs?.map((job: Job) => {
            return <AdminJobCard job={job} key={job.id} />;
          })}
          {employerJobs.length === 0 && (
            <Typography sx={{ my: 5 }}>No Jobs Currently Posted</Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Stack spacing={2}>
            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              variant="outlined"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#5f6caf",
                  borderColor: "#5f6caf",
                },
              }}
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
