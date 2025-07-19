import {
  Box,
  TextField,
  FormControl,
  Container,
  FormLabel,
  IconButton,
  Typography,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router";
import { ArrowBackIos as ArrowBackIcon } from "@mui/icons-material";

export default function EditJob() {
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={600}>
          Edit Job
        </Typography>
      </Box>

      <form action="">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <FormControl>
            <FormLabel>Job Title</FormLabel>
            <TextField placeholder="Placeholder" size="small" />
          </FormControl>

          <FormControl>
            <FormLabel>Position</FormLabel>
            <TextField placeholder="Placeholder" size="small" />
          </FormControl>

          <FormControl>
            <FormLabel>Company</FormLabel>
            <TextField placeholder="Placeholder" size="small" />
          </FormControl>

          <FormControl>
            <FormLabel>Work Type</FormLabel>
            <TextField placeholder="Placeholder" size="small" />
          </FormControl>

          <FormControl>
            <FormLabel>Working Hours</FormLabel>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField placeholder="From" size="small" />
              <TextField placeholder="To" size="small" />
            </Box>
          </FormControl>

          <FormControl>
            <FormLabel>Benefits</FormLabel>
            <TextField placeholder="Placeholder" size="medium" />
          </FormControl>

          <FormControl>
            <FormLabel>Responsibilities</FormLabel>
            <TextField placeholder="Placeholder" size="medium" />
          </FormControl>

          <FormControl>
            <FormLabel>Requirements</FormLabel>
            <TextField placeholder="Placeholder" size="medium" />
          </FormControl>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button variant="outlined" color="error">
              Reject
            </Button>
            <Button variant="contained">Approve</Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
}
