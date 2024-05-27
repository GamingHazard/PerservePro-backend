const express = require("express");
const router = express.Router();
const Market = require("../models/market");

// Route to get all markets
router.get("/", async (req, res) => {
  try {
    const markets = await Market.find();
    res.json(markets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new market
router.post("/", async (req, res) => {
  const market = new Market({
    name: req.body.name,
    district: req.body.district,
    region: req.body.region,
    image: req.body.image,
  });
  try {
    const newMarket = await market.save();
    res.status(201).json(newMarket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get a specific market by ID
router.get("/:id", getMarket, (req, res) => {
  res.json(res.market);
});

// Route to update a market by ID
router.patch("/:id", getMarket, async (req, res) => {
  if (req.body.name != null) {
    res.market.name = req.body.name;
  }
  if (req.body.district != null) {
    res.market.district = req.body.district;
  }
  if (req.body.region != null) {
    res.market.region = req.body.region;
  }
  if (req.body.image != null) {
    res.market.image = req.body.image;
  }
  try {
    const updatedMarket = await res.market.save();
    res.json(updatedMarket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a market by ID
router.delete("/:id", getMarket, async (req, res) => {
  try {
    await res.market.remove();
    res.json({ message: "Market deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get a market by ID
async function getMarket(req, res, next) {
  let market;
  try {
    market = await Market.findById(req.params.id);
    if (market == null) {
      return res.status(404).json({ message: "Market not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.market = market;
  next();
}

module.exports = router;
