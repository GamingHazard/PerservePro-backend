const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");

// Middleware to parse JSON bodies
router.use(express.json());

// Create a new post
router.post("/", async (req, res) => {
  const { title, description, userId } = req.body;

  // Validate input
  if (!title || !description || !userId) {
    return res
      .status(400)
      .json({ error: "Title, description, and userId are required" });
  }

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create the post
    const post = new Post({
      title,
      description,
      user: userId,
    });

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name email");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get a single post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update a post by ID
router.put("/:id", async (req, res) => {
  const { title, description } = req.body;

  // Validate input
  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.title = title;
    post.description = description;

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a post by ID
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    await post.remove();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
