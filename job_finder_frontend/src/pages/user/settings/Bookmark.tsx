import { Box, Container, Typography } from "@mui/material";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { useNavigate, useParams } from "react-router";

const Bookmark = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <Container
      onClick={() => navigate(`/settings/user/${id}/bookmarks`)}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        width: "100%",
        height: "fit-content",
        bgcolor: "background.paper",
        borderRadius: "20px",
        my: 2,
        p: 2,
        ":hover": {
          bgcolor: "background.hover",
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
          sx={{ fontWeight: 600, color: "text.secondary" }}
        >
          Bookmarks
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, color: "text.secondary" }}
        >
          View your saved jobs
        </Typography>
      </Box>
    </Container>
  );
};

export default Bookmark;
