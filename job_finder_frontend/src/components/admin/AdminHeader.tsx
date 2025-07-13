import { AppBar, Toolbar, Box, IconButton, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAdminMenuStore } from "../../store/AdminAppStore";

export default function AdminHeader() {
  const showMenu = useAdminMenuStore((state) => state.showMenu);
  const setShowMenu = useAdminMenuStore((state) => state.setShowMenu);

  return (
    <Box>
      <AppBar
        position="static"
        sx={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <IconButton size="large" onClick={() => setShowMenu(!showMenu)}>
            <MenuIcon fontSize="inherit" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <IconButton>
              <NotificationsIcon sx={{ fontSize: 32 }} />
            </IconButton>
            <Avatar sx={{ width: 32, height: 32 }} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
