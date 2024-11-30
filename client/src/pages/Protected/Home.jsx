import React, { useEffect, useState } from "react";
import Input from "../../components/home/Input";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import Post from "../../components/home/Post";
import { useAllPostQuery } from "../../redux/service";
import { useSelector } from "react-redux";

const Home = () => {
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(true);
  const { allPost } = useSelector((state) => state.service);
  console.log("allPost", allPost);
  const { data, isLoading } = useAllPostQuery(page);
  // console.log(data);

  useEffect(() => {
    if (data?.posts.length < 3) {
      setShow(false);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Stack
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <CircularProgress size={40} />;
      </Stack>
    );
  }

  return (
    <Stack>
      <Input />
      <Stack flexDirection={"column"} gap={2} mb={10}>
        {allPost ? (
          allPost.length > 0 ? (
            allPost.map((e) => <Post key={e._id} />)
          ) : (
            <Typography>No post available....</Typography>
          )
        ) : null}
      </Stack>

      {show ? (
        <Button
          sx={{ cursor: "pointer", mb: 2 }}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Load More
        </Button>
      ) : (
        allPost?.length > 0 && (
          <Typography variant="h6" textAlign={"center"} mb={5}>
            You have reached the end !
          </Typography>
        )
      )}
    </Stack>
  );
};

export default Home;
