import { Paper, Button, Typography, Box } from "@mui/material";

type CarouselItemProps = {
  item: {
    image: string;
  };
};

export default function HomeCarouselItem({ item }: CarouselItemProps) {
  return (
    <Paper sx={{ position: "relative" }} elevation={0}>
      <img
        src={item.image}
        alt=""
        style={{
          width: "100vw",
          height: "auto",
          objectFit: "cover",
          display: "block",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "10%",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: { xs: 0, sm: 1, md: 2 },
            fontSize: { xs: "12px", sm: "15px", md: "22px" },
          }}
        >
          Get Hired Today
        </Typography>
        <Button
          variant="contained"
          sx={{
            fontSize: { xs: "7px", sm: "10px", md: "16px" },
            padding: { xs: "5px 10px", sm: "5px 10px", md: "10px 20px" },
          }}
        >
          Build Your Profile Now
        </Button>
      </Box>
    </Paper>
  );
}
