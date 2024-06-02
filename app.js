const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // Require dotenv and configure it

const app = express();

// MongoDB connection
mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// Enable CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // Replace with your frontend URL
    optionsSuccessStatus: 200,
  })
);

// Routes
const userRoutes = require("./routes/users");
const profileRoutes = require("./routes/profileRoutes");
const postRoutes = require("./routes/postRoutes");
const marketRoutes = require("./routes/marketRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/user", userRoutes);
app.use("/profile", profileRoutes);
app.use("/posts", postRoutes);
app.use("/market", marketRoutes);
app.use("/store", productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// const HOST = "35.157.117.28"; // Host
const PORT = process.env.PORT || 10000; // Port

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
