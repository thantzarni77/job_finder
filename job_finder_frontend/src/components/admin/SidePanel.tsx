import {
  Box,
  Typography,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableChartIcon from "@mui/icons-material/TableChart";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useMatch, useNavigate } from "react-router";
import { useAdminMenuStore } from "../../store/AdminAppStore";

const SidePanel = () => {
  const navigate = useNavigate();
  const showMenu = useAdminMenuStore((state) => state.showMenu);

  // paths for each route
  const overviewPath = "/admin/overview";
  const jobsPath = "/admin/jobs/manage";
  const usersPath = "/admin/seekers/manage";
  const userDetailPath = "/admin/seeker/:id/manage";
  const employerPath = "/admin/employer/1/manage";

  const isOverviewActive = useMatch(overviewPath);
  const isJobsActive = useMatch(jobsPath);
  const isUsersListActive = useMatch(usersPath);
  const isUserDetailActive = useMatch(userDetailPath);
  const isUserManagementActive = isUsersListActive || isUserDetailActive;
  const isEmployerActive = useMatch(employerPath);

  const baseButtonSx = {
    width: "fit-content",
    justifyContent: "center",
    textTransform: "none",
    fontWeight: 600,
    fontSize: "0.9rem",
    // borderRadius: "8px",
    whiteSpace: "nowrap",
  };

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          flexGrow: 1,
          textAlign: "center",
          my: 3,
        }}
        fontSize="medium"
      >
        LOGO
      </Typography>
      <ListItem disableGutters sx={{ width: "100%" }}>
        <ListItemButton>
          <ListItemIcon sx={{ ...baseButtonSx }}>
            <DashboardIcon />
          </ListItemIcon>
          {showMenu && <ListItemText primary="DashBoard" />}
        </ListItemButton>
      </ListItem>

      <ListItem disableGutters sx={{ width: "100%" }}>
        <ListItemButton
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
          <ListItemIcon
            sx={{
              ...baseButtonSx,
              color: isOverviewActive ? "primary.main" : "#ffffff",
            }}
          >
            <TableChartIcon />
          </ListItemIcon>
          {showMenu && <ListItemText primary="Overview" />}
        </ListItemButton>
      </ListItem>

      <ListItem disableGutters sx={{ width: "100%" }}>
        <ListItemButton
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
          <ListItemIcon
            sx={{
              ...baseButtonSx,
              color: isJobsActive ? "primary.main" : "#ffffff",
            }}
          >
            <WorkIcon />
          </ListItemIcon>
          {showMenu && <ListItemText primary="Job management" />}
        </ListItemButton>
      </ListItem>

      <ListItem disableGutters sx={{ width: "100%" }}>
        <ListItemButton
          onClick={() => navigate(employerPath)}
          sx={{
            ...baseButtonSx,
            backgroundColor: isEmployerActive ? "#ffffff" : "transparent",
            color: isEmployerActive ? "primary.main" : "#ffffff",
            "&:hover": {
              backgroundColor: isEmployerActive
                ? "#ffffff"
                : "rgba(255, 255, 255, 0.08)",
            },
          }}
        >
          <ListItemIcon
            sx={{
              ...baseButtonSx,
              color: isEmployerActive ? "primary.main" : "#ffffff",
            }}
          >
            <PersonIcon />
          </ListItemIcon>
          {showMenu && <ListItemText primary="Employer management" />}
        </ListItemButton>
      </ListItem>

      <ListItem disableGutters sx={{ width: "100%" }}>
        <ListItemButton
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
          <ListItemIcon
            sx={{
              ...baseButtonSx,
              color: isUserManagementActive ? "primary.main" : "#ffffff",
            }}
          >
            <PersonSearchIcon />
          </ListItemIcon>
          {showMenu && <ListItemText primary="Seeker management" />}
        </ListItemButton>
      </ListItem>
    </Box>
  );
};

export default SidePanel;
