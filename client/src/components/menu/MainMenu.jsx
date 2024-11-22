import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MainMenu = () => {
  const handleClose = () => {};
  const handleLogout = () => {};
  const handleToggleTheam = () => {};
  return (
    <div>
      <Menu
        anchorEl={""}
        id="account-menu"
        open={true}
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
