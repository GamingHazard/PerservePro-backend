// models/employees.js
const mongoose = require("mongoose");

const employeesSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  origin: String,
  role: String,
  status: String,
  maritalStatus: String,
  salary: Number,
  date: { type: Date, default: Date.now },
});

const Employees = mongoose.model("Employees", employeesSchema);

module.exports = Employees;
