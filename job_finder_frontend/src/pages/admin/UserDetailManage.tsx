import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SubtitlesOutlinedIcon from "@mui/icons-material/SubtitlesOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useNavigate } from "react-router";
import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router";

const UserDetailManage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "90%", mx: 6 }}>
      {/* back arrow and top part */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ArrowBackIosIcon
            onClick={() => navigate(-1)}
            sx={{
              color: "primary.main",
              fontSize: 32,
              ":hover": {
                color: "secondary.main",
                cursor: "pointer",
              },
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            User detail view
          </Typography>
        </Box>
        <Button
          sx={{
            backgroundColor: "#ffffff",
            textTransform: "none",
            borderRadius: "10px",
            px: 2,
            gap: 1,
          }}
        >
          <DriveFileRenameOutlineOutlinedIcon />
          <Typography
            variant="subtitle2"
            sx={{ color: "#000000", fontWeight: 400 }}
          >
            Edit
          </Typography>
        </Button>
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
        <Typography sx={{ fontWeight: 600 }}>Mr.John</Typography>
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
              Joined : 13 JUL 2025
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
              Title: Graphic Designer
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WorkOutlineOutlinedIcon
              sx={{ color: "primary.main", fontSize: "20px" }}
            />
            <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
              Position : Senior
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <EmailOutlinedIcon
              sx={{ color: "primary.main", fontSize: "20px" }}
            />
            <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
              Email: mrjhon12@gmail.com{" "}
              <span style={{ color: "#75C149" }}>(verified)</span>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocalPhoneOutlinedIcon
              sx={{ color: "primary.main", fontSize: "20px" }}
            />
            <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
              Phone number : +95 9 12345678{" "}
              <span style={{ color: "#75C149" }}>(verified)</span>
            </Typography>
          </Box>
        </Box>
      </Box>
      {/*status two */}
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
            <ReceiptLongOutlinedIcon
              sx={{ color: "primary.main", fontSize: "20px" }}
            />
            <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
              Profile : updated on 1 JUL 2025
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircleIcon sx={{ color: "#EA4335", fontSize: "20px" }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
              Ban status : None
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SendOutlinedIcon
              sx={{ color: "primary.main", fontSize: "20px", rotate: "-45deg" }}
            />
            <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
              Submitted jobs : 12
            </Typography>
            <RemoveRedEyeOutlinedIcon
              sx={{ color: "primary.main", fontSize: "20px" }}
            />
            <MuiLink component={RouterLink} to={"#"}>
              <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
                View
              </Typography>
            </MuiLink>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <BookmarkBorderOutlinedIcon
              sx={{ color: "primary.main", fontSize: "20px" }}
            />
            <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
              Saved jobs
            </Typography>
            <RemoveRedEyeOutlinedIcon
              sx={{ color: "primary.main", fontSize: "20px" }}
            />
            <MuiLink component={RouterLink} to={"#"}>
              <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
                View
              </Typography>
            </MuiLink>
          </Box>
        </Box>
      </Box>
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
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
            <Typography sx={{ color: "#EA4335" }}> Suspend User</Typography>
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
            <Typography sx={{ color: "#EA4335" }}> Delete</Typography>
          </Button>
        </Box>
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
          <Typography>Send reset password link</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default UserDetailManage;
