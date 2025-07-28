import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams } from "react-router";

const ViewApplicantList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <Box sx={{ width: "90%", mx: "auto" }}>
      {/*  title & back button */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mt: 5,
          mb: 4,
        }}
      >
        <IconButton onClick={() => navigate(`/job/${id}`)}>
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
          Applicants
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          justifyContent: "center",
          flexWrap: "wrap",
          my: 4,
          width: { xs: "100%", md: "70%" },
        }}
      ></Box>
    </Box>
  );
};

export default ViewApplicantList;
