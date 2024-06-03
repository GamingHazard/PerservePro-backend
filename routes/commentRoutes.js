const express = require("express");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const router = express.Router();

// GET all comments for a post
router.get("/posts/:postId/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new comment
router.post("/posts/:postId/comments", async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;

  const newComment = new Comment({
    content,
    postId,
    author: req.user.name, // Assuming the user's name is available in req.user
  });

  try {
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE comment
router.delete("/comments/:id", async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
