const express = require("express");
const multer = require("multer");
const Market = require("./models/Market");
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

// GET all markets
router.get("/", async (req, res) => {
  try {
    const markets = await Market.find();
    res.json(markets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific market by ID
router.get("/:id", async (req, res) => {
  try {
    const market = await Market.findById(req.params.id);
    if (market == null) {
      return res.status(404).json({ message: "Market not found" });
    }
    res.json(market);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new market
router.post("/", upload.single("image"), async (req, res) => {
  const { name, description, region } = req.body;
  const image = req.file ? req.file.path : "";

  const newMarket = new Market({
    name,
    description,
    region,
    image,
  });

  try {
    const savedMarket = await newMarket.save();
    res.status(201).json(savedMarket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update a market by ID
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, description, region } = req.body;
    const image = req.file ? req.file.path : "";

    const updatedMarket = await Market.findByIdAndUpdate(
      req.params.id,
      { name, description, region, image },
      { new: true }
    );

    res.json(updatedMarket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a market by ID
router.delete("/:id", async (req, res) => {
  try {
    await Market.findByIdAndDelete(req.params.id);
    res.json({ message: "Market deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Serve images
router.get("/images/:filename", (req, res) => {
  const filePath = path.join(__dirname, "../uploads", req.params.filename);
  res.sendFile(filePath);
});

module.exports = router;
