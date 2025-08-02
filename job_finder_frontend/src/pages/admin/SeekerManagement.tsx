import {
  Box,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AdminSeekerCard from "../../components/admin/AdminSeekerCard";
import {
  useSearchTalentsByName,
  useSeekerFilterStore,
  useSeekerParentStore,
} from "../../store/SeekerStore";
import { useEffect, useState, type ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getSeekerList,
  type Seeker,
  type SeekerApiResponse,
} from "../../helper/talentPage";
import FullScreenLoader from "../../components/FullScreenLoader";
import { format } from "date-fns";

const SeekerManagement = () => {
  const { selectedTalents } = useSeekerFilterStore();

  // state for pagination
  const [page, setPage] = useState(1);

  // const stateSeekers = useSeekerParentStore((state) => state.stateSeekers);
  const setStateSeekers = useSeekerParentStore(
    (state) => state.setStateSeekers,
  );

  // to find with name
  const talentName = useSearchTalentsByName((state) => state.talentName);

  const {
    data: seekers,
    isPending: seekerPending,
    isFetching,
  } = useQuery<SeekerApiResponse>({
    queryKey: ["seekers", selectedTalents, page, talentName],
    queryFn: () => getSeekerList(selectedTalents, page, talentName),
  });

  // to store in parent state
  useEffect(() => {
    if (!seekerPending && seekers) {
      setStateSeekers(seekers);
    }
  }, [seekers, seekerPending, page, selectedTalents, setStateSeekers]);

  const [searchTerm, setSearchTerm] = useState("");

  // to handle paginated pages
  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setSearchTerm("");
  };

  const filteredSeekers = seekers?.data.filter((seeker: Seeker) => {
    const term = searchTerm.toLowerCase();

    return (
      seeker.user_id.name?.toLowerCase().includes(term) ||
      seeker.user_id.email.toLowerCase().includes(term)
    );
  });

  if (isFetching) {
    return <FullScreenLoader open={true} message="Getting seeker datas" />;
  }
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
        {format(new Date(), "dd MMM yyyy")}
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
              Total Seekers
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {seekers?.data.length}
            </Typography>
          </Box>
          {/* <Box
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
          </Box> */}
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
            {!seekerPending &&
              filteredSeekers &&
              filteredSeekers.map((seeker: Seeker) => {
                return <AdminSeekerCard key={seeker.id} seeker={seeker} />;
              })}
          </Box>
        </Box>
      </Box>
      <Stack>
        <Pagination
          count={seekers?.meta.last_page}
          page={seekers?.meta.current_page ?? 1}
          onChange={handlePageChange}
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
  );
};

export default SeekerManagement;
