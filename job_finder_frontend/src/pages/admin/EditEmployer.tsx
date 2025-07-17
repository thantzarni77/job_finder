import {
  Box,
  Typography,
  IconButton,
  FormControl,
  TextField,
  FormLabel,
  Button,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router";
export default function EditEmployer() {
  const navigate = useNavigate();
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight="bold">
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIosIcon />
          </IconButton>
          Edit Employer
        </Typography>
      </Box>
      <form action="">
        <Box sx={{ display: "flex", gap: 2, flexDirection: "column", mt: 2 }}>
          <FormControl>
            <FormLabel>Company Name</FormLabel>
            <TextField id="companyName" size="small" />
          </FormControl>
          <FormControl>
            <FormLabel>Industry</FormLabel>
            <TextField id="industry" size="small" />
          </FormControl>
          <FormControl>
            <FormLabel>Company Type</FormLabel>
            <TextField id="companyType" size="small" />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <TextField id="email" size="small" />
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <TextField id="phone" size="small" />
          </FormControl>
        </Box>
        <Button variant="contained" fullWidth sx={{ mt: 2 }}>
          Save
        </Button>
      </form>
    </Box>
  );
}
