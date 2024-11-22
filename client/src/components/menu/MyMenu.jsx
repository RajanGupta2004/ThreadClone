import { Menu, MenuItem } from "@mui/material";
import React from "react";

const MyMenu = () => {
  const handleClose = () => {};
  return (
    <div>
      <Menu
        open={true}
        anchorEl={""}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default MyMenu;
