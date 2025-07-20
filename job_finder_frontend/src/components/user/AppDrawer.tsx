import {
  Drawer,
  List,
  ListItem,
  Box,
  Typography,
  ListItemButton,
} from "@mui/material";
import { useAppStore } from "../../store/Appstore";
import { Link } from "react-router";
import { useUserStore } from "../../store/UserStore";
import { useProfileStore } from "../../store/ProfileStore";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../helper/authApiFunctions";

export default function AppDrawer() {
  const showDrawer = useAppStore((state) => state.showDrawer);
  const setShowDrawer = useAppStore((state) => state.setShowDrawer);

  const user = useUserStore((state) => state.user);
  const setUserData = useUserStore((state) => state.setUserData);
  const removeToken = useUserStore((state) => state.removeToken);

  const employerProfile = useProfileStore((state) => state.employerProfile);

  const logoutMutate = useMutation({
    mutationFn: logoutUser,
    onSuccess: ({ data }) => {
      if (data.status == 200) {
        setUserData(null);
        removeToken();
      }
    },
  });
  return (
    <Drawer
      open={showDrawer}
      onClose={() => setShowDrawer(false)}
      onClick={() => setShowDrawer(false)}
    >
      <Box sx={{ width: 250, py: 3 }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: "700" }}
        >
          LOGO
        </Typography>
        <List>
          <ListItem>
            <ListItemButton>
              <Link to="/">
                <Typography>Home</Typography>
              </Link>
            </ListItemButton>
          </ListItem>

          <ListItem sx={{ display: { xs: "inline-flex", sm: "none" } }}>
            <ListItemButton>
              <Link to="/jobs">
                <Typography>Jobs</Typography>
              </Link>
            </ListItemButton>
          </ListItem>

          {user?.user_type == "employer" && (
            <ListItem sx={{ display: { xs: "inline-flex", sm: "none" } }}>
              <ListItemButton>
                <Link to="/talents">
                  <Typography>Talents</Typography>
                </Link>
              </ListItemButton>
            </ListItem>
          )}

          {user?.user_type == "seeker" && (
            <ListItem sx={{ display: { xs: "inline-flex", sm: "none" } }}>
              <ListItemButton>
                <Link to="/companies">
                  <Typography>Companies</Typography>
                </Link>
              </ListItemButton>
            </ListItem>
          )}

          {user?.user_type == "employer" && (
            <ListItem sx={{ display: { xs: "inline-flex", sm: "none" } }}>
              <ListItemButton
                disabled={employerProfile.verification == "pending"}
              >
                <Link to="/post/job">
                  <Typography>Post A Job</Typography>
                </Link>
              </ListItemButton>
            </ListItem>
          )}

          <ListItem>
            <ListItemButton>
              <Link
                to={
                  user?.user_type == "seeker"
                    ? `/profile/${user.user_id}`
                    : `/employer-profile/${user?.user_id}`
                }
              >
                <Typography>Profile</Typography>
              </Link>
            </ListItemButton>
          </ListItem>

          <ListItem sx={{ display: { xs: "inline-flex", sm: "none" } }}>
            <ListItemButton>
              <Link to="/notifications/user/1">
                <Typography>Notifications</Typography>
              </Link>
            </ListItemButton>
          </ListItem>

          <ListItem sx={{ display: { xs: "inline-flex", sm: "none" } }}>
            <ListItemButton>
              <Link to="/settings/user/1">
                <Typography>Settings</Typography>
              </Link>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={() => logoutMutate.mutate()}>
              <Typography>Logout</Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
