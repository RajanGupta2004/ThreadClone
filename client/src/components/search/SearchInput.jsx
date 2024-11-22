import React from "react";
import { InputAdornment, TextField, useMediaQuery } from "@mui/material";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <>
      <TextField
        sx={{
          width: _700 ? "60%" : "90%",
          maxWidth: "600px",
          borderRadius: "15px",
          px: 2,
          py: 1,
          my: 5,
          mx: "auto",
        }}
        placeholder="search user..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FaSearch />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default SearchInput;
