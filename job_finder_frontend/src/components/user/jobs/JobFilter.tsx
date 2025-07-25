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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import CustomCheckboxOutline from "../../custom_svg/CustomCheckboxOutline";
import CustomCheckbox from "../../custom_svg/CustomCheckbox";
import { useState, type ChangeEvent } from "react";
import { useJobSalaryFilter, useJobTypeFilter } from "../../../store/JobStore";
import { useJobRoleFilter } from "../../../store/JobStore";
import { useJobCategoryFilter } from "../../../store/JobStore";
import { getCategories } from "../../../helper/postJob";
import { useQuery } from "@tanstack/react-query";

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

const salary = {
  "Below 500000": { min: 0, max: 500000 },
  "Above 500000": { min: 500000, max: 1000000 },
  "Above 1000000": { min: 1000000, max: null },
};

const JobFilter = ({ filterType, filterTypeArray }: Props) => {
  // getting job categories

  const { data: categories, isPending } = useQuery({
    queryKey: ["job-categories"],
    queryFn: getCategories,
  });
  // !isPending && console.log(categories);

  const { selectedJobType, setSelectedJobType } = useJobTypeFilter();
  const { selectedJobRole, setSelectedJobRole } = useJobRoleFilter();
  const { selectedJobCategory, setSelectedJobCategory } =
    useJobCategoryFilter();
  const { selectedSalary, setSelectedSalary } = useJobSalaryFilter();

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

  const radioHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "salary") {
      const value = JSON.parse(event.target.value);
      setSelectedSalary(value);

      console.log(value);
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
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={radioHandleChange}
              >
                {Object.entries(salary).map(([key, value]) => {
                  return (
                    <FormControlLabel
                      value={JSON.stringify(value)}
                      control={<Radio />}
                      label={key}
                      key={key}
                      name={"salary"}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
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
