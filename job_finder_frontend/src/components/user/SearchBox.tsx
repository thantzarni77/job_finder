import { Box, Button, TextField } from "@mui/material";
import CustomSearchIcon from "../custom_svg/CustomSearchIcon";
import MapPin from "../custom_svg/MapPin";
import HorizontalRuleOutlinedIcon from "@mui/icons-material/HorizontalRuleOutlined";

type Props = {
  searchType: string;
};

const SearchBox = ({ searchType }: Props) => {
  return (
    <Box
      sx={{
        width: "62%",
        height: { xs: "200px", md: "100px" },
        backgroundColor: "#ffffff",
        mx: "auto",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        p: 3,
        borderRadius: "20px",
        border: "1.5px solid ",
        borderColor: "primary.main",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {/* <SearchIcon
        sx={{
          rotate: "90deg",
          color: "primary.main",
          fontSize: "32px",
        }}
      /> */}
        <CustomSearchIcon />
        <TextField
          id="outlined-basic"
          variant="standard"
          placeholder={`${searchType} Title or Keyword`}
          sx={{
            "& > div > textarea": {
              color: "primary.main",
            },
          }}
        />
      </Box>
      <HorizontalRuleOutlinedIcon
        sx={{
          rotate: { xs: "0deg", md: "90deg" },
          transform: { xs: "scale(10, 0.5)", md: "scale(2.5, 0.5)" },
        }}
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {/* <LocationOnOutlinedIcon
        sx={{
          color: "primary.main",
          fontSize: "32px",
        }}
      /> */}
        <MapPin />
        <TextField
          id="outlined-basic"
          variant="standard"
          placeholder="Add Country or City"
        />
      </Box>
      <Button
        variant="contained"
        sx={{
          borderRadius: "10px",
          boxShadow: "none",
          textTransform: "none",
          ":hover": {
            boxShadow: "none",
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBox;
