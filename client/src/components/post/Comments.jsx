import {
  Avatar,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { IoIosMore } from "react-icons/io";

const Comments = () => {
  const _300 = useMediaQuery("(min-width:300px)");
  const _700 = useMediaQuery("(min-width:700px)");
  const handleClose = () => {};
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
          <Avatar src="" alt="" />
          <Stack flexDirection={"column"}>
            <Typography
              variant="h6"
              fontSize={_300 ? "1rem" : "0.9rem"}
              fontWeight={"bold"}
            >
              rajan_2004@
            </Typography>
            <Typography variant="subtitle2" fontSize={"0.9rem"}>
              This is comments on post
            </Typography>
          </Stack>
        </Stack>

        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <Typography variant="subtitle" fontSize={"1rem"}>
            24 min
          </Typography>
          <IoIosMore size={32} />
        </Stack>
      </Stack>
      <Menu
        open={true}
        anchorEl={""}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>Delete</MenuItem>
      </Menu>
    </Stack>
  );
};

export default Comments;
