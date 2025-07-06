import { Avatar, Box, Checkbox, Paper, Typography } from "@mui/material";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { NavLink } from "react-router";
import CustomSuitCase from "../custom_svg/CustomSuitCase";

const CompanyCard = () => {
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
                K
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
                  <NavLink to={"/companies/1"}>KBZ Bank</NavLink>
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
              icon={<TurnedInNotIcon />}
              checkedIcon={<TurnedInIcon />}
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
                mb: 1,
              }}
            >
              <QueryBuilderIcon sx={{ color: "primary.light", fontSize: 22 }} />
              <Typography variant="caption" sx={{ color: "primary.light" }}>
                posted on 1 day ago
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "left",
                gap: 1,
                ml: "1px",
              }}
            >
              <CustomSuitCase />
              <Typography variant="caption" sx={{ color: "primary.light" }}>
                30 opened vacancies
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CompanyCard;
