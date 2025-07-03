import {
  Container,
  Box,
  OutlinedInput,
  Button,
  Avatar,
  Typography,
  FormControl,
  InputLabel,
  TextField,
  Input,
  FormHelperText,
} from "@mui/material";

export default function EditProfile() {
  return (
    <Container>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Edit Profile
        </Typography>
      </Box>
      <Box>
        <FormControl>
          <OutlinedInput placeholder="name" size="small" />
          <TextField placeholder="Name" />
        </FormControl>
      </Box>
    </Container>
  );
}
