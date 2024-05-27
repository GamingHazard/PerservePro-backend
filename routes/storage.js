const express = require("express");

const router = express.Router();

const Storage = require("../models/storage");

// Get all storage items
router.get("/", async (req, res) => {
  try {
    const items = await Storage.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single storage item
router.get("/:id", async (req, res) => {
  try {
    const item = await Storage.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Storage item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new storage item
router.post("/", async (req, res) => {
  const item = new Storage({
    itemName: req.body.itemName,
    storeNumber: req.body.storeNumber,
    quantity: req.body.quantity,
    units: req.body.units,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a storage item
router.put("/:id", async (req, res) => {
  try {
    const item = await Storage.findById(req.params.id);
    if (item) {
      item.itemName = req.body.itemName || item.itemName;
      item.storeNumber = req.body.storeNumber || item.storeNumber;
      item.quantity = req.body.quantity || item.quantity;
      item.units = req.body.units || item.units;

      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: "Storage item not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a storage item
router.delete("/:id", async (req, res) => {
  try {
    const item = await Storage.findById(req.params.id);
    if (item) {
      await item.remove();
      res.json({ message: "Storage item deleted" });
    } else {
      res.status(404).json({ message: "Storage item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
