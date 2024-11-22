import {
  Avatar,
  Button,
  Chip,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const ProfileLayout = () => {
  const _300 = useMediaQuery("(min-width:300px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <>
      <Stack
        flexDirection={"column"}
        gap={2}
        width={_700 ? "700px" : "90%"}
        mx={"auto"}
        padding={2}
      >
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Stack flexDirection={"column"}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: _300 ? "1.8rem" : "1rem",
              }}
            >
              Rajan gupta20004
            </Typography>
            <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
              <Typography variant="caption" fontSize={"1rem"}>
                rajangupta1234
              </Typography>
              <Chip
                label="thred.net"
                size="small"
                sx={{
                  fontSize: "0.8rem",
                }}
              />
            </Stack>
          </Stack>
          <Avatar
            src=""
            alt=""
            sx={{
              width: 50,
              height: 50,
            }}
          />
        </Stack>
        <Typography size="medium">This is my Bio data</Typography>
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="subtitle2" color="gray">
            19k follower
          </Typography>
          <FaInstagram size={40} />
        </Stack>
      </Stack>
      <Button
        sx={{
          border: "1px solid gray",
          color: "black",
          width: _700 ? "50%" : "90%",
          mx: "auto",
          my: 2,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Edit Profile
      </Button>

      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
        borderBottom={"1px solid gray"}
        width={_700 ? "50%" : "90%"}
        mx={"auto"}
        sx={{
          pb: 2,
          // backgroundColor: "red",
        }}
      >
        <Link to={"/profile/threads/1"}>Threads</Link>
        <Link to={"/profile/replies/1"}>Replies</Link>
        <Link to={"/profile/reposts/1"}>Reposts</Link>
      </Stack>

      <Outlet />
    </>
  );
};

export default ProfileLayout;
