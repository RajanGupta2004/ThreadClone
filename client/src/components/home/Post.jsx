import { Avatar, Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { IoIosMore } from "react-icons/io";
import PostOne from "../post/PostOne";
import PostTwo from "../post/PostTwo";
import { useDispatch } from "react-redux";
import { toggleMyMenu } from "../../redux/slice";

const Post = () => {
  const dispatch = useDispatch();
  const _300 = useMediaQuery("(min-width:300px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const _700 = useMediaQuery("(min-width:700px)");

  const handelDeletePost = (e) => {
    // console.log(e.currentTarget);
    dispatch(toggleMyMenu(e.currentTarget));
  };
  return (
    <Stack
      flexDirection={"row"}
      justifyContent={"space-between"}
      borderBottom={"2px solid grey"}
      mx={"auto"}
      p={2}
      width={_700 ? "50%" : _300 ? "90%" : "100%"}
      sx={
        {
          // bgcolor: "red",
        }
      }
    >
      <Stack
        flexDirection={"row"}
        gap={2}
        sx={
          {
            // bgcolor: "blue",
          }
        }
      >
        <PostOne />
        <PostTwo />
      </Stack>

      <Stack flexDirection={"row"} gap={1}>
        <Typography variant="captions" color="gray" position={"relative"}>
          24h
        </Typography>
        <IoIosMore onClick={handelDeletePost} />
      </Stack>
    </Stack>
  );
};

export default Post;
