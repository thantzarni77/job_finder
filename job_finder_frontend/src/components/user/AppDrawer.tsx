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

export default function AppDrawer() {
  const showDrawer = useAppStore((state) => state.showDrawer);
  const setShowDrawer = useAppStore((state) => state.setShowDrawer);

  const user = useUserStore((state) => state.user);

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
              <ListItemButton>
                <Link to="/post/job">
                  <Typography>Post A Job</Typography>
                </Link>
              </ListItemButton>
            </ListItem>
          )}

          <ListItem>
            <ListItemButton>
              <Link to="/profile/1">
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
        </List>
      </Box>
    </Drawer>
  );
}
