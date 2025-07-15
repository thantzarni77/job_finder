import { Box, OutlinedInput, Typography } from "@mui/material";
import FormWrapper from "./FormWrapper";

const CompanyInfoForm = ({ children }: { children?: React.ReactNode }) => (
  <FormWrapper>
    {/* company name */}
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Typography
        component="label"
        htmlFor="companyName"
        sx={{ fontWeight: 300 }}
      >
        Company name
      </Typography>
      <OutlinedInput
        id="companyName"
        fullWidth
        placeholder="Please enter your company name"
      />
    </Box>

    {/* company address */}
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Typography
        component="label"
        htmlFor="companyAddress"
        sx={{ fontWeight: 300 }}
      >
        Company Location
      </Typography>
      <OutlinedInput
        id="companyAddress"
        type="text"
        fullWidth
        placeholder="Please enter your company address"
      />
    </Box>
    {/* company phone */}
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Typography
        component="label"
        htmlFor="companyPhone"
        sx={{ fontWeight: 300 }}
      >
        Company Phone
      </Typography>
      <OutlinedInput
        id="companyPhone"
        type="text"
        fullWidth
        placeholder="Please enter your company phone no"
      />
    </Box>
    {/* company type */}
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Typography
        component="label"
        htmlFor="companyType"
        sx={{ fontWeight: 300 }}
      >
        Company Type
      </Typography>
      <OutlinedInput
        id="companyType"
        type="text"
        fullWidth
        placeholder="Please enter your company type"
      />
    </Box>
    {/* company profile */}
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Typography
        component="label"
        htmlFor="companyProfile"
        sx={{ fontWeight: 300 }}
      >
        Company Profile
      </Typography>
      <OutlinedInput
        id="companyProfile"
        type="file"
        fullWidth
        placeholder="Please enter your company profile"
      />
    </Box>
    {children}
  </FormWrapper>
);

export default CompanyInfoForm;
