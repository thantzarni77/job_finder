import { Box, Divider, Paper, Switch, Typography } from "@mui/material";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { format } from "date-fns";

type Props = {
  applicantCount: number | null | undefined;
  deadline: string | undefined | Date | number;
};

const JobCloseCard = ({ applicantCount, deadline }: Props) => {
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Paper
        elevation={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "325px", md: "375px" },
          borderRadius: "20px",
          boxShadow: "none",
          px: 3,
          py: 2,
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <GroupsOutlinedIcon sx={{ color: "primary.main" }} />
            <Typography sx={{ color: "text.primary" }}>
              {applicantCount} Applicants
            </Typography>
          </Box>
          <Divider flexItem sx={{ color: "primary.main", mb: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <QueryBuilderIcon sx={{ color: "primary.main" }} />
            <Typography sx={{ color: "text.primary" }}>
              {deadline && format(deadline, "dd MMM yyyy")}
            </Typography>
          </Box>
          <Divider flexItem sx={{ mb: 1 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography>Close this job</Typography>
            <Switch />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default JobCloseCard;
