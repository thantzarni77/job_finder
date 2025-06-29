import {
  Box,
  Container,
  Button,
  Typography,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Google as GoogleIcon,
  LinkedIn as LinkedInIcon,
  MailOutline as MailOutlineIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { useState } from "react";

import { Link } from "react-router";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box
      sx={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          border: "1px solid rgba(0, 0, 0, 0.1)",
          borderRadius: 3,
          boxShadow: 3,
          py: 3,
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center", fontWeight: 700 }}>
          Login
        </Typography>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "10px",
          }}
        >
          <OutlinedInput
            fullWidth
            type="email"
            placeholder="E-mail"
            endAdornment={
              <IconButton>
                <MailOutlineIcon />
              </IconButton>
            }
          />
          <OutlinedInput
            fullWidth
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            endAdornment={
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            }
          />
          <Button variant="contained">Login</Button>
        </form>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Link to="/login">
            <Typography variant="body2" color="primary">
              Forget Password?
            </Typography>
          </Link>

          <Link to="/register">
            <Typography variant="body2" color="primary">
              Register Account
            </Typography>
          </Link>
        </Box>

        <Typography
          variant="subtitle2"
          sx={{ opacity: 0.5, textAlign: "center", my: 2 }}
        >
          or sign in with
        </Typography>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-around" }}>
          <Button variant="outlined">
            <GoogleIcon />
          </Button>

          <Button variant="outlined">
            <FacebookIcon />
          </Button>

          <Button variant="outlined">
            <LinkedInIcon />
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
