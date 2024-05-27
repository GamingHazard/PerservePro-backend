const express = require("express");

const router = express.Router();

const Sales = require("../models/sales");

// Get all sales
router.get("/", async (req, res) => {
  try {
    const sales = await Sales.find();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single sale
router.get("/:id", async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (sale) {
      res.json(sale);
    } else {
      res.status(404).json({ message: "Sale not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new sale
router.post("/", async (req, res) => {
  const sale = new Sales({
    product: req.body.product,
    quantity: req.body.quantity,
    weight: req.body.weight,
    price: req.body.price,
    date: req.body.date,
  });

  try {
    const newSale = await sale.save();
    res.status(201).json(newSale);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a sale
router.put("/:id", async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (sale) {
      sale.product = req.body.product || sale.product;
      sale.quantity = req.body.quantity || sale.quantity;
      sale.weight = req.body.weight || sale.weight;
      sale.price = req.body.price || sale.price;
      sale.date = req.body.date || sale.date;

      const updatedSale = await sale.save();
      res.json(updatedSale);
    } else {
      res.status(404).json({ message: "Sale not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a sale
router.delete("/:id", async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (sale) {
      await sale.remove();
      res.json({ message: "Sale deleted" });
    } else {
      res.status(404).json({ message: "Sale not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
