const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

// Require dotenv and configure it
require("dotenv").config();

// MongoDB connection
mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

mongoose.Promise = global.Promise;

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors()); // Enable CORS

// Routes
const userRoutes = require("./routes/users");
const profileRoutes = require("./routes/profileRoutes");
const productRoutes = require("./routes/productRoutes");
const postRoutes = require("./routes/postRoutes");
// const marketRoutes = require("./routes/marketRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.use("/user", userRoutes);
app.use("/profile", profileRoutes);
app.use("/store", productRoutes);
app.use("/post", postRoutes);
// app.use("/markets", marketRoutes);
app.use("/comment", commentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// const HOST = "192.168.43.211"; // Specify the IP address here "192.168.188.3" ||
// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on :${PORT}`);
});
