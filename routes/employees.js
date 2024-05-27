const express = require("express");

const router = express.Router();

const Employees = require("../models/employees");

// Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employees.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single employee
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employees.findById(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new employee
router.post("/", async (req, res) => {
  const employee = new Employees({
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    origin: req.body.origin,
    role: req.body.role,
    status: req.body.status,
    maritalStatus: req.body.maritalStatus,
    salary: req.body.salary,
    date: req.body.date,
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an employee
router.put("/:id", async (req, res) => {
  try {
    const employee = await Employees.findById(req.params.id);
    if (employee) {
      employee.name = req.body.name || employee.name;
      employee.age = req.body.age || employee.age;
      employee.gender = req.body.gender || employee.gender;
      employee.origin = req.body.origin || employee.origin;
      employee.role = req.body.role || employee.role;
      employee.status = req.body.status || employee.status;
      employee.maritalStatus = req.body.maritalStatus || employee.maritalStatus;
      employee.salary = req.body.salary || employee.salary;
      employee.date = req.body.date || employee.date;

      const updatedEmployee = await employee.save();
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an employee
router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employees.findById(req.params.id);
    if (employee) {
      await employee.remove();
      res.json({ message: "Employee deleted" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
