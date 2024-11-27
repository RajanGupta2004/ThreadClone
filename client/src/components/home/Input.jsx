import {
  Avatar,
  Button,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { openAddToPost } from "../../redux/slice";

const Input = () => {
  const dispatch = useDispatch();
  const _300 = useMediaQuery("(min-width:300px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const _700 = useMediaQuery("(min-width:700px)");

  const handleAppPost = () => {
    dispatch(openAddToPost(true));
  };
  return (
    <>
      {_700 ? (
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          width={"50%"}
          height={28}
          justifyContent={"space-between"}
          p={3}
          borderBottom={"2px solid gray"}
          my={3}
          mx={"auto"}
          onClick={handleAppPost}
        >
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={2}
          >
            <Avatar />
            <Typography variant="h5" fontSize={20} color="gray">
              Start a thred...
            </Typography>
          </Stack>

          <Button
            sx={{
              backgroundColor: "black",
              color: "white",
            }}
          >
            Post
          </Button>
        </Stack>
      ) : null}
    </>
  );
};

export default Input;
