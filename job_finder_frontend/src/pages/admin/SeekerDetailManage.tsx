import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SubtitlesOutlinedIcon from "@mui/icons-material/SubtitlesOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getSeekerProfile } from "../../helper/profileApiFunctions";
import type { SeekerProfile } from "../../store/ProfileStore";
import FullScreenLoader from "../../components/FullScreenLoader";
import { format } from "date-fns";

const SeekerDetailManage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user_id = Number(id);

  // const [activeTab, setActiveTab] = useState(0);

  // const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
  //   setActiveTab(newValue);
  // };

  const seekerProfileQuery = useQuery({
    queryKey: ["seekerProfile", user_id],
    queryFn: () => {
      return getSeekerProfile(user_id);
    },
  });

  const seekerProfile: SeekerProfile = seekerProfileQuery.data?.data.data[0];

  if (seekerProfileQuery.isFetching) {
    return (
      <FullScreenLoader
        open={seekerProfileQuery.isFetching}
        message="Getting Seeker data"
      />
    );
  }
  return (
    <Box sx={{ width: "94%", mx: 6 }}>
      {/* back arrow and top part */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIosIcon
              sx={{
                color: "primary.main",
                fontSize: 32,
                ":hover": {
                  color: "text.primary",
                  cursor: "pointer",
                },
              }}
            />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Seeker detail view
          </Typography>
        </Box>
      </Box>
      {/* user name and status */}
      <Box
        sx={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          bgcolor: "#ffffff",
          py: 1,
          px: 2,
          borderRadius: "15px",
          mt: 3,
          mb: 2,
        }}
      >
        <Typography sx={{ fontWeight: 600 }}>
          {seekerProfile.user_id.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <HourglassBottomOutlinedIcon
              sx={{ color: "primary.main", fontSize: "20px" }}
            />
            <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
              Status : Active
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WatchLaterOutlinedIcon
              sx={{ color: "primary.main", fontSize: "20px" }}
            />
            <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
              Joined : {format(seekerProfile.created_at, "dd MMM yyyy")}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <GroupsOutlinedIcon
              sx={{ color: "primary.main", fontSize: "20px" }}
            />
            <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
              Role: seeker
            </Typography>
          </Box>
        </Box>
      </Box>
      {/*status one */}
      <Box
        sx={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          bgcolor: "#ffffff",
          py: 1,
          px: 2,
          borderRadius: "15px",
          mt: 3,
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SubtitlesOutlinedIcon
              sx={{ color: "primary.main", fontSize: "20px" }}
            />
            <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
              Title: {seekerProfile.talent}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WorkOutlineOutlinedIcon
              sx={{ color: "primary.main", fontSize: "20px" }}
            />
            <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
              Position : {seekerProfile.role}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <EmailOutlinedIcon
              sx={{ color: "primary.main", fontSize: "20px" }}
            />
            <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
              Email: {seekerProfile.user_id.email}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocalPhoneOutlinedIcon
              sx={{ color: "primary.main", fontSize: "20px" }}
            />
            <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
              Phone number :{" "}
              {seekerProfile.user_id.phone
                ? seekerProfile.user_id.phone
                : "No data"}
            </Typography>
          </Box>
        </Box>
      </Box>
      {/*status two */}
      {/* <Box
        sx={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          bgcolor: "#ffffff",
          py: 1,
          px: 2,
          borderRadius: "15px",
          mt: 3,
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SendOutlinedIcon
              sx={{ color: "primary.main", fontSize: "20px", rotate: "-45deg" }}
            />
            <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
              Submitted jobs : 12
            </Typography>
          </Box>
        </Box>
      </Box> */}

      {/* action buttons */}
      <Box
        sx={{
          width: "70%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          my: 5,
        }}
      >
        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Button
            sx={{
              bgcolor: "#ffffff",
              borderRadius: "10px",
              textTransform: "none",
              px: 2,
              borderColor: "primary.main",
              border: 1,
            }}
          >
            <Typography color="warning"> Suspend User</Typography>
          </Button>
          <Button
            sx={{
              bgcolor: "#ffffff",
              borderRadius: "10px",
              textTransform: "none",
              px: 4,
              borderColor: "primary.main",
              border: 1,
            }}
          >
            <Typography sx={{ color: "error.main" }}> Delete</Typography>
          </Button>
        </Box> */}
        {/* <Button
          sx={{
            bgcolor: "#ffffff",
            borderRadius: "10px",
            textTransform: "none",
            px: 4,
            borderColor: "primary.main",
            border: 1,
          }}
        >
          <Typography>Send reset password link</Typography>
        </Button> */}
      </Box>

      {/* --- Jobs & Users Tab Navigation --- */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {/* --- Placeholder for the actual content --- */}
        <Box sx={{ mt: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            {/* <JobCard />
              <JobCard /> */}
          </Box>
        </Box>
        {/* <Stack sx={{ my: 4, ml: "15%" }}>
          <Pagination
            count={5}
            shape="rounded"
            variant="outlined"
            color="primary"
            sx={{
              ml: "12%",
              "& .MuiPaginationItem-root": {
                color: "#5f6caf",
                borderColor: "#5f6caf",
              },
            }}
          />
        </Stack> */}
      </Box>
    </Box>
  );
};

export default SeekerDetailManage;
