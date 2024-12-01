import { Stack, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { useLikePostMutation, useMyInfoQuery } from "../../redux/service";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PostTwo = ({ e }) => {
  console.log("data", e);
  const { myInfo } = useSelector((state) => state.service);
  const [likePost] = useLikePostMutation();

  const [isLiked, setIsLiked] = useState();
  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const _700 = useMediaQuery("(min-width:700px)");

  const handleLike = async () => {
    await likePost(e?._id);
  };

  // console.log("e?.like?.length", e?.like?.length);

  useEffect(() => {
    const checkIsLiked = () => {
      if (e?.like.length > 0) {
        const variable = e.like.filter((ele) => ele._id === myInfo.me._id);
        if (variable.length > 0) {
          setIsLiked(true);
          return;
        }
      }
      setIsLiked(false);
    };
    checkIsLiked();
  }, [e]);
  return (
    <Stack flexDirection={"column"} justifyContent={""}>
      <Stack>
        <Typography variant="h6" fontSize={"1rem"} fontWeight={"bold"}>
          {e?.admin?.userName}
        </Typography>
        <Link to={`/post/${e?._id}`}>
          <Typography variant="h5" fontSize={"0.9rem"}>
            {e?.text}
          </Typography>
        </Link>
      </Stack>

      <img
        src={e?.media}
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
          {isLiked ? (
            <FaHeart size={_700 ? 32 : _300 ? 28 : 24} onClick={handleLike} />
          ) : (
            <FaRegHeart
              size={_700 ? 32 : _300 ? 28 : 24}
              onClick={handleLike}
            />
          )}

          <FaRegComment size={_700 ? 32 : _300 ? 28 : 24} />
          <FaRegComment size={_700 ? 32 : _300 ? 28 : 24} />
          <IoMdSend size={_700 ? 32 : _300 ? 28 : 24} />
        </Stack>
        <Stack flexDirection={"row"} gap={1}>
          <Typography variant="caption" color={"GrayText"} fontSize={"1.1rem"}>
            {e?.like?.length} likes.
          </Typography>
          <Typography variant="caption" color={"GrayText"} fontSize={"1.1rem"}>
            {e?.comment?.length} comments.
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PostTwo;
