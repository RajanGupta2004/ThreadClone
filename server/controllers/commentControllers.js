import Post from "../models/post.model.js";
import Comment from "../models/comment.Model.js";
import User from "../models/user.Model.js";
import mongoose from "mongoose";

class commentControllers {
  static addComments = async (req, res) => {
    try {
      const { id } = req.params;
      const { text } = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "post id is required to add comment",
        });
      }

      if (!text) {
        return res.status(400).json({ message: "comment text is required..." });
      }

      // check post exist or not

      const postExist = await Post.findById(id);
      if (!postExist) {
        return res
          .status(404)
          .json({ success: false, message: "No such post exist..." });
      }

      // create comment document
      const comment = await Comment({
        text: text,
        admin: req.user._id,
        post: postExist._id,
      });

      const newComment = await comment.save();

      await Post.findByIdAndUpdate(
        postExist._id,
        {
          $push: { comment: newComment._id },
        },
        { new: true }
      );

      await User.findByIdAndUpdate(
        req.user._id,
        {
          $push: {
            replies: newComment._id,
          },
        },
        { new: true }
      );

      res
        .status(200)
        .json({ success: true, message: "comment added successfully....." });
    } catch (error) {
      console.log("Error in to add comments");
      return res.status(500).json({
        success: false,
        message: "Error to add comment ",
        error: error.message,
      });
    }
  };
  static deleteComment = async (req, res) => {
    try {
      // id = comment id
      const { postId, id } = req.params;

      if (!postId || !id) {
        return res
          .status(400)
          .json({ message: "post id and comment id required..." });
      }

      // find post exist or not
      const postExist = await Post.findById(postId);
      if (!postExist) {
        return res.status(404).json({
          success: false,
          message: "Post doest not exist for this id",
        });
      }

      // find comment exist or not

      const commentExist = await Comment.findById(id);
      if (!commentExist) {
        return res
          .status(404)
          .json({ success: false, message: "comment does not exist.." });
      }

      // check you are authorised or no tto delete comment

      const newId = new mongoose.Types.ObjectId(id);

      if (postExist.comment.includes(newId)) {
        const id1 = commentExist.admin.toString();
        const id2 = req.user._id.toString();
        if (!id1 == id2) {
          return res.status(401).json({
            success: false,
            message: "You are not authorised to delete post",
          });
        }

        // delete comment from post document

        await Post.findByIdAndUpdate(
          postExist._id,
          {
            $pull: {
              comment: id,
            },
          },
          { new: true }
        );

        // delet comment fom user document

        await User.findByIdAndUpdate(
          req.user._id,
          {
            $pull: { replies: id },
          },
          { new: true }
        );

        // delete comment busing comment id
        await Comment.findByIdAndDelete(id);

        return res
          .status(200)
          .json({ success: true, message: "comment deleted successfully..." });
      }

      res.status(200).json({
        success: false,
        message: "this post does not enclude the comment...",
      });
    } catch (error) {
      console.log("ERROR in delete comment", error);
      return res.status(500).json({
        success: false,
        message: "Error in delete comment",
        error: error.message,
      });
    }
  };
}

export default commentControllers;
