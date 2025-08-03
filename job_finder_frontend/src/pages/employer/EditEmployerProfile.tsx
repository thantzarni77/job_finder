import {
  Container,
  Box,
  IconButton,
  Typography,
  OutlinedInput,
  InputLabel,
  Button,
  FormHelperText,
  Avatar,
  Alert,
  Divider,
  TextField,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useUserStore } from "../../store/UserStore";
import { useProfileStore } from "../../store/ProfileStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getEmployerProfile,
  updateEmployerProfile,
} from "../../helper/profileApiFunctions";

import { getSingleUserData, updateUser } from "../../helper/userApiFunctions";
import FullScreenLoader from "../../components/FullScreenLoader";
import { useUserDataStore } from "../../store/UserDataStore";
import { isAxiosError } from "axios";

type Inputs = {
  name: string;
  phone?: string;
  address?: string;
  profile_picture?: File | string;
  companyName?: string;
  companyEmail?: string;
  companyPhone?: string;
  companyAddress?: string;
  companyDescription?: string;
  companyType?: string;
  companyProfile?: File | string;
};

export default function EditEmployerProfile() {
  const queryClient = useQueryClient();

  const { id } = useParams();
  const user_id = Number(id);
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [companyImagePreview, setCompanyImagePreview] = useState<string | null>(
    null,
  );
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);

  const user = useUserStore((state) => state.user);
  const userData = useUserDataStore((state) => state.userData);
  const setUserData = useUserDataStore((state) => state.setUserData);
  const employerData = useProfileStore((state) => state.employerProfile);
  const setEmployerProfile = useProfileStore(
    (state) => state.setEmployerProfile,
  );
  console.log(employerData);

  const { data: employerProfileQuery, isPending } = useQuery({
    enabled: user?.user_type == "employer" && !employerData.id,
    queryKey: ["employerProfile", user?.user_id],
    queryFn: () => {
      return getEmployerProfile(user?.user_id);
    },
  });

  useEffect(() => {
    if (employerProfileQuery && !isPending) {
      console.log(employerProfileQuery);
      setEmployerProfile(employerProfileQuery.data[0]);
    }
  }, [employerProfileQuery, isPending, setEmployerProfile]);

  const userDataQuery = useQuery({
    queryKey: ["userSingleData", user?.user_id],
    queryFn: getSingleUserData,
  });

  useEffect(() => {
    if (userDataQuery.data && userDataQuery.isSuccess) {
      setUserData(userDataQuery.data.data);
    }
  }, [userDataQuery.data, userDataQuery.isSuccess, setUserData]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
  });

  const userUpdateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userSingleData", user_id],
      });
      queryClient.invalidateQueries({ queryKey: ["individualJob"] });
      if (!employerData.company_name) {
        navigate(-1);
      }
    },
    onError: (err) => {
      console.log(err);
      if (isAxiosError(err)) {
        setFileUploadError(err.response?.data.message);
      }
    },
  });

  const employerUpdateMutation = useMutation({
    mutationFn: updateEmployerProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employerProfile", user_id],
      });
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      navigate(-1);
    },
    onError: (err) => {
      console.log(err);
      if (isAxiosError(err)) {
        setFileUploadError(err.response?.data.message);
      }
    },
  });

  const onSubmit = (data: Inputs) => {
    const {
      name,
      phone,
      address,
      profile_picture,
      companyName,
      companyEmail,
      companyPhone,
      companyAddress,
      companyDescription,
      companyType,
      companyProfile,
    } = data;

    const userForm = new FormData();

    if (name) userForm.append("name", name);
    if (phone) userForm.append("phone", phone);
    if (address) userForm.append("address", address);
    if (profile_picture) userForm.append("profile_picture", profile_picture);

    userUpdateMutation.mutate({
      userID: user_id,
      userFormData: userForm,
    });

    if (companyName) {
      const employerForm = new FormData();

      employerForm.append("company_name", companyName);
      if (companyAddress)
        employerForm.append("company_address", companyAddress);
      if (companyPhone) employerForm.append("company_phone", companyPhone);
      if (companyEmail) employerForm.append("company_email", companyEmail);
      if (companyType) employerForm.append("company_type", companyType);
      if (employerData.verification)
        employerForm.append("verification", employerData.verification);
      if (companyProfile) employerForm.append("company_image", companyProfile);
      if (companyDescription)
        employerForm.append("company_description", companyDescription);

      employerUpdateMutation.mutate({
        employerID: employerData.id,
        employerData: employerForm,
      });
    }
  };

  useEffect(() => {
    if (employerData && employerData.id) {
      if (userData.name) setValue("name", userData.name);
      if (userData?.phone) setValue("phone", userData?.phone);
      if (userData?.address) setValue("address", userData?.address);
      if (userData.profile_picture) {
        setImagePreview(userData.profile_picture);
      }
      if (employerData.company_image) {
        setCompanyImagePreview(employerData.company_image);
      }

      if (employerData.company_name)
        setValue("companyName", employerData.company_name);
      if (employerData.company_email)
        setValue("companyEmail", employerData.company_email);
      if (employerData.company_phone)
        setValue("companyPhone", employerData.company_phone);
      if (employerData.company_address)
        setValue("companyAddress", employerData.company_address);
      if (employerData.company_description)
        setValue("companyDescription", employerData.company_description);
      if (employerData.company_type)
        setValue("companyType", employerData.company_type);
    }
  }, [employerData, setValue, userData]);

  if (!isPending) {
    return (
      <>
        <Box
          sx={{
            my: 3,
            alignItems: "center",
            display: "flex",
            position: "relative",
          }}
        >
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ ml: { xs: 1, sm: 5 } }}
          >
            <ArrowBackIosNewIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Edit Profile
          </Typography>
        </Box>
        <Container
          sx={{
            mb: 5,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
          maxWidth="sm"
        >
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            {!employerData.company_name && (
              <Controller
                name="profile_picture"
                control={control}
                render={({ field: { onChange } }) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Box sx={{ position: "relative", display: "inline-block" }}>
                      <Avatar
                        src={
                          imagePreview
                            ? imagePreview.startsWith("blob:")
                              ? imagePreview
                              : `${import.meta.env.VITE_API_BASE_URL}/${imagePreview}`
                            : undefined
                        }
                        sx={{ width: 70, height: 70, cursor: "pointer" }}
                        onClick={() =>
                          document.getElementById("image")?.click()
                        }
                      />
                      <IconButton
                        size="small"
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          boxShadow: 1,
                          bgcolor: "white",
                          "&:hover": { bgcolor: "white" },
                        }}
                        onClick={() =>
                          document.getElementById("image")?.click()
                        }
                      >
                        <CameraAltIcon fontSize="small" />
                      </IconButton>

                      <input
                        type="file"
                        id="image"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            onChange(file);
                            setImagePreview(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </Box>
                    <Typography>Upload Picture</Typography>
                  </Box>
                )}
              />
            )}

            {/* --- Profile Picture --- */}
            {employerData.company_name && (
              <Controller
                name="companyProfile"
                control={control}
                render={({ field: { onChange } }) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Box sx={{ position: "relative", display: "inline-block" }}>
                      <Avatar
                        src={
                          companyImagePreview
                            ? companyImagePreview.startsWith("blob:")
                              ? companyImagePreview
                              : `${import.meta.env.VITE_API_BASE_URL}/${companyImagePreview}`
                            : undefined
                        }
                        sx={{ width: 70, height: 70, cursor: "pointer" }}
                        onClick={() =>
                          document.getElementById("image")?.click()
                        }
                      />
                      <IconButton
                        size="small"
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          boxShadow: 1,
                          bgcolor: "white",
                          "&:hover": { bgcolor: "white" },
                        }}
                        onClick={() =>
                          document.getElementById("image")?.click()
                        }
                      >
                        <CameraAltIcon fontSize="small" />
                      </IconButton>

                      <input
                        type="file"
                        id="image"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            onChange(file);
                            setCompanyImagePreview(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </Box>
                    <Typography>Upload Picture</Typography>
                  </Box>
                )}
              />
            )}

            <Box
              sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2.5 }}
            >
              {/* ---name --- */}
              <Box>
                <InputLabel
                  htmlFor="name"
                  sx={{ color: "text.secondary", mb: 0.5 }}
                >
                  Your Name
                </InputLabel>
                <OutlinedInput
                  {...register("name", { required: "Name is required" })}
                  id="name"
                  placeholder="Please Enter Your Name"
                  size="small"
                  fullWidth
                  sx={{ bgcolor: "background.paper" }}
                  error={!!errors.name}
                />
                {errors.name && (
                  <FormHelperText error>{errors.name.message}</FormHelperText>
                )}
              </Box>

              {/* phone  */}
              <Box>
                <InputLabel
                  htmlFor="phone"
                  sx={{ color: "text.secondary", mb: 0.5 }}
                >
                  Phone Number
                </InputLabel>
                <OutlinedInput
                  type="tel"
                  {...register("phone")}
                  id="phone"
                  placeholder="Please Enter Your Phone Number"
                  size="small"
                  fullWidth
                  sx={{ bgcolor: "background.paper" }}
                  error={!!errors.phone}
                />
                {errors.phone && (
                  <FormHelperText error>{errors.phone.message}</FormHelperText>
                )}
              </Box>

              {/* address  */}
              <Box>
                <InputLabel
                  htmlFor="address"
                  sx={{ color: "text.secondary", mb: 0.5 }}
                >
                  Address
                </InputLabel>
                <OutlinedInput
                  {...register("address")}
                  id="address"
                  placeholder="Please Enter Your Address"
                  size="small"
                  fullWidth
                  sx={{ bgcolor: "background.paper" }}
                  error={!!errors.address}
                />
                {errors.address && (
                  <FormHelperText error>
                    {errors.address.message}
                  </FormHelperText>
                )}
                {!employerData.company_name && fileUploadError && (
                  <Alert
                    sx={{ borderRadius: 3, mt: 2 }}
                    variant="outlined"
                    severity="error"
                    onClose={() => {
                      setFileUploadError(null);
                    }}
                  >
                    {fileUploadError}
                  </Alert>
                )}
              </Box>

              {employerData.company_name && (
                <>
                  <Divider />
                  {/* company name  */}
                  <Box>
                    <InputLabel
                      htmlFor="companyName"
                      sx={{ color: "text.secondary", mb: 0.5 }}
                    >
                      Company Name
                    </InputLabel>
                    <OutlinedInput
                      {...register("companyName", {
                        required: "Company name is required",
                      })}
                      id="companyName"
                      placeholder="Please Enter Your Company Name"
                      size="small"
                      fullWidth
                      sx={{ bgcolor: "background.paper" }}
                      error={!!errors.companyName}
                    />
                    {errors.companyName && (
                      <FormHelperText error>
                        {errors.companyName.message}
                      </FormHelperText>
                    )}
                  </Box>

                  {/* company email  */}
                  <Box>
                    <InputLabel
                      htmlFor="companyEmail"
                      sx={{ color: "text.secondary", mb: 0.5 }}
                    >
                      Company Email
                    </InputLabel>
                    <OutlinedInput
                      {...register("companyEmail", {
                        required: "Company email is required",
                      })}
                      id="companyEmail"
                      placeholder="Please Enter Your Company email"
                      size="small"
                      fullWidth
                      sx={{ bgcolor: "background.paper" }}
                      error={!!errors.companyEmail}
                    />
                    {errors.companyEmail && (
                      <FormHelperText error>
                        {errors.companyEmail.message}
                      </FormHelperText>
                    )}
                  </Box>

                  {/* company phone  */}
                  <Box>
                    <InputLabel
                      htmlFor="companyPhone"
                      sx={{ color: "text.secondary", mb: 0.5 }}
                    >
                      Company Phone
                    </InputLabel>
                    <OutlinedInput
                      {...register("companyPhone", {
                        required: "Company phone is required",
                      })}
                      id="companyPhone"
                      placeholder="Please enter your company phone"
                      size="small"
                      fullWidth
                      sx={{ bgcolor: "background.paper" }}
                      error={!!errors.companyPhone}
                    />
                    {errors.companyPhone && (
                      <FormHelperText error>
                        {errors.companyPhone.message}
                      </FormHelperText>
                    )}
                  </Box>

                  {/* company address  */}
                  <Box>
                    <InputLabel
                      htmlFor="companyAddress"
                      sx={{ color: "text.secondary", mb: 0.5 }}
                    >
                      Company Address
                    </InputLabel>
                    <OutlinedInput
                      {...register("companyAddress", {
                        required: "Company address is required",
                      })}
                      id="companyAddress"
                      placeholder="Please enter your company address"
                      size="small"
                      fullWidth
                      sx={{ bgcolor: "background.paper" }}
                      error={!!errors.companyAddress}
                    />
                    {errors.companyAddress && (
                      <FormHelperText error>
                        {errors.companyAddress.message}
                      </FormHelperText>
                    )}
                  </Box>

                  {/* company type  */}
                  <Box>
                    <InputLabel
                      htmlFor="companyType"
                      sx={{ color: "text.secondary", mb: 0.5 }}
                    >
                      Company Type
                    </InputLabel>
                    <OutlinedInput
                      {...register("companyType", {
                        required: "Company type is required",
                      })}
                      id="companyType"
                      placeholder="Please enter your company type"
                      size="small"
                      fullWidth
                      sx={{ bgcolor: "background.paper" }}
                      error={!!errors.companyType}
                    />
                    {errors.companyType && (
                      <FormHelperText error>
                        {errors.companyType.message}
                      </FormHelperText>
                    )}
                  </Box>

                  {/* company description  */}
                  <Box>
                    <InputLabel
                      htmlFor="companyDescription"
                      sx={{ color: "text.secondary", mb: 0.5 }}
                    >
                      Company Description
                    </InputLabel>
                    <TextField
                      {...register("companyDescription", {
                        required: "Company description is required",
                      })}
                      multiline
                      minRows={4}
                      id="companyDescription"
                      placeholder="Please enter your company description"
                      size="small"
                      fullWidth
                      sx={{ bgcolor: "background.paper" }}
                      error={!!errors.companyDescription}
                    />
                    {errors.companyDescription && (
                      <FormHelperText error>
                        {errors.companyDescription.message}
                      </FormHelperText>
                    )}
                    {employerData.company_name && fileUploadError && (
                      <Alert
                        sx={{ borderRadius: 3, mt: 2 }}
                        variant="outlined"
                        severity="error"
                        onClose={() => {
                          setFileUploadError(null);
                        }}
                      >
                        {fileUploadError}
                      </Alert>
                    )}
                  </Box>
                </>
              )}
            </Box>
            <Box>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                loading={userUpdateMutation.isPending}
                sx={{
                  mt: 4,
                  py: 1,
                  textTransform: "none",
                  borderRadius: 2,
                  boxShadow: "none",
                  ":hover": { boxShadow: "none" },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </form>
        </Container>
      </>
    );
  } else {
    return (
      <FullScreenLoader
        open={employerProfileQuery.isSuccess}
        message="Getting Data..."
      />
    );
  }
}
