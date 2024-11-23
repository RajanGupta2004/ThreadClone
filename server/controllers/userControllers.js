import User from "../models/user.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class userControllers {
  static signIn = async (req, res) => {
    try {
      const { userName, password, email } = req.body;
      if (!userName || !email || !password) {
        return res
          .status(400)
          .json({ success: false, message: "All field are required..." });
      }

      const userExist = await User.findOne({ email });

      if (userExist) {
        return res
          .status(400)
          .json({ success: false, message: "User Already exist ....." });
      }

      // hashed password

      const hashedPassword = await bcrypt.hash(password, 10);
      if (!hashedPassword) {
        return res
          .status(400)
          .json({ success: false, message: "Error in password hashed...." });
      }

      // create user

      const user = await new User({
        userName,
        email,
        password: hashedPassword,
      }).save();

      if (!user) {
        return res.status(500).json({
          success: false,
          message: "something went wrong on user create....",
        });
      }

      // generate access token

      const accessToken = await jwt.sign(
        { token: user._id },
        process.env.JWT_SECREATE,
        { expiresIn: "30d" }
      );

      if (!accessToken) {
        return res.status(500).json({
          success: false,
          message: "Error while generating access token.....",
        });
      }

      // sava token into cookees

      res.cookie("token", accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.status(201).json({
        success: "true",
        message: `User created successfully... ${user?.userName}`,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "error in sign in",
        error: error.message,
      });
    }
  };

  static login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ success: false, message: "All filed are requird...." });
      }

      // find existing user

      const userExist = await User.findOne({ email });
      if (!userExist) {
        return res
          .status(400)
          .json({ success: false, message: "Your are not registed user" });
      }

      // compare password

      const passwordMatched = await bcrypt.compare(
        password,
        userExist.password
      );

      if (!passwordMatched) {
        return res
          .status(400)
          .json({ success: "false", message: "Password does not match" });
      }

      // generate token
      const accessToken = await jwt.sign(
        { token: userExist._id },
        process.env.JWT_SECREATE,
        { expiresIn: "30d" }
      );

      if (!accessToken) {
        return res.status(400).json({
          success: "false",
          message: "Error while generating accessToken on login",
        });
      }

      // set cookies on token

      res.cookie("token", accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      res.status(200).json({ success: true, message: "Login successfull" });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in login",
        error: error.message,
      });
    }
  };

  static userDetails = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "id is reduired" });
      }

      const user = await User.findById(id)
        .select("-password")
        .populate("followers")
        .populate();

      res.status(200).json({ success: false, user: user });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in userDetails fetching",
        error: error,
      });
    }
  };

  static followUser = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "id ie required" });
      }

      // find existing user

      const userExist = await User.findById(id);
      if (!userExist) {
        return res
          .status(400)
          .json({ success: false, message: "user not found....." });
      }

      // unFallow user if already fallowed
      if (userExist.followers.includes(req.user._id)) {
        await User.findByIdAndUpdate(
          userExist._id,
          {
            $pull: { followers: req.user._id },
          },
          { new: true }
        );

        return res
          .status(201)
          .json({ success: true, message: `Unfallowed ${userExist.userName}` });
      }

      // fallow the user
      await User.findByIdAndUpdate(
        userExist._id,
        {
          $push: { followers: req.user._id },
        },
        { new: true }
      );

      res
        .status(200)
        .json({ success: true, message: `Fallowed ${userExist.userName}` });
    } catch (error) {
      return res.status(500).json({
        success: "false",
        message: "Error in follow user",
        error: error,
      });
    }
  };
}

export default userControllers;
