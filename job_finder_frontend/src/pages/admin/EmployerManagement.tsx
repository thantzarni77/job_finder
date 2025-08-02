import {
  Box,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, type ChangeEvent } from "react";
import AdminEmployerCard from "../../components/admin/AdminEmployerCard";
import { useQuery } from "@tanstack/react-query";
import { getAdminEmployers } from "../../helper/employerApiFunctions";
import FullScreenLoader from "../../components/FullScreenLoader";
import type { EmployerWithUserID } from "../../store/EmployerStore";
import { format } from "date-fns";

export default function EmployerManagement() {
  const [page, setPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");

  const { data: employers, isPending: isEmployersPending } = useQuery({
    queryKey: ["adminEmployers", page],
    queryFn: () => getAdminEmployers(page),
  });

  if (isEmployersPending) {
    return <FullScreenLoader open={true} message={"Loading"} />;
  }

  // to handle paginated pages
  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);

    setSearchTerm("");
  };

  const filteredEmployers = employers.data.filter(
    (employer: EmployerWithUserID) => {
      const term = searchTerm.toLowerCase();

      return (
        employer.company_name?.toLowerCase().includes(term) ||
        employer.user_id.name.toLowerCase().includes(term) ||
        employer.user_id.email.toLowerCase().includes(term)
      );
    },
  );

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
        Employers Management
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 400, mb: 2 }}>
        {format(new Date(), "dd MMM yyyy")}
      </Typography>
      {/* users */}
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "75%",
            flexWrap: "wrap",
            gap: 5,
            mt: 3,
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
              Total Employers
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {employers.meta.total}
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* search users*/}
      <Box sx={{ my: 3 }}>
        {/* --- Search and Filter Section --- */}
        <Stack direction="row" alignItems="center" spacing={4}>
          <TextField
            placeholder={"Search employers..."}
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: "primary.main" }} />
                </InputAdornment>
              ),
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
        </Stack>

        {/* --- Content Section --- */}
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
            {filteredEmployers.map((employer: EmployerWithUserID) => {
              return (
                <AdminEmployerCard key={employer.id} employer={employer} />
              );
            })}
            {/* the filter returns no results */}
            {filteredEmployers.length === 0 && searchTerm && (
              <Typography sx={{ mt: 2 }}>
                No results found for "{searchTerm}" on this page.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      <Stack>
        <Pagination
          count={employers.meta.last_page}
          page={employers.meta.current_page}
          onChange={handlePageChange}
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
}
