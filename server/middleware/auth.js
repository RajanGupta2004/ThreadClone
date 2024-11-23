import jwt from "jsonwebtoken";
import User from "../models/user.Model.js";

const auth = async (req, res, next) => {
  try {
    // console.log(req.cookies);
    const token = req.cookies.token;
    // console.log(token);
    if (!token) {
      return res
        .status(400)
        .json({ success: "false", message: "access token not found" });
    }

    // verify token

    const decodedToken = await jwt.verify(token, process.env.JWT_SECREATE);
    if (!decodedToken) {
      return res
        .status(400)
        .json({ success: false, message: "INVALID access token " });
    }
    // console.log(decodedToken);

    const user = await User.findById(decodedToken.token);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found using this token" });
    }
    req.user = user;
    // console.log(user);
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error in auth middle ware", error: error.message });
  }
};

export default auth;
