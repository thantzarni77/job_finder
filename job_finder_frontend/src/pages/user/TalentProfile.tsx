import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import FullScreenLoader from "../../components/FullScreenLoader";
import {
  Facebook as FaceBookIcon,
  Instagram as InstagramIcon,
} from "@mui/icons-material";

import { getSeekerProfile } from "../../helper/profileApiFunctions";
import type { SeekerProfile } from "../../store/ProfileStore";
import type { SeekerProject } from "../../store/SeekerStore";
import { eachSeekerGetProject } from "../../helper/seekerProjectApiFunctions";

export default function TalentProfile() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const user_id = Number(id);

  const seekerProfileQuery = useQuery({
    queryKey: ["seekerProfile", user_id],
    queryFn: () => {
      return getSeekerProfile(user_id);
    },
  });

  const seekerProfile: SeekerProfile = seekerProfileQuery.data?.data.data[0];

  const seekerProjectQuery = useQuery({
    queryKey: ["seekerProject", user_id],
    queryFn: () => {
      return eachSeekerGetProject(user_id);
    },
  });

  const seekerProjects: SeekerProject[] = seekerProjectQuery.data?.data;

  if (seekerProfile && seekerProjects) {
    return (
      <Container sx={{ py: 3, mb: 20 }} maxWidth="lg">
        {/* Job title & back button */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            mb: 4,
          }}
        >
          <IconButton onClick={() => navigate(-1)}>
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

          <Typography variant="h6" sx={{ fontWeight: 600, mx: "auto" }}>
            {seekerProfile.user_id.name}'s Profile
          </Typography>
        </Box>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 7 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* <Avatar
                  sx={{ width: { xs: 50, md: 80 }, height: { xs: 50, md: 80 } }}
                /> */}
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/${seekerProfile.image}`}
                alt={"SeekerProfile"}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
              />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {seekerProfile.user_id.name}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {seekerProfile.talent}
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
          </Box>

          <Box sx={{ mt: 3 }}>
            <Box>
              <Typography variant="h6">About Me</Typography>
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
                {seekerProfile.bio}
              </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Role</Typography>
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
                {seekerProfile.role}
              </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Education</Typography>

              {seekerProfile.education.map((single, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <SchoolIcon color="primary" />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {single.degree}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        {single.year}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Skills</Typography>

              {seekerProfile.skills.map((single, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <EngineeringOutlinedIcon color="primary" />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {single}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Experience</Typography>

              {seekerProfile.work_experience &&
                seekerProfile.work_experience.map((single, index) => {
                  return (
                    <Box key={index}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          my: 1,
                        }}
                      >
                        <WorkIcon color="primary" />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            {single.workPos}
                          </Typography>
                          <Typography variant="body2" color="primary">
                            {single.year}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              {!seekerProfile.work_experience && (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      my: 1,
                    }}
                  >
                    <WorkIcon color="primary" />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        No Exp
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}
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
                    {seekerProfile.user_id.phone
                      ? seekerProfile.user_id.phone
                      : "No Data"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EmailOutlinedIcon color="primary" />
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {seekerProfile.user_id.email}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Social Media</Typography>
              {seekerProfile.social_media_link.map((single, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    {single.includes("facebook") && (
                      <FaceBookIcon color="primary" />
                    )}
                    {single.includes("instagram") && (
                      <InstagramIcon color="primary" />
                    )}
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {single}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Address</Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
              >
                <LocationOnIcon color="primary" />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {seekerProfile.user_id.address
                    ? seekerProfile.user_id.address
                    : "No Data"}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ mt: 5, mb: 3, textAlign: "center" }}>
              Projects
            </Typography>
            {seekerProjects.length > 0 && (
              <Box className="grid grid-cols-1 place-items-center gap-3 md:grid-cols-2 lg:grid-cols-4">
                {seekerProjectQuery.data &&
                  seekerProjects.map((single) => {
                    return (
                      <Card
                        sx={{
                          borderTopRadius: "20px",
                          backgroundColor: "transparent",
                          boxShadow: "none",
                          maxWidth: "95%",
                        }}
                        key={single.id}
                      >
                        <img
                          src={`${import.meta.env.VITE_API_BASE_URL}/image/${single.image}`}
                          alt=""
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "200px",
                            borderRadius: "10px",
                          }}
                        />
                        <CardContent>
                          <Typography variant="h6">{single.title}</Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            {single.description}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            variant="outlined"
                            fullWidth
                            href={`../${single.link}`}
                          >
                            View Project
                          </Button>
                        </CardActions>
                      </Card>
                    );
                  })}
              </Box>
            )}
            {seekerProjects.length == 0 && (
              <Typography>No Projects Added</Typography>
            )}
          </Box>
        </Box>
      </Container>
    );
  } else {
    return (
      <FullScreenLoader
        open={seekerProfileQuery.isFetching}
        message={"Loading Data"}
      />
    );
  }
}
