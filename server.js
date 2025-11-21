// server.js - Starter Express server for Week 2 assignment

// Import required modules
require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middlewares
app.use(express.json());
app.use(logger);

// Routes
app.use("/api/products", productRoutes);

// Error handler (always last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
