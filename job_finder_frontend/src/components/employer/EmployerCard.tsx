import { Box, Paper, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { NavLink } from "react-router";
import { type SingleEmployer } from "../../store/EmployerStore";

const EmployerCard = ({
  employerData,
}: {
  employerData: SingleEmployer | null;
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
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/${employerData?.company_image}`}
                alt={
                  employerData?.company_name ? employerData.company_name : ""
                }
                style={{
                  backgroundColor: "primary.main",
                  borderRadius: "12px",
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
                  <NavLink to={"#"}>{employerData?.company_name}</NavLink>
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {employerData?.company_type}
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
                {employerData?.company_address}
              </Typography>
            </Box>
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "left",
                gap: 1,
              }}
            >
              <GroupsOutlinedIcon />
              <Typography variant="caption" sx={{ color: "primary.light" }}>
                5,000 employees on site
              </Typography>
            </Box> */}

            {/* <Box
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
            </Box> */}
          </Box>
        </Box>

        <Typography
          variant="caption"
          sx={{ color: "primary.light", textAlign: "left" }}
        >
          {employerData?.company_description}
        </Typography>
        {/* <Button
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
        </Button> */}
      </Paper>
    </Box>
  );
};

export default EmployerCard;
