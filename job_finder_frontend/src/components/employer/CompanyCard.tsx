import { Box, Paper, Typography } from "@mui/material";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { NavLink } from "react-router";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { type Employer } from "../../helper/companyPageApi";
import { format } from "date-fns";

const CompanyCard = ({ company }: { company: Employer }) => {
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
                src={`${import.meta.env.VITE_API_BASE_URL}/${company.company_image}`}
                alt=""
                style={{ width: 60, height: 60, borderRadius: 10 }}
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
                  <NavLink to={"/companies/1"}>{company.company_name}</NavLink>
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

              <Typography
                variant="caption"
                sx={{ color: "primary.light", width: "250px" }}
              >
                {company.company_address}
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
                posted on {format(new Date(company.created_at), "PPP")}
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
              <LocalPhoneOutlinedIcon sx={{ color: "primary.light" }} />
              <Typography variant="caption" sx={{ color: "primary.light" }}>
                {company.company_phone}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CompanyCard;
