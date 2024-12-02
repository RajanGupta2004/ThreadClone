import { Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Post from "../components/home/Post";
import Comments from "../components/post/Comments";
import { useParams } from "react-router-dom";
import { useAddCommentMutation, useSinglePostQuery } from "../redux/service";

const SinglePost = () => {
  const params = useParams();
  const [comments, setComments] = useState("");
  const { data, refetch } = useSinglePostQuery(params?.id);
  const [addComment, addCommentData] = useAddCommentMutation();

  // console.log(data.singlePost);

  const handelAddComment = async (e) => {
    if (data && e.key === "Enter") {
      const info = {
        id: data.singlePost._id,
        text: comments,
      };

      // console.log("info", info);

      await addComment(info);
    }
  };

  useEffect(() => {
    if (addCommentData.isSuccess) {
      setComments("");
      refetch();
      console.log(addCommentData.data);
    }

    if (addCommentData.isError) {
      console.log(addCommentData.error.data);
    }
  }, [addCommentData.isSuccess, addCommentData.isError]);

  return (
    <>
      <Stack flexDirection={"column"} gap={1} mb={5}>
        <Post e={data?.singlePost} />
        <Stack flexDirection={"column "} my={5} gap={1}>
          {data
            ? data.singlePost.comment.length > 0
              ? data.singlePost.comment.map((e) => (
                  <Comments key={e._id} e={e} postId={data?.singlePost._id} />
                ))
              : null
            : "null"}
        </Stack>
        <TextField
          onChange={(e) => setComments(e.target.value)}
          onKeyUp={handelAddComment}
          value={comments ? comments : ""}
          variant="outlined"
          autoFocus
          id="comments"
          sx={{ width: "50%", mx: "auto" }}
          placeholder="Enter your comments..."
        />
      </Stack>
    </>
  );
};

export default SinglePost;
