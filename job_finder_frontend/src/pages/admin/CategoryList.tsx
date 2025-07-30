import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import CreateIcon from "@mui/icons-material/Create";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getSingleCategory,
} from "../../helper/jobCategoryApiFunctions";
import { useEffect, useState } from "react";
import { useCategoryStore } from "../../store/AdminStore";
import FullScreenLoader from "../../components/FullScreenLoader";
import { useForm } from "react-hook-form";
import { getAllCategories } from "../../helper/talentTypeAndRoleApiFunctions";

type CategoryFormData = {
  name: string;
};

const CategoryList = () => {
  const queryClient = useQueryClient();
  const categories = useCategoryStore((state) => state.categories);
  const setCategories = useCategoryStore((state) => state.setCategory);

  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    mode: "onChange",
  });

  // --- Dialog Handlers ---
  const handleOpenDeleteDialog = (id: number) => setDeleteCategoryId(id);
  const handleCloseDeleteDialog = () => setDeleteCategoryId(null);
  const handleOpenEditDialog = (id: number) => setEditCategoryId(id);

  const handleOpenAddDialog = () => {
    reset({ name: "" });
    setIsAddDialogOpen(true);
  };

  const handleCloseFormDialog = () => {
    setIsAddDialogOpen(false);
    setEditCategoryId(null);
    reset({ name: "" });
  };

  const allCategoriesQuery = useQuery({
    queryKey: ["jobCategories"],
    queryFn: getAllCategories,
  });
  const singleCategoryQuery = useQuery({
    queryKey: ["singleCategory", editCategoryId],
    queryFn: () => (editCategoryId ? getSingleCategory(editCategoryId) : null),
    enabled: !!editCategoryId,
  });

  const addCategoryMutation = useMutation({
    mutationFn: (payload: CategoryFormData) => addCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobCategories"] });
      handleCloseFormDialog();
    },
    onError: (error) => console.error("Failed to add category:", error),
  });

  const editCategoryMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: { name: string } }) =>
      editCategory(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobCategories"] });
      handleCloseFormDialog();
    },
    onError: (error) => console.error("Failed to edit category:", error),
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobCategories"] });
      handleCloseDeleteDialog();
    },
    onError: (error) => console.error("Failed to delete category:", error),
  });

  useEffect(() => {
    if (allCategoriesQuery.data?.data)
      setCategories(allCategoriesQuery.data.data);
  }, [allCategoriesQuery.data, setCategories]);

  useEffect(() => {
    if (singleCategoryQuery.data?.data)
      setValue("name", singleCategoryQuery.data.data.name);
  }, [singleCategoryQuery.data, setValue]);

  const onSubmit = (formData: CategoryFormData) => {
    if (editCategoryId) {
      editCategoryMutation.mutate({ id: editCategoryId, payload: formData });
    } else {
      addCategoryMutation.mutate(formData);
    }
  };

  const onConfirmDelete = () => {
    if (deleteCategoryId) deleteCategoryMutation.mutate(deleteCategoryId);
  };

  const categoryToDelete = categories.find(
    (cat) => cat.id === deleteCategoryId,
  );
  const isFormSubmitting =
    addCategoryMutation.isPending || editCategoryMutation.isPending;

  if (allCategoriesQuery.isPending) {
    return (
      <FullScreenLoader
        open={allCategoriesQuery.isPending}
        message="Getting Categories..."
      />
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Job Categories
      </Typography>
      <Button
        onClick={handleOpenAddDialog}
        sx={{
          backgroundColor: "#ffffff",
          textTransform: "none",
          borderRadius: "10px",
          px: 2,
          gap: 1,
          mt: 2,
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
          Add Category
        </Typography>
      </Button>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 5, my: 4 }}>
        {categories?.map((category) => (
          <Card
            sx={{
              width: "250px",
              height: "110px",
              boxShadow: "none",
              borderRadius: 2,
            }}
            key={category.id}
          >
            <CardContent>
              <Typography variant="body1">{category.name}</Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => handleOpenDeleteDialog(category.id)}
                variant="outlined"
                sx={{ borderColor: "error.main" }}
              >
                <DeleteOutlineIcon sx={{ color: "error.main" }} />
              </Button>
              <Button
                onClick={() => handleOpenEditDialog(category.id)}
                variant="outlined"
              >
                <EditNoteOutlinedIcon />
              </Button>
            </CardActions>
          </Card>
        ))}
        {categories.length == 0 && (
          <Typography>No Category exists currently</Typography>
        )}
      </Box>

      <Dialog open={!!deleteCategoryId} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <strong>"{categoryToDelete?.name}"</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              bgcolor: "primary.light",
              color: "background.paper",
              boxShadow: "none",
              ":hover": {
                boxShadow: "none",
              },
              textTransform: "none",
              borderRadius: 2,
            }}
            onClick={handleCloseDeleteDialog}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              boxShadow: "none",
              ":hover": {
                boxShadow: "none",
              },
              textTransform: "none",
              borderRadius: 2,
            }}
            onClick={onConfirmDelete}
            color="error"
            disabled={deleteCategoryMutation.isPending}
          >
            {deleteCategoryMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isAddDialogOpen || !!editCategoryId}
        onClose={handleCloseFormDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editCategoryId ? "Edit Category" : "Add New Category"}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              {...register("name", {
                required: "Category name is required.",
                maxLength: {
                  value: 50,
                  message: "Name must be 50 characters or less.",
                },
              })}
              sx={{ borderBottom: 1 }}
              fullWidth
              variant="standard"
              autoFocus
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={singleCategoryQuery.isFetching || isFormSubmitting}
            />
          </DialogContent>
          <DialogActions sx={{ p: "0 24px 24px" }}>
            <Button
              sx={{
                bgcolor: "primary.light",
                color: "background.paper",
                boxShadow: "none",
                ":hover": {
                  boxShadow: "none",
                },
                textTransform: "none",
                borderRadius: 2,
              }}
              onClick={handleCloseFormDialog}
              disabled={isFormSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "primary.main",
                boxShadow: "none",
                ":hover": {
                  boxShadow: "none",
                },
                textTransform: "none",
                borderRadius: 2,
              }}
              disabled={isFormSubmitting}
            >
              {isFormSubmitting
                ? "Saving..."
                : editCategoryId
                  ? "Save Changes"
                  : "Add Category"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default CategoryList;
