import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { useNavigate } from "react-router";
import AdminJobCard from "../../components/admin/AdminJobCard";

const PendingJobs = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "94%", mx: 6 }}>
      {/* back arrow and top part */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Pending Jobs
          </Typography>
        </Box>
      </Box>
      <Box>
        {/* --- jobs --- */}
        <Box sx={{ mt: 4 }}>
          <Box
            sx={{
              width: "80%",
              display: "flex",
              alignItems: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            <AdminJobCard />
            <AdminJobCard />
            <AdminJobCard />
            <AdminJobCard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PendingJobs;
