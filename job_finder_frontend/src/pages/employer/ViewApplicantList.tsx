import {
  Box,
  CircularProgress,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getAppliedSeekers } from "../../helper/jobApiFunctions";
import type { SeekerProfile } from "../../store/ProfileStore";
import { getSeekerProfileWithSeekerID } from "../../helper/profileApiFunctions";
import type { AppliedSeeker } from "../../store/JobStore";
import AppliedSeekerCard from "../../components/seeker/AppliedSeekerCard";
import { useEffect, useState } from "react";

const ViewApplicantList = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [shortListSeekers, setShortListSeekers] = useState<SeekerProfile[]>([]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const navigate = useNavigate();
  const { id } = useParams();

  const appliedSeekersQuery = useQuery({
    queryKey: ["appliedSeekers", id],
    queryFn: () => getAppliedSeekers(id),
  });

  const appliedSeekers: AppliedSeeker[] = appliedSeekersQuery.data?.data;

  //get seekers profiles of applied seekers
  const seekerProfilesQuery = useQuery({
    queryKey: ["seekerProfilesForJob", appliedSeekers],

    queryFn: async (): Promise<SeekerProfile[]> => {
      const profilePromises = appliedSeekers!.map(
        async (seeker: AppliedSeeker) => {
          const response = await getSeekerProfileWithSeekerID(seeker.seeker_id);

          return response.data.data;
        },
      );

      return Promise.all(profilePromises);
    },

    enabled: !!appliedSeekers && appliedSeekers.length > 0,
  });

  useEffect(() => {
    if (appliedSeekers && seekerProfilesQuery.data) {
      // Create a Set of shortlisted seeker IDs for fast lookups
      const shortListedSeekerIds = new Set(
        appliedSeekers
          .filter((apply) => apply.shortlist)
          .map((apply) => apply.seeker_id),
      );

      // Filter the full profiles array based on the Set of IDs
      const foundSeekers = seekerProfilesQuery.data.filter(
        (profile) => profile.id && shortListedSeekerIds.has(profile.id),
      );

      setShortListSeekers(foundSeekers);
    }
  }, [appliedSeekers, seekerProfilesQuery.data]);

  if (appliedSeekersQuery.isPending) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading applicants...</Typography>
      </Box>
    );
  }

  if (appliedSeekers.length > 0 && seekerProfilesQuery.isPending) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading applicants...</Typography>
      </Box>
    );
  }

  if (
    !appliedSeekersQuery.data ||
    !seekerProfilesQuery.data ||
    seekerProfilesQuery.data.length === 0
  ) {
    return (
      <Box sx={{ width: "90%", mx: "auto" }}>
        {/*  title & back button */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            mt: 5,
            mb: 4,
          }}
        >
          <IconButton onClick={() => navigate(`/job/${id}`)}>
            <ArrowBackIosIcon
              sx={{
                color: "primary.main",
                fontSize: 32,
                ":hover": {
                  color: "text.secondary",
                  cursor: "pointer",
                },
              }}
            />
          </IconButton>
          <Typography variant="h5" sx={{ mx: "auto" }}>
            Applicants
          </Typography>
        </Box>
        <Typography variant="h6">No one has applied yet</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "90%", mx: "auto" }}>
      {/*  title & back button */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mt: 5,
          mb: 4,
        }}
      >
        <IconButton onClick={() => navigate(`/job/${id}`)}>
          <ArrowBackIosIcon
            sx={{
              color: "primary.main",
              fontSize: 32,
              ":hover": {
                color: "text.secondary",
                cursor: "pointer",
              },
            }}
          />
        </IconButton>

        <Typography variant="h6" sx={{ fontWeight: 600, mx: "auto" }}>
          Applicants
        </Typography>
      </Box>

      {/* all and shortlists */}
      <Box sx={{ my: 3 }}>
        <Tabs
          sx={{ mb: 3 }}
          value={activeTab}
          onChange={handleTabChange}
          aria-label="jobs and users tabs"
        >
          <Tab
            label="All"
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
            label="Shortlisted"
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
              {seekerProfilesQuery.data.map((profile) => (
                <AppliedSeekerCard key={profile.id} seeker={profile} />
              ))}
            </Box>
          )}
          {activeTab === 1 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                flexWrap: "wrap",
              }}
            >
              {shortListSeekers.length > 0 &&
                shortListSeekers.map((profile) => (
                  <AppliedSeekerCard key={profile.id} seeker={profile} />
                ))}
              {shortListSeekers.length == 0 && (
                <Typography>No seeker in shortlist</Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>

      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          justifyContent: "center",
          flexWrap: "wrap",
          my: 4,
          width: { xs: "100%", md: "70%" },
        }}
      ></Box> */}
    </Box>
  );
};

export default ViewApplicantList;
