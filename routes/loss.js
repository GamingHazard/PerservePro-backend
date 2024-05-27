const express = require("express");

const router = express.Router();

const Loss = require("../models/loss");

// Get all losses
router.get("/", async (req, res) => {
  try {
    const items = await Loss.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single loss
router.get("/:id", async (req, res) => {
  try {
    const item = await Loss.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Loss not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new Loss
router.post("/", async (req, res) => {
  const item = new Loss({
    product: req.body.product,
    quantity: req.body.quantity,
    weight: req.body.weight,
    selectedDate: req.body.selectedDate,
    description: req.body.description,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a loss
router.put("/:id", async (req, res) => {
  try {
    const item = await Loss.findById(req.params.id);
    if (item) {
      item.product = req.body.product || item.product;
      item.quantity = req.body.quantity || item.quantity;
      item.weight = req.body.weight || item.weight;
      item.selectedDate = req.body.selectedDate || item.selectedDate;
      item.description = req.body.description || item.description;

      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: "loss not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a customer
router.delete("/:id", async (req, res) => {
  try {
    const item = await Loss.findById(req.params.id);
    if (item) {
      await item.remove();
      res.json({ message: "loss deleted" });
    } else {
      res.status(404).json({ message: "loss not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
