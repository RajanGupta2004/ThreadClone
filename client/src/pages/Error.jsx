import { Button, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <Stack alignItems={"center"} justifyContent={"center"} height={"100vh"}>
      <Stack flexDirection={"column"} gap={3}>
        <h1>Page Not found...</h1>
        <Button
          onClick={() => navigate(-1)}
          sx={{
            bgcolor: "green",
            color: "white",
            cursor: "pointer",
          }}
        >
          Go to Home
        </Button>
      </Stack>
    </Stack>
  );
};

export default Error;
