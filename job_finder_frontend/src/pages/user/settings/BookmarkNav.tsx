import { Box, Typography, Link } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  NavLink,
  useLocation,
  useNavigate,
  useParams,
  matchPath,
} from "react-router";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";

// This helper function is okay, no changes needed here.
function findRefForPath(
  pathname: string,
  pathMap: { [key: string]: RefObject<HTMLElement | null> },
): RefObject<HTMLElement | null> | null {
  for (const pattern in pathMap) {
    if (matchPath({ path: pattern, end: true }, pathname)) {
      return pathMap[pattern];
    }
  }
  return null;
}

const BookmarkNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // to get dynamic link id
  const { id } = useParams<{ id: string }>();

  const savedJobsRef = useRef<HTMLAnchorElement>(null);
  const followingRef = useRef<HTMLAnchorElement>(null);

  const [underlineStyle, setUnderlineStyle] = useState({});

  // use  dynamic ID from useParams to match patterns
  const pathRefMap = useMemo(
    () => ({
      [`/settings/user/${id}/bookmarks/savedJobs`]: savedJobsRef,
      [`/settings/user/${id}/bookmarks/following`]: followingRef,

      //base root for bookmark path
      [`/settings/user/${id}/bookmarks`]: savedJobsRef,
    }),
    [id],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const activeTabRef = findRefForPath(location.pathname, pathRefMap);

      if (activeTabRef?.current) {
        setUnderlineStyle({
          left: activeTabRef.current.offsetLeft,
          width: activeTabRef.current.offsetWidth,
        });
      } else {
        setUnderlineStyle({ width: 0, left: 0 });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname, pathRefMap]);

  return (
    <Box sx={{ width: "100%", mx: "auto" }}>
      {/* Title & back button */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mt: 5,
          mb: 2,
        }}
      >
        <ArrowBackIosIcon
          onClick={() => navigate(`/settings/user/${id}`)}
          sx={{
            color: "primary.main",
            fontSize: 32,
            ":hover": { color: "secondary.main", cursor: "pointer" },
          }}
        />
        <Typography variant="h5" sx={{ fontWeight: 600, mx: "auto" }}>
          Bookmarks
        </Typography>
      </Box>

      <Box sx={{ position: "relative", my: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Link
            ref={savedJobsRef}
            component={NavLink}
            to={`/settings/user/${id}/bookmarks/savedJobs`}
            sx={{
              fontWeight: 600,
              color: "primary.main",
              textDecoration: "none",
            }}
          >
            Saved Jobs
          </Link>
          <Link
            ref={followingRef}
            component={NavLink}
            to={`/settings/user/${id}/bookmarks/following`}
            sx={{
              fontWeight: 600,
              color: "primary.main",
              textDecoration: "none",
            }}
          >
            Following
          </Link>
        </Box>

        {/* Sliding underline */}
        <Box
          sx={{
            position: "absolute",
            bottom: -5,
            height: "3px",
            backgroundColor: "primary.main",
            borderRadius: "2px",
            transition: "left 0.3s ease-in-out, width 0.3s ease-in-out",
            ...underlineStyle,
          }}
        />
      </Box>
    </Box>
  );
};

export default BookmarkNav;
