import { Avatar, Box, Paper, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { NavLink } from "react-router";
import type { IndividualJob } from "../../store/UserDataStore";

const IndividualCard = ({
  individualData,
}: {
  individualData: IndividualJob | null;
}) => {
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Paper
        elevation={1}
        sx={{
          mx: { xs: "none", sm: "auto", md: "auto", lg: "none" },
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", sm: "90%", md: "90%", lg: "380px" },
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
              {individualData?.profile_picture && (
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/${individualData?.profile_picture}`}
                  alt={individualData?.name}
                  style={{
                    backgroundColor: "primary.main",
                    borderRadius: "12px",
                    width: "50px",
                    height: "50px",
                  }}
                />
              )}
              {!individualData?.profile_picture && (
                <Avatar
                  variant="rounded"
                  sx={{ width: "45px", height: "45px" }}
                />
              )}
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
                  <NavLink to={"#"}>{individualData?.name}</NavLink>
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* company info */}
          <Box sx={{ my: 1 }}>
            <Box
              sx={{
                display: "flex",
                textAlign: "left",
                alignItems: "start",
                gap: 1,
              }}
            >
              <LocationOnOutlinedIcon
                sx={{ color: "primary.light", fontSize: 25 }}
              />

              <Typography
                variant="caption"
                sx={{ color: "primary.light", width: "250px" }}
              >
                {individualData?.address ? individualData?.address : "No Data"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default IndividualCard;
