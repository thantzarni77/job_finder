import {
  Drawer,
  List,
  ListItem,
  Box,
  Typography,
  ListItemButton,
} from "@mui/material";
import { useAppStore } from "../../store/Appstore";
import { useNavigate } from "react-router";

export default function AppDrawer() {
  const showDrawer = useAppStore((state) => state.showDrawer);
  const setShowDrawer = useAppStore((state) => state.setShowDrawer);

  const navigate = useNavigate();

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
          <ListItem onClick={() => navigate("/")}>
            <ListItemButton sx={{ justifyContent: "center" }}>
              <Typography>Home</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem onClick={() => navigate("/jobs")}>
            <ListItemButton sx={{ justifyContent: "center" }}>
              <Typography>Jobs</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem onClick={() => navigate("/talents")}>
            <ListItemButton sx={{ justifyContent: "center" }}>
              <Typography>Talents</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem onClick={() => navigate("/companies")}>
            <ListItemButton sx={{ justifyContent: "center" }}>
              <Typography>Companies</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton sx={{ justifyContent: "center" }}>
              <Typography>Post A Job</Typography>
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
