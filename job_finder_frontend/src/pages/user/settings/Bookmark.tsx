import { Box, Container, Typography } from "@mui/material";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { useNavigate } from "react-router";

const Bookmark = () => {
  const navigate = useNavigate();
  return (
    <Container
      onClick={() => navigate("/settings/user/1/bookmarks")}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        width: "100%",
        height: "fit-content",
        bgcolor: "#ffffff",
        borderRadius: "20px",
        my: 2,
        p: 2,
        ":hover": {
          bgcolor: "#eeeeee",
          cursor: "pointer",
        },
      }}
    >
      <BookmarkBorderOutlinedIcon
        sx={{ mt: 1, mr: 2, color: "primary.main" }}
      />
      <Box>
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, color: "secondary.main" }}
        >
          Bookmarks
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, color: "secondary.main" }}
        >
          View your saved jobs & following
        </Typography>
      </Box>
    </Container>
  );
};

export default Bookmark;
