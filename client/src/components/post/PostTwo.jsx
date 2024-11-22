import { Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const PostTwo = () => {
  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <Stack flexDirection={"column"} justifyContent={""}>
      <Stack>
        <Typography variant="h6" fontSize={"1rem"} fontWeight={"bold"}>
          Rajan Gupta
        </Typography>
        <Typography variant="h5" fontSize={"0.9rem"}>
          Hi Guyys ! comment on the post...
        </Typography>
      </Stack>

      <img
        src="/postOne.jpg"
        alt="img"
        loading="lazy"
        width={
          _700
            ? "400px"
            : _500
            ? "350px"
            : _400
            ? "250px"
            : _300
            ? "230px"
            : "150px"
        }
        height={"auto"}
      />

      <Stack flexDirection={"column"} gap={1}>
        <Stack flexDirection={"row"} gap={2} m={1}>
          <FaHeart size={_700 ? 32 : _300 ? 28 : 24} />
          <FaRegComment size={_700 ? 32 : _300 ? 28 : 24} />
          <FaRegComment size={_700 ? 32 : _300 ? 28 : 24} />
          <IoMdSend size={_700 ? 32 : _300 ? 28 : 24} />
        </Stack>
        <Stack flexDirection={"row"} gap={1}>
          <Typography variant="caption" color={"GrayText"} fontSize={"1.1rem"}>
            2 likes.
          </Typography>
          <Typography variant="caption" color={"GrayText"} fontSize={"1.1rem"}>
            2 comments.
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PostTwo;
