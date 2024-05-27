const express = require("express");

const router = express.Router();

const Machine = require("../models/machines");

//Get all machines
router.get("/", async (req, res) => {
  try {
    const machines = await Machine.find();
    res.json(machines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single customer
router.get("/:id", async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);
    if (machine) {
      res.json(machine);
    } else {
      res.status(404).json({ message: "Machines not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new machine
router.post("/", async (req, res) => {
  const machine = new Machine({
    name: req.body.name,
    model: req.body.model,
    quantity: req.body.quantity,
    date: req.body.date,
  });

  try {
    const newMachine = await machine.save();
    res.status(201).json(newMachine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a machine
router.put("/:id", async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);
    if (machine) {
      machine.name = req.body.name || machine.name;
      machine.model = req.body.model || machine.model;
      machine.quantity = req.body.quantity || machine.quantity;
      machine.date = req.body.date || machine.date;

      const updatedMachine = await machine.save();
      res.json(updatedMachine);
    } else {
      res.status(404).json({ message: "Machine not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a machine
router.delete("/:id", async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);
    if (machine) {
      await machine.remove();
      res.json({ message: "Machine deleted" });
    } else {
      res.status(404).json({ message: "Machine not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
