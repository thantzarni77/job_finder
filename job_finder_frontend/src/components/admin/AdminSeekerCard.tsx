import { Box, Button, Divider, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useNavigate } from "react-router";
import type { Seeker } from "../../helper/talentPage";
import { format } from "date-fns";

const AdminSeekerCard = ({ seeker }: { seeker: Seeker }) => {
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
        {seeker.user_id.name} ({seeker.talent})
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <CircleIcon sx={{ color: "success.main", fontSize: "20px" }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          Active
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <WatchLaterOutlinedIcon
          sx={{ color: "primary.main", fontSize: "20px" }}
        />
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          Registered on {format(seeker.created_at, "dd MMM yyyy")}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <EmailOutlinedIcon sx={{ color: "primary.main", fontSize: "20px" }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          {seeker.user_id.email}
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={() => {
              navigate(`/admin/seeker/${seeker.user_id.id}/manage`);
            }}
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
        </Box>
      </Box>
    </Box>
  );
};

export default AdminSeekerCard;
