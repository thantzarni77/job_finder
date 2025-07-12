import { Box, Container, IconButton, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

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
        bgcolor: "background.paper",
        borderRadius: "20px",
        my: 2,
        p: 2,
        ":hover": {
          bgcolor: "background.hover",
        },
        "&:hover .trash-icon": {
          opacity: 1,
        },
        "&:hover .date": {
          opacity: 0,
        },
      }}
    >
      <Typography
        fontSize={"18px"}
        sx={{ fontWeight: 600, color: "text.secondary" }}
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
          sx={{ fontWeight: 400, color: "text.secondary", width: "70%" }}
        >
          {message}
        </Typography>
        <Box
          sx={{
            position: "relative",
            width: "60px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            variant="subtitle1"
            className="date"
            sx={{
              opacity: 1,
              fontWeight: 400,
              color: "text.secondary",
              transition: (theme) => theme.transitions.create("opacity"),
              position: "absolute",
            }}
          >
            1d ago
          </Typography>
          <IconButton
            aria-label="delete"
            className="trash-icon"
            sx={{
              opacity: 0,
              transition: (theme) => theme.transitions.create("opacity"),
              position: "absolute",
              ":hover": {
                bgcolor: "#EA43353D",
              },
            }}
          >
            <DeleteOutlineIcon
              sx={{ color: "primary.main" }}
              fontSize="small"
            />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
};

export default NotificationCard;
