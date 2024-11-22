import { Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import Post from "../components/home/Post";
import Comments from "../components/post/Comments";

const SinglePost = () => {
  const [comments, setComments] = useState("");
  return (
    <Stack flexDirection={"column"} gap={1} mb={5}>
      <Post />
      <Stack flexDirection={"column "} my={5} gap={1}>
        <Comments />
      </Stack>
      <TextField
        onChange={(e) => setComments(e.target.value)}
        variant="outlined"
        autoFocus
        id="comments"
        sx={{ width: "50%", mx: "auto" }}
        placeholder="Enter your comments..."
      />
    </Stack>
  );
};

export default SinglePost;
