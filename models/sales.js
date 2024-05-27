// models/sales.js
const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  product: String,
  quantity: Number,
  weight: Number,
  price: Number,
  date: { type: Date, default: Date.now },
});

const Sales = mongoose.model("Sales", salesSchema);

module.exports = Sales;
