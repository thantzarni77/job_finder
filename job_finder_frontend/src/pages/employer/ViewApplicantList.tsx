import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getAppliedSeekers } from "../../helper/jobApiFunctions";
import type { SeekerProfile } from "../../store/ProfileStore";
import { getSeekerProfileWithSeekerID } from "../../helper/profileApiFunctions";
import type { AppliedSeeker } from "../../store/JobStore";
import AppliedSeekerCard from "../../components/seeker/AppliedSeekerCard";

const ViewApplicantList = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const appliedSeekersQuery = useQuery({
    queryKey: ["appliedSeekers", id],
    queryFn: () => getAppliedSeekers(id),
  });

  const appliedSeekers = appliedSeekersQuery.data?.data;

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

  if (appliedSeekersQuery.isPending || seekerProfilesQuery.isPending) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading applicants...</Typography>
      </Box>
    );
  }

  if (!seekerProfilesQuery.data || seekerProfilesQuery.data.length === 0) {
    return (
      <Box sx={{ width: "90%", mx: "auto", textAlign: "center" }}>
        <Typography sx={{ mt: 5 }}>
          No one has applied to this job yet.
        </Typography>
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          justifyContent: "center",
          flexWrap: "wrap",
          my: 4,
          width: { xs: "100%", md: "70%" },
        }}
      >
        {seekerProfilesQuery.data.map((profile) => (
          <AppliedSeekerCard key={profile.id} seeker={profile} />
        ))}
      </Box>
    </Box>
  );
};

export default ViewApplicantList;
