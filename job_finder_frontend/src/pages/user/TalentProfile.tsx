import {
  Container,
  Typography,
  Box,
  Button,
  Avatar,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UserProjectImage from "../../assets/Rectangle 94.png";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { getSeekerDetail, type SeekerType } from "../../helper/talentPage";
import { useQuery } from "@tanstack/react-query";
import FullScreenLoader from "../../components/FullScreenLoader";
import {
  Facebook as FaceBookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";
import type { ReactNode } from "react";

const socialLinkIcons: Record<string, ReactNode> = {
  facebook: <FaceBookIcon color="primary" />,
  instagram: <InstagramIcon color="primary" />,
  twitter: <TwitterIcon color="primary" />,
  github: <GitHubIcon color="primary" />,
  linkedin: <LinkedInIcon color="primary" />,
};

export default function TalentProfile() {
  const exampleLink = "https://github.com/thantzarni77/job_finder/tree/main";
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const user_id = Number(id);

  const { data: seeker, isPending: isSeekerPending } = useQuery<SeekerType>({
    queryKey: ["seeker", user_id],
    queryFn: () => getSeekerDetail(user_id),
  });

  if (isSeekerPending) {
    return <FullScreenLoader open={true} message={"Loading..."} />;
  }

  console.log(seeker);

  return (
    <Container sx={{ py: 3, mb: 20 }} maxWidth="lg">
      {/* talent name & back button */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mb: 4,
        }}
      >
        <IconButton onClick={() => navigate("/talents")}>
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
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: 700, mx: "auto" }}
        >
          Profile
        </Typography>
      </Box>

      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 7 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{ width: { xs: 50, md: 80 }, height: { xs: 50, md: 80 } }}
            />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {!isSeekerPending && seeker?.user_id.name}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {seeker?.talent}
              </Typography>
              <Typography
                variant="overline"
                color={"#75C149"}
                sx={{ fontWeight: 400, textTransform: "none" }}
              >
                Avaliable For Work
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "column", md: "row" },
              alignItems: { xs: "flex-start", sm: "flex-start", md: "center" },
            }}
          >
            <Button
              variant="outlined"
              sx={{
                // width: { xs: "20px", sm: " 150px", md: "150px" },
                bgcolor: "background.paper",
                height: "30px",
              }}
            >
              <EmailOutlinedIcon sx={{ fontSize: "20px" }} />
              <Typography
                variant="subtitle2"
                sx={{
                  color: "text.secondary",
                  fontWeight: 400,
                  mx: 1,
                  textTransform: "none",
                  display: { xs: "none", sm: "inline-flex", md: "inline-flex" },
                }}
              >
                Send Email
              </Typography>
            </Button>

            <Button
              sx={{
                // width: { xs: "20px", sm: " 185px", md: "185px" },
                bgcolor: "background.paper",
                height: "30px",
              }}
              variant="outlined"
            >
              <AddCircleOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
              <Typography
                variant="subtitle2"
                sx={{
                  color: "text.secondary",
                  fontWeight: 400,
                  mx: 1,
                  textTransform: "none",
                  display: { xs: "none", sm: "inline-flex", md: "inline-flex" },
                }}
              >
                Follow
              </Typography>
            </Button>
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Box>
            <Typography variant="h6">About Me</Typography>
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
              {seeker?.bio}
            </Typography>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Education</Typography>
            {seeker?.education.map((edu, index) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 1,
                  }}
                  key={index}
                >
                  <SchoolIcon color="primary" />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      University - {edu.school}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Degree - {edu.degree}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Year - {edu.year}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Experience</Typography>
            {seeker?.work_experience.map((exp, index) => {
              return (
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
                  key={index}
                >
                  <WorkIcon color="primary" />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Company - {exp.company}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Position - {exp.position}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {`${exp.start_date} to ${exp.end_date} `}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Contact Me</Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                mt: 1,
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PhoneInTalkIcon color="primary" />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {seeker?.user_id.phone}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailOutlinedIcon color="primary" />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {seeker?.user_id.email}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Social Media</Typography>
            {seeker?.social_media_link.map((link, index) => {
              const [platform, url] = Object.entries(link)[0];
              return (
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
                  key={index}
                >
                  {socialLinkIcons[platform] || null}
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {url}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Address</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <LocationOnIcon color="primary" />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {seeker?.user_id.address}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" sx={{ mt: 5, mb: 3, textAlign: "center" }}>
            Projects
          </Typography>
          <Box className="grid grid-cols-1 place-items-center gap-3 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => {
              return (
                <Card
                  sx={{
                    borderTopRadius: "20px",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    maxWidth: "95%",
                  }}
                  key={index}
                >
                  <img
                    src={UserProjectImage}
                    alt=""
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "200px",
                      borderRadius: "10px",
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6">Project Name</Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam Lorem ipsum dolor sit amet consectetur
                      adipisicing elit.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="outlined" fullWidth href={exampleLink}>
                      View Project
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
