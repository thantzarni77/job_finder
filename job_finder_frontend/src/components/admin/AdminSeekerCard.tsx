import { Box, Button, Divider, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router";

const AdminSeekerCard = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
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
      <MuiLink
        component={RouterLink}
        to={"/admin/user/1/manage"}
        sx={{
          textDecoration: "none",
          ":hover": {
            cursor: "pointer",
            color: "#000000",
          },
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          Mr.John (Graphic Designer)
        </Typography>
      </MuiLink>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <CircleIcon sx={{ color: "#75C149", fontSize: "20px" }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          Active
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <WatchLaterOutlinedIcon
          sx={{ color: "primary.main", fontSize: "20px" }}
        />
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          Registered on 24 JUL 2025
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <EmailOutlinedIcon sx={{ color: "primary.main", fontSize: "20px" }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          mrjhon12@gmail.com
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
          <DeleteOutlineOutlinedIcon sx={{ color: "#EA4335" }} />
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 300, color: "#000000" }}
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
              sx={{ fontWeight: 300, color: "#000000" }}
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
              sx={{ fontWeight: 300, color: "#000000" }}
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
