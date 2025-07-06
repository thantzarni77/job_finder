import { Box, Paper, Typography } from "@mui/material";
import TestimonyProfile from "../../assets/testimonyProfile.jpg";

const Testimony = () => {
  return (
    <Paper
      sx={{
        backgroundColor: "#ffffff",
        p: 2,
        boxShadow: "none",
        borderRadius: "12px",
        width: { xs: "325px", md: "375px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <img
            src={TestimonyProfile}
            alt={"TestimonyProfile"}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "100%",
              objectFit: "cover",
            }}
          />
          <Typography>Ma Nora</Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{ color: "secondary.main", fontWeight: 400 }}
        >
          1 day ago
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="body2"
          sx={{ color: "secondary.main", fontWeight: 300 }}
        >
          Lorem ipsum dolor sit amet consectetur. Mauris rhoncus quam auctor
          vitae gravida ultricies platea mi diam. Dui id semper ut habitant
          mauris proin congue pretium ipsum. Quis eu eu aliquet phasellus. Id
          vulputate faucibus velit gravida fringilla At fermentum lectus
          condimentum faucibus senectus cum pellentesque sit vulputate urna. Vel
          et quis sed bibendum.
        </Typography>
      </Box>
    </Paper>
  );
};

export default Testimony;
