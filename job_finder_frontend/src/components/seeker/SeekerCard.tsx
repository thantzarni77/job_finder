import { Box, Chip, Paper, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { NavLink } from "react-router";
import { format } from "date-fns";
import type { Seeker } from "../../helper/talentPage";

const SeekerCard = ({ seeker }: { seeker: Seeker }) => {
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
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/${seeker.image}`}
                style={{
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  width: "50px",
                  height: "50px",
                }}
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
                  <NavLink to={`/talent/${seeker.user_id.id}/profile`}>
                    {seeker.user_id.name}
                  </NavLink>
                </Typography>
              </Box>
            </Box>
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
                {seeker.user_id.address ? seeker.user_id.address : "No Data"}
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
                joined on {format(new Date(seeker.created_at), "PPP")}
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
              label={seeker.talent}
            />
            <Chip
              sx={{
                borderRadius: "4px",
                backgroundColor: "primary.main",
                color: "background.paper",
                width: "fit-content",
                height: "28px",
              }}
              label={seeker.skills[0]}
            />
            <Chip
              sx={{
                borderRadius: "4px",
                backgroundColor: "primary.main",
                color: "background.paper",
                width: "fit-content",
                height: "28px",
              }}
              label={seeker.education[0].degree}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SeekerCard;
