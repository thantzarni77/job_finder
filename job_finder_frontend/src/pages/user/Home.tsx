import HomeCarousel from "../../components/user/HomeCarousel";
import {
  Box,
  Button,
  Typography,
  Stack,
  Pagination,
  Container,
} from "@mui/material";
import JobCard from "../../components/user/JobCard";
import Kpay from "../../assets/kpay.png";
import WaveMoney from "../../assets/wavemoney.png";
import Meta from "../../assets/meta.png";
import AyaBank from "../../assets/ayabank.jpeg";
import Xiaomi from "../../assets/Xiaomi.png";
import { CreateNewFolder } from "@mui/icons-material";

export default function Home() {
  return (
    <Box>
      <HomeCarousel />
      <Container>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, textAlign: "center", my: 3 }}
        >
          Find Your Dream Job Or Top Talent - All In One Place
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mb: 5 }}>
          <Button variant="contained">Search Jobs</Button>
          <Button variant="outlined">Find Talent</Button>
        </Box>

        <Typography sx={{ mb: 2, textAlign: "center", fontWeight: 400 }}>
          Recommeded Jobs For You
        </Typography>

        <Box className="grid grid-cols-1 place-items-center gap-3 md:grid-cols-2 lg:grid-cols-3">
          <JobCard />
          <JobCard />
          <JobCard />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 10 }}>
          <Stack>
            <Pagination
              count={10}
              shape="rounded"
              variant="outlined"
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#5f6caf",
                  borderColor: "#5f6caf",
                },
              }}
            />
          </Stack>
        </Box>

        <Typography sx={{ textAlign: "center", mb: 3 }}>
          Top Employers
        </Typography>
        <Box className="lg-grid-cols-5 grid grid-cols-2 place-items-center gap-3 md:grid-cols-5">
          <img src={Kpay} alt="" style={{ width: "100px", height: "auto" }} />
          <img
            src={WaveMoney}
            alt=""
            style={{ width: "100px", height: "auto", borderRadius: "15px" }}
          />
          <img
            src={Meta}
            alt=""
            style={{ width: "100px", height: "auto", borderRadius: "15px" }}
          />
          <img
            src={AyaBank}
            alt=""
            style={{ width: "100px", height: "auto", borderRadius: "15px" }}
          />
          <img
            src={Xiaomi}
            alt=""
            style={{ width: "100px", height: "auto", borderRadius: "15px" }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
            mb: 20,
          }}
        >
          <Stack>
            <Pagination
              count={10}
              shape="rounded"
              variant="outlined"
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#5f6caf",
                  borderColor: "#5f6caf",
                },
              }}
            />
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
