import { Box, Container, Typography } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useNavigate, useParams } from "react-router";

const AppliedJobs = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <Container
      onClick={() => navigate(`/settings/user/${id}/applied-jobs`)}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        width: "100%",
        height: "fit-content",
        bgcolor: "background.paper",
        borderRadius: "20px",
        my: 2,
        p: 2,
        ":hover": {
          bgcolor: "background.hover",
          cursor: "pointer",
        },
      }}
    >
      <SendOutlinedIcon
        sx={{ mt: 1, mr: 2, color: "primary.main", rotate: "-50deg" }}
      />
      <Box>
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, color: "text.secondary" }}
        >
          Applied Jobs
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, color: "text.secondary" }}
        >
          View your applied jobs
        </Typography>
      </Box>
    </Container>
  );
};

export default AppliedJobs;
