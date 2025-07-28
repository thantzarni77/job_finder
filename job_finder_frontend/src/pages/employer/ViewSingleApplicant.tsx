import {
  Box,
  IconButton,
  Typography,
  CircularProgress,
  Modal,
  Fade,
  useTheme,
  Tooltip,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getAppliedSeekers } from "../../helper/jobApiFunctions";
import type { AppliedSeeker } from "../../store/JobStore";
import { useMemo, useState, useEffect, useCallback, useRef } from "react";

// --- Style for the lightbox modal ---
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "rgba(0, 0, 0, 0.85)",
  boxShadow: 24,
  outline: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100vw",
  height: "100vh",
};

const ViewSingleApplicant = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { id, seekerID } = useParams();

  // --- State Management ---
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // This now controls the main carousel view
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);

  // --- Data Fetching and Derivation ---
  const appliedSeekersQuery = useQuery({
    queryKey: ["appliedSeekers", id],
    queryFn: () => getAppliedSeekers(id),
  });

  const seekerData = useMemo(() => {
    const seekersList: AppliedSeeker[] | undefined =
      appliedSeekersQuery.data?.data;
    if (!seekersList) return null;
    return seekersList.find((seeker) => seeker.seeker_id == Number(seekerID));
  }, [appliedSeekersQuery.data, seekerID]);

  const documentList = seekerData?.document ?? [];

  // --- Carousel & Lightbox Navigation ---
  const handleCloseLightbox = () => setLightboxOpen(false);
  const handleOpenLightbox = () => {
    if (documentList.length > 0) {
      setLightboxOpen(true);
    }
  };

  const goToIndex = useCallback(
    (index: number) => {
      if (documentList.length === 0) return;
      const newIndex = (index + documentList.length) % documentList.length;
      setActiveIndex(newIndex);
    },
    [documentList.length],
  );

  const handleNext = useCallback(
    () => goToIndex(activeIndex + 1),
    [activeIndex, goToIndex],
  );
  const handlePrev = useCallback(
    () => goToIndex(activeIndex - 1),
    [activeIndex, goToIndex],
  );

  // --- Download Handler ---
  const handleDownload = useCallback(
    async (imageUrl: string, docName: string) => {
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error("Network response was not ok.");
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = docName || "document.jpg";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Download failed:", error);
      }
    },
    [],
  );

  // --- Keyboard Navigation ---
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (documentList.length <= 1) return;

      if (event.key === "ArrowRight") handleNext();
      if (event.key === "ArrowLeft") handlePrev();

      // Only handle Escape for the lightbox
      if (lightboxOpen && event.key === "Escape") {
        handleCloseLightbox();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    lightboxOpen,
    documentList.length,
    handleNext,
    handlePrev,
    handleCloseLightbox,
  ]);

  // Effect to scroll the active thumbnail into view
  useEffect(() => {
    thumbnailRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex]);

  // --- Loading/Error/Not Found States ---
  if (appliedSeekersQuery.isPending) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading Applicant Info...</Typography>
      </Box>
    );
  }

  if (!seekerData) {
    return (
      <Typography sx={{ textAlign: "center", mt: 5 }}>
        Applicant not found.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: { xs: "100%", md: "90%" }, mx: "auto" }}>
      {/* Title & Back Button */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mt: 5,
          mb: 4,
          px: { xs: 2, md: 0 },
        }}
      >
        <IconButton onClick={() => navigate(`/job/${id}/applicant-list`)}>
          <ArrowBackIosNewIcon
            sx={{
              color: "primary.main",
              fontSize: 32,
              ":hover": { color: "text.secondary" },
            }}
          />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600, mx: "auto" }}>
          Applicant's Documents
        </Typography>
      </Box>

      {/* --- Main Carousel Gallery --- */}
      <Box sx={{ my: 4, maxWidth: 500, mx: "auto" }}>
        {/* Main Image Viewer */}
        <Box
          sx={{
            position: "relative",
            bgcolor: "grey.200",
            borderRadius: 4,
            overflow: "hidden",
            aspectRatio: "16/9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {documentList.length > 1 && (
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                left: 16,
                zIndex: 2,
                color: "white",
                bgcolor: "rgba(0,0,0,0.4)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          )}
          <Fade key={activeIndex} in={true} timeout={300}>
            <Box
              component="img"
              src={`${import.meta.env.VITE_API_BASE_URL}/document/${documentList[activeIndex]}`}
              onClick={handleOpenLightbox}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                cursor: "zoom-in",
              }}
            />
          </Fade>
          {documentList.length > 1 && (
            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                right: 16,
                zIndex: 2,
                color: "white",
                bgcolor: "rgba(0,0,0,0.4)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          )}
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              display: "flex",
              gap: 2,
              zIndex: 2,
            }}
          >
            <Typography
              sx={{
                color: "white",
                bgcolor: "rgba(0,0,0,0.6)",
                p: 1,
                borderRadius: 2,
                fontSize: "0.875rem",
              }}
            >
              {activeIndex + 1} / {documentList.length}
            </Typography>
            <Tooltip title="Download">
              <IconButton
                onClick={() =>
                  handleDownload(
                    `${import.meta.env.VITE_API_BASE_URL}/document/${documentList[activeIndex]}`,
                    documentList[activeIndex],
                  )
                }
                sx={{
                  color: "white",
                  bgcolor: "rgba(0,0,0,0.6)",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.9)" },
                }}
              >
                <DownloadForOfflineIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Thumbnail Strip */}
        {documentList.length > 1 && (
          <Box
            sx={{
              mt: 2,
              p: 1,
              "&::-webkit-scrollbar": { height: 8 },
              "&::-webkit-scrollbar-thumb": {
                bgcolor: "grey.400",
                borderRadius: 4,
              },
            }}
          >
            <Box sx={{ display: "flex", gap: 1.5, overflowX: "auto", pb: 1 }}>
              {documentList.map((docName, index) => (
                <Box
                  key={docName + index}
                  ref={(el) => (thumbnailRefs.current[index] = el)}
                  onClick={() => goToIndex(index)}
                  sx={{
                    flexShrink: 0,
                    width: 100,
                    height: 75,
                    borderRadius: 1.5,
                    overflow: "hidden",
                    cursor: "pointer",
                    border: `3px solid ${activeIndex === index ? theme.palette.primary.main : "transparent"}`,
                    opacity: activeIndex === index ? 1 : 0.6,
                    transition: "all 0.3s ease",
                    "&:hover": { opacity: 1 },
                  }}
                >
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/document/${docName}`}
                    alt={`Thumbnail ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>

      {/* Lightbox Modal for Fullscreen View */}
      <Modal
        open={lightboxOpen}
        onClose={handleCloseLightbox}
        closeAfterTransition
      >
        <Fade in={lightboxOpen}>
          <Box sx={modalStyle}>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                p: 2,
                display: "flex",
                gap: 2,
                zIndex: 10,
              }}
            >
              <Tooltip title="Download Image">
                <IconButton
                  onClick={() =>
                    handleDownload(
                      `${import.meta.env.VITE_API_BASE_URL}/document/${documentList[activeIndex]}`,
                      documentList[activeIndex],
                    )
                  }
                  sx={{
                    color: "white",
                    bgcolor: "rgba(0,0,0,0.5)",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                  }}
                >
                  <DownloadForOfflineIcon fontSize="large" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Close (Esc)">
                <IconButton
                  onClick={handleCloseLightbox}
                  sx={{
                    color: "white",
                    bgcolor: "rgba(0,0,0,0.5)",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                  }}
                >
                  <CloseIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Box>
            {documentList.length > 1 && (
              <Tooltip title="Previous (←)">
                <IconButton
                  onClick={handlePrev}
                  sx={{
                    position: "absolute",
                    left: 16,
                    color: "white",
                    bgcolor: "rgba(0,0,0,0.5)",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                  }}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>
              </Tooltip>
            )}
            <Box
              component="img"
              src={`${import.meta.env.VITE_API_BASE_URL}/document/${documentList[activeIndex]}`}
              sx={{ maxHeight: "85vh", maxWidth: "85vw", objectFit: "contain" }}
            />
            {documentList.length > 1 && (
              <Tooltip title="Next (→)">
                <IconButton
                  onClick={handleNext}
                  sx={{
                    position: "absolute",
                    right: 16,
                    color: "white",
                    bgcolor: "rgba(0,0,0,0.5)",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Tooltip>
            )}
            {documentList.length > 1 && (
              <Typography
                sx={{
                  position: "absolute",
                  bottom: 24,
                  color: "white",
                  bgcolor: "rgba(0,0,0,0.5)",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                }}
              >
                {activeIndex + 1} / {documentList.length}
              </Typography>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ViewSingleApplicant;
