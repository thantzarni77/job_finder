import {
  Box,
  Button,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import AdminJobCard from "../../components/admin/AdminJobCard";

const JobManagement = () => {
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Job Management
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 400, mb: 2 }}>
        15 Jul 2025
      </Typography>
      {/* jobs */}
      <Box>
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
              sx={{ fontWeight: 400, color: "success.main" }}
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
              sx={{ fontWeight: 400, color: "error.main" }}
            >
              Rejected Jobs
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              2
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* search job */}
      <Box sx={{ my: 3 }}>
        {/* --- Search and Filter Section --- */}
        <Stack direction="row" alignItems="center" spacing={4}>
          {/* Search Box */}
          <TextField
            placeholder={"Search jobs"}
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

        {/* --- jobs --- */}
        <Box sx={{ mt: 4 }}>
          <Box
            sx={{
              width: "80%",
              display: "flex",
              alignItems: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            <AdminJobCard />
            <AdminJobCard />
            <AdminJobCard />
            <AdminJobCard />
          </Box>
        </Box>
      </Box>
      <Stack>
        <Pagination
          count={5}
          shape="rounded"
          variant="outlined"
          color="primary"
          sx={{
            ml: "12%",
            "& .MuiPaginationItem-root": {
              color: "#5f6caf",
              borderColor: "#5f6caf",
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default JobManagement;
