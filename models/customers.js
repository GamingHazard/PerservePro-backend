// models/customers.js
const mongoose = require("mongoose");

const customersSchema = new mongoose.Schema({
  name: String,
  product: String,
  quantity: Number,
  price: Number,
  date: { type: Date, default: Date.now },
});

const Customers = mongoose.model("Customers", customersSchema);

module.exports = Customers;
