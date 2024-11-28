import { Menu, MenuItem } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addMyInfo, toggleColorMode, toggleMainMenu } from "../../redux/slice";
import { useLogoutMeMutation } from "../../redux/service";

const MainMenu = () => {
  const { anchorEl } = useSelector((state) => state.service);
  const dispatch = useDispatch();
  const [logoutMe, logoutMeData] = useLogoutMeMutation();
  const handleClose = () => {
    dispatch(toggleMainMenu(null));
  };
  const handleLogout = async () => {
    handleClose();
    await logoutMe();
  };
  const handleToggleTheam = () => {
    handleClose();
    dispatch(toggleColorMode());
  };

  useEffect(() => {
    if (logoutMeData.isSuccess) {
      dispatch(addMyInfo(null));
      console.log(logoutMeData.data);
      window.location.reload();
    }
  }, [logoutMeData.isSuccess]);
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
