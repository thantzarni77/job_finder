import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import {
  ChatBubbleOutline as MessageIcon,
  SettingsOutlined as SettingIcon,
  NotificationsActiveOutlined as NotiIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { NavLink } from "react-router";
import { useAppContext } from "../../layouts/user/UserMainLayout";

export default function Header() {
  const { showDrawer, setShowDrawer } = useAppContext();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ px: 5 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <IconButton
              onClick={() => setShowDrawer(!showDrawer)}
              color="inherit"
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              component="h1"
              sx={{ fontSize: "36px", fontWeight: "700" }}
            >
              LOGO
            </Typography>

            <Box
              sx={{ pl: 5, display: { md: "flex", sm: "none", xs: "none" } }}
            >
              <NavLink
                to="/"
                style={({ isActive }) => {
                  return {
                    borderBottom: isActive ? "3px solid white" : "",
                  };
                }}
              >
                <Button color="inherit">Home</Button>
              </NavLink>

              <NavLink
                to="/jobs"
                style={({ isActive }) => {
                  return {
                    borderBottom: isActive ? "3px solid white" : "",
                  };
                }}
              >
                <Button color="inherit">Jobs</Button>
              </NavLink>

              <NavLink
                to="/talent"
                style={({ isActive }) => {
                  return {
                    borderBottom: isActive ? "3px solid white" : "",
                  };
                }}
              >
                <Button color="inherit">Talent</Button>
              </NavLink>

              <NavLink
                to="/companies"
                style={({ isActive }) => {
                  return {
                    borderBottom: isActive ? "3px solid white" : "",
                  };
                }}
              >
                <Button color="inherit">Companies</Button>
              </NavLink>

              <NavLink
                to="/post/job"
                style={({ isActive }) => {
                  return {
                    borderBottom: isActive ? "3px solid white" : "",
                  };
                }}
              >
                <Button color="inherit">Post A Job</Button>
              </NavLink>
            </Box>
          </Box>

          {/* left side of header  */}

          <Box sx={{ display: "flex", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton color="inherit">
                <MessageIcon />
              </IconButton>
              <Typography
                sx={{
                  display: { sm: "none", xs: "none", md: "none", lg: "inline" },
                }}
              >
                In Box
              </Typography>
            </Box>

            <IconButton color="inherit">
              <NotiIcon sx={{ fontSize: 27 }} />
            </IconButton>

            <IconButton color="inherit">
              <SettingIcon />
            </IconButton>

            <IconButton>
              <Avatar sx={{ width: 32, height: 32 }} />
            </IconButton>
          </Box>
        </Toolbar>
        <div style={{ border: "5px" }}></div>
      </AppBar>
    </Box>
  );
}
