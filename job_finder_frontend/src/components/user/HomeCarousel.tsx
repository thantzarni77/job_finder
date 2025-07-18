import Rectangle106 from "../../assets/Rectangle 106.svg";
import { Typography, Box, Button } from "@mui/material";

export default function HomeCarousel() {
  return (
    <div className="relative">
      <Box
        sx={{
          position: "absolute",
          top: { md: "40%", xs: "20%" },
          left: { md: "10%", xs: "5%" },
        }}
      >
        <div>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, fontSize: { xs: 25, md: 36 } }}
          >
            Get Hired Today
          </Typography>
          <Button
            variant="contained"
            sx={{
              boxShadow: "none",
              width: { xs: "200px", md: "300px" },
              borderRadius: "8px",
              p: 1,
              my: 2,
              textTransform: "none",
              ":hover": {
                boxShadow: "none",
              },
            }}
          >
            <Typography
              sx={{
                typography: { xs: "subtitle2", md: "body1" },
                fontWeight: 300,
              }}
            >
              Build Your Profile Now
            </Typography>
          </Button>
        </div>
      </Box>
      <div className="carousel w-full">
        <div id="item1" className="carousel-item w-full">
          <img src={Rectangle106} className="w-full" />
        </div>
        <div id="item2" className="carousel-item w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
            className="w-full"
          />
        </div>
        <div id="item3" className="carousel-item w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
            className="w-full"
          />
        </div>
        <div id="item4" className="carousel-item w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
            className="w-full"
          />
        </div>
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        <a href="#item1" className="btn btn-xs btn-accent btn-outline">
          1
        </a>
        <a href="#item2" className="btn btn-xs btn-accent btn-outline">
          2
        </a>
        <a href="#item3" className="btn btn-xs btn-accent btn-outline">
          3
        </a>
        <a href="#item4" className="btn btn-xs btn-accent btn-outline">
          4
        </a>
      </div>
    </div>
  );
}
