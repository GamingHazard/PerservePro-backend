// models/machine.js
const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
  name: String,
  model: String,
  quantity: Number,
  date: { type: Date, default: Date.now },
});

const Machine = mongoose.model("Machine", machineSchema);

module.exports = Machine;
