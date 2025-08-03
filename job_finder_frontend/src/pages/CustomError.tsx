import { useRouteError, useNavigate, isRouteErrorResponse } from "react-router";

// MUI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import Oops from "../assets/oops.gif";

export default function CustomError() {
  const navigate = useNavigate();
  const error = useRouteError();

  console.error(error);

  let errorStatus: number | string = "Error";
  let errorMessage: string = "An unexpected error has occurred.";

  if (isRouteErrorResponse(error)) {
    errorStatus = `${error.status} ${error.statusText}`;
    if (error.data?.message) {
      errorMessage = error.data.message;
    } else if (error.status === 404) {
      errorMessage = "The page you are looking for does not exist.";
    } else {
      errorMessage = "Sorry, something went wrong on our end.";
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          textAlign: "center",
          py: 4,
        }}
      >
        <img src={Oops} alt="Error" style={{ width: "35%" }} />

        <Typography variant="h3" component="h1" gutterBottom>
          Oops!
        </Typography>

        <Typography variant="h5" color="text.secondary" sx={{ mb: 1 }}>
          {errorStatus}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {errorMessage}
        </Typography>

        <Button
          variant="contained"
          onClick={handleGoHome}
          startIcon={<HomeIcon />}
          sx={{
            px: 4,
            py: 1,
            fontSize: "1rem",
            borderRadius: 2,
            textTransform: "none",
            boxShadow: "none",
            ":hover": {
              boxShadow: "none",
            },
          }}
        >
          Return to Home
        </Button>
      </Box>
    </Container>
  );
}
