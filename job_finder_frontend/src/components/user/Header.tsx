import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  // ChatBubbleOutline as MessageIcon,
  SettingsOutlined as SettingIcon,
  NotificationsActiveOutlined as NotiIcon,
  Menu as MenuIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { NavLink, useLocation, matchPath } from "react-router";
import { useAppStore } from "../../store/Appstore";
import { useState, useRef, useEffect, useMemo, type RefObject } from "react";
import { useNavigate } from "react-router";
import { useThemeStore } from "../../store/Appstore";

function findRefForPath(
  pathname: string,
  pathMap: { [key: string]: RefObject<HTMLButtonElement | null> },
): RefObject<HTMLButtonElement | null> | null {
  for (const pattern in pathMap) {
    if (matchPath({ path: pattern, end: true }, pathname)) {
      return pathMap[pattern];
    }
  }
  return null;
}

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const mode = useThemeStore((state) => state.mode);
  const setMode = useThemeStore((state) => state.setMode);
  const navigate = useNavigate();
  const [userRole] = useState("");

  const showDrawer = useAppStore((state) => state.showDrawer);
  const setShowDrawer = useAppStore((state) => state.setShowDrawer);

  const [underlineStyle, setUnderlineStyle] = useState({});
  const location = useLocation();

  // Refs for all navigation elements
  const homeRef = useRef<HTMLButtonElement>(null);
  const jobsRef = useRef<HTMLButtonElement>(null);
  const talentRef = useRef<HTMLButtonElement>(null);
  const companiesRef = useRef<HTMLButtonElement>(null);
  const postJobRef = useRef<HTMLButtonElement>(null);
  const profileRef = useRef<HTMLButtonElement>(null);
  const notificationsRef = useRef<HTMLButtonElement>(null);
  const settingsRef = useRef<HTMLButtonElement>(null);

  // memo map to link paths to their refs
  const pathRefMap: { [key: string]: RefObject<HTMLButtonElement | null> } =
    useMemo(
      () => ({
        "/": homeRef,
        "/jobs": jobsRef,
        "/job/:id": jobsRef,
        "/job/:id/apply": jobsRef,
        "/job/:id/apply/confirm": jobsRef,
        "/talents": talentRef,
        "/companies": companiesRef,
        "/companies/:id": companiesRef,
        "/post/job": postJobRef,
        "/profile/:id": profileRef,
        "/notifications/user/:id": notificationsRef,
        "/settings/user/:id": settingsRef,
        "/settings/user/:id/bookmarks": settingsRef,
        "/settings/user/:id/bookmarks/savedJobs": settingsRef,
        "/settings/user/:id/bookmarks/following": settingsRef,
        "/settings/user/:id/security": settingsRef,
        "/settings/user/:id/security/changeEmail": settingsRef,
        "/settings/user/:id/security/changePassword": settingsRef,
      }),
      [],
    );

  useEffect(() => {
    const activeTabRef = findRefForPath(location.pathname, pathRefMap);

    if (activeTabRef && activeTabRef.current) {
      setUnderlineStyle({
        left: activeTabRef.current.offsetLeft,
        width: activeTabRef.current.offsetWidth,
      });
    } else {
      setUnderlineStyle({
        width: 0,
      });
    }
  }, [location.pathname, pathRefMap]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ px: { xs: 2, md: 5 }, boxShadow: "none" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
<<<<<<< HEAD
            position: "relative",
            minHeight: { xs: 56, sm: 64 },
            px: { xs: 0, sm: 2 },
          }}
        >
          {/* Left side of header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              minWidth: 0,
            }}
          >
            <IconButton
              onClick={() => setShowDrawer(!showDrawer)}
              color="inherit"
              sx={{
                display: { md: "none" },
                ml: -1,
                mr: 1,
                p: 1,
              }}
            >
              <MenuIcon />
            </IconButton>

=======
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
>>>>>>> 9e7a7fbe (rebase)
            <Typography
              onClick={() => navigate("/")}
              component="h1"
              sx={{
                fontSize: { xs: "24px", sm: "30px", md: "36px" },
                fontWeight: "700",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              LOGO
            </Typography>

            {/* Desktop Navigation */}
            <Box
              sx={{
                pl: 5,
                display: { md: "flex", sm: "none", xs: "none" },
              }}
            >
              <NavLink to="/">
                <Button
                  sx={{ fontWeight: "700", textTransform: "none" }}
                  ref={homeRef}
                  color="inherit"
                >
                  Home
                </Button>
              </NavLink>
              <NavLink to="/jobs">
                <Button
                  sx={{ fontWeight: "700", textTransform: "none" }}
                  ref={jobsRef}
                  color="inherit"
                >
                  Jobs
                </Button>
              </NavLink>
              <NavLink to="/talents">
                <Button
                  sx={{ fontWeight: "700", textTransform: "none" }}
                  ref={talentRef}
                  color="inherit"
                >
                  Talent
                </Button>
              </NavLink>
              <NavLink to="/companies">
                <Button
                  sx={{ fontWeight: "700", textTransform: "none" }}
                  ref={companiesRef}
                  color="inherit"
                >
                  Companies
                </Button>
              </NavLink>
              {userRole === "employer" && (
                <NavLink to="/post/job">
                  <Button
                    sx={{ fontWeight: "700", textTransform: "none" }}
                    ref={postJobRef}
                    color="inherit"
                  >
                    Post A Job
                  </Button>
                </NavLink>
              )}
            </Box>
          </Box>

          {/* Right side of header */}
<<<<<<< HEAD
          <Box
            sx={{
              display: "flex",
              gap: { xs: 0.5, sm: 1 },
              flexShrink: 0,
              alignItems: "center",
            }}
          >
=======
          <IconButton
            onClick={() => setShowDrawer(!showDrawer)}
            color="inherit"
            sx={{ display: { md: "none" }, ml: -2, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ gap: 1, display: { md: "flex", sm: "none", xs: "none" } }}>
>>>>>>> 9e7a7fbe (rebase)
            <IconButton
              color="inherit"
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              sx={{
                p: { xs: 0.5, sm: 1 },
              }}
            >
              {mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            <IconButton
              color="inherit"
              ref={notificationsRef}
              onClick={() => navigate("/notifications/user/1")}
              sx={{
                p: { xs: 0.5, sm: 1 },
                display: { xs: "none", sm: "inline-flex" },
              }}
            >
              <NotiIcon sx={{ fontSize: { xs: 22, sm: 27 } }} />
            </IconButton>

            <IconButton
              color="inherit"
              ref={settingsRef}
              onClick={() => navigate("/settings/user/1")}
              sx={{
                p: { xs: 0.5, sm: 1 },
                display: { xs: "none", sm: "inline-flex" },
              }}
            >
              <SettingIcon />
            </IconButton>

            <Button
              ref={profileRef}
              endIcon={<ArrowDropDownIcon sx={{ color: "white" }} />}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{
                minWidth: "auto",
                p: { xs: 0.5, sm: 1 },
              }}
            >
              <Avatar
                sx={{ width: { xs: 28, sm: 32 }, height: { xs: 28, sm: 32 } }}
              />
            </Button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button",
                },
              }}
            >
              <MenuItem onClick={() => navigate("/profile/1")}>
                Profile
              </MenuItem>
              <MenuItem>Logout</MenuItem>
            </Menu>
          </Box>

          {/* Sliding underline*/}
          <Box
            sx={{
              position: "absolute",
              bottom: 10,
              height: "3px",
              backgroundColor: "white",
              borderRadius: "2px",
              transition: "left 0.3s ease-in-out, width 0.3s ease-in-out",
              ...underlineStyle,
              display: { md: "block", sm: "none", xs: "none" },
            }}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
