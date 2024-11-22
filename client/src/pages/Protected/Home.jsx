import React from "react";
import Input from "../../components/home/Input";
import { Button, Stack } from "@mui/material";
import Post from "../../components/home/Post";

const Home = () => {
  return (
    <Stack>
      <Input />
      <Stack flexDirection={"column"} gap={2} mb={10}>
        <Post />
        <Post />
        <Post />
        <Post />
      </Stack>
      <Button sx={{ cursor: "pointer", mb: 2 }}>Load More</Button>
    </Stack>
  );
};

export default Home;
