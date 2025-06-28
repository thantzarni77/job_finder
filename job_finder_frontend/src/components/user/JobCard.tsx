import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

const JobCard = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Paper
        elevation={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "380px",
          borderRadius: "20px",
          boxShadow: "none",
          px: 3,
          py: 2,
          ":hover": { cursor: "pointer" },
        }}
      >
        <Box>
          {/* image title bookmark */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
                variant="square"
              >
                KBZ <br />
                Pay
              </Avatar>
              <Typography
                variant="body1"
                sx={{ fontWeight: "700", color: "secondary.main" }}
              >
                Full Stack Developer
              </Typography>
            </Box>
            <Checkbox
              defaultChecked
              disableRipple
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 26, mr: -2 },
                color: "primary.main",
                "&.Mui-checked": {
                  color: "primary.main",
                },
              }}
              icon={<BookmarkBorderOutlinedIcon />}
              checkedIcon={<BookmarkIcon />}
              name={"fullTime"}
            />
          </Box>
          {/* location date */}
          <Box sx={{ my: 1 }}>
            <Box
              sx={{
                display: "flex",
                textAlign: "left",
                alignItems: "start",
                gap: 1,
              }}
            >
              <LocationOnOutlinedIcon sx={{ color: "gray", fontSize: 22 }} />

              <Typography
                variant="caption"
                sx={{ color: "gray", width: "250px" }}
              >
                N0.123, Yadanar St, Marchart Road, Yangon
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "left",
                gap: 1,
              }}
            >
              <QueryBuilderIcon sx={{ color: "gray", fontSize: 22 }} />
              <Typography variant="caption" sx={{ color: "gray" }}>
                posted on 1 day ago
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* tags */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Chip
            sx={{
              borderRadius: "4px",
              backgroundColor: "primary.main",
              color: "#ffffff",
              width: "fit-content",
              height: "28px",
            }}
            label="Chip Filled"
          />
          <Chip
            sx={{
              borderRadius: "4px",
              backgroundColor: "primary.main",
              color: "#ffffff",
              width: "fit-content",
              height: "28px",
            }}
            label="Chip Filled"
          />
          <Chip
            sx={{
              borderRadius: "4px",
              backgroundColor: "primary.main",
              color: "#ffffff",
              width: "fit-content",
              height: "28px",
            }}
            label="Chip Filled"
          />
        </Box>
        <Divider flexItem />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: "secondary.main" }}
          >
            Salary
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: "secondary.main" }}
          >
            800000MMK
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default JobCard;
