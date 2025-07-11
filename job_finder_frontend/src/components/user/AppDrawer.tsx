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
import { useNavigate } from "react-router";

export default function AppDrawer() {
  const navigate = useNavigate();
  const showDrawer = useAppStore((state) => state.showDrawer);
  const setShowDrawer = useAppStore((state) => state.setShowDrawer);

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

          <ListItem>
            <ListItemButton>
              <Link to="/jobs">
                <Typography>Jobs</Typography>
              </Link>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <Link to="/talent">
                <Typography>Talent</Typography>
              </Link>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <Link to="/companies">
                <Typography>Companies</Typography>
              </Link>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <Link to="/post/job">
                <Typography>Post A Job</Typography>
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <Link to="/profile/1">
                <Typography>Profile</Typography>
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <Link to="/notifications/user/1">
                <Typography>Notifications</Typography>
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <Link to="/settings/user/1">
                <Typography>Settings</Typography>
              </Link>
            </ListItemButton>
          </ListItem>

          <ListItem
            onClick={() => navigate("/notifications/user/1")}
            sx={{ display: { xs: "inline-flex", sm: "none" } }}
          >
            <ListItemButton sx={{ justifyContent: "center" }}>
              <Typography>Notifications</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem
            onClick={() => navigate("/settings/user/1")}
            sx={{ display: { xs: "inline-flex", sm: "none" } }}
          >
            <ListItemButton sx={{ justifyContent: "center" }}>
              <Typography>Settings</Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
