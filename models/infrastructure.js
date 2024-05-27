// models/infrastructure.js
const mongoose = require("mongoose");

const infrastructureSchema = new mongoose.Schema({
  infrastructureName: String,
  number: String,
  use: String,
  quantity: Number,
});

const Infrastructure = mongoose.model("Infrastructure", infrastructureSchema);

module.exports = Infrastructure;
