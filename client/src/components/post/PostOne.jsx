import { Avatar, AvatarGroup, Badge, Stack, Stepper } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const PostOne = ({ e }) => {
  // console.log("first", e);
  return (
    <Stack
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Link to={`/profile/threads/${e?.admin._id}`}>
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
      </Link>

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

      {e ? (
        e.comment.length > 0 ? (
          <AvatarGroup
            total={e.comment.length}
            sx={{
              "& .MuiAvatar-root": {
                width: 24,
                height: 24,
                fontSize: "12px",
              },
            }}
          >
            <Avatar
              src={e.comment[0].admin.profilePic}
              alt={e.comment[0].admin.userName}
            />
            {e.comment.length > 1 ? (
              <Avatar
                src={e.comment[1].admin.profilePic}
                alt={e.comment[1].admin.userName}
              />
            ) : (
              ""
            )}
          </AvatarGroup>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </Stack>
  );
};

export default PostOne;
