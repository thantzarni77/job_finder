import {
  Box,
  Typography,
  Button,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import CustomCheckboxOutline from "../custom_svg/CustomCheckboxOutline";
import CustomCheckbox from "../custom_svg/CustomCheckbox";
import { useQuery } from "@tanstack/react-query";
import { getTalents } from "../../helper/talentPage";

export default function SeekerFilter() {
  const { data: talents, isPending: isTalentPending } = useQuery({
    queryKey: ["talents"],
    queryFn: getTalents,
  });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        gap: 2,
        alignItems: "center",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          padding: 2.5,
          width: 320,
          borderRadius: 3,
          boxShadow: "none",
          mx: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 2 }}>
            <FilterListIcon sx={{ color: "primary.main" }} />
            <Typography variant="h6" component="div" fontWeight="bold">
              Filter
            </Typography>
          </Box>
          <Button
            variant="text"
            size="small"
            endIcon={<CloseIcon fontSize="small" />}
            sx={{
              textTransform: "none",
              color: "error.main",
              fontWeight: "400",
              fontSize: "12px",
            }}
          >
            clear all
          </Button>
        </Box>

        <Divider />

        <Box sx={{ mt: 2 }}>
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{ mb: 1, textAlign: "left" }}
          >
            Talents
          </Typography>
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {!isTalentPending &&
              talents?.map((talent) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        disableRipple
                        icon={<CustomCheckboxOutline />}
                        checkedIcon={<CustomCheckbox />}
                        name={"talent"}
                        key={talent.id}
                      />
                    }
                    label={talent.name}
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        color: "text.secondary",
                        fontSize: 16,
                        fontWeight: 400,
                        textTransform: "capitalize",
                      },
                    }}
                  />
                );
              })}
          </FormGroup>
        </Box>
      </Paper>
    </Box>
  );
}
