// models/storage.js
const mongoose = require("mongoose");

const LossSchema = new mongoose.Schema({
  product: String,
  quantity: Number,
  weight: Number,
  selectedDate: String,
  description: String,
});

const Loss = mongoose.model("Loss", LossSchema);

module.exports = Loss;
