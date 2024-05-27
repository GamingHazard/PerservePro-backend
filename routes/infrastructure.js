const express = require("express");

const router = express.Router();

const Infrastructure = require("../models/infrastructure");

// Routes
// Get all infrastructure items
router.get("/", async (req, res) => {
  try {
    const items = await Infrastructure.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single infrastructure item
router.get("/:id", async (req, res) => {
  try {
    const item = await Infrastructure.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Infrastructure item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new infrastructure item
router.post("/", async (req, res) => {
  const item = new Infrastructure({
    infrastructureName: req.body.infrastructureName,
    number: req.body.number,
    use: req.body.use,
    quantity: req.body.quantity,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an infrastructure item
router.put("/:id", async (req, res) => {
  try {
    const item = await Infrastructure.findById(req.params.id);
    if (item) {
      item.infrastructureName =
        req.body.infrastructureName || item.infrastructureName;
      item.number = req.body.number || item.number;
      item.use = req.body.use || item.use;
      item.quantity = req.body.quantity || item.quantity;

      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: "Infrastructure item not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an infrastructure item
router.delete("/:id", async (req, res) => {
  try {
    const item = await Infrastructure.findById(req.params.id);
    if (item) {
      await item.remove();
      res.json({ message: "Infrastructure item deleted" });
    } else {
      res.status(404).json({ message: "Infrastructure item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
