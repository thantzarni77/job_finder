import { Box, Button, Divider, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import BusinessIcon from "@mui/icons-material/Business";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { useNavigate } from "react-router";
import { format } from "date-fns";

const AdminJobCard = ({ job }: { job: any }) => {
  const navigate = useNavigate();
  return (
    <Box
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
      }}
    >
      {/* seeker details */}
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        {job.job_title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <CircleIcon sx={{ color: "success.main", fontSize: "20px" }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          {job.posting_status}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <BusinessIcon sx={{ color: "primary.main", fontSize: "20px" }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          {job.type}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <WatchLaterOutlinedIcon
          sx={{ color: "primary.main", fontSize: "20px" }}
        />
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          Posted on {format(new Date(job.created_at), "PPP")}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <GroupsOutlinedIcon sx={{ color: "primary.main", fontSize: "20px" }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          {job.role}
        </Typography>
      </Box>
      <Divider sx={{ borderColor: "primary.main" }} flexItem />
      {/* action buttons */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Button onClick={() => navigate(`/admin/jobs/detail/${job.id}`)}>
            <RemoveRedEyeOutlinedIcon sx={{ color: "primary.main" }} />
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 300, color: "text.primary" }}
            >
              View
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminJobCard;
