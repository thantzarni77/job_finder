import {
  Box,
  Button,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import FilterListIcon from "@mui/icons-material/FilterList";

import JobFilter from "../../../components/user/jobs/JobFilter";
import JobCard from "../../../components/user/jobs/JobCard";

import { useState } from "react";
import SearchBox from "../../../components/user/SearchBox";
import { useJobFilterStore } from "../../../store/Appstore";
import JobFilterDrawer from "../../../components/user/JobFilterDrawer";

const jobs = [
  "full Time",
  "part Time",
  "intership",
  "volunteer",
  "freelancer",
  "work from home",
];

const Jobs = () => {
  const [sortBy, setSortBy] = useState<string>("recent");
  const [open, setOpen] = useState<boolean>(false);

  const showJobFilterDrawer = useJobFilterStore(
    (state) => state.showJobFilterDrawer,
  );
  const setShowJobFilterDrawer = useJobFilterStore(
    (state) => state.setShowJobFilterDrawer,
  );

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
        p: { xs: 0, sm: 2, md: 2, lg: 4 },
        width: { xs: "100", sm: "100%", md: "95%" },
        mx: "auto",
      }}
    >
      {/* search input && filter button*/}
      <Box
        sx={{
          display: { xs: "block", sm: "flex" },
          alignItems: "center",
          width: "95%",
          mx: "auto",
        }}
      >
        <SearchBox searchType={"Jobs"} />
        <Button
          variant="contained"
          onClick={() => setShowJobFilterDrawer(!showJobFilterDrawer)}
          sx={{
            mx: { xs: "auto", sm: "none" },
            display: { xs: "block", md: "none" },
            color: "primary.main",
            boxShadow: "none",
            p: "5px",
            my: 2,
            ":hover": {
              boxShadow: "none",
            },
          }}
        >
          <Typography
            sx={{
              display: { xs: "none", sm: "inline" },
              color: "white",
              mx: 1,
              textTransform: "none",
              boxShadow: "none",
              ":hover": {
                boxShadow: "none",
              },
            }}
          >
            Filter
          </Typography>
          <FilterListIcon sx={{ color: "white" }} />
        </Button>
      </Box>

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
              width: { xs: "82%", sm: "90%", md: "90%" },
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
                bgcolor: "background.paper",
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
                      bgcolor: "background.paper",
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
                  bgColor: "background.paper",
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
                  bgColor: "background.paper",
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
                width: { xs: "100%", sm: "90%", md: "100%" },
                justifyContent: {
                  xs: "center",
                  sm: "center",
                  md: "center",
                },
                gap: { xs: 2, md: 4 },
                flexWrap: "wrap",
              }}
            >
              <JobCard /> <JobCard /> <JobCard /> <JobCard /> <JobCard />
              <JobCard /> <JobCard />
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
      <JobFilterDrawer />
    </Box>
  );
};

export default Jobs;
