import { Avatar, AvatarGroup, Badge, Stack, Stepper } from "@mui/material";
import React from "react";

const PostOne = () => {
  return (
    <Stack
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Badge
        overlap="circular"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={
          <Avatar
            src=""
            alt="+"
            sx={{
              backgroundColor: "green",
              width: "20px",
              height: "20px",
              cursor: "pointer",
            }}
          >
            +
          </Avatar>
        }
      >
        <Avatar src="" alt="+" />
      </Badge>

      <Stack
        flexDirection={"column"}
        alignItems={"center"}
        gap={2}
        height={"100%"}
      >
        <Stepper
          orientation="vertical"
          activeStep={0}
          sx={{
            border: "2px solid gray",
            width: "0px",
            height: "100%",
          }}
        ></Stepper>
      </Stack>

      <AvatarGroup
        total={4}
        sx={{
          "& .MuiAvatar-root": {
            width: 24,
            height: 24,
            fontSize: "12px",
          },
        }}
      >
        <Avatar src="" alt="" />
      </AvatarGroup>
    </Stack>
  );
};

export default PostOne;
