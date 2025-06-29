import { Box, List, ListItem, Typography } from "@mui/material";
export default function Footer() {
  return (
    <Box
      sx={{
        maxHeight: "300px",
        background: " #5f6caf",
        display: "flex",
        color: "white",
      }}
    >
      <Box>
        <Typography sx={{ fontWeight: 700, fontSize: "36px" }}>LOGO</Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex" }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
              Get Hired
            </Typography>
            <List>
              <ListItem>Search Jobs</ListItem>
              <ListItem>Search Jobs</ListItem>
              <ListItem>Search Jobs</ListItem>
            </List>
          </Box>
        </Box>
        <Box></Box>
      </Box>
    </Box>
  );
}
