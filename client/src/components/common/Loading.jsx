import React from "react";
import { CircularProgress, Stack } from "@mui/material";

const Loading = () => {
  return (
    <Stack
      flexDirection={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={"50vh"}
      width={"100%"}
      height={"100vh"}
      my={5}
    >
        <CircularProgress/>
    </Stack>
  );
};

export default Loading;
