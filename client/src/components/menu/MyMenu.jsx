import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMyMenu } from "../../redux/slice";

const MyMenu = () => {
  const { anchorEl2 } = useSelector((state) => state.service);
  const dispatch = useDispatch();
  console.log(anchorEl2);
  const handleClose = () => {
    dispatch(toggleMyMenu(null));
  };
  return (
    <div>
      <Menu
        open={anchorEl2 ? true : false}
        anchorEl={anchorEl2}
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
