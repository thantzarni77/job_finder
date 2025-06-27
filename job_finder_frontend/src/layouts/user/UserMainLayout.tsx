import { Box } from "@mui/material";
import Header from "../../components/user/Header";
import { Outlet } from "react-router";
import AppDrawer from "../../components/user/AppDrawer";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();
export function useAppContext() {
  return useContext(AppContext);
}
export default function UserMainLayout() {
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <Box>
      <AppContext.Provider value={{ showDrawer, setShowDrawer }}>
        <Header />
        <AppDrawer />
        <Outlet />
      </AppContext.Provider>
    </Box>
  );
}
