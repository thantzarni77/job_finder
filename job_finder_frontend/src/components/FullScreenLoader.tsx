import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function FullScreenLoader({
  open,
  message = "Loading...",
}: {
  open: boolean;
  message: string;
}) {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        // A subtle blur effect for the background
        backdropFilter: "blur(3px)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      open={open}
    >
      <Stack gap={2} alignItems="center" justifyContent="center">
        <CircularProgress color="inherit" />
        <Typography variant="h6">{message}</Typography>
      </Stack>
    </Backdrop>
  );
}
