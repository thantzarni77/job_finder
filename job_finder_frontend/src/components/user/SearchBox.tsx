import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import CustomSearchIcon from "../custom_svg/CustomSearchIcon";
import SearchIcon from "@mui/icons-material/Search";
import MapPin from "../custom_svg/MapPin";
import { useSearchByCompanyName } from "../../store/CompanyStore";
import { useSearchTalentsByName } from "../../store/SeekerStore";
import { useSearchJobTitle } from "../../store/JobStore";

import { useForm } from "react-hook-form";

type Props = {
  searchType: string;
};
type SearchForm = {
  Company: string;
  Talents: string;
  Job: string;
};

const SearchBox = ({ searchType }: Props) => {
  const { register, handleSubmit, reset } = useForm<SearchForm>();

  const setSearchCompanyName = useSearchByCompanyName(
    (state) => state.setSearchCompanyName,
  );

  const setTalentName = useSearchTalentsByName((state) => state.setTalentName);
  const setJobTitle = useSearchJobTitle((state) => state.setJobTitle);

  function onSubmit(search: SearchForm) {
    if ("Talents" in search) setTalentName(search.Talents);
    if ("Company" in search) setSearchCompanyName(search.Company);
    if ("Job" in search) setJobTitle(search.Job);
    reset();
  }
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "80%", md: "70%", lg: "70%" },
        height: { xs: "50px", md: "100px" },
        backgroundColor: "background.paper",
        mx: "auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: { xs: 1, sm: 1, md: 3 },
        borderRadius: { xs: "5px", sm: "10px", md: "20px" },
        border: "1px solid",
        // border: { xs: "none", md: "1.5px solid" },
        borderColor: "primary.main",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, md: "15px" },
        }}
      >
        <CustomSearchIcon />

        <TextField
          id="outlined-basic"
          variant="standard"
          placeholder={`${searchType} Title or Keyword`}
          fullWidth
          {...register(searchType, { required: true })}
          sx={{
            "& .MuiInputBase-input::placeholder": {
              color: "primary.main",
              fontSize: { xs: "12px", sm: "14px", md: "16px" },
            },
            "& .MuiInputBase-input": {
              fontSize: { xs: "12px", sm: "14px", md: "16px" },
            },
          }}
        />
      </Box>

      <Divider
        orientation="vertical"
        sx={{ mx: 1, borderColor: "primary.main", alignSelf: "stretch" }}
      />

      <Box
        sx={{
          display: "flex",

          alignItems: "center",
          gap: { xs: 1, md: "15px" },
        }}
      >
        <MapPin />
        <TextField
          id="outlined-basic"
          variant="standard"
          placeholder="Add Country or City"
          fullWidth
          sx={{
            "& .MuiInputBase-input::placeholder": {
              color: "primary.main",
              fontSize: { xs: "12px", sm: "14px", md: "16px" },
            },
            "& .MuiInputBase-input": {
              fontSize: { xs: "12px", sm: "14px", md: "16px" },
            },
          }}
        />
      </Box>

      <Button
        variant="contained"
        sx={{
          height: { xs: "30px", md: "45px" },
          minWidth: { xs: "40px", sm: "100px", md: "140px" },
          width: { xs: "40px", sm: "100px", md: "140px" },
          borderRadius: { xs: "5px", sm: "10px" },
          boxShadow: "none",
          textTransform: "none",
          ":hover": {
            boxShadow: "none",
          },
        }}
        onClick={handleSubmit(onSubmit)}
      >
        <SearchIcon sx={{ display: { xs: "block", sm: "none" } }} />
        <Typography sx={{ display: { xs: "none ", sm: "block" } }}>
          Search
        </Typography>
      </Button>
    </Box>
  );
};

export default SearchBox;
