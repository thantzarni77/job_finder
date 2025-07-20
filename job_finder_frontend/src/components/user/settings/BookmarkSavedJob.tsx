import { Box } from "@mui/material";
import JobCard from "../jobs/JobCard";

const BookmarkSavedJob = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: { xs: 2, md: 2, lg: 1 },
        width: "100%",
        mx: "auto",
        mb: 10,
      }}
    >
      <JobCard />
      <JobCard />
      <JobCard />
    </Box>
  );
};

export default BookmarkSavedJob;
