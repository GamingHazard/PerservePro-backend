const express = require("express");

const router = express.Router();

const Customers = require("../models/customers");

// Get all customers
router.get("/", async (req, res) => {
  try {
    const items = await Customers.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single customer
router.get("/:id", async (req, res) => {
  try {
    const item = await Customers.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new customer
router.post("/", async (req, res) => {
  const item = new Customers({
    name: req.body.name,
    product: req.body.product,
    quantity: req.body.quantity,
    price: req.body.price,
    date: req.body.date,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a customer
router.put("/:id", async (req, res) => {
  try {
    const item = await Customers.findById(req.params.id);
    if (item) {
      item.name = req.body.name || item.name;
      item.product = req.body.product || item.product;
      item.quantity = req.body.quantity || item.quantity;
      item.price = req.body.price || item.price;
      item.date = req.body.date || item.date;

      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a customer
router.delete("/:id", async (req, res) => {
  try {
    const item = await Customers.findById(req.params.id);
    if (item) {
      await item.remove();
      res.json({ message: "Customer deleted" });
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
