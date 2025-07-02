import { Box, Container, Typography } from "@mui/material";
import NotificationCard from "./NotificationCard";

const notifications = [
  {
    title: "Application form completed",
    message:
      "Lorem ipsum dolor sit amet consectetur. Justo tempus pellentesque dis enim nibh viverra.",
  },
  {
    title: "Mr.Jhon sent you an email",
    message:
      "Lorem ipsum dolor sit amet consectetur. Justo tempus pellentesque dis enim nibh viverra.",
  },
];

const Notifications = () => {
  return (
    <Container
      sx={{ mx: "auto", p: 2, mt: 5, mb: 15, width: { xs: "90%", md: "70%" } }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, textAlign: "center" }}>
        Notifications
      </Typography>
      <Box sx={{ my: 4 }}>
        {notifications.map((singleNoti, index) => (
          <NotificationCard
            key={index}
            title={singleNoti.title}
            message={singleNoti.message}
          />
        ))}
      </Box>
    </Container>
  );
};

export default Notifications;
