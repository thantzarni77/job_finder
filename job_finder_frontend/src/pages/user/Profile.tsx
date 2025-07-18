import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SchoolIcon from "@mui/icons-material/School";
import AddIcon from "@mui/icons-material/Add";
import WorkIcon from "@mui/icons-material/Work";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Facebook, Instagram } from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import UserProjectImage from "../../assets/Rectangle 94.png";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getSeekerProfile } from "../../helper/profileApiFunctions";
import { useEffect } from "react";
import { useSeekerProfileStore } from "../../store/ProfileStore";

export default function Profile() {
  const exampleLink = "https://github.com/thantzarni77/job_finder/tree/main";
  const navigate = useNavigate();

  const { id } = useParams();

  const seekerProfile = useSeekerProfileStore((state) => state.seekerProfile);
  const setSeekerProfile = useSeekerProfileStore(
    (state) => state.setSeekerProfile,
  );

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["seekerProfile"],
    queryFn: () => {
      return getSeekerProfile(id);
    },
  });

  useEffect(() => {
    if (data && isSuccess) {
      setSeekerProfile(data.data.data);
    }
  }, [data, isSuccess, setSeekerProfile]);

  return (
    <Container sx={{ py: 3, mb: 20 }} maxWidth="lg">
      {isLoading ? (
        <Box>Loading...</Box>
      ) : (
        <>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: 700, mb: 5 }}
          >
            Profile
          </Typography>
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

              <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
                <Button
                  variant="outlined"
                  sx={{
                    width: { xs: "20px", sm: " 150px", md: "150px" },
                    height: "30px",
                  }}
                  onClick={() => navigate(`/profile/1/edit`)}
                >
                  <EditIcon sx={{ fontSize: "20px" }} />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      mx: 1,
                      textTransform: "none",
                      display: {
                        xs: "none",
                        sm: "inline-flex",
                        md: "inline-flex",
                      },
                    }}
                  >
                    Edit Profile
                  </Typography>
                </Button>

                <Button
                  sx={{
                    width: { xs: "20px", sm: " 185px", md: "185px" },
                    height: "30px",
                  }}
                  variant="outlined"
                  onClick={() => navigate(`/project/add`)}
                >
                  <AddIcon sx={{ fontSize: "20px" }} />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      mx: 1,
                      textTransform: "none",
                      display: {
                        xs: "none",
                        sm: "inline-flex",
                        md: "inline-flex",
                      },
                    }}
                  >
                    Add New Project
                  </Typography>
                </Button>
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
                <Typography variant="h6">Experience</Typography>

                {seekerProfile.work_experience.map((single, index) => {
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
                            {single}
                          </Typography>
                          <Typography variant="body2" color="primary">
                            2018 - 2022
                          </Typography>
                        </Box>
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
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      +09-123456789
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EmailOutlinedIcon color="primary" />
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      abc@gmail.com
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
                        <Facebook color="primary" />
                      )}
                      {single.includes("instagram") && (
                        <Instagram color="primary" />
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
                    123 Main Street, City, Country
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{ mt: 5, mb: 3, textAlign: "center" }}
              >
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
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Quisquam Lorem ipsum dolor sit amet consectetur
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
        </>
      )}
    </Container>
  );
}
