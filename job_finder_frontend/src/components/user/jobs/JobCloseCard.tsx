import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { format } from "date-fns";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJob } from "../../../helper/jobApiFunctions";
import { useNavigate } from "react-router";

type Props = {
  postJobID: number;
  applicantCount: number | null | undefined;
  deadline: string | undefined | Date | number;
};

const JobCloseCard = ({ postJobID, applicantCount, deadline }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletePostMutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobPosts"] });
      queryClient.invalidateQueries({ queryKey: ["pureJobPosts"] });
      navigate(-1);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const deletePostHandler = () => {
    deletePostMutation.mutate(postJobID);
  };
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="job-delete-confirmation"
      >
        <DialogTitle id="job-delete-confirmation">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this job ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{
              bgcolor: "primary.light",
              boxShadow: "none",
              ":hover": {
                boxShadow: "none",
              },
              textTransform: "none",
              borderRadius: 1,
            }}
            autoFocus
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "error.main",
              boxShadow: "none",
              ":hover": {
                boxShadow: "none",
              },
              textTransform: "none",
              borderRadius: 1,
            }}
            onClick={() => {
              deletePostHandler();
              handleClose();
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Paper
        elevation={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "325px", md: "375px" },
          borderRadius: "20px",
          boxShadow: "none",
          px: 3,
          py: 2,
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <GroupsOutlinedIcon sx={{ color: "primary.main" }} />
            <Typography sx={{ color: "text.primary" }}>
              {applicantCount} Applicants
            </Typography>
          </Box>
          <Divider flexItem sx={{ color: "primary.main", mb: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <QueryBuilderIcon sx={{ color: "primary.main" }} />
            <Typography sx={{ color: "text.primary" }}>
              {deadline && format(deadline, "dd MMM yyyy")}
            </Typography>
          </Box>
          <Divider flexItem sx={{ mb: 1 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography>Delete this job</Typography>
            <IconButton
              onClick={() => handleClickOpen()}
              disabled={deletePostMutation.isPending}
            >
              <DeleteOutlinedIcon sx={{ color: "error.main" }} />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default JobCloseCard;
