const express = require("express");

const router = express.Router();

const Tools = require("../models/tools");

// Get all tools
router.get("/", async (req, res) => {
  try {
    const items = await Tools.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single tool
router.get("/:id", async (req, res) => {
  try {
    const item = await Tools.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "tools not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new tool
router.post("/", async (req, res) => {
  const item = new Tools({
    item: req.body.item,
    quantity: req.body.quantity,
    unit: req.body.unit,
    date: req.body.date,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a tool
router.put("/:id", async (req, res) => {
  try {
    const obj = await Tools.findById(req.params.id);
    if (obj) {
      obj.item = req.body.item || obj.item;
      obj.quantity = req.body.quantity || obj.quantity;
      obj.unit = req.body.unit || obj.unit;
      obj.date = req.body.date || obj.date;

      const updatedItem = await obj.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: "tool not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a tool
router.delete("/:id", async (req, res) => {
  try {
    const item = await Tools.findById(req.params.id);
    if (item) {
      await item.remove();
      res.json({ message: "tool deleted" });
    } else {
      res.status(404).json({ message: "tool not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
