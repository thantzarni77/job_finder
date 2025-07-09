import { Box, Button, Stack } from "@mui/material";
import { useMatch, useNavigate } from "react-router";

const SidePanel = () => {
  const navigate = useNavigate();

  // paths for each route
  const overviewPath = "/admin/overview";
  const jobsPath = "/admin/jobs/manage";
  const usersPath = "/admin/users/manage";
  const userDetailPath = "/admin/user/:id/manage";

  const isOverviewActive = useMatch(overviewPath);
  const isJobsActive = useMatch(jobsPath);
  const isUsersListActive = useMatch(usersPath);
  const isUserDetailActive = useMatch(userDetailPath);
  const isUserManagementActive = isUsersListActive || isUserDetailActive;

  const baseButtonSx = {
    width: "fit-content",
    justifyContent: "center",
    textTransform: "none",
    fontWeight: 600,
    fontSize: "0.9rem",
    borderRadius: "8px",
    whiteSpace: "nowrap",
  };

  return (
    <Box
      sx={{
        // position: "absolute",
        // top: 0,
        // left: 0,
        // zIndex: 10,
        width: "200px",
        // minHeight: "100vh",
        // bgcolor: "primary.main",
      }}
    >
      <Stack spacing={3} sx={{ p: 2, alignItems: "start" }}>
        <Button
          onClick={() => navigate(overviewPath)}
          sx={{
            ...baseButtonSx,
            backgroundColor: isOverviewActive ? "#ffffff" : "transparent",
            color: isOverviewActive ? "primary.main" : "#ffffff",
            "&:hover": {
              backgroundColor: isOverviewActive
                ? "#ffffff"
                : "rgba(255, 255, 255, 0.08)",
            },
          }}
        >
          Overview
        </Button>

        {/* --- Job Management Button --- */}
        <Button
          onClick={() => navigate(jobsPath)}
          sx={{
            ...baseButtonSx,
            backgroundColor: isJobsActive ? "#ffffff" : "transparent",
            color: isJobsActive ? "primary.main" : "#ffffff",
            "&:hover": {
              backgroundColor: isJobsActive
                ? "#ffffff"
                : "rgba(255, 255, 255, 0.08)",
            },
          }}
        >
          Job management
        </Button>

        {/* --- User Management Button --- */}
        <Button
          onClick={() => navigate(usersPath)}
          sx={{
            ...baseButtonSx,
            backgroundColor: isUserManagementActive ? "#ffffff" : "transparent",
            color: isUserManagementActive ? "primary.main" : "#ffffff",
            "&:hover": {
              backgroundColor: isUserManagementActive
                ? "#ffffff"
                : "rgba(255, 255, 255, 0.08)",
            },
          }}
        >
          User management
        </Button>
      </Stack>
    </Box>
  );
};

export default SidePanel;
