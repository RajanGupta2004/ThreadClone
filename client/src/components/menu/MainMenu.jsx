import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleColorMode, toggleMainMenu } from "../../redux/slice";

const MainMenu = () => {
  const { anchorEl } = useSelector((state) => state.service);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(toggleMainMenu(null));
  };
  const handleLogout = () => {};
  const handleToggleTheam = () => {
    handleClose();
    dispatch(toggleColorMode());
  };
  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={anchorEl ? true : false}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleToggleTheam}>Toggle Theam</MenuItem>
        <Link to={"/profile/2"}>
          <MenuItem>My Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default MainMenu;
