import { Box, Container, Typography, Tabs, Tab } from "@mui/material";

import BG_IMG from "../assets/login_signup_bg.jpg";
import { useState } from "react";
import SeekerRegister from "./SeekerRegister";
import EmployerRegister from "./EmployerRegister";

export default function Register() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  return (
    <Box
      sx={{
        backgroundImage: `url(${BG_IMG})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        alignItems: "center",
        flexDirection: "column",
        display: "flex",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, mt: 8, my: 2 }}>
        LOGO
      </Typography>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Register a free {activeTab ? "employer" : "seeker"} account
      </Typography>
      <Tabs
        sx={{
          bgcolor: "background.paper",
          width: { xs: "95%", sm: "75%", md: "65%", lg: "50%" },
          borderRadius: "12px 12px 0 0",
        }}
        value={activeTab}
        onChange={handleTabChange}
        aria-label="seeker and employer register"
      >
        <Tab
          label="Seeker"
          sx={{
            width: "50%",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            color: "text.primary",
            bgcolor: activeTab ? "" : "background.hover",
            "&.Mui-selected": {
              color: "primary.main",
            },
          }}
        />
        <Tab
          label="Employer"
          sx={{
            width: "50%",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            color: "text.primary",
            bgcolor: activeTab ? "background.hover" : "",
            "&.Mui-selected": {
              color: "primary.main",
            },
          }}
        />
      </Tabs>

      {/* --- Placeholder for the actual content --- */}
      <Container
        sx={{
          width: { xs: "95%", sm: "75%", md: "65%", lg: "50%" },
          bgcolor: "background.paper",
          borderRadius: "0 0 12px 12px",
          py: 5,
          mb: 5,
        }}
      >
        {activeTab === 0 && <SeekerRegister />}
        {activeTab === 1 && <EmployerRegister />}
      </Container>
    </Box>
  );
}
