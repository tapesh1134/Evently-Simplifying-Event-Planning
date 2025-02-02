import { Comment } from "../models/commentSchema.js";

export const addComment = async (req, res) => {
  try {
    const { text, username, postId, role } = req.body;

    if (!text || !username || !postId || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const comment = new Comment({
      text,
      username,
      postId,
      role,
    });

    await comment.save();

    res.status(201).json(comment);
  } catch (err) {
    console.error("Error saving comment:", err);
    res.status(500).json({ error: "Failed to post comment" });
  }
};


export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};
