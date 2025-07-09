import {
  Box,
  Button,
  InputAdornment,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import AdminSeekerCard from "../../components/admin/AdminSeekerCard";

const Overview = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  return (
    <Box
      sx={{
        // width: "70%",
        // mx: "20%",
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Overview
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 400, mb: 2 }}>
        15 Jul 2025
      </Typography>
      {/* jobs */}
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, my: 1 }}>
          Jobs
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "75%",
            // justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 5,
          }}
        >
          <Box
            sx={{
              backgroundColor: "#ffffff",
              width: "200px",
              p: 3,
              height: "fit-content",
              borderRadius: "15px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "primary.main" }}
            >
              Pending Jobs
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              100
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              width: "200px",
              p: 3,
              height: "fit-content",
              borderRadius: "15px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "#75C149" }}
            >
              Verified Jobs
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              100
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              width: "200px",
              p: 3,
              height: "fit-content",
              borderRadius: "15px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "#EA4335" }}
            >
              Rejected Jobs
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              2
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* users */}
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, my: 2 }}>
          Users
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "75%",
            // justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 5,
          }}
        >
          <Box
            sx={{
              backgroundColor: "#ffffff",
              width: "200px",
              p: 3,
              height: "fit-content",
              borderRadius: "15px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "primary.main" }}
            >
              Total Users
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              5,300
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              width: "200px",
              p: 3,
              height: "fit-content",
              borderRadius: "15px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "primary.main" }}
            >
              Employers
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              2,000
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              width: "200px",
              p: 3,
              height: "fit-content",
              borderRadius: "15px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "primary.main" }}
            >
              Seekers
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              3,300
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              width: "200px",
              p: 3,
              height: "fit-content",
              borderRadius: "15px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "primary.main" }}
            >
              Pending
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              100
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              width: "200px",
              p: 3,
              height: "fit-content",
              borderRadius: "15px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "primary.main" }}
            >
              New Users
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              100
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              width: "200px",
              p: 3,
              height: "fit-content",
              borderRadius: "15px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: "#EA4335" }}
            >
              Suspended Users
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              20
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* jobs and users */}
      <Box sx={{ my: 3 }}>
        {/* --- Jobs & Users Tab Navigation --- */}

        <Tabs
          sx={{ mb: 3 }}
          value={activeTab}
          onChange={handleTabChange}
          aria-label="jobs and users tabs"
        >
          <Tab
            label="Jobs"
            sx={{
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#000000",
              "&.Mui-selected": {
                color: "#000000",
              },
            }}
          />
          <Tab
            label="Users"
            sx={{
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#000000",
              "&.Mui-selected": {
                color: "#000000",
              },
            }}
          />
        </Tabs>

        {/* --- Search and Filter Section --- */}
        <Stack direction="row" alignItems="center" spacing={4}>
          {/* Search Box */}
          <TextField
            placeholder={activeTab === 0 ? "Search jobs" : "Search users"}
            size="small"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "primary.main" }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              maxWidth: "250px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#ffffff",
              },
              "& fieldset": {
                borderColor: "primary.main",
              },
            }}
          />
          {/* Filter Button */}
          <Button
            variant="outlined"
            endIcon={<FilterListIcon />}
            sx={{
              textTransform: "none",
              borderColor: "primary.main",
              color: "primary.main",
              borderRadius: "8px",
              bgcolor: "#ffffff",
            }}
          >
            Filter
          </Button>
        </Stack>

        {/* --- Placeholder for the actual content --- */}
        <Box sx={{ mt: 4 }}>
          {activeTab === 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                flexWrap: "wrap",
              }}
            >
              <AdminSeekerCard />
              <AdminSeekerCard />
            </Box>
          )}
          {activeTab === 1 && (
            <Typography>
              User listing cards would be displayed here...
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Overview;
