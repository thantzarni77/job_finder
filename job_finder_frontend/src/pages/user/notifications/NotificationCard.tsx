import { Box, Container, Typography } from "@mui/material";

type Props = {
  title: string;
  message: string;
};

const NotificationCard = ({ title, message }: Props) => {
  return (
    <Container
      sx={{
        width: "100%",
        height: "fit-content",
        bgcolor: "#ffffff",
        borderRadius: "20px",
        my: 2,
        p: 2,
      }}
    >
      <Typography
        fontSize={"18px"}
        sx={{ fontWeight: 600, color: "secondary.main" }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{ fontWeight: 400, color: "secondary.main", width: "70%" }}
        >
          {message}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 400,
            color: "secondary.main",
          }}
        >
          1d ago
        </Typography>
      </Box>
    </Container>
  );
};

export default NotificationCard;
