import { Stack, useMediaQuery } from "@mui/material";
import React from "react";
import SearchInput from "../../components/search/SearchInput";
import ProfileBar from "../../components/search/ProfileBar";

const Search = () => {
  const _300 = useMediaQuery("(min-width:300px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <>
      <SearchInput />
      <Stack
        flexDirection={"column"}
        gap={2}
        width={_700 ? "60%" : "90%"}
        mx={"auto"}
        // bgcolor={"blue"}
      >
        <ProfileBar />
        <ProfileBar />
        <ProfileBar />
        <ProfileBar />
        <ProfileBar />
      </Stack>
    </>
  );
};

export default Search;
