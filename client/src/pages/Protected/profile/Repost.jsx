import React from "react";
import Post from "../../../components/home/Post";
import { Stack, useMediaQuery } from "@mui/material";

const Repost = () => {
  const _300 = useMediaQuery("(min-width:300px)");
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <Stack
      flexDirection={"column"}
      alignItems={"center"}
      width={_700 ? "700px" : "90%"}
      mx={"auto"}
      sx={{
        backgroundColor: "red",
      }}
    >
      <Post />
      <Post />
      <Post />
      <Post />
    </Stack>
  );
};

export default Repost;
