import { Stack } from "@mui/material";
import React from "react";
import { GoHomeFill } from "react-icons/go";
import { TbEdit } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-around"}
        maxWidth={"100%"}
      >
        <Link to={"/"}>
          <GoHomeFill size={32} />
        </Link>

        <Link to={"/search"}>
          <IoSearch size={32} />
        </Link>

        <CiHeart size={32} />
        <TbEdit size={32} />
        <Link to={"/profile"}>
          <RxAvatar size={32} />
        </Link>
      </Stack>
    </div>
  );
};

export default Navbar;
