const express = require("express");

const router = express.Router();

const Plantation = require("../models/plantation");

// Get all plantations
router.get("/", async (req, res) => {
  try {
    const items = await Plantation.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single plantation
router.get("/:id", async (req, res) => {
  try {
    const item = await Plantation.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Plantation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new plantation
router.post("/", async (req, res) => {
  const item = new Plantation({
    cropPlanted: req.body.cropPlanted,
    landSize: req.body.landSize,
    units: req.body.units,
    date: req.body.date,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a plantation
router.put("/:id", async (req, res) => {
  try {
    const item = await Plantation.findById(req.params.id);
    if (item) {
      item.cropPlanted = req.body.cropPlanted || item.cropPlanted;
      item.landSize = req.body.landSize || item.landSize;
      item.units = req.body.units || item.units;
      item.date = req.body.date || item.date;

      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: "Plantation not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a plantation
router.delete("/:id", async (req, res) => {
  try {
    const item = await Plantation.findById(req.params.id);
    if (item) {
      await item.remove();
      res.json({ message: "Plantation deleted" });
    } else {
      res.status(404).json({ message: "Plantation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
