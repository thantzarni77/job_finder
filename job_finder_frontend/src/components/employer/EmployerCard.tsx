import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { NavLink } from "react-router";
import CustomApplicantBlack from "../custom_svg/CustomApplicantBlack";
import ApartmentIcon from "@mui/icons-material/Apartment";

const EmployerCard = () => {
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
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  width: "50px",
                  height: "50px",
                }}
                variant="square"
              >
                KBZ <br />
                Pay
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
                    color: "secondary.main",
                    ":hover": { cursor: "pointer", color: "primary.main" },
                  }}
                >
                  <NavLink to={"#"}>KBZ Bank</NavLink>
                </Typography>
                <Typography variant="caption" sx={{ color: "secondary.main" }}>
                  Bank
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
                N0.123, Yadanar St, Marchart Road, Yangon
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
              <CustomApplicantBlack />
              <Typography variant="caption" sx={{ color: "primary.light" }}>
                5,000 employees on site
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
              <ApartmentIcon sx={{ color: "primary.light" }} />
              <Typography variant="caption" sx={{ color: "primary.light" }}>
                Parent company
              </Typography>
            </Box>
          </Box>
        </Box>

        <Typography
          variant="caption"
          sx={{ color: "primary.light", textAlign: "left" }}
        >
          Lorem ipsum dolor sit amet consectetur. Hendrerit aenean lorem sem
          scelerisque blandit. Nunc aliquet diam mi iaculis consectetur commodo
          interdum. Sagittis vitae dictum non auctor at eget. Pulvinar blandit
          convallis blandit dictum ut pulvinar. Condimentum et proin facilisi
          sagittis enim orci ut est. Mattis varius malesuada bibendum pulvinar
          arcu.
        </Typography>
        <Button
          variant="contained"
          sx={{
            my: 2,
            p: 1,
            borderRadius: "10px",
            boxShadow: "none",
            ":hover": {
              boxShadow: "none",
            },
          }}
        >
          Search Jobs
        </Button>
      </Paper>
    </Box>
  );
};

export default EmployerCard;
