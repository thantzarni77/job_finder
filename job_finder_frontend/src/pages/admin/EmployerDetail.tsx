import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  IconButton,
  Chip,
  Link,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
export default function EmployerDetail() {
  const navigate = useNavigate();
  return (
    <Box p={3} bgcolor="#f9f9fb" height="100vh">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight="bold">
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIosIcon />
          </IconButton>
          Employer detail view
        </Typography>
        <Button startIcon={<EditIcon />}>Edit</Button>
      </Box>

      <Paper elevation={0} sx={{ borderRadius: 2, p: 2, mb: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Meta
        </Typography>
        <Box mt={1} display="flex" flexWrap="wrap" gap={2}>
          <Chip
            label="Status : Active"
            size="small"
            icon={<RadioButtonCheckedIcon />}
          />
          <Chip
            label="Registered : 13 JUL 2025"
            size="small"
            icon={<AccessTimeIcon />}
          />
          <Chip
            label="Role : Employer"
            size="small"
            icon={<PersonIcon fontSize="small" />}
          />
        </Box>
      </Paper>

      {/* Company Info */}
      <Paper elevation={0} sx={{ borderRadius: 2, p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="body2">
              <BusinessIcon fontSize="small" sx={{ mr: 0.5 }} />
              Private company
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">
              <WorkIcon fontSize="small" sx={{ mr: 0.5 }} />
              Field : Social media
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={1}>
              <EmailIcon fontSize="small" />
              <Typography variant="body2">meta@gmail.com</Typography>
              <Chip label="verified" size="small" color="success" />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={1}>
              <PhoneIcon fontSize="small" />
              <Typography variant="body2">+95 9 12345678</Typography>
              <Chip label="verified" size="small" color="success" />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Profile Status */}
      <Paper elevation={0} sx={{ borderRadius: 2, p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2">
              <strong>Profile</strong> : updated on 1 JUL 2025
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center" gap={1}>
              <RadioButtonCheckedIcon color="error" fontSize="small" />
              <Typography variant="body2">
                <strong>Ban status</strong> : None
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2">
              <strong>Vacancies</strong> : 12 &nbsp;
              <Link href="#" underline="hover" sx={{ fontWeight: 500 }}>
                View
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">
              <strong>Uploaded jobs</strong> : 20 &nbsp;
              <Link href="#" underline="hover" sx={{ fontWeight: 500 }}>
                View
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Action Buttons */}
      <Box display="flex" gap={2} mt={2} flexWrap="wrap">
        <Button variant="outlined" color="warning">
          Suspend user
        </Button>
        <Button variant="outlined" color="error">
          Delete
        </Button>
        <Button variant="outlined">Send rest password link</Button>
      </Box>
    </Box>
  );
}
