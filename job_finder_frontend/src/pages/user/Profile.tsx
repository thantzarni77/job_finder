import {
  Container,
  Typography,
  Box,
  Button,
  Avatar,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import UserProjectImage from "../../assets/Rectangle 94.png";
import Linkify from "linkify-react";
export default function Profile() {
  const exampleLink = "https://github.com/thantzarni77/job_finder/tree/main";

  return (
    <Container sx={{ py: 3, mb: 20 }} maxWidth="lg">
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Profile
      </Typography>

      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 7 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ width: 80, height: 80 }} />

            <Box>
              <Typography variant="h6">John Doe</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Graphic Designer
              </Typography>
              <Typography variant="overline" color="success">
                Avaliable For Work
              </Typography>
            </Box>
          </Box>

          <Button variant="outlined" size="small" startIcon={<EditIcon />}>
            Edit Profile
          </Button>
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
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Degree in Design
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <SchoolIcon color="primary" />
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Diploma in Digital Marketing
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Experience</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <WorkIcon color="primary" />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
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
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
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
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  +09-123456789
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailOutlinedIcon color="primary" />
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  abc@gmail.com
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Social Media</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <LinkedInIcon color="primary" />
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                https://www.linkedin.com/in/johndoe
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Address</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <LocationOnIcon color="primary" />
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                123 Main Street, City, Country
              </Typography>
            </Box>
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
                  maxWidth: "90%",
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
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam Lorem ipsum dolor sit amet consectetur adipisicing
                    elit.
                  </Typography>
                  <Linkify>
                    <Typography
                      variant="body2"
                      sx={{ opacity: 0.7, color: "blue" }}
                    >
                      {exampleLink}
                    </Typography>
                  </Linkify>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
}
