import formidable from "formidable";
import Post from "../models/post.model.js";
import cloudinary from "../config/cloudinary.js";
import User from "../models/user.Model.js";
import { model } from "mongoose";

class postControllers {
  static addPost = (req, res) => {
    try {
      const form = formidable();

      // Parse the form data
      form.parse(req, async (err, fields, files) => {
        try {
          if (err) {
            console.error("Formidable Error:", err);
            return res.status(400).json({
              success: false,
              message: "Error parsing form data",
              error: err.message,
            });
          }

          // Validate fields
          if (!fields.text || !fields.text[0]) {
            return res.status(400).json({
              success: false,
              message: "Post text is required.",
            });
          }

          // Create a new post instance
          const post = new Post({
            text: fields.text[0], // Ensure text is captured
            admin: req.user._id, // Associate with admin user
          });

          // Process media file if provided
          if (files.media) {
            const uploadImage = await cloudinary.uploader.upload(
              files.media[0].filepath,
              {
                folder: "Threads_clone/posts",
              }
            );

            if (!uploadImage) {
              return res.status(500).json({
                success: false,
                message: "Failed to upload image to Cloudinary.",
              });
            }

            post.media = uploadImage.secure_url;
            post.public_id = uploadImage.public_id;
          }

          // Save post to database
          const newPost = await post.save();

          // Update the user's threads
          const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $push: { threads: newPost._id } },
            { new: true }
          );

          if (!updatedUser) {
            return res.status(404).json({
              success: false,
              message: "User not found to update threads.",
            });
          }

          // Send success response
          return res.status(200).json({
            success: true,
            message: "Post created successfully.",
            post: newPost,
          });
        } catch (innerError) {
          console.error("Inner Error:", innerError);
          return res.status(500).json({
            success: false,
            message: "An error occurred while creating the post.",
            error: innerError.message,
          });
        }
      });
    } catch (error) {
      console.error("Outer Error:", error);
      return res.status(500).json({
        success: false,
        message: "An unexpected error occurred.",
        error: error.message,
      });
    }
  };

  static allPost = async (req, res) => {
    try {
      const { page } = req.query;
      let pageNumber = page;
      if (!page || page === "undefined") {
        pageNumber = 1;
      }

      const posts = await Post.find({})
        .sort({ createdAt: -1 })
        .skip((pageNumber - 1) * 3)
        .limit(3)
        .populate({ path: "admin", select: "-password" })
        .populate({ path: "like" })
        .populate({
          path: "comment",
          populate: {
            path: "admin",
            model: "user",
          },
        });

      res
        .status(200)
        .json({ success: true, message: "all post ", posts: posts });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in to get all post",
        error: error.message,
      });
    }
  };

  static deletePost = async (req, res) => {
    try {
    } catch (error) {
      console.log("ERROR in delete post", error);
      return res
        .status(500)
        .json({
          success: false,
          message: "Error in delete post",
          error: error,
        });
    }
  };
}

export default postControllers;
