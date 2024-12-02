import { Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import SearchInput from "../../components/search/SearchInput";
import ProfileBar from "../../components/search/ProfileBar";
import { useSearchUsersQuery } from "../../redux/service";
import { useSelector } from "react-redux";

const Search = () => {
  const { searchedUser } = useSelector((state) => state.service);
  console.log(searchedUser);
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
        {searchedUser ? (
          searchedUser.length > 0 ? (
            searchedUser.map((e) => <ProfileBar key={e._id} e={e} />)
          ) : (
            ""
          )
        ) : (
          <Typography>search the user ....</Typography>
        )}
      </Stack>
    </>
  );
};

export default Search;
