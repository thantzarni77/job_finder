import { Box, Typography } from "@mui/material";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
// import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
// import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

import type { Job } from "../../store/JobStore";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getIndividualDataForJob } from "../../helper/userApiFunctions";
import type { IndividualJob } from "../../store/UserDataStore";
import FullScreenLoader from "../FullScreenLoader";

const AdminJobCard = ({ job }: { job: Job }) => {
  const navigate = useNavigate();

  const userIdForIndividualQuery = job.employer.user_id;
  const isIndividualJob = job.employer.company_name == null;

  const { data: IndividualData, isFetching: individualPending } = useQuery({
    enabled: !!userIdForIndividualQuery && isIndividualJob,
    queryKey: ["individualJob", userIdForIndividualQuery],
    queryFn: () => {
      return getIndividualDataForJob(userIdForIndividualQuery);
    },
  });

  const individualJobData: IndividualJob = IndividualData?.data;

  if (individualPending) {
    return (
      <FullScreenLoader
        open={individualPending}
        message="Getting Individual Data"
      />
    );
  }
  return (
    <Box
      onClick={() => navigate(`/admin/jobs/detail/${job.id}`)}
      sx={{
        backgroundColor: "background.paper",
        p: 2,
        borderRadius: "15px",
        width: "280px",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 1,
        ":hover": {
          bgcolor: "background.hover",
          cursor: "pointer",
        },
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        {job.job_title}
      </Typography>
      {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <CircleIcon sx={{ color: "success.main", fontSize: "20px" }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          Active
        </Typography>
      </Box> */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <BusinessIcon sx={{ color: "primary.main", fontSize: "20px" }} />
        {job.employer.company_name && (
          <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
            {job.employer.company_name}
          </Typography>
        )}
        {!job.employer.company_name && individualJobData && (
          <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
            {individualJobData.name}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <WatchLaterOutlinedIcon
          sx={{ color: "primary.main", fontSize: "20px" }}
        />
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          Posted on {format(new Date(job.job_detail.created_at), "dd MMM yyyy")}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <GroupsOutlinedIcon sx={{ color: "primary.main", fontSize: "20px" }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          {job.job_detail.apply_count} Applicants
        </Typography>
      </Box>
      {/* <Divider sx={{ borderColor: "primary.main" }} flexItem /> */}
      {/* action buttons */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* <Button
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textTransform: "none",
          }}
        >
          <DeleteOutlineOutlinedIcon sx={{ color: "error.main" }} />
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 300, color: "text.primary" }}
          >
            Delete
          </Typography>
        </Button> */}
        {/* <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textTransform: "none",
            }}
          >
            <DriveFileRenameOutlineOutlinedIcon
              sx={{ color: "primary.main" }}
            />
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 300, color: "text.primary" }}
            >
              Edit
            </Typography>
          </Button>
          <Button
            onClick={() => navigate("/admin/jobs/detail/1")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textTransform: "none",
            }}
          >
            <RemoveRedEyeOutlinedIcon sx={{ color: "primary.main" }} />
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 300, color: "text.primary" }}
            >
              View
            </Typography>
          </Button>
        </Box> */}
      </Box>
    </Box>
  );
};

export default AdminJobCard;
