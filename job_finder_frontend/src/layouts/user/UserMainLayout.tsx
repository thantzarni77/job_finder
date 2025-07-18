import { Box } from "@mui/material";
import Header from "../../components/user/Header";
import { Outlet } from "react-router";
import AppDrawer from "../../components/user/AppDrawer";

export default function UserMainLayout() {
  return (
    <Box>
      <Header />
      <AppDrawer />
      <Outlet />
    </Box>
  );
}
