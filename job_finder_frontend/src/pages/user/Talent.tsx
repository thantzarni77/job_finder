import {
  Box,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import JobFilter from "../../components/user/jobs/JobFilter";
import TalentCard from "../../components/user/TalentCard";

import { useState } from "react";
import SearchBox from "../../components/user/SearchBox";

const jobs = [
  "full Time",
  "part Time",
  "intership",
  "volunteer",
  "freelancer",
  "work from home",
];

export default function Talent() {
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
      <SearchBox searchType={"Jobs"} />

      {/* job posts and filter */}
      <Box
        sx={{
          textAlign: "center",
          my: 3,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "start" },
          width: "100%",
          gap: 6,
        }}
      >
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <JobFilter filterType={"Job"} filterTypeArray={jobs} />
        </Box>

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
              width: { xs: "100%", md: "92%" },
              display: "flex",
              alignItems: { xs: "center", md: "start" },
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
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                gap: { xs: 2, md: 6 },
                flexWrap: "wrap",
              }}
            >
              <TalentCard />
              <TalentCard />
              <TalentCard />
              <TalentCard />
              <TalentCard />
              <TalentCard />
            </Box>
            {/* pagination */}
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 10 }}
            >
              <Stack>
                <Pagination
                  count={10}
                  shape="rounded"
                  variant="outlined"
                  color="primary"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "#5f6caf",
                      borderColor: "#5f6caf",
                    },
                  }}
                />
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
