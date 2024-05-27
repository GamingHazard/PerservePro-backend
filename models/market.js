const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Assuming the image will be stored as a URL
  },
});

module.exports = mongoose.model("Market", marketSchema);
