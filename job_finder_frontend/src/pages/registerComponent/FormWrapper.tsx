import React from "react";
import { Box } from "@mui/material";

const FormWrapper = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      bgcolor: "background.paper",
      p: { xs: 2, sm: 3 },
      borderRadius: 2,
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      width: "100%",
    }}
  >
    {children}
  </Box>
);

export default FormWrapper;
