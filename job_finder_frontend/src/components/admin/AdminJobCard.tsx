import { Box, Button, Divider, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

const AdminJobCard = () => {
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
        Frontend Developer
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <CircleIcon sx={{ color: "success.main", fontSize: "20px" }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          Active
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <BusinessIcon sx={{ color: "primary.main", fontSize: "20px" }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          Meta
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <WatchLaterOutlinedIcon
          sx={{ color: "primary.main", fontSize: "20px" }}
        />
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          Posted on 24 JUL 2025
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <GroupsOutlinedIcon sx={{ color: "primary.main", fontSize: "20px" }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          20 Applicants
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
        <Button
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
        </Button>
        <Box sx={{ display: "flex", alignItems: "center" }}>
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

export default AdminJobCard;
