import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import CreateIcon from "@mui/icons-material/Create";
import RemoveModeratorOutlinedIcon from "@mui/icons-material/RemoveModeratorOutlined";
import { useNavigate } from "react-router";
import { useAdminStore } from "../../store/AdminStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllAdmins, removeAdmin } from "../../helper/adminApiFunctions";
import { useEffect, useState } from "react";
import FullScreenLoader from "../../components/FullScreenLoader";
import { format } from "date-fns";

const AdminList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedAdminId, setSelectedAdminId] = useState<number | null>(null);

  const handleClickOpen = (adminId: number) => {
    setSelectedAdminId(adminId);
  };

  const handleClose = () => {
    setSelectedAdminId(null);
  };

  const allAdmins = useAdminStore((state) => state.allAdmins);
  const setAllAdmins = useAdminStore((state) => state.setAllAdmins);

  const allAdminsQuery = useQuery({
    queryKey: ["allAdmins"],
    queryFn: getAllAdmins,
  });

  useEffect(() => {
    if (allAdminsQuery.data) {
      setAllAdmins(allAdminsQuery.data.data);
    }
  }, [allAdminsQuery.data, setAllAdmins]);

  const removeAdminMutation = useMutation({
    mutationFn: removeAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allAdmins"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  if (allAdminsQuery.isFetching) {
    return (
      <FullScreenLoader
        open={allAdminsQuery.isFetching}
        message="Getting Admin Data..."
      />
    );
  }

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Admin Management
      </Typography>
      <Button
        onClick={() => navigate("/admin/add")}
        sx={{
          backgroundColor: "#ffffff",
          textTransform: "none",
          borderRadius: "10px",
          px: 2,
          gap: 1,
          my: 2,
          ":hover": {
            bgcolor: "background.hover",
          },
        }}
      >
        <CreateIcon />
        <Typography
          variant="subtitle2"
          sx={{ color: "#000000", fontWeight: 400 }}
        >
          Add Admin
        </Typography>
      </Button>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: "none", borderRadius: 3, pb: 2, px: 2 }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="admin list">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Actions</TableCell>
              <TableCell align="right">Created at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allAdmins ? (
              allAdmins.map((admin) => (
                <TableRow
                  key={admin.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {admin.name}
                  </TableCell>
                  <TableCell align="right">{admin.email}</TableCell>
                  <TableCell
                    align="right"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Dialog
                      key={admin.id}
                      open={selectedAdminId === admin.id}
                      onClose={handleClose}
                      aria-labelledby="shorlist-confirmation"
                    >
                      <DialogTitle id="shorlist-confirmation">
                        {"Remove from admin"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Are you sure you want to remove {admin.name} from
                          admin access ?
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
                            bgcolor: "primary.main",
                            boxShadow: "none",
                            ":hover": {
                              boxShadow: "none",
                            },
                            textTransform: "none",
                            borderRadius: 1,
                          }}
                          onClick={() => {
                            removeAdminMutation.mutate(admin.id);
                            handleClose();
                          }}
                          autoFocus
                        >
                          Remove
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <Button
                      onClick={() => handleClickOpen(admin.id)}
                      variant="outlined"
                      sx={{
                        color: "error.main",
                        borderColor: "error.main",
                        borderRadius: 2,
                        boxShadow: "none",
                        ":hover": {
                          boxShadow: "none",
                        },
                        textTransform: "none",
                      }}
                    >
                      <RemoveModeratorOutlinedIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    {format(new Date(admin.created_at), "dd MMM yyyy")}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow
                key={"#"}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  No admin exists currently
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminList;
