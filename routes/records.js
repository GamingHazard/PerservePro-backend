const express = require("express");

const router = express.Router();

const Records = require("../models/records");

// Get all records
router.get("/", async (req, res) => {
  try {
    const items = await Records.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single record
router.get("/:id", async (req, res) => {
  try {
    const item = await Records.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new record
router.post("/", async (req, res) => {
  const item = new Records({
    itemName: req.body.itemName,
    quantity: req.body.quantity,
    weight: req.body.weight,
    date: req.body.date,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a record
router.put("/:id", async (req, res) => {
  try {
    const item = await Records.findById(req.params.id);
    if (item) {
      item.itemName = req.body.itemName || item.itemName;
      item.quantity = req.body.quantity || item.quantity;
      item.weight = req.body.weight || item.weight;
      item.date = req.body.date || item.date;

      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a record
router.delete("/:id", async (req, res) => {
  try {
    const item = await Records.findById(req.params.id);
    if (item) {
      await item.remove();
      res.json({ message: "Record deleted" });
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
