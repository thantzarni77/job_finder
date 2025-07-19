import {
  Box,
  FormHelperText,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useFormContext } from "react-hook-form";

const ContactToAdminForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography component="label" htmlFor="title" sx={{ fontWeight: 300 }}>
          Title
        </Typography>
        <OutlinedInput
          id="title"
          fullWidth
          placeholder="Please enter message title"
          {...register("title", { required: "Title is required." })}
          error={!!errors.title}
        />

        {errors.title && (
          <FormHelperText error>
            {errors.title.message as string}
          </FormHelperText>
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography
          component="label"
          htmlFor="message"
          sx={{ fontWeight: 300 }}
        >
          Message
        </Typography>
        <TextField
          id="message"
          multiline
          minRows={4}
          fullWidth
          placeholder="Please enter your message"
          {...register("message", { required: "Message is required." })}
          error={!!errors.message}
        />
        {errors.message && (
          <FormHelperText error>
            {errors.message.message as string}
          </FormHelperText>
        )}
      </Box>
    </Box>
  );
};

export default ContactToAdminForm;
