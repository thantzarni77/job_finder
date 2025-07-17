import HomeCarousel from "../../components/user/HomeCarousel";
import {
  Box,
  Button,
  Typography,
  Stack,
  Pagination,
  Container,
} from "@mui/material";
import JobCard from "../../components/user/jobs/JobCard";
import Kpay from "../../assets/kpay.png";
import WaveMoney from "../../assets/wavemoney.png";
import Meta from "../../assets/meta.png";
import AyaBank from "../../assets/ayabank.jpeg";
import Xiaomi from "../../assets/Xiaomi.png";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Box>
      <HomeCarousel />
      <Container>
        <Typography
          sx={{
            fontSize: { xs: "18px", md: "30px" },
            fontWeight: 600,
            textAlign: "center",
            my: 3,
          }}
        >
          Find Your Dream Job Or Top Talent - All In One Place
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mb: 5 }}>
          <Button
            onClick={() => navigate("/jobs")}
            variant="contained"
            sx={{
              boxShadow: "none",
              width: { xs: "170px", sm: "200px", md: "250px" },
              height: { xs: "30px", sm: "40px", md: "45px" },
              borderRadius: "8px",
              p: 1,
              textTransform: "none",
              ":hover": {
                boxShadow: "none",
              },
            }}
          >
            Search Jobs
          </Button>
          <Button
            onClick={() => navigate("/talents")}
            variant="outlined"
            sx={{
              boxShadow: "none",
              width: { xs: "170px", sm: "200px", md: "250px" },
              height: { xs: "30px", sm: "40px", md: "45px" },
              borderRadius: "8px",
              p: 1,
              textTransform: "none",
              ":hover": {
                boxShadow: "none",
              },
            }}
          >
            Find Talent
          </Button>
        </Box>

        <Typography
          variant="h6"
          sx={{ mb: 2, textAlign: "center", fontWeight: 600 }}
        >
          Recommeded Jobs For You
        </Typography>

        <Box className="flex flex-wrap items-center gap-3 md:justify-center">
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

        <Typography sx={{ textAlign: "center", mb: 3, fontWeight: 600 }}>
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
