const express = require("express");
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new product
router.post("/", upload.single("image"), async (req, res) => {
  const {
    productID,
    productName,
    category,
    price,
    stockQuantity,
    supplier,
    dateAdded,
    expiryDate,
    salesQuantity,
    rating,
  } = req.body;
  const image = req.file ? req.file.path : "";

  const newProduct = new Product({
    productID,
    productName,
    category,
    price,
    stockQuantity,
    supplier,
    dateAdded,
    expiryDate,
    salesQuantity,
    rating,
    image,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT to update a product
router.put("/:id", upload.single("image"), async (req, res) => {
  const {
    productID,
    productName,
    category,
    price,
    stockQuantity,
    supplier,
    dateAdded,
    expiryDate,
    salesQuantity,
    rating,
  } = req.body;
  const image = req.file ? req.file.path : "";

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        productID,
        productName,
        category,
        price,
        stockQuantity,
        supplier,
        dateAdded,
        expiryDate,
        salesQuantity,
        rating,
        image,
      },
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a product
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Serve image files
router.get("/images/:filename", (req, res) => {
  const filePath = path.join(__dirname, "../uploads", req.params.filename);
  res.sendFile(filePath);
});

module.exports = router;
