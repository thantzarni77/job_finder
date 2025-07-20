import { Outlet } from "react-router";
import BookmarkNav from "../../pages/user/settings/BookmarkNav";
import { Container } from "@mui/material";

const BookmarkMainLayout = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <BookmarkNav />
      <Outlet />
    </Container>
  );
};

export default BookmarkMainLayout;
