import { Box } from "@mui/material";
import Header from "../../components/user/Header";
import { Outlet } from "react-router";
import AppDrawer from "../../components/user/AppDrawer";
import ScrollToTop from "../../helper/ScrollToTop";
import Footer from "../../components/user/Footer";

export default function UserMainLayout() {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5" }}>
      <ScrollToTop />
      <Header />
      <AppDrawer />
      <Outlet />
      <Footer />
    </Box>
  );
}
