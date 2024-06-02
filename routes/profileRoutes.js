const express = require("express");
const multer = require("multer");
const Profile = require("../models/Profile");
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
  return `${req.protocol}://${req.get("host")}/${imagePath}`;
};

// GET profile
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (profile && profile.image) {
      profile.image = getImageUrl(req, profile.image);
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST profile
router.post("/", upload.single("image"), async (req, res) => {
  const { name, email, contacts, region, FarmName } = req.body;
  const image = req.file ? req.file.path : "";

  const newProfile = new Profile({
    name,
    email,
    contacts,
    region,
    FarmName,
    image,
  });

  try {
    const savedProfile = await newProfile.save();
    if (savedProfile.image) {
      savedProfile.image = getImageUrl(req, savedProfile.image);
    }
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT profile (update)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, email, contacts, region, FarmName } = req.body;
    const image = req.file ? req.file.path : "";

    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      { name, email, contacts, region, FarmName, image },
      { new: true }
    );

    if (updatedProfile.image) {
      updatedProfile.image = getImageUrl(req, updatedProfile.image);
    }

    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE profile
router.delete("/:id", async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.json({ message: "Profile deleted" });
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
