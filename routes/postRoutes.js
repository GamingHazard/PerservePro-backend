const express = require("express");
const multer = require("multer");
const Post = require("../models/Post");
const router = express.Router();
const path = require("path");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Helper function to get the full URL for the image
const getImageUrl = (req, imagePath) => {
  const filename = path.basename(imagePath);
  return `${req.protocol}://${req.get("host")}/posts/images/${filename}`;
};

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    posts.forEach((post) => {
      if (post.image) {
        post.image = getImageUrl(req, post.image);
      }
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET post by id
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post && post.image) {
      post.image = getImageUrl(req, post.image);
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new post
router.post("/", upload.single("image"), async (req, res) => {
  const { description } = req.body;
  const image = req.file ? req.file.path : "";

  const newPost = new Post({
    description,
    image,
  });

  try {
    const savedPost = await newPost.save();
    if (savedPost.image) {
      savedPost.image = getImageUrl(req, savedPost.image);
    }
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update post
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { description } = req.body;
    const image = req.file ? req.file.path : "";

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { description, image },
      { new: true }
    );

    if (updatedPost.image) {
      updatedPost.image = getImageUrl(req, updatedPost.image);
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE post
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to serve images
router.get("/images/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ message: "Image not found" });
    }
  });
});

module.exports = router;
