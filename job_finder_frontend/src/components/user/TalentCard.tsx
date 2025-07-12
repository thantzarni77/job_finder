import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import AddIcon from "@mui/icons-material/Add";
import { NavLink } from "react-router";

export default function TalentCard() {
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Paper
        elevation={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "325px", md: "375px" },
          borderRadius: "20px",
          boxShadow: "none",
          px: 3,
          py: 2,
        }}
      >
        <Box>
          {/* image title bookmark */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                src="../../src/assets/1.jpg"
                sx={{ width: 56, height: 56 }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "700",
                    color: "text.secondary",
                    ":hover": { cursor: "pointer", color: "primary.main" },
                  }}
                >
                  <NavLink to={"/job/JC-1111"}>Full Stack Developer</NavLink>
                </Typography>
              </Box>
            </Box>
            <IconButton>
              <AddIcon />
            </IconButton>
          </Box>
          {/* location date */}
          <Box sx={{ my: 2 }}>
            <Box
              sx={{
                display: "flex",
                textAlign: "left",
                alignItems: "start",
                gap: 1,
                mb: 1,
              }}
            >
              <LocationOnOutlinedIcon
                sx={{ color: "primary.light", fontSize: 22 }}
              />

              <Typography
                variant="caption"
                sx={{ color: "primary.light", width: "250px" }}
              >
                Yangon
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "left",
                gap: 1,
              }}
            >
              <QueryBuilderIcon sx={{ color: "primary.light", fontSize: 22 }} />
              <Typography variant="caption" sx={{ color: "primary.light" }}>
                posted on 1 day ago
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* tags */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Chip
            sx={{
              borderRadius: "4px",
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              width: "fit-content",
              height: "28px",
            }}
            label="Full Time"
          />
          <Chip
            sx={{
              borderRadius: "4px",
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              width: "fit-content",
              height: "28px",
            }}
            label="Senior"
          />
          <Chip
            sx={{
              borderRadius: "4px",
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              width: "fit-content",
              height: "28px",
            }}
            label="IT"
          />
        </Box>
        <Divider flexItem />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: "text.secondary" }}
          >
            Salary
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: "text.secondary" }}
          >
            50MMK
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
