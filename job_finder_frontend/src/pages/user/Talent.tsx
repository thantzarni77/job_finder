import { Box, Button, Pagination, Stack, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useEffect, useState, type ChangeEvent } from "react";
import SearchBox from "../../components/user/SearchBox";
import TalentFilterDrawer from "../../components/user/TalentFilterDrawer";
import { useTalentFilterStore } from "../../store/Appstore";
import SeekerCard from "../../components/seeker/SeekerCard";
import {
  getSeekerList,
  type SeekerApiResponse,
  type Seeker,
} from "../../helper/talentPage";
import { useQuery } from "@tanstack/react-query";
import TalentFilter from "../../components/seeker/TalentFilter";
import { useSeekerFilterStore } from "../../store/SeekerStore";
import {
  useSearchTalentsByName,
  useSeekerParentStore,
} from "../../store/SeekerStore";

export default function Talent() {
  const { selectedTalents } = useSeekerFilterStore();

  const showTalentFilterDrawer = useTalentFilterStore(
    (state) => state.showTalentFilterDrawer,
  );
  const setShowTalentFilterDrawer = useTalentFilterStore(
    (state) => state.setShowTalentFilterDrawer,
  );

  // state for pagination
  const [page, setPage] = useState(1);

  // to find with name
  const talentName = useSearchTalentsByName((state) => state.talentName);

  const stateSeekers = useSeekerParentStore((state) => state.stateSeekers);
  const setStateSeekers = useSeekerParentStore(
    (state) => state.setStateSeekers,
  );

  const { data: seekers, isPending: seekerPending } =
    useQuery<SeekerApiResponse>({
      queryKey: ["seekers", selectedTalents, page, talentName],
      queryFn: () => getSeekerList(selectedTalents, page, talentName),
    });

  // to store in parent state
  useEffect(() => {
    if (!seekerPending && seekers) {
      setStateSeekers(seekers);
    }
  }, [
    seekers,
    seekerPending,
    talentName,
    page,
    selectedTalents,
    setStateSeekers,
  ]);

  // to handle paginated pages
  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

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
        <SearchBox searchType={"Talents"} />
        <Button
          variant="contained"
          onClick={() => setShowTalentFilterDrawer(!showTalentFilterDrawer)}
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

      {/* talents and filter */}
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
          <TalentFilter />
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
              justifyContent: { xs: "center", md: "space-between " },
              mb: 2,
            }}
          >
            <Typography variant="caption" sx={{ color: "primary.light" }}>
              {seekers?.data.length}+ talents are found
            </Typography>
          </Box>
          {/* talents */}
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
              {!seekerPending &&
                stateSeekers?.data.map((seeker: Seeker) => {
                  // if (seeker.user_id.id != userProfile.id) {
                  return <SeekerCard key={seeker.id} seeker={seeker} />;
                  // }
                })}
            </Box>
            {/* pagination */}
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 10 }}
            >
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
          </Box>
        </Box>
      </Box>
      <TalentFilterDrawer />
    </Box>
  );
}
