import {
  Drawer,
  List,
  ListItem,
  Box,
  Typography,
  ListItemButton,
} from "@mui/material";
import { useAppStore } from "../../store/Appstore";

export default function AppDrawer() {
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
            <ListItemButton sx={{ justifyContent: "center" }}>
              <Typography>Home</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton sx={{ justifyContent: "center" }}>
              <Typography>Jobs</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton sx={{ justifyContent: "center" }}>
              <Typography>Talent</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton sx={{ justifyContent: "center" }}>
              <Typography>Companies</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton sx={{ justifyContent: "center" }}>
              <Typography>Post A Job</Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
