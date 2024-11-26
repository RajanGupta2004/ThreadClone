import Post from "../models/post.model.js";
import Comment from "../models/comment.Model.js";
import User from "../models/user.Model.js";

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
}

export default commentControllers;
