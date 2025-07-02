import {
  Box,
  Container,
  Button,
  Typography,
  Stack,
  Pagination,
} from "@mui/material";
import Kpay from "../../../assets/kpay.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import GroupsIcon from "@mui/icons-material/Groups";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import JobCard from "../../../components/user/jobs/JobCard";
import Testimony from "../../../components/user/Testimony";

export default function CompanyDetail() {
  return (
    <>
      <Container sx={{ py: 5, mb: 5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 7 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img src={Kpay} alt="" style={{ width: "70px", height: "auto" }} />
            <Box>
              <Typography sx={{ fontWeight: 600 }}>KBZ Bank</Typography>
              <Typography variant="body2" sx={{ opacity: 0.5 }}>
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
          <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
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
          <Box sx={{ mt: 4, mb: 2 }}>
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
            <Box className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
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

          <Box sx={{ mt: 4, mb: 15 }}>
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
            <Box className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
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
      </Container>
    </>
  );
}
