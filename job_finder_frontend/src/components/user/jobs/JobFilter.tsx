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

import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import CustomCheckboxOutline from "../../custom_svg/CustomCheckboxOutline";
import CustomCheckbox from "../../custom_svg/CustomCheckbox";
import { type ChangeEvent } from "react";
import { useJobSalaryFilter, useJobTypeFilter } from "../../../store/JobStore";
import { useJobRoleFilter } from "../../../store/JobStore";
import { useJobCategoryFilter } from "../../../store/JobStore";
import { getCategories } from "../../../helper/postJob";
import { useQuery } from "@tanstack/react-query";

type JobTypes = {
  id: number;
  name: string;
};
type categoryType = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
};

type roleType = {
  id: number;
  name: string;
};

type Props = {
  filterType: string;
  jobTypes: JobTypes[];
  roles: roleType[];
};

const salary = {
  "Below 500000": { min: 0, max: 500000 },
  "Above 500000": { min: 500000, max: 0 },
  "Above 1000000": { min: 1000000, max: 0 },
};

const JobFilter = ({ filterType, jobTypes, roles }: Props) => {
  // getting job categories

  const { data: categories, isPending } = useQuery({
    queryKey: ["job-categories"],
    queryFn: getCategories,
  });

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

      console.log(selectedSalary);
    }
  };

  const clearSalaryRadio = () => {
    setSelectedSalary(null);
  };

  const clearAllFilter = () => {
    setSelectedJobType([]);
    setSelectedJobCategory([]);
    setSelectedJobRole([]);
    setSelectedSalary(null);
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
            onClick={clearAllFilter}
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
            {Object.entries(jobTypes).map(([key, value]) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedJobType?.includes(value.name)}
                      disableRipple
                      icon={<CustomCheckboxOutline />}
                      checkedIcon={<CustomCheckbox />}
                      name={"type"}
                      value={value.name}
                      onChange={checkBoxHandleChange}
                      key={key}
                    />
                  }
                  label={value.name}
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
                      checked={selectedJobRole?.includes(value.name)}
                      icon={<CustomCheckboxOutline />}
                      checkedIcon={<CustomCheckbox />}
                      name={"role"}
                      value={value.name}
                      key={key}
                      onChange={checkBoxHandleChange}
                    />
                  }
                  label={value.name}
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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="h6"
                fontWeight="700"
                sx={{ mb: 1, textAlign: "left" }}
              >
                Salary
              </Typography>
              <Button size="small" color="error" onClick={clearSalaryRadio}>
                X Clear
              </Button>
            </Box>

            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={radioHandleChange}
                // value={selectedSalary}
              >
                {Object.entries(salary).map(([key, value]) => {
                  return (
                    <FormControlLabel
                      // checked={selectedSalary === value}
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
                          checked={selectedJobCategory?.includes(cate.name)}
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
