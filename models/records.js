// models/records.js
const mongoose = require("mongoose");

const recordsSchema = new mongoose.Schema({
  itemName: String,
  quantity: Number,
  weight: Number,
  date: { type: Date, default: Date.now },
});

const Records = mongoose.model("Records", recordsSchema);

module.exports = Records;
