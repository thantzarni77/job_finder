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
import { useState, type ChangeEvent } from "react";
import { useJobTypeFilter } from "../../../store/JobStore";
import { useJobRoleFilter } from "../../../store/JobStore";
import { useJobCategoryFilter } from "../../../store/JobStore";
import { getCategories } from "../../../helper/postJob";
import { useQuery } from "@tanstack/react-query";

// Helper function to format the numbers with commas
function formatValueLabel(value: number): string {
  return value.toLocaleString();
}
type jobTypes = {
  "Full Time": string;
  "Part Time": string;
  Internship: string;
  volunteer: string;
  Freelancer: string;
  Remote: string;
};
type categoryType = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
};

type Props = {
  filterType: string;
  filterTypeArray: jobTypes;
};

const roles = {
  Senior: "senior",
  "Mid-Level": "mid-level",
  Junior: "junior",
};

const JobFilter = ({ filterType, filterTypeArray }: Props) => {
  // State to hold the slider's value range [min, max]
  const [value, setValue] = useState<number[]>([180000, 500000]);

  // Define the min and max for the entire slider range
  const MIN_SALARY = 180000;
  const MAX_SALARY = 500000;

  // Handler for when the slider value changes
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    console.log(newValue);
  };

  // getting job categories

  const { data: categories, isPending } = useQuery({
    queryKey: ["job-categories"],
    queryFn: getCategories,
  });
  !isPending && console.log(categories);
  const { selectedJobType, setSelectedJobType } = useJobTypeFilter();
  const { selectedJobRole, setSelectedJobRole } = useJobRoleFilter();
  const { selectedJobCategory, setSelectedJobCategory } =
    useJobCategoryFilter();

  // checkBoxHandleChange = collect checked value then pass to zustand global state
  const checkBoxHandleChange = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    if (event.target.name === "type") {
      const value = event?.target.value;
      const updated = checked
        ? [...selectedJobType, value]
        : selectedJobType.filter((val) => val !== value);

      setSelectedJobType(updated);
      return;
    }

    if (event.target.name === "role") {
      const value = event?.target.value;
      const updated = checked
        ? [...selectedJobRole, value]
        : selectedJobRole.filter((val) => val !== value);

      setSelectedJobRole(updated);
      return;
    }

    if (event.target.name === "category") {
      const value = event.target.value;
      const updated = checked
        ? [...selectedJobCategory, value]
        : selectedJobCategory.filter((val) => val !== value);
      setSelectedJobCategory(updated);
      return;
    }
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
              flexDirection: "column",
            }}
          >
            {Object.entries(filterTypeArray).map(([key, value]) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedJobType.includes(value)}
                    disableRipple
                    icon={<CustomCheckboxOutline />}
                    checkedIcon={<CustomCheckbox />}
                    name={"type"}
                    value={value}
                    onChange={checkBoxHandleChange}
                    key={key}
                  />
                }
                label={key}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "text.secondary",
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
              {Object.entries(roles).map(([key, value]) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      disableRipple
                      checked={selectedJobRole.includes(value)}
                      icon={<CustomCheckboxOutline />}
                      checkedIcon={<CustomCheckbox />}
                      name={"role"}
                      value={value}
                      key={key}
                      onChange={checkBoxHandleChange}
                    />
                  }
                  label={key}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      color: "text.secondary",
                      fontSize: 16,
                      fontWeight: 400,
                    },
                  }}
                />
              ))}
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
              {!isPending &&
                categories.map((cate: categoryType) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          disableRipple
                          icon={<CustomCheckboxOutline />}
                          checkedIcon={<CustomCheckbox />}
                          name={"category"}
                          key={cate.id}
                          value={cate.name}
                          onChange={checkBoxHandleChange}
                        />
                      }
                      label={cate.name}
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          color: "text.secondary",
                          fontSize: 16,
                          fontWeight: 400,
                        },
                      }}
                    />
                  );
                })}
            </FormGroup>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default JobFilter;
