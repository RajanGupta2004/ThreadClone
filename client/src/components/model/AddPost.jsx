import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { FaImages } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { openAddToPost } from "../../redux/slice";

const AddPost = () => {
  const dispatch = useDispatch();
  const { openAddPostModel } = useSelector((state) => state.service);
  const mediaRef = useRef();
  const [media, setMedia] = useState("");
  const [text, setText] = useState("");
  const _300 = useMediaQuery("(min-width:300px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const _700 = useMediaQuery("(min-width:700px)");
  console.log(media);

  const handleMediaRef = (e) => {
    mediaRef.current.click();
  };

  const handleClose = () => {
    dispatch(openAddToPost(false));
  };
  return (
    <Dialog
      open={openAddPostModel}
      onClose={handleClose}
      fullWidth
      fullScreen={_700 ? false : true}
    >
      <Box position={"absolute"} top={12} right={5}>
        <RxCross2 size={28} className="image-icon" onClick={handleClose} />
      </Box>
      <DialogTitle textAlign={"center"}>create a new thred</DialogTitle>

      <DialogContent>
        <Stack flexDirection={"row"} gap={1} mb={5}>
          <Avatar src="" alt="" />
          <Stack>
            <Typography variant="h6" fontWeight={"bold"}>
              rajan@20002
            </Typography>
            <textarea
              onChange={(e) => setText(e.target.value)}
              cols={_500 ? 40 : 25}
              rows={6}
              autoFocus
              placeholder="start a new thred"
              className="Addtextarea"
            />
            {media ? (
              <img
                src={URL.createObjectURL(media)}
                id="url-img"
                alt="preview"
                width={_500 ? 300 : _300 ? 200 : 100}
                height={_500 ? 300 : _300 ? 200 : 100}
              />
            ) : null}
            <FaImages
              onClick={handleMediaRef}
              size={28}
              className="image-icon"
            />
            <input
              type="file"
              onChange={(e) => setMedia(e.target.files[0])}
              ref={mediaRef}
              className="fileinput"
            />
          </Stack>
        </Stack>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6" color="gray">
            AnyOne can reply...
          </Typography>
          <Button
            size="large"
            sx={{
              bgcolor: "GrayText",
              color: "white",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Post
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AddPost;
