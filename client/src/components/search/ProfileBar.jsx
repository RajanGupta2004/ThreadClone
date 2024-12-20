import {
  Avatar,
  Button,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ProfileBar = ({ e }) => {
  const _300 = useMediaQuery("(min-width:300px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <Stack
      flexDirection={"row"}
      gap={2}
      justifyContent={"space-between"}
      border={"1px solid grey"}
      padding={1}
      mx={"auto"}
      width={_700 ? "80%" : "90%"}
      boxShadow={"1px 1px 1px  gray"}
      borderRadius={"10px"}
      sx={
        {
          // maxWidth: "600px",
          // bgcolor: "red",
        }
      }
    >
      <Stack flexDirection={"row"} gap={2}>
        <Avatar src={e?.profilePic} alt={e?.userName} />
        <Stack flexDirection={"column"}>
          <Link to={`profile/threads/${e._id}`}>
            <Typography
              variant="h6"
              sx={{
                fontSize: _700 ? "1rem" : "0.9rem",
                fontWeight: "bold",
              }}
            >
              {e?.userName || ""}
            </Typography>
          </Link>
          <Typography variant="caption">{e?.bio || ""}</Typography>
          <Typography variant="caption">
            {e?.followers.length}follower
          </Typography>
        </Stack>
      </Stack>

      <Link to={`profile/threads/${e._id}`}>
        <Button
          sx={{
            color: "black",
            border: "1px solid gray",
            fontWeight: "bold",
            // p: 1,
            height: 30,
            fontSize: _300 ? "0.8rem" : "0.9rem",
          }}
        >
          Follow
        </Button>
      </Link>
    </Stack>
  );
};

export default ProfileBar;
