import { ArrowBackIosNew as ArrowBackIcon } from "@mui/icons-material";
import {
  Container,
  Typography,
  Box,
  IconButton,
  TextField,
  InputLabel,
  Button,
} from "@mui/material";
import { OutlinedInput } from "@mui/material";

import { useNavigate } from "react-router";

export default function AddNewProject() {
  const navigate = useNavigate();
  return (
    <Box sx={{ mb: 25 }}>
      <Box
        sx={{
          my: 3,
          alignItems: "center",
          display: "flex",
          position: "relative",
        }}
      >
        <IconButton onClick={() => navigate(-1)} sx={{ ml: 5 }}>
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Add New Project
        </Typography>
      </Box>
      <form action="">
        <Container maxWidth="md">
          <Box
            sx={{
              p: 3,
              border: 1,
              borderColor: "#5f6caf",
              borderRadius: 2,
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                flexWrap: "wrap-reverse",
              }}
            >
              <OutlinedInput
                type="file"
                placeholder="+"
                size="small"
                sx={{
                  height: 200,
                  "& input::placeholder": {
                    fontSize: 30,
                    textAlign: "center",
                  },
                }}
              />
              <Typography>Upload Cover Photo</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <InputLabel htmlFor="description">Project Description</InputLabel>
              <TextField fullWidth multiline rows={4} id="description" />
            </Box>

            <Box sx={{ mt: 2 }}>
              <InputLabel htmlFor="link">Link</InputLabel>
              <OutlinedInput fullWidth id="link" />
            </Box>
          </Box>
          <Box sx={{ mt: 2 }}>
            <OutlinedInput
              type="text"
              placeholder="+ Optional"
              size="small"
              fullWidth
              sx={{
                "& input::placeholder": {
                  textAlign: "center",
                },
              }}
            />
          </Box>

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Upload
          </Button>
        </Container>
      </form>
    </Box>
  );
}
