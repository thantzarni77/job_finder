import {
  Box,
  Button,
  Typography,
  Stack,
  Pagination,
  IconButton,
} from "@mui/material";
import Kpay from "../../../assets/kpay.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import GroupsIcon from "@mui/icons-material/Groups";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import JobCard from "../../../components/user/jobs/JobCard";
import Testimony from "../../../components/user/Testimony";
import { useNavigate } from "react-router";

export default function CompanyDetail() {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ pt: 3, pb: 5, mb: 2, width: "90%", mx: "auto" }}>
        <IconButton onClick={() => navigate("/companies")}>
          <ArrowBackIosIcon
            sx={{
              color: "primary.main",
              fontSize: 32,
              ":hover": {
                color: "secondary.main",
                cursor: "pointer",
              },
            }}
          />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            mt: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img src={Kpay} alt="" style={{ width: "70px", height: "auto" }} />
            <Box>
              <Typography sx={{ fontWeight: 600 }}>KBZ Bank</Typography>
              <Typography variant="body2" sx={{ color: "primary.light" }}>
                Banking
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            size="small"
            sx={{ backgroundColor: "#ffffff", textTransform: "none" }}
          >
            + Follow
          </Button>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 600 }}>Description</Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "secondary.main" }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
            tempora sapiente quos, dignissimos deleniti veritatis! Aperiam quae
            reprehenderit odio provident, deleniti, veniam recusandae itaque
            maiores accusamus quasi, facere delectus labore. Lorem ipsum dolor,
            sit amet consectetur adipisicing elit. Aspernatur corporis cumque
            veniam! Quidem ipsam veniam, quaerat necessitatibus assumenda
            recusandae tempora modi nulla aliquam hic vitae, porro nemo animi.
            Minima, est!
          </Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 600 }}>Address</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <LocationOnIcon color="primary" />
            <Typography variant="body2" sx={{ color: "secondary.main" }}>
              123 Main Street, City, Country
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 600 }}>Company Type</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <AccountBalanceIcon color="primary" />
            <Typography variant="body2" sx={{ color: "secondary.main" }}>
              Public Limited
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 600 }}> Number of Employees</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <GroupsIcon color="primary" />
            <Typography variant="body2" sx={{ color: "secondary.main" }}>
              1000+
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 600 }}>Contact Us</Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              mt: 1,
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmailOutlinedIcon color="primary" />
              <Typography variant="body2" sx={{ color: "secondary.main" }}>
                abc@gmail.com
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneInTalkIcon color="primary" />
              <Typography variant="body2" sx={{ color: "secondary.main" }}>
                +09-123456789
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 600 }}>Company Website</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <LanguageOutlinedIcon color="primary" />
            <Typography variant="body2" sx={{ color: "secondary.main" }}>
              https://www.companywebsite.com
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              gap: 2,
              my: 5,
            }}
          >
            <Typography
              sx={{
                color: "secondary.main",
                fontWeight: 600,
                mt: 5,
                mb: 3,
                textAlign: "center",
              }}
            >
              Open Vacancies
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                  md: "row",
                  lg: "row",
                },
                justifyContent: "center",
                alignItems: "center",
                gap: { xs: 4, sm: 4, md: 5 },
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              <JobCard />
              <JobCard />
              <JobCard />
            </Box>

            <Stack sx={{ mt: 4, alignItems: "center" }}>
              <Pagination
                count={10}
                variant="outlined"
                shape="rounded"
                color="primary"
              />
            </Stack>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mt: 5,
              mb: 15,
            }}
          >
            <Typography
              sx={{
                color: "secondary.main",
                fontWeight: 600,
                mt: 5,
                mb: 3,
                textAlign: "center",
              }}
            >
              Testimonial
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                  md: "row",
                  lg: "row",
                },
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              <Testimony />
              <Testimony />
              <Testimony />
            </Box>

            <Stack sx={{ mt: 4, alignItems: "center" }}>
              <Pagination
                count={10}
                variant="outlined"
                shape="rounded"
                color="primary"
              />
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}
