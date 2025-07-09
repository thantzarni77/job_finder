// src/layouts/AdminMainLayout.tsx (Updated)

import { Box } from "@mui/material";
import { Outlet } from "react-router";
import SidePanel from "../../components/admin/SidePanel";

const AdminMainLayout = () => {
  return (
    <Box sx={{ display: "flex", bgcolor: "primary.main", minHeight: "100vh" }}>
      <Box
        component="aside"
        sx={{
          width: "200px",
          flexShrink: 0,
        }}
      >
        <SidePanel />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "secondary.light",
          p: 4,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminMainLayout;
