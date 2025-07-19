import {
  Box,
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Typography,
  Tooltip,
  Stack,
  Paper,
  IconButton,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ScheduleIcon from "@mui/icons-material/Schedule";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CampaignIcon from "@mui/icons-material/Campaign";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function JobDetailManage() {
  const navigate = useNavigate();
  const [selectedApplicant, setSelectedApplicant] = useState(
    "1. Mr.Jhon (pending)",
  );

  const handleApplicantChange = (event: SelectChangeEvent) => {
    setSelectedApplicant(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f3f4f6" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 4 },
          maxWidth: "100%",
          bgcolor: "#f7f7f9",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 600,
              color: "#0f172a",
              cursor: "default",
              userSelect: "none",
              fontSize: "1rem",
            }}
          >
            <Box component="span">
              <IconButton sx={{ mr: 3 }} onClick={() => navigate(-1)}>
                <ArrowBackIosIcon />
              </IconButton>
            </Box>
            Job detail view
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Edit">
            <Button
              startIcon={<EditIcon />}
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: 1.5,
                borderColor: "#d1d5db",
                fontWeight: 600,
                px: 2,
                fontSize: "0.875rem",
                color: "#334155",
                minWidth: "90px",
                "&:hover": {
                  borderColor: "#5f68d7",
                  backgroundColor: "rgba(95, 104, 215, 0.1)",
                },
              }}
            >
              Edit
            </Button>
          </Tooltip>
        </Box>

        <Stack spacing={2} sx={{ flexGrow: 1, overflowY: "auto" }}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "white",
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 1, sm: 4 },
              alignItems: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "#0f172a", flexBasis: "100%" }}
            >
              Frontend Developer
            </Typography>

            <Stack
              direction="row"
              spacing={3}
              sx={{
                fontSize: "0.875rem",
                color: "#64748b",
                userSelect: "none",
              }}
              flexWrap="wrap"
              alignItems="center"
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  whiteSpace: "nowrap",
                }}
              >
                <CampaignIcon sx={{ fontSize: 18, color: "#5f68d7" }} />
                <Typography
                  component="span"
                  color="text.primary"
                  fontWeight={600}
                >
                  Status :
                </Typography>
                <Typography component="span">Pending</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  whiteSpace: "nowrap",
                }}
              >
                <ScheduleIcon sx={{ fontSize: 18, color: "#5f68d7" }} />
                <Typography
                  component="span"
                  color="text.primary"
                  fontWeight={600}
                >
                  Posted :
                </Typography>
                <Typography component="span">13 JUL 2025</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  whiteSpace: "nowrap",
                }}
              >
                <PeopleOutlineIcon sx={{ fontSize: 18, color: "#5f68d7" }} />
                <Typography
                  component="span"
                  color="text.primary"
                  fontWeight={600}
                >
                  Applicants :
                </Typography>
                <Typography component="span">20</Typography>
              </Box>
            </Stack>
          </Paper>

          {/* Company & Working Details */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "white",
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 1, sm: 4 },
              color: "#475569",
              fontSize: "0.875rem",
              userSelect: "none",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                whiteSpace: "nowrap",
                minWidth: 130,
                flexShrink: 0,
              }}
            >
              <BusinessIcon sx={{ fontSize: 18, color: "#5f68d7" }} />
              <Typography>Company : Meta</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                whiteSpace: "nowrap",
                minWidth: 140,
                flexShrink: 0,
              }}
            >
              <WorkIcon sx={{ fontSize: 18, color: "#5f68d7" }} />
              <Typography>Position : Senior</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                whiteSpace: "nowrap",
                minWidth: 140,
                flexShrink: 0,
              }}
            >
              <SettingsRemoteIcon sx={{ fontSize: 18, color: "#5f68d7" }} />
              <Typography>Working type : Remote</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                whiteSpace: "nowrap",
                minWidth: 180,
              }}
            >
              <AccessTimeIcon sx={{ fontSize: 18, color: "#5f68d7" }} />
              <Typography>Working hour : 9:00am to 5:00pm</Typography>
            </Box>
          </Paper>

          {/* Applicants */}
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              color="#0f172a"
              sx={{ mb: 1 }}
            >
              Applicants
            </Typography>

            <FormControl
              fullWidth
              size="small"
              sx={{
                bgcolor: "white",
                borderRadius: 2,
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSelect-select": {
                  py: 1,
                },
              }}
            >
              <Select
                value={selectedApplicant}
                displayEmpty
                onChange={handleApplicantChange}
                IconComponent={ArrowDropDownIcon}
                renderValue={(selected) => selected}
                sx={{
                  fontWeight: 500,
                  color: "#0f172a",
                }}
                fullWidth
              >
                <MenuItem value="1. Mr.Jhon (pending)">
                  1. Mr.Jhon (pending)
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Benefit Section */}
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              color="#0f172a"
              sx={{ mb: 1 }}
            >
              Benifit
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "white",
                borderRadius: 2,
                color: "#334155",
                fontSize: "0.875rem",
                lineHeight: 1.4,
                maxWidth: "100%",
                wordBreak: "break-word",
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Mauris sed in quis nulla.
              Suspendisse risus nibh pharetra tempor scelerisque amet orci
              aliquet. Phasellus lectus eleifend sed pharetra dictum dolor. In
              ac ut scelerisque purus amet sed morbi nam montes. Arcu.
            </Paper>
          </Box>

          {/* Responsibilities Section */}
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              color="#0f172a"
              sx={{ mb: 1 }}
            >
              Responsibilities
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "white",
                borderRadius: 2,
                color: "#334155",
                fontSize: "0.875rem",
                lineHeight: 1.4,
                wordBreak: "break-word",
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Nec quis nec sagittis
              ultrices egestas nunc urna cursus at. Lectus varius a libero
              pulvinar et cursus mi pharetra. Dictum urna tortor amet lectus
              dolor. Tellus at aenean dignissim in commodo dolor leo. Pulvinar
              eget et eu accumsan odio sed. Cum volutpat sit ac rhoncus porta.
              Sagittis morbi malesuada feugiat arcu cras aliquam lacus. Id
              bibendum bibendum diam pretium auctor vitae odio. Ac et cum eget
              risus. Magnis odio facilisi morbi mattis sed faucibus. Feugiat
              nunc ultrices vulputate lectus urna diam nec. Volutpat ipsum
              aliquet ut sit augue id in. In lacus neque sit eget arcu quis ut
              ornare augue. Aliquet non malesuada lobortis euismod duis aliquam.
            </Paper>
          </Box>

          {/* Requirements Section */}
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              color="#0f172a"
              sx={{ mb: 1 }}
            >
              Requirements
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "white",
                borderRadius: 2,
                color: "#334155",
                fontSize: "0.875rem",
                lineHeight: 1.4,
                wordBreak: "break-word",
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Nec quis nec sagittis
              ultrices egestas nunc urna cursus at. Lectus varius a libero
              pulvinar et cursus mi pharetra. Dictum urna tortor amet lectus
              dolor. Tellus at aenean dignissim in commodo dolor leo. Pulvinar
              eget et eu accumsan odio sed. Cum volutpat sit ac rhoncus porta.
              Sagittis morbi malesuada feugiat arcu cras aliquam lacus. Id
              bibendum bibendum diam pretium auctor vitae odio. Ac et cum eget
              risus. Magnis odio facilisi morbi mattis sed faucibus. Feugiat
              nunc ultrices vulputate lectus urna diam nec. Volutpat ipsum
              aliquet ut sit augue id in. In lacus neque sit eget arcu quis ut
              ornare augue. Aliquet non malesuada lobortis euismod duis aliquam.
            </Paper>
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: {
                xs: "center",
                sm: "flex-start",
                md: "space-between",
              },
              gap: 2,
              mt: 3,
              flexWrap: "wrap",
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: "#5f68d7",
                color: "#ef4444",
                fontWeight: 600,
                borderRadius: 2,
                px: 4,
                textTransform: "none",
                minWidth: 140,
                "&:hover": {
                  borderColor: "#7f85da",
                  backgroundColor: "rgba(239,68,68,0.1)",
                },
              }}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{
                fontWeight: 600,
                borderRadius: 2,
                px: 6,
                textTransform: "none",
                minWidth: 140,
              }}
            >
              Approve
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
