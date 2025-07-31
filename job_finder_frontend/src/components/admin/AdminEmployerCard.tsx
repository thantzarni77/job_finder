import { Box, Button, Divider, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { format } from "date-fns";

export function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "yellow";
    case "rejected":
      return "red";
    case "verified":
      return "green";
    default:
      return "grey";
  }
}

export default function AdminEmployerCard({ employer }) {
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
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <img
          src={
            employer.company_image
              ? `${import.meta.env.VITE_API_BASE_URL}/${employer.company_image}`
              : `${import.meta.env.VITE_API_BASE_URL}/${employer.user_id.profile_picture}`
          }
          style={{ width: 50, height: 50, borderRadius: 10 }}
          alt=""
        />
        {/* seeker details */}
        <MuiLink
          component={RouterLink}
          to={`/admin/employer/${employer.id}/manage`}
          sx={{
            textDecoration: "none",
            ":hover": {
              cursor: "pointer",
              color: "text.primary",
            },
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {employer.company_name
              ? `${employer.company_name}(Company)`
              : `${employer.user_id.name}(Individual)`}
          </Typography>
        </MuiLink>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <CircleIcon
          sx={{
            color: getStatusColor(employer.verification),
            fontSize: "20px",
          }}
        />
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          {employer.verification}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <WatchLaterOutlinedIcon
          sx={{ color: "primary.main", fontSize: "20px" }}
        />
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          Registered on {format(new Date(employer.created_at), "PPP")}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <EmailOutlinedIcon sx={{ color: "primary.main", fontSize: "20px" }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          {employer.company_email ?? employer.user_id.email}
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
            justifyContent: "flex-end",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textTransform: "none",
            }}
            href={`/admin/employer/${employer.id}/manage`}
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
}
