import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { openEditProfile } from "../../redux/slice";

const EditPost = () => {
  const dispatch = useDispatch();
  const { openEditProfileModel } = useSelector((state) => state.service);
  const handleClose = () => {
    dispatch(openEditProfile(false));
  };
  return (
    <Dialog
      open={openEditProfileModel}
      onClose={handleClose}
      fullWidth
      fullScreen={false}
    >
      <Box position={"absolute"} top={20} right={20} onClick={handleClose}>
        <RxCross2 size={28} className="image-icon" />
      </Box>
      <DialogTitle textAlign={"center"}>Edit post...</DialogTitle>
      <DialogContent>
        <Stack flexDirection={"column"}>
          <Avatar
            src=""
            alt=""
            sx={{ width: 96, height: 96, alignSelf: "center" }}
          />
          <Button
            sx={{
              border: "1px solid gray",
              color: "gray",
              width: 96,
              height: 40,
              alignSelf: "center",
              mt: 3,
            }}
          >
            change
          </Button>
          <Stack flexDirection={"column"} gap={1}>
            <Typography fontSize={"1.3rem"}>UserName</Typography>
            <input
              readOnly
              value={"rajan gupta@678"}
              style={{ height: "50px", border: "none", outline: "none" }}
            />
          </Stack>
          <Stack flexDirection={"column"} gap={1} my={2}>
            <Typography fontSize={"1.3rem"}>Email</Typography>
            <input
              readOnly
              value={"rajan@gamil.com"}
              className="file-inputEdit"
              style={{ height: "50px", border: "none", outline: "none" }}
            />
          </Stack>
          <Stack flexDirection={"column"} gap={1} my={2}>
            <Typography fontSize={"1.3rem"}>Bio</Typography>
            <input
              placeholder="user name"
              className="file-inputEdit"
              style={{ height: "50px", border: "none", outline: "none" }}
            />
          </Stack>
          <Button
            size="large"
            sx={{
              bgcolor: "GrayText",
              color: "white",
              borderRadius: "10px",
              cursor: "pointer",
              width: "96px",
              alignSelf: "center",
              mt: "10px",
            }}
          >
            Edit
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default EditPost;
