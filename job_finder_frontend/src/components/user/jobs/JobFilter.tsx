import {
  Box,
  Typography,
  Button,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  Slider,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import CustomCheckboxOutline from "../../custom_svg/CustomCheckboxOutline";
import CustomCheckbox from "../../custom_svg/CustomCheckbox";
import { useState } from "react";

// Helper function to format the numbers with commas
function formatValueLabel(value: number): string {
  return value.toLocaleString();
}

type Props = {
  filterType: string;
  filterTypeArray: string[];
};

const JobFilter = ({ filterType, filterTypeArray }: Props) => {
  // State to hold the slider's value range [min, max]
  const [value, setValue] = useState<number[]>([120000, 200000]);

  // Define the min and max for the entire slider range
  const MIN_SALARY = 100000;
  const MAX_SALARY = 500000;

  // Handler for when the slider value changes
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

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
      {/* job type and filter */}
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
        {/* Header Section */}
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

        {/* Job Type Section */}
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{ mb: 1, textAlign: "left" }}
          >
            {filterType} type
          </Typography>
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
            }}
          >
            {filterTypeArray.map((type) => (
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    disableRipple
                    icon={<CustomCheckboxOutline />}
                    checkedIcon={<CustomCheckbox />}
                    name={type}
                  />
                }
                label={type}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "secondary.main",
                    fontSize: 16,
                    fontWeight: 400,
                    textTransform: "capitalize",
                  },
                }}
              />
            ))}
          </FormGroup>
        </Box>
      </Paper>

      {/* Experience */}
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
          <Box>
            <Typography
              variant="h6"
              fontWeight="700"
              sx={{ mb: 1, textAlign: "left" }}
            >
              Experience
            </Typography>
            <FormGroup
              sx={{
                display: "flex",
                flexDirection: { xs: "row", md: "column" },
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    disableRipple
                    icon={<CustomCheckboxOutline />}
                    checkedIcon={<CustomCheckbox />}
                    name={"senior"}
                  />
                }
                label={"Senior"}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "secondary.main",
                    fontSize: 16,
                    fontWeight: 400,
                  },
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    disableRipple
                    icon={<CustomCheckboxOutline />}
                    checkedIcon={<CustomCheckbox />}
                    name={"mid"}
                  />
                }
                label={"Mid"}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "secondary.main",
                    fontSize: 16,
                    fontWeight: 400,
                  },
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    disableRipple
                    icon={<CustomCheckboxOutline />}
                    checkedIcon={<CustomCheckbox />}
                    name={"junior"}
                  />
                }
                label={"Junior"}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "secondary.main",
                    fontSize: 16,
                    fontWeight: 400,
                  },
                }}
              />
            </FormGroup>
          </Box>
        </Box>
      </Paper>

      {/* Salary */}
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
          <Box>
            <Typography
              variant="h6"
              fontWeight="700"
              sx={{ mb: 1, textAlign: "left" }}
            >
              Salary
            </Typography>
            <Slider
              getAriaLabel={() => "Salary range"}
              value={value}
              onChange={handleChange}
              min={MIN_SALARY}
              max={MAX_SALARY}
              step={10000} // users can adjust the salary in increments of 1000
              sx={{
                height: 6,
                width: "166px",
                color: "#b0b0b0",
                "& .MuiSlider-rail": {
                  backgroundColor: "#000000",
                  opacity: 1,
                },
                "& .MuiSlider-thumb": {
                  height: 20,
                  width: 20,
                  backgroundColor: "#898989",
                  "&:hover, &.Mui-focusVisible, &.Mui-active": {
                    boxShadow: "0 0 0 8px rgba(141, 141, 141, 0.16)",
                  },
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 1,
                color: "text.secondary",
              }}
            >
              <Typography variant="body1">
                {formatValueLabel(value[0])}
              </Typography>
              <Typography variant="body1">
                {formatValueLabel(value[1])}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Job Categories */}
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
          <Box>
            <Typography
              variant="h6"
              fontWeight="700"
              sx={{ mb: 1, textAlign: "left" }}
            >
              Job Categories
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    disableRipple
                    icon={<CustomCheckboxOutline />}
                    checkedIcon={<CustomCheckbox />}
                    name={"accounting&Finance"}
                  />
                }
                label={"Accounting & Finance"}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "secondary.main",
                    fontSize: 16,
                    fontWeight: 400,
                  },
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    disableRipple
                    icon={<CustomCheckboxOutline />}
                    checkedIcon={<CustomCheckbox />}
                    name={"administration"}
                  />
                }
                label={"Administration"}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "secondary.main",
                    fontSize: 16,
                    fontWeight: 400,
                  },
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    disableRipple
                    icon={<CustomCheckboxOutline />}
                    checkedIcon={<CustomCheckbox />}
                    name={"advertising"}
                  />
                }
                label={"Advertising"}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "secondary.main",
                    fontSize: 16,
                    fontWeight: 400,
                  },
                }}
              />
            </FormGroup>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default JobFilter;
