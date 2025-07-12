import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { NavLink } from "react-router";

const SeekerCard = () => {
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
                variant="square"
              >
                F
              </Avatar>
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
                  <NavLink to={""}>Full Stack Developer</NavLink>
                </Typography>
              </Box>
            </Box>
            <Checkbox
              disableRipple
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 26, mr: -2 },
                color: "primary.main",
                "&.Mui-checked": {
                  color: "primary.main",
                },
              }}
              icon={<AddCircleIcon />}
              checkedIcon={<CheckCircleIcon sx={{ color: "#75C149" }} />}
              name={"fullTime"}
            />
          </Box>
          {/* location date */}
          <Box sx={{ my: 1 }}>
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

              <Typography variant="caption" sx={{ color: "primary.light" }}>
                Yangon
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "left",
                gap: 1,
                mb: 1,
              }}
            >
              <QueryBuilderIcon sx={{ color: "primary.light", fontSize: 22 }} />
              <Typography variant="caption" sx={{ color: "primary.light" }}>
                posted on 1 day ago
              </Typography>
            </Box>
          </Box>
          {/* tags */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Chip
              sx={{
                borderRadius: "4px",
                backgroundColor: "primary.main",
                color: "background.paper",
                width: "fit-content",
                height: "28px",
              }}
              label="Chip Filled"
            />
            <Chip
              sx={{
                borderRadius: "4px",
                backgroundColor: "primary.main",
                color: "background.paper",
                width: "fit-content",
                height: "28px",
              }}
              label="Chip Filled"
            />
            <Chip
              sx={{
                borderRadius: "4px",
                backgroundColor: "primary.main",
                color: "background.paper",
                width: "fit-content",
                height: "28px",
              }}
              label="Chip Filled"
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
              800000MMK
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SeekerCard;
