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
import AdminSeekerCard from "../../components/admin/AdminSeekerCard";

const SeekerManagement = () => {
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
        Seeker Management
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 400, mb: 2 }}>
        15 Jul 2025
      </Typography>
      {/* users */}
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
              backgroundColor: "background.paper",
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
              backgroundColor: "background.paper",
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
              backgroundColor: "background.paper",
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
              backgroundColor: "background.paper",
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
              backgroundColor: "background.paper",
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
              backgroundColor: "background.paper",
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
              Suspended Users
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              20
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* search users*/}
      <Box sx={{ my: 3 }}>
        {/* --- Search and Filter Section --- */}
        <Stack direction="row" alignItems="center" spacing={4}>
          {/* Search Box */}
          <TextField
            placeholder={"Search users"}
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
                backgroundColor: "background.paper",
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
              bgcolor: "background.paper",
            }}
          >
            Filter
          </Button>
        </Stack>

        {/* --- Placeholder for the actual content --- */}
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
            <AdminSeekerCard />
            <AdminSeekerCard />
            <AdminSeekerCard />
            <AdminSeekerCard />
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

export default SeekerManagement;
