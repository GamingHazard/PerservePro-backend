// models/storage.js
const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema({
  item: String,
  quantity: Number,
  unit: Number,
  date: String,
});

const Tools = mongoose.model("Tools", toolSchema);

module.exports = Tools;
