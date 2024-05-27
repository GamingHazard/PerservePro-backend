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
const customerRoutes = require("./routes/customers");
const employeeRoutes = require("./routes/employees");
const infrastructureRoutes = require("./routes/infrastructure");
const machineRoutes = require("./routes/machines");
const plantationRoutes = require("./routes/plantation");
const recordRoutes = require("./routes/records");
const salesRoutes = require("./routes/sales");
const storageRoutes = require("./routes/storage");
// const postRoutes = require("./routes/posts");
const shopRoutes = require("./routes/shop");
const toolRoutes = require("./routes/tools");
const lossRoutes = require("./routes/loss");
const marketRoutes = require("./routes/market");

app.use("/user", userRoutes);
app.use("/customers", customerRoutes);
app.use("/employees", employeeRoutes);
app.use("/infrastructure", infrastructureRoutes);
app.use("/machines", machineRoutes);
app.use("/plantation", plantationRoutes);
app.use("/records", recordRoutes);
app.use("/sales", salesRoutes);
app.use("/storage", storageRoutes);
// app.use("/posts", postRoutes);
app.use("/shop", shopRoutes);
app.use("/tools", toolRoutes);
app.use("/loss", lossRoutes);
app.use("/market", marketRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// const ipAddresses = [
//   "44.226.145.213",
//   "54.187.200.255",
//   "34.213.214.55",
//   "35.164.95.156",
//   "44.230.95.183",
//   "44.229.200.200",
// ];

// // Function to select a random IP address
// function getRandomIpAddress() {
//   const randomIndex = Math.floor(Math.random() * ipAddresses.length);
//   return ipAddresses[randomIndex];
// }

// // Select a random IP address and store it in a constant called HOST
// const HOST = getRandomIpAddress();

// const HOST = "192.168.43.211"; // Specify the IP address here "192.168.188.3" ||
// Start server
const PORT = process.env.PORT || 55000;
app.listen(() => {
  console.log(`Server is running on  ${PORT}`);
});
