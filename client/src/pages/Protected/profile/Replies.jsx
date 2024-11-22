import { Stack, useMediaQuery } from "@mui/material";
import React from "react";
import Comments from "../../../components/post/Comments";

const Replies = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <Stack
      flexDirection={"column"}
      my={2}
      mb={3}
      mx={"auto"}
      width={_700 ? "700px" : "90%"}
    >
      <Comments />
      <Comments />
      <Comments />
    </Stack>
  );
};

export default Replies;
