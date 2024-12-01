import formidable from "formidable";
import Post from "../models/post.model.js";
import cloudinary from "../config/cloudinary.js";
import User from "../models/user.Model.js";
import mongoose from "mongoose";
import Comment from "../models/comment.Model.js";

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
        });

      console.log(posts);

      res
        .status(200)
        .json({ success: true, message: "all post ", posts: posts });
    } catch (error) {
      console.log("ERROR to get all post", error);
      return res.status(500).json({
        success: false,
        message: "Error in to get all post",
        error: error.message,
      });
    }
  };

  static deletePost = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "post id is required" });
      }

      // find the post exist or not in database
      const postExist = await Post.findById(id);
      if (!postExist) {
        return res
          .status(400)
          .json({ success: false, message: "post does not exist" });
      }

      // check authorised  user can delete post
      const userId = req.user._id.toString();
      const adminId = postExist.admin.toString();

      console.log("userId and post admin", userId, adminId);
      if (userId != adminId) {
        return res.status(400).json({
          success: false,
          message: "you are not allowed to delete post",
        });
      }

      // delete post Image from cloudinary
      if (postExist.media) {
        cloudinary.uploader.destroy(postExist.public_id, (err, result) => {
          console.log(err, result);
        });
      }

      // delete comment from that post

      await Comment.deleteMany({ _id: { $in: postExist.comment } });

      // delete all threds repost and replies
      await User.updateMany(
        {
          $or: [{ threads: id }, { reposts: id }, { replies: id }],
        },
        {
          $pull: {
            threads: id,
            reposts: id,
            replies: id,
          },
        },
        { new: true }
      );

      // finally delete post

      await Post.findByIdAndDelete(id);

      res
        .status(200)
        .json({ success: true, message: "Post deleted successfully...." });
    } catch (error) {
      console.log("ERROR in delete post", error);
      return res.status(500).json({
        success: false,
        message: "Error in delete post",
        error: error,
      });
    }
  };

  static likePost = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400)({ message: "Post Id is required" });
      }

      // find post exist or not
      const postExist = await Post.findById(id);
      if (!postExist) {
        return res
          .status(400)
          .json({ success: false, message: "post doest not exist" });
      }

      if (postExist.like.includes(req.user._id)) {
        await Post.findByIdAndUpdate(postExist._id, {
          $pull: { like: req.user._id },
        });

        return res
          .status(201)
          .json({ success: false, message: "Unliked post" });
      }

      await Post.findByIdAndUpdate(
        postExist._id,
        {
          $push: { like: req.user._id },
        },
        { new: true }
      );

      return res.status(200).json({ success: true, message: "liked post" });
    } catch (error) {
      console.log("Error in like post API", error);
      return res
        .status(500)
        .json({ success: false, message: "Unable to like post", error: error });
    }
  };

  static repostPost = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "Id is required" });
      }

      // find post exist or not
      const postExist = await Post.findById(id);
      if (!postExist) {
        return res
          .status(404)
          .json({ success: "false", message: "No such post found..." });
      }

      // convert the post Id  string into mongoose object id
      const newId = new mongoose.Types.ObjectId(id);
      // check the post already posted or not
      if (req.user.reposts.includes(newId)) {
        return res
          .status(400)
          .json({ success: false, message: "post already reposted....." });
      }

      await User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { reposts: postExist._id },
        },
        { new: true }
      );

      return res
        .status(200)
        .json({ success: true, message: "post reposted successfully...." });
    } catch (error) {
      console.log("Error in repost");
      return res.status(500).json({
        success: false,
        message: "Error in repost routes",
        error: error.message,
      });
    }
  };

  static singlePost = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "post is id required" });
      }

      // find post exist or not

      const postExist = await Post.findById(id)
        .populate({
          path: "admin",
          select: "-password",
        })
        .populate({
          path: "like",
          select: "-password",
          populate: {
            path: "reposts",
          },
        })
        .populate({
          path: "comment",
          populate: {
            path: "admin",
          },
        });
      if (!postExist) {
        return res
          .status(404)
          .json({ success: false, message: "such post does not exist..." });
      }
      res.status(200).json({
        success: true,
        message: "single post data fetch successfully...",
        singlePost: postExist,
      });
    } catch (error) {
      console.log("ERROR in get single post");
      return res.status(500).json({
        success: false,
        message: "Error in to get single post",
        error: error.message,
      });
    }
  };
}

export default postControllers;
