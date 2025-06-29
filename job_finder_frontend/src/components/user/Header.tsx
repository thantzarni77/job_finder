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
import { NavLink, useLocation, matchPath } from "react-router";
import { useAppStore } from "../../store/Appstore";
import { useState, useRef, useEffect, useMemo, type RefObject } from "react";

function findRefForPath(
  pathname: string,
  pathMap: { [key: string]: RefObject<HTMLButtonElement | null> },
): RefObject<HTMLButtonElement | null> | null {
  for (const pattern in pathMap) {
    // Check if the current URL pathname matches the pattern from the map
    if (matchPath({ path: pattern, end: true }, pathname)) {
      return pathMap[pattern];
    }
  }
  return null;
}

export default function Header() {
  //sample role test
  const [userRole] = useState("");

  const showDrawer = useAppStore((state) => state.showDrawer);
  const setShowDrawer = useAppStore((state) => state.setShowDrawer);

  const [underlineStyle, setUnderlineStyle] = useState({});
  const location = useLocation();

  //  ref for each nav button
  const homeRef = useRef<HTMLButtonElement>(null);
  const jobsRef = useRef<HTMLButtonElement>(null);
  const talentRef = useRef<HTMLButtonElement>(null);
  const companiesRef = useRef<HTMLButtonElement>(null);
  const postJobRef = useRef<HTMLButtonElement>(null);

  // memo map to link paths to their refs
  const pathRefMap: { [key: string]: RefObject<HTMLButtonElement | null> } =
    useMemo(
      () => ({
        "/": homeRef,
        "/jobs": jobsRef,
        "/job/:id": jobsRef,
        "/job/:id/apply": jobsRef,
        "/job/:id/apply/confirm": jobsRef,
        "/talent": talentRef,
        "/companies": companiesRef,
        "/post/job": postJobRef,
      }),
      [],
    );

  useEffect(() => {
    // get active ref  from  map using the current path
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
      <AppBar position="static" sx={{ px: 5, boxShadow: "none" }}>
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
              sx={{
                pl: 5,
                display: { md: "flex", sm: "none", xs: "none" },
                position: "relative",
              }}
            >
              <NavLink to="/">
                <Button
                  sx={{
                    fontWeight: "700",
                    textTransform: "none",
                  }}
                  ref={homeRef}
                  color="inherit"
                >
                  Home
                </Button>
              </NavLink>

              <NavLink to="/jobs">
                <Button
                  sx={{
                    fontWeight: "700",
                    textTransform: "none",
                  }}
                  ref={jobsRef}
                  color="inherit"
                >
                  Jobs
                </Button>
              </NavLink>

              <NavLink to="/talent">
                <Button
                  sx={{
                    fontWeight: "700",
                    textTransform: "none",
                  }}
                  ref={talentRef}
                  color="inherit"
                >
                  Talent
                </Button>
              </NavLink>

              <NavLink to="/companies">
                <Button
                  sx={{
                    fontWeight: "700",
                    textTransform: "none",
                  }}
                  ref={companiesRef}
                  color="inherit"
                >
                  Companies
                </Button>
              </NavLink>

              {userRole == "employer" && (
                <NavLink to="/post/job">
                  <Button
                    sx={{
                      fontWeight: "700",
                      textTransform: "none",
                    }}
                    ref={postJobRef}
                    color="inherit"
                  >
                    Post A Job
                  </Button>
                </NavLink>
              )}

              {/* The Sliding Underline*/}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  height: "3px",
                  backgroundColor: "white",
                  borderRadius: "2px",
                  transition: "left 0.2s ease-out, width 0.2s ease-out",
                  ...underlineStyle,
                }}
              />
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
      </AppBar>
    </Box>
  );
}
