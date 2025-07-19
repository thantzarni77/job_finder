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
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UserProjectImage from "../../assets/Rectangle 94.png";
import { useNavigate } from "react-router";

export default function TalentProfile() {
  const exampleLink = "https://github.com/thantzarni77/job_finder/tree/main";
  const navigate = useNavigate();

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
                John Doe
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Graphic Designer
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              voluptatem voluptates soluta quod amet neque magnam, veritatis
              facere mollitia nostrum vero rerum a fuga molestias totam non
              accusamus architecto incidunt!
            </Typography>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Education</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <SchoolIcon color="primary" />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Degree in Design
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <SchoolIcon color="primary" />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Diploma in Digital Marketing
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Experience</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <WorkIcon color="primary" />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Weed Developer
                </Typography>
                <Typography variant="body2" color="primary">
                  2018 - 2022
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <WorkIcon color="primary" />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Creative Studio
                </Typography>
                <Typography variant="body2" color="primary">
                  2018 - 2022
                </Typography>
              </Box>
            </Box>
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
                  +09-123456789
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailOutlinedIcon color="primary" />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  abc@gmail.com
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Social Media</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <LinkedInIcon color="primary" />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                https://www.linkedin.com/in/johndoe
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Address</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <LocationOnIcon color="primary" />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                123 Main Street, City, Country
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
