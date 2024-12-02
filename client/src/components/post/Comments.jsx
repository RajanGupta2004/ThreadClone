import {
  Avatar,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import {
  useDeleteCommentMutation,
  useSinglePostQuery,
} from "../../redux/service";
import { useSelector } from "react-redux";

const Comments = ({ e, postId }) => {
  const { myInfo } = useSelector((state) => state.service);
  const { refetch } = useSinglePostQuery(postId);
  const [deleteComment, deleteCommentData] = useDeleteCommentMutation();
  const [isAdmin, setIsAdmin] = useState();
  const [anchorEl3, setanchorEl3] = useState(null);

  const _300 = useMediaQuery("(min-width:300px)");
  const _700 = useMediaQuery("(min-width:700px)");

  // console.log("myinfo", myInfo);

  const handleClose = () => {
    setanchorEl3(null);
  };

  const handleDeleteComment = async () => {
    const info = {
      id: e?._id,
      postId,
    };

    await deleteComment(info);
    handleClose();
    refetch();
  };

  const checkIsAdmin = () => {
    if (e && myInfo) {
      if (e.admin._id === myInfo.me._id) {
        setIsAdmin(true);
        return;
      }
    }
    setIsAdmin(false);
  };

  useEffect(() => {
    checkIsAdmin();
  }, []);

  useEffect(() => {
    if (deleteCommentData.isSuccess) {
      console.log(deleteCommentData.data);
    }

    if (deleteCommentData.isError) {
      console.log(deleteComment.error.data);
    }
  }, [deleteCommentData.isSuccess, deleteCommentData.isError]);
  return (
    <Stack
      flexDirection={"column"}
      gap={1}
      width={_700 ? "700px" : "100%"}
      mx={"auto"}
      borderBottom={"1px solid gray"}
      p={1}
    >
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={
          {
            // backgroundColor: "red",
          }
        }
      >
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <Avatar src={e?.admin.profilePic} alt={e?.admin.userName} />
          <Stack flexDirection={"column"}>
            <Typography
              variant="h6"
              fontSize={_300 ? "1rem" : "0.9rem"}
              fontWeight={"bold"}
            >
              {e?.admin.userName}
            </Typography>
            <Typography variant="subtitle2" fontSize={"0.9rem"}>
              {e?.text}
            </Typography>
          </Stack>
        </Stack>

        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <Typography variant="subtitle" fontSize={"1rem"}>
            24 min
          </Typography>
          {isAdmin ? (
            <IoIosMore
              size={32}
              onClick={(e) => setanchorEl3(e.currentTarget)}
            />
          ) : (
            <IoIosMore
              size={32}
              onClick={(e) => setanchorEl3(e.currentTarget)}
            />
          )}
        </Stack>
      </Stack>
      <Menu
        open={anchorEl3 ? true : false}
        anchorEl={anchorEl3}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleDeleteComment}>Delete</MenuItem>
      </Menu>
    </Stack>
  );
};

export default Comments;
