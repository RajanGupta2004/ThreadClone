import { Avatar, Stack, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import PostOne from "../post/PostOne";
import PostTwo from "../post/PostTwo";
import { useDispatch, useSelector } from "react-redux";
import { toggleMyMenu } from "../../redux/slice";

const Post = ({ e }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const { myInfo } = useSelector((state) => state.service);
  // console.log("myInfo.me", myInfo.me._id);
  // console.log(e.admin._id);
  const _300 = useMediaQuery("(min-width:300px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const _700 = useMediaQuery("(min-width:700px)");

  const handelDeletePost = (event) => {
    dispatch(addPostId(e._id));
    dispatch(toggleMyMenu(event.currentTarget));
  };

  const checkIsAdmin = () => {
    if (myInfo.me == e?.admin?._id) {
      setIsAdmin(true);
      return;
    }
    setIsAdmin(false);
  };

  useEffect(() => {
    if (e && myInfo) {
      checkIsAdmin();
    }
  }, [myInfo, e]);
  return (
    <Stack
      flexDirection={"row"}
      justifyContent={"space-between"}
      borderBottom={"2px solid grey"}
      mx={"auto"}
      p={2}
      width={_700 ? "50%" : _300 ? "90%" : "100%"}
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
        <PostOne e={e} />
        <PostTwo e={e} />
      </Stack>

      <Stack flexDirection={"row"} gap={1}>
        <Typography variant="captions" color="gray" position={"relative"}>
          24h
        </Typography>
        {isAdmin ? <IoIosMore onClick={handelDeletePost} /> : <IoIosMore />}
      </Stack>
    </Stack>
  );
};

export default Post;
