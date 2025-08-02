import {
  Box,
  Button,
  FormHelperText,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { sendContact } from "../../helper/contactApiFunctions";
import { useNavigate, useParams } from "react-router";

type FormData = {
  title: string;
  message: string;
};

const ContactToAdmin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { id } = useParams();
  const userID = Number(id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const addToContactMutation = useMutation({
    mutationFn: sendContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      navigate(-1);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const submitHandler = (data: FormData) => {
    const { title, message } = data;
    addToContactMutation.mutate({
      user_id: userID,
      title: title,
      message: message,
    });
  };
  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(submitHandler)}
      sx={{
        bgcolor: "background.paper",
        p: 5,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "70%",
        mx: "auto",
        my: 5,
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
      <Button
        variant="contained"
        type="submit"
        loading={addToContactMutation.isPending}
        sx={{
          width: "fit-content",
          borderRadius: 2,
          boxShadow: "none",
          textTransform: "none",
          ":hover": {
            boxShadow: "none",
          },
        }}
      >
        Send
      </Button>
    </Box>
  );
};

export default ContactToAdmin;
