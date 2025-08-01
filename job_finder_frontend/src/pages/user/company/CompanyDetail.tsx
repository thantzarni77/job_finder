import {
  Box,
  Button,
  Typography,
  Stack,
  Pagination,
  IconButton,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useNavigate, useParams } from "react-router";
import { getCompanyDetail } from "../../../helper/companyPageApi";
import { useQuery } from "@tanstack/react-query";
import FullScreenLoader from "../../../components/FullScreenLoader";

export default function CompanyDetail() {
  const { id } = useParams();
  const jobId = Number(id);
  const navigate = useNavigate();

  const { data: job, isPending } = useQuery({
    queryKey: ["companyDetail", jobId],
    queryFn: () => getCompanyDetail(jobId),
  });

  if (isPending) {
    return <FullScreenLoader open={true} message={"Loading"} />;
  }
  console.log(job);
  return (
    <>
      <Box sx={{ pt: 3, pb: 5, mb: 2, width: "90%", mx: "auto" }}>
        <IconButton onClick={() => navigate("/companies")}>
          <ArrowBackIosIcon
            sx={{
              color: "primary.main",
              fontSize: 32,
              ":hover": {
                color: "text.secondary",
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
            <img
              src={
                job.company_image
                  ? `${import.meta.env.VITE_API_BASE_URL}/${job.company_image}`
                  : `${import.meta.env.VITE_API_BASE_URL}/${job.user.profile_picture}`
              }
              alt=""
              style={{ width: "70px", height: "auto" }}
            />
            <Box>
              <Typography sx={{ fontWeight: 600 }}></Typography>
              <Typography variant="body2" sx={{ color: "primary.light" }}>
                {job.company_type ?? "Individual"}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 600 }}>Description</Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
            {job.company_description ?? job.company_description}
          </Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 600 }}>Address</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <LocationOnIcon color="primary" />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {job.company_address}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontWeight: 600 }}>Company Type</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <AccountBalanceIcon color="primary" />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {job.company_type}
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
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {job.company_email ?? job.user.email}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneInTalkIcon color="primary" />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {job.company_phone ?? job.user.phone}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
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
                color: "text.secondary",
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
              {/* <JobCard />
              <JobCard />
              <JobCard /> */}
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
