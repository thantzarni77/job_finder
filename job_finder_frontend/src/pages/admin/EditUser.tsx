import { TextField, Button, Typography, IconButton } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { ArrowBackIos as ArrowBackIcon } from "@mui/icons-material";

type FormValues = {
  name: string;
  jobTitle: string;
  position: string;
  email: string;
  phoneNumber: string;
};

export default function EditUser() {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        Edit User
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Name*"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
          )}
        />

        <Controller
          name="jobTitle"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Job title*"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
          )}
        />

        <Controller
          name="position"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Position*"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Email*"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              InputProps={{
                endAdornment: (
                  <span style={{ color: "green" }}>✓ Verified</span>
                ),
              }}
            />
          )}
        />

        <Controller
          name="phoneNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone number*"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              InputProps={{
                endAdornment: (
                  <span style={{ color: "green" }}>✓ Verified</span>
                ),
              }}
            />
          )}
        />

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Save
        </Button>
      </form>
    </div>
  );
}
