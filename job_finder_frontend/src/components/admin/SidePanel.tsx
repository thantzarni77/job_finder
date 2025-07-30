import {
  Box,
  Typography,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import TableChartIcon from "@mui/icons-material/TableChart";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import WorkIcon from "@mui/icons-material/Work";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useMatch, useNavigate } from "react-router";
import { useAdminMenuStore } from "../../store/AdminAppStore";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../store/UserStore";
import { logoutUser } from "../../helper/authApiFunctions";
import { useUserDataStore } from "../../store/UserDataStore";

const SidePanel = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const showMenu = useAdminMenuStore((state) => state.showMenu);
  const userData = useUserDataStore((state) => state.userData);
  const setUserData = useUserStore((state) => state.setUserData);
  const removeToken = useUserStore((state) => state.removeToken);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // paths for each route
  const overviewPath = "/admin/overview";
  const categoryPath = "/admin/categories";
  const jobsPath = "/admin/jobs/manage";
  const jobsPendingPath = "/admin/jobs/manage/pending";
  const jobsDetailPath = "/admin/jobs/detail/:id";
  const usersPath = "/admin/seekers/manage";
  const adminPath = "/admin/list/admins";
  const addAdminPath = "/admin/add";
  const userDetailPath = "/admin/seeker/:id/manage";
  const employerPath = "/admin/employer/:id/manage";

  const isOverviewActive = useMatch(overviewPath);
  const isCategoryActive = useMatch(categoryPath);
  const isJobAllActive = useMatch(jobsPath);
  const isJobPendingActive = useMatch(jobsPendingPath);
  const isJobDetailActive = useMatch(jobsDetailPath);
  const isJobsActive =
    isJobAllActive || isJobDetailActive || isJobPendingActive;
  const isAdminListActive = useMatch(adminPath);
  const isAdminPathActive = useMatch(addAdminPath);
  const isAdminActive = isAdminListActive || isAdminPathActive;
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
    borderRadius: "12px",
    whiteSpace: "nowrap",
    padding: "8px 12px",
  };

  const listItemContainerSx = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    px: 5,
  };

  const logoutMutate = useMutation({
    mutationFn: logoutUser,
    onSuccess: ({ data }) => {
      if (data.status == 200) {
        setUserData(null);
        removeToken();
        queryClient.clear();
      }
    },
  });

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="shorlist-confirmation"
      >
        <DialogTitle id="shorlist-confirmation">{"Logout?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{
              bgcolor: "primary.light",
              boxShadow: "none",
              ":hover": {
                boxShadow: "none",
              },
              textTransform: "none",
              borderRadius: 1,
            }}
            autoFocus
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "primary.main",
              boxShadow: "none",
              ":hover": {
                boxShadow: "none",
              },
              textTransform: "none",
              borderRadius: 1,
            }}
            onClick={() => {
              logoutMutate.mutate();
              handleClose();
            }}
            autoFocus
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          flexGrow: 1,
          textAlign: "center",
          my: 3,
          color: "#ffffff",
        }}
      >
        LOGO
      </Typography>

      <ListItem disableGutters sx={{ listItemContainerSx }}>
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
      {/* admins */}
      {userData.user_type == "superadmin" && (
        <ListItem disableGutters sx={{ listItemContainerSx }}>
          <ListItemButton
            onClick={() => navigate(adminPath)}
            sx={{
              ...baseButtonSx,
              backgroundColor: isAdminActive ? "#ffffff" : "transparent",
              color: isAdminActive ? "primary.main" : "#ffffff",
              "&:hover": {
                backgroundColor: isAdminActive
                  ? "#ffffff"
                  : "rgba(255, 255, 255, 0.08)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                ...baseButtonSx,
                color: isAdminActive ? "primary.main" : "#ffffff",
              }}
            >
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            {showMenu && <ListItemText primary="Admins" />}
          </ListItemButton>
        </ListItem>
      )}

      <ListItem disableGutters sx={{ listItemContainerSx }}>
        <ListItemButton
          onClick={() => navigate(categoryPath)}
          sx={{
            ...baseButtonSx,
            backgroundColor: isCategoryActive ? "#ffffff" : "transparent",
            color: isCategoryActive ? "primary.main" : "#ffffff",
            "&:hover": {
              backgroundColor: isCategoryActive
                ? "#ffffff"
                : "rgba(255, 255, 255, 0.08)",
            },
          }}
        >
          <ListItemIcon
            sx={{
              ...baseButtonSx,
              color: isCategoryActive ? "primary.main" : "#ffffff",
            }}
          >
            <ClassOutlinedIcon />
          </ListItemIcon>
          {showMenu && <ListItemText primary="Categories" />}
        </ListItemButton>
      </ListItem>

      <ListItem disableGutters sx={{ listItemContainerSx }}>
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

      <ListItem disableGutters sx={{ listItemContainerSx }}>
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

      <ListItem disableGutters sx={{ listItemContainerSx }}>
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

      <ListItem disableGutters sx={{ listItemContainerSx }}>
        <ListItemButton
          onClick={handleClickOpen}
          sx={{
            ...baseButtonSx,
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            },
          }}
        >
          <ListItemIcon
            sx={{
              ...baseButtonSx,
              color: "#ffffff",
            }}
          >
            <ExitToAppIcon />
          </ListItemIcon>
          {showMenu && <ListItemText primary="Logout" />}
        </ListItemButton>
      </ListItem>
    </Box>
  );
};

export default SidePanel;
