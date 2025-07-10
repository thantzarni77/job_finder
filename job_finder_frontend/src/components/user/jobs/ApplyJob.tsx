import {
  Box,
  Button,
  IconButton,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router";
import JobCard from "./JobCard";
import CustomFIleUpload from "../../custom_svg/CustomFIleUpload";
import { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ApplyJob = () => {
  const navigate = useNavigate();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    //prevent memory leak
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      setSelectedFiles(files);

      //create preview url for first file
      const firstFile = files[0];
      const newPreviewUrl = URL.createObjectURL(firstFile);

      // clean up the old URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(newPreviewUrl);
    }
  };

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setSelectedFiles([]);
    setPreviewUrl(null);
    //  reset the file input value  so the user can re-select the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleContainerClick = () => {
    if (!previewUrl) {
      fileInputRef.current?.click();
    }
  };

  return (
    <Box sx={{ width: "90%", mx: "auto", mb: 15 }}>
      {/* Form Title & back button */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mt: 5,
          mb: 4,
        }}
      >
        <ArrowBackIosIcon
          onClick={() => navigate("/job/JC-1111")}
          sx={{
            color: "primary.main",
            fontSize: 32,
            ":hover": {
              color: "secondary.main",
              cursor: "pointer",
            },
          }}
        />
        <Typography variant="h5" sx={{ fontWeight: 600, mx: "auto" }}>
          Application Form
        </Typography>
      </Box>
      {/* form and job card */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "column", lg: "row" },
          alignItems: { xs: "center", md: "center", lg: "flex-start" },
          gap: { xs: 0, md: 0, lg: 5 },
        }}
      >
        <JobCard />

        {/* application form */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: { xs: "90%", md: "60%", lg: "35%" },
            gap: 3,
            mx: { xs: "auto", md: 0 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "full",
              mt: 3,
            }}
          >
            <Typography
              component="label"
              htmlFor="name"
              sx={{
                fontWeight: 300,
              }}
            >
              Your Name
              <span style={{ color: "#ef4444" }}>*</span>
            </Typography>
            <TextField
              id="name"
              variant="outlined"
              fullWidth
              placeholder="Please enter your name"
              sx={{
                // root of the OutlinedInput
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#ffffff",
                  borderRadius: "13px",

                  //  border
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },

                  // Style the border when focused
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.light", // Use theme's primary color on focus
                  },
                },
                //  placeholder text
                "& .MuiInputBase-input::placeholder": {
                  color: "primary.main",
                  fontSize: "13px",
                  fontWeight: 400,
                },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "full",
            }}
          >
            <Typography
              component="label"
              htmlFor="email-address"
              sx={{
                fontWeight: 300,
              }}
            >
              Email address
              <span style={{ color: "#ef4444" }}>*</span>
            </Typography>
            <TextField
              id="email-address"
              variant="outlined"
              fullWidth
              placeholder="Please enter your email address"
              sx={{
                // root of the OutlinedInput
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#ffffff",
                  borderRadius: "13px",

                  //  border
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },

                  // Style the border when focused
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.light", // Use theme's primary color on focus
                  },
                },
                //  placeholder text
                "& .MuiInputBase-input::placeholder": {
                  color: "primary.main",
                  fontSize: "13px",
                  fontWeight: 400,
                },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "full",
            }}
          >
            <Typography
              component="label"
              htmlFor="phone"
              sx={{
                fontWeight: 300,
              }}
            >
              Phone number
              <span style={{ color: "#ef4444" }}>*</span> {/* Red asterisk */}
            </Typography>
            <TextField
              id="phone"
              variant="outlined"
              fullWidth
              placeholder="Please enter your phone number"
              sx={{
                // root of the OutlinedInput
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#ffffff",
                  borderRadius: "13px",

                  //  border
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },

                  // Style the border when focused
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.light", // Use theme's primary color on focus
                  },
                },
                //  placeholder text
                "& .MuiInputBase-input::placeholder": {
                  color: "primary.main",
                  fontSize: "13px",
                  fontWeight: 400,
                },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "full",
            }}
          >
            <Typography
              component="label"
              htmlFor="salary"
              sx={{
                fontWeight: 300,
              }}
            >
              Salary{" "}
              <Typography variant="caption" sx={{ color: "primary.light" }}>
                (optional)
              </Typography>
            </Typography>
            <TextField
              id="salary"
              variant="outlined"
              fullWidth
              placeholder="Please enter your expected salary"
              sx={{
                // root of the OutlinedInput
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#ffffff",
                  borderRadius: "13px",

                  //  border
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },

                  // Style the border when focused
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.light", // Use theme's primary color on focus
                  },
                },
                //  placeholder text
                "& .MuiInputBase-input::placeholder": {
                  color: "primary.main",
                  fontSize: "13px",
                  fontWeight: 400,
                },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "full",
            }}
          >
            <Typography
              component="label"
              htmlFor="cv"
              sx={{
                fontWeight: 300,
              }}
            >
              Upload your CV
              <span style={{ color: "#ef4444" }}>*</span>
            </Typography>

            {/* Image Preview Section */}
            <Box
              onClick={handleContainerClick}
              sx={{
                width: "100%",
                height: "220px",
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: "13px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
                cursor: previewUrl ? "default" : "pointer", // Change cursor based on state
                transition: "background-color 0.2s ease",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  backgroundColor: previewUrl ? "#fff" : "#fafafa",
                },
              }}
            >
              <VisuallyHiddenInput
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />

              {previewUrl ? (
                // --- Preview State ---
                <>
                  <img
                    src={previewUrl}
                    alt="Image preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    onClick={handleClear}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      },
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                  {selectedFiles.length > 1 && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 8,
                        right: 8,
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        color: "white",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        fontSize: "0.75rem",
                      }}
                    >
                      + {selectedFiles.length - 1} more
                    </Box>
                  )}
                </>
              ) : (
                // --- Initial State ---
                <Box sx={{ textAlign: "center", color: "text.secondary" }}>
                  <CustomFIleUpload />
                </Box>
              )}
            </Box>

            <Button
              onClick={() => navigate("/job/JC-1111/apply/confirm")}
              variant="contained"
              sx={{
                my: 2,
                boxShadow: "none",
                textTransform: "none",
                fontWeight: 400,
                borderRadius: "8px",
                p: 1,
                "&:hover": {
                  boxShadow: "none",
                },
              }}
            >
              Apply Now
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ApplyJob;
