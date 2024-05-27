// models/storage.js
const mongoose = require("mongoose");

const storageSchema = new mongoose.Schema({
  itemName: String,
  storeNumber: String,
  quantity: Number,
  units: String,
});

const Storage = mongoose.model("Storage", storageSchema);

module.exports = Storage;
