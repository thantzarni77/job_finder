import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import HorizontalRuleOutlinedIcon from "@mui/icons-material/HorizontalRuleOutlined";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import JobFilter from "../../../components/user/jobs/JobFilter";
import CustomSearchIcon from "../../../components/custom_svg/CustomSearchIcon";
import MapPin from "../../../components/custom_svg/MapPin";
import JobCard from "../../../components/user/jobs/JobCard";

import { useState } from "react";

export default function Jobs() {
  const [sortBy, setSortBy] = useState<string>("recent");
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
  };

  // custom component for dropdown icon
  const CustomIcon = () => (
    <ArrowDropUpIcon
      onClick={() => setOpen(!open)}
      sx={{
        color: "primary.color",
        transition: "transform 0.2s ease-in-out",
        transform: open ? "rotate(0deg)" : "rotate(180deg)",
        fontSize: "3rem",
        ":hover": {
          cursor: "pointer",
        },
      }}
    />
  );

  return (
    <Box
      sx={{
        my: 3,
        p: 4,
        width: "95%",
        mx: "auto",
      }}
    >
      {/* search input */}
      <Box
        sx={{
          width: "62%",
          height: { xs: "200px", md: "100px" },
          backgroundColor: "#ffffff",
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
          borderRadius: "20px",
          border: "1.5px solid ",
          borderColor: "primary.main",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {/* <SearchIcon
            sx={{
              rotate: "90deg",
              color: "primary.main",
              fontSize: "32px",
            }}
          /> */}
          <CustomSearchIcon />
          <TextField
            id="outlined-basic"
            variant="standard"
            placeholder="Job Title or Keyword"
            sx={{
              "& > div > textarea": {
                color: "primary.main",
              },
            }}
          />
        </Box>
        <HorizontalRuleOutlinedIcon
          sx={{
            rotate: { xs: "0deg", md: "90deg" },
            transform: { xs: "scale(10, 0.5)", md: "scale(2.5, 0.5)" },
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {/* <LocationOnOutlinedIcon
            sx={{
              color: "primary.main",
              fontSize: "32px",
            }}
          /> */}
          <MapPin />
          <TextField
            id="outlined-basic"
            variant="standard"
            placeholder="Add Country or City"
          />
        </Box>
        <Button
          variant="contained"
          sx={{
            borderRadius: "10px",
            boxShadow: "none",
            textTransform: "none",
          }}
        >
          Search
        </Button>
      </Box>

      {/* job posts and filter */}
      <Box
        sx={{
          textAlign: "center",
          my: 3,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "start",
          width: "100%",
          p: 2,
          gap: 6,
        }}
      >
        <JobFilter />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* job posts section header */}
          <Box
            sx={{
              width: "inherit",
              display: "flex",
              alignItems: "start",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="caption" sx={{ color: "primary.light" }}>
              500+ jobs are found
            </Typography>
            {/* filter box */}
            <Select
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              onChange={handleChange}
              IconComponent={CustomIcon}
              value={sortBy}
              sx={{
                width: 155,
                height: 40,
                fontWeight: 400,
                fontSize: "14px",
                borderRadius: "5px",
                bgcolor: "#ffffff",
                color: "primary.main",

                // Crucially, hide the default input border
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              // Props to style the dropdown menu itself
              MenuProps={{
                slotProps: {
                  paper: {
                    sx: {
                      width: 155,
                      bgcolor: "#ffffff",
                      borderRadius: "5px",
                      boxShadow: "none",
                      color: "primary.main",
                    },
                  },
                },
              }}
            >
              <MenuItem
                value="recent"
                sx={{
                  padding: "10px 16px",
                  borderRadius: "5px",
                  fontWeight: 400,
                  margin: "4px",
                  borderLeft: "4px solid transparent",
                  bgColor: "#ffffff",
                  color: "primary.main",
                  fontSize: "14px",
                  // Style for the currently selected item in the list
                  "&.Mui-selected": {
                    borderLeft: "4px solid",
                    borderColor: " primary.main",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "rgba(106, 103, 193, 0.1)",
                    },
                  },
                }}
              >
                Recent
              </MenuItem>
              <MenuItem
                value="popular"
                sx={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  margin: "4px",
                  borderLeft: "4px solid transparent",
                  bgColor: "#ffffff",
                  color: "primary.main",
                  fontWeight: 400,
                  fontSize: "14px",
                  // Style for the currently selected item in the list
                  "&.Mui-selected": {
                    borderLeft: "4px solid",
                    borderColor: " primary.main",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "rgba(106, 103, 193, 0.1)",
                    },
                  },
                }}
              >
                Popular
              </MenuItem>
            </Select>
          </Box>
          {/* jobs */}
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              gap: { xs: 2, md: 4 },
              flexWrap: "wrap",
            }}
          >
            <JobCard /> <JobCard /> <JobCard /> <JobCard /> <JobCard />
            <JobCard /> <JobCard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
