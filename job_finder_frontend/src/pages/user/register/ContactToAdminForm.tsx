import { Box, OutlinedInput, Typography } from "@mui/material";
import FormWrapper from "./FormWrapper";

const ContactToAdminForm = ({ children }: { children?: React.ReactNode }) => (
  <FormWrapper>
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Typography component="label" htmlFor="title" sx={{ fontWeight: 300 }}>
        Title
      </Typography>
      <OutlinedInput
        id="title"
        fullWidth
        placeholder="Please enter message title"
      />
    </Box>
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Typography component="label" htmlFor="message" sx={{ fontWeight: 300 }}>
        Message
      </Typography>
      <OutlinedInput
        id="message"
        fullWidth
        placeholder="Please enter your message"
      />
    </Box>

    {children}
  </FormWrapper>
);

export default ContactToAdminForm;
