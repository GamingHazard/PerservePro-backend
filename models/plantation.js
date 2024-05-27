// models/plantation.js
const mongoose = require("mongoose");

const plantationSchema = new mongoose.Schema({
  cropPlanted: String,
  landSize: Number,
  units: String,
  date: { type: Date, default: Date.now },
});

const Plantation = mongoose.model("Plantation", plantationSchema);

module.exports = Plantation;
