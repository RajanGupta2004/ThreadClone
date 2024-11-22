import React from "react";
import { Grid2, Stack, useMediaQuery } from "@mui/material";
import Navbar from "./Navbar";
import { IoMenu } from "react-icons/io5";

const Header = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <>
      {_700 ? (
        <Stack
          flexDirection={"row"}
          justifyContent={"space-around"}
          // bgcolor={"red"}
          padding={2}
        >
          <img src="/logo.webp" alt="logo" width={50} height={48} />
          <Stack
            width={"550px"}
            justifyContent={"center"}
            bgcolor={"alice-blue"}
          >
            <Navbar />
          </Stack>
          <IoMenu size={32} className="image-icon" />
        </Stack>
      ) : (
        <>
          <Stack
            position={"fixed"}
            width={"100%"}
            p={2}
            bottom={0}
            bgcolor={"aliceblue"}
            zIndex={2}
          >
            <Navbar />
          </Stack>

          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            p={1}
          >
            <Stack
              width={"55%"}
              // sx={{ bgcolor: "red" }}
              flexDirection={"row"}
              justifyContent={"flex-end"}
            >
              <img src="/logo.webp" alt="logo" width={50} height={48} />
            </Stack>
            <Stack flexDirection={"row"} justifyContent={""}>
              <IoMenu size={40} className="image-icon" />
            </Stack>
          </Stack>
        </>
      )}
    </>
  );
};

export default Header;
