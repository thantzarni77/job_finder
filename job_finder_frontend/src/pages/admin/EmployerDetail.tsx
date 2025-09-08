import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  IconButton,
  Chip,
  Link,
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
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

export default function EmployerDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = Number(id);
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["adminEmployer", userId],
    queryFn: () => getSingleEmployerData(userId),
  });

  const verifyMutate = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      verifyByAdmin(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminEmployer", userId] });
    },
  });

  function handleReject() {
    verifyMutate.mutate({ id: userId, status: "rejected" });
  }
  function handleApprove() {
    verifyMutate.mutate({ id: userId, status: "verified" });
  }

  if (isPending) {
    return <FullScreenLoader open={true} message={"Loading"} />;
  } else {
    console.log(data);
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
          Meta
        </Typography>
        <Box mt={1} display="flex" flexWrap="wrap" gap={2}>
          <Chip
            label={`Status : ${data.data.verification}`}
            size="small"
            icon={
              <RadioButtonCheckedIcon
                sx={{ fill: getStatusColor(data.data.verification) }}
              />
            }
          />
          <Chip
            label={`Registered Date : ${format(new Date(data.data.created_at), "PPP")}`}
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
          <Grid xs={6}>
            <Typography variant="body2">
              <BusinessIcon fontSize="small" sx={{ mr: 0.5 }} />
              {data.data.company_type ?? "Individual"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">
              <WorkIcon fontSize="small" sx={{ mr: 0.5 }} />
              Field : Social media
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={1}>
              <EmailIcon fontSize="small" />
              <Typography variant="body2">
                {data.data.company_email ?? data.data.user.email}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={1}>
              <PhoneIcon fontSize="small" />
              <Typography variant="body2">
                {data.data.company_phone ?? data.data.user.phone}
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
              <strong>Uploaded jobs</strong> : {data.data.post_job.length}{" "}
              &nbsp;
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Action Buttons */}
      {data.data.verification == "pending" && (
        <Box display="flex" gap={2} mt={2} flexWrap="wrap">
          <Button variant="outlined" color="error" onClick={handleReject}>
            Reject
          </Button>
          <Button variant="outlined" color="primary" onClick={handleApprove}>
            Approve
          </Button>
        </Box>
      )}

      <Box sx={{ mt: 3, mb: 5 }}>
        <Typography sx={{ textAlign: "center" }} variant="h6">
          Uploaded Job
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          {data.data.post_job?.map((job: any) => {
            return <AdminJobCard job={job} key={job.id} />;
          })}
        </Box>
      </Box>
    </Box>
  );
}
