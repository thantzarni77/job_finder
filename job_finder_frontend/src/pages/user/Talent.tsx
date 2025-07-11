import { Box, Container } from "@mui/material";
import TalentCard from "../../components/user/TalentCard";
import JobFilter from "../../components/user/jobs/JobFilter";
import SearchBox from "../../components/user/SearchBox";
export default function Talent() {
  return (
    <Container sx={{ mt: 6 }}>
      <Box sx={{ mb: 3 }}>
        <SearchBox searchType="Talent" />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <JobFilter
            filterType="Talent"
            filterTypeArray={[
              "full Time",
              "part Time",
              "intership",
              "volunteer",
              "freelancer",
              "work from home",
            ]}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            width: "100%",
            justifyContent: "space-evenly",
          }}
        >
          <TalentCard />
          <TalentCard />
          <TalentCard />
          <TalentCard />
          <TalentCard />
          <TalentCard />
        </Box>
      </Box>
    </Container>
  );
}
