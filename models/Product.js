const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productID: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stockQuantity: { type: Number, required: true },
  supplier: { type: String, required: true },
  dateAdded: { type: Date, required: true },
  salesQuantity: { type: Number, required: true },
  expiryDate: { type: Date },
  rating: { type: Number, required: true },
});

module.exports = mongoose.model("Product", productSchema);
