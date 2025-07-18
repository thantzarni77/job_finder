import { Box } from "@mui/material";
import SeekerCard from "../../seeker/SeekerCard";

const BookmarkFollowing = () => {
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
        mb: 11,
      }}
    >
      <SeekerCard />
      <SeekerCard />
      <SeekerCard />
    </Box>
  );
};

export default BookmarkFollowing;
