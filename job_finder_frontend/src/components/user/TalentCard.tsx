import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Stack,
  Button,
  Divider,
} from "@mui/material";
import {
  Add as AddIcon,
  LocationOn as LocationOnIcon,
  AccessTime as TimeIcon,
} from "@mui/icons-material";

export default function TalentCard() {
  return (
    <Box
      sx={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        p: 2,
        maxHeight: "250px",
      }}
    >
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Avatar sx={{ width: 56, height: 56 }} />
          <Typography sx={{ fontWeight: "bold" }}>
            Full Stack Developer
          </Typography>
          <IconButton>
            <AddIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton>
            <LocationOnIcon />
          </IconButton>
          <Typography sx={{ opacity: 0.5 }}>Yangon</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton>
            <TimeIcon />
          </IconButton>
          <Typography sx={{ opacity: 0.5 }}>Posted on 2 days ago</Typography>
        </Box>
        <Stack spacing={2} direction="row" sx={{ mt: 1, mb: 1 }}>
          <Button variant="contained" size="small">
            Full Time
          </Button>
          <Button variant="contained" size="small">
            Seniot
          </Button>
          <Button variant="contained" size="small">
            IT
          </Button>
        </Stack>
        <Divider variant="middle" sx={{ mb: 1 }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>Salary</Typography>
          <Typography sx={{ fontWeight: "bold" }}>1200000 MMK</Typography>
        </Box>
      </Box>
    </Box>
  );
}
