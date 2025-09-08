import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAdminMenuStore } from "../../store/AdminAppStore";
import { useUserDataStore } from "../../store/UserDataStore";

export default function AdminHeader() {
  const showMenu = useAdminMenuStore((state) => state.showMenu);
  const setShowMenu = useAdminMenuStore((state) => state.setShowMenu);
  const userProfile = useUserDataStore((state) => state.userData);

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "transparent", boxShadow: "none" }}
    >
      <Toolbar>
        <IconButton size="large" onClick={() => setShowMenu(!showMenu)}>
          <MenuIcon fontSize="inherit" />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Avatar sx={{ width: 32, height: 32 }} />
          {userProfile && (
            <Typography sx={{ color: "text.primary" }}>
              {userProfile.name}
            </Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
