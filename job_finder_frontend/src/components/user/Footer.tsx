import { Box, Typography } from "@mui/material";
import {
  FacebookOutlined as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material";
import { Link } from "react-router";
import { useTheme } from "@mui/material";
export default function Footer() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: "350px",
        backgroundColor: theme.palette.mode === "dark" ? "#272727" : "#5f6caf",
        color: "#ffffff",
        py: 3,
        mt: 20,
      }}
      className="grid grid-cols-1 md:grid-cols-2"
    >
      <Box sx={{ pl: 8 }}>
        <Typography sx={{ fontWeight: 700, fontSize: "36px" }}>LOGO</Typography>
      </Box>

      <Box className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography sx={{ fontWeight: "bold", mb: 2 }}>Get Hired</Typography>
          <Link to="/">
            <Typography variant="body2" sx={{ mb: 1 }}>
              Search Jobs
            </Typography>
          </Link>
          <Link to="/">
            <Typography variant="body2" sx={{ mb: 1 }}>
              Top Companies
            </Typography>
          </Link>
          <Link to="/">
            <Typography variant="body2" sx={{ mb: 1 }}>
              Log In
            </Typography>
          </Link>
        </Box>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography sx={{ fontWeight: "bold", mb: 2 }}>Freelancer</Typography>
          <Link to="/">
            <Typography variant="body2" sx={{ mb: 1 }}>
              Find Talent
            </Typography>
          </Link>
        </Box>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography sx={{ fontWeight: "bold", mb: 2 }}>Name</Typography>
          <Link to="/">
            <Typography variant="body2" sx={{ mb: 1 }}>
              About Us
            </Typography>
          </Link>
          <Link to="/">
            <Typography variant="body2" sx={{ mb: 1 }}>
              Contact Us
            </Typography>
          </Link>
        </Box>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography sx={{ fontWeight: "bold", mb: 2 }}>
            Social Media
          </Typography>
          <Link to="/">
            <Typography variant="body2" sx={{ mb: 1 }}>
              <FacebookIcon sx={{ mr: 1, width: 20 }} />
              Job Seek
            </Typography>
          </Link>
          <Link to="/">
            <Typography variant="body2" sx={{ mb: 1 }}>
              <InstagramIcon sx={{ mr: 1, width: 20 }} />
              Job Seek
            </Typography>
          </Link>
          <Link to="/">
            <Typography variant="body2" sx={{ mb: 1 }}>
              <LinkedInIcon sx={{ mr: 1, width: 20 }} />
              Job Seek
            </Typography>
          </Link>
          <Link to="/">
            <Typography variant="body2" sx={{ mb: 1 }}>
              <TwitterIcon sx={{ mr: 1, width: 20 }} />
              Job Seek
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
