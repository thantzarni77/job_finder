// src/layouts/AdminMainLayout.tsx (Updated)

import { Box } from "@mui/material";
import { Outlet } from "react-router";
import SidePanel from "../../components/admin/SidePanel";
import AdminHeader from "../../components/admin/AdminHeader";
import { useAdminMenuStore } from "../../store/AdminAppStore";

const AdminMainLayout = () => {
  const showMenu = useAdminMenuStore((state) => state.showMenu);
  return (
    <Box sx={{ display: "flex", bgcolor: "primary.main", minHeight: "100vh" }}>
      <Box
        component="aside"
        sx={{
          width: showMenu ? "300px" : "100px",
          flexShrink: 0,
          transition: "all 0.2s ease-in",
        }}
      >
        <SidePanel />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          px: 4,
          py: 1,
        }}
      >
        <AdminHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminMainLayout;
