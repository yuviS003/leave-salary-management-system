// Load environment variables from .env file
require("dotenv").config();

// Require the database connection
require("./db/db.js");

// Import necessary modules
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const corsOptions = require("./middlewares/cors.js");
const { verifyToken } = require("./middlewares/auth.js");

// Create an instance of Express
const app = express();

// Middleware setup
// Cross Origin Resource Sharing
app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan("dev")); // Log HTTP requests

app.use("/api/auth", require("./controllers/Auth.controller.js"));

// app.use(verifyToken);
app.use("/api/employee", require("./controllers/Employee.controller.js"));
app.use("/api/leave", require("./controllers/Leave.controller.js"));
app.use("/api/salary", require("./controllers/Salary.controller.js"));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "INTERNAL SERVER ERROR" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
