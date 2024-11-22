import { Stack, useMediaQuery } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/common/Header";
import AddPost from "../../components/model/AddPost";
import EditPost from "../../components/model/EditPost";
import MainMenu from "../../components/menu/MainMenu";

const ProtectedLayout = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <Stack
      flexDirection={"column"}
      maxWidth={_700 ? "800px" : "90%"}
      minWidth={"100%"}
      overflow={"hidden"}
      mx={"auto"}
    >
      <Header />
      {/* <AddPost /> */}
      {/* <EditPost /> */}
      {/* <MainMenu /> */}
      <Outlet />
    </Stack>
  );
};

export default ProtectedLayout;
