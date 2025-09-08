// src/layouts/AdminMainLayout.tsx (Updated)

import { Box } from "@mui/material";
import { Outlet } from "react-router";
import SidePanel from "../../components/admin/SidePanel";
import AdminHeader from "../../components/admin/AdminHeader";
import { useAdminMenuStore } from "../../store/AdminAppStore";
import { useUserStore } from "../../store/UserStore";
import { useUserDataStore } from "../../store/UserDataStore";
import { useQuery } from "@tanstack/react-query";
import { getSingleUserData } from "../../helper/userApiFunctions";
import { useEffect } from "react";

const AdminMainLayout = () => {
  const user = useUserStore((state) => state.user);
  const setUserData = useUserDataStore((state) => state.setUserData);
  const showMenu = useAdminMenuStore((state) => state.showMenu);

  const userDataQuery = useQuery({
    queryKey: ["userSingleData", user?.user_id],
    queryFn: getSingleUserData,
  });

  const userData = userDataQuery.data?.data;

  useEffect(() => {
    if (userData) setUserData(userData);
  }, [userData, setUserData]);
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
