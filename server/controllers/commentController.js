import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const AddComment = async (req, res) => {
  const { comment, postId } = req.body;
  const { userId } = req;

  try {
    // 1. Validate the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // 2. Create and save the new comment
    const newComment = new Comment({
      comment,
      user: userId,
    });
    await newComment.save();

    // 3. Add comment to post's comments array
    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: newComment,
    });

  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add comment",
    });
  }
};

export const showComments = async (req, res) => {
  try {
      const { postId } = req.params;
      const post = await Post.findById(postId)
          .populate({
              path: 'comments',
              populate: {
                  path: 'user',
                  select: 'name', // Only fetch the name of the user
              }
          });

      res.json({
          success: true,
          data: post.comments
      });

  } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({
          success: false,
          message: "Failed to fetch comments",
      });
  }
};

export const likePost = async (req, res) => {
    const { postId } = req.body;
    const { userId } = req;
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
  
      const alreadyLiked = post.likes.includes(userId);
  
      if (alreadyLiked) {
        
        post.likes.pull(userId);
      } else {
      
        post.likes.push(userId);
      }
  
      await post.save();
  
      res.status(200).json({
        success: true,
        message: alreadyLiked ? "Post unliked" : "Post liked",
        totalLikes: post.likes.length,
      });
  
    } catch (error) {
      console.error("Like error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to like post",
      });
    }
};

export const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const { userId } = req;
  
    try {
      const comment = await Comment.findById(commentId);
  
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: "Comment not found",
        });
      }
  
      // Check if the user owns the comment
      if (comment.user.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to delete this comment",
        });
      }
  
      // Delete the comment
      await Comment.findByIdAndDelete(commentId);
  
      // Remove reference from Post.comments
      await Post.updateMany(
        { comments: commentId },
        { $pull: { comments: commentId } }
      );
  
      res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
      });
  
    } catch (error) {
      console.error("Delete comment error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete comment",
      });
    }
  };    

 
export const deletePost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = req;
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
  
      // Check if the user is the author
      if (post.author.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to delete this post",
        });
      }
  
      // Delete all comments related to this post
      await Comment.deleteMany({ _id: { $in: post.comments } });
  
      // Delete the post
      await Post.findByIdAndDelete(postId);
  
      res.status(200).json({
        success: true,
        message: "Post and associated comments deleted successfully",
      });
  
    } catch (error) {
      console.error("Delete post error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete post",
      });
    }
  };
 
  
  export const toSeeAnotherPersonProfile = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Get user profile (excluding password)
      const user = await User.findById(id).select("-password");
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      // Get posts by the user and populate the author's name
      const posts = await Post.find({ author: id })
        .populate("author", "name")
        .sort({ createdAt: -1 });
  
      res.status(200).json({
        success: true,
        profile: user,
        posts,
      });
  
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch profile",
      });
    }
  };
  
  
  