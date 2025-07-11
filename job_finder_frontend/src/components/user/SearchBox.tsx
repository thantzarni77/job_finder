import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import CustomSearchIcon from "../custom_svg/CustomSearchIcon";
import SearchIcon from "@mui/icons-material/Search";
import MapPin from "../custom_svg/MapPin";

type Props = {
  searchType: string;
};

const SearchBox = ({ searchType }: Props) => {
  return (
    <Box
      sx={{
        width: { xs: "95%", md: "62%" },
        height: { xs: "200px", md: "100px" },
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
