// src/layouts/AdminMainLayout.tsx (Updated)

import { Box } from "@mui/material";
import { Outlet } from "react-router";
import SidePanel from "../../components/admin/SidePanel";
import AdminHeader from "../../components/admin/AdminHeader";

const AdminMainLayout = () => {
  return (
    <Box>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Box component="aside" sx={{ bgcolor: "primary.main" }}>
          <SidePanel />
        </Box>

        <Box>
          <AdminHeader />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: "background.default",
              p: 2,
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminMainLayout;
