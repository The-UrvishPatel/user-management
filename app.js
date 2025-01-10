const express = require("express"); // Import Express framework
const bodyParser = require("body-parser"); // Middleware to parse incoming request bodies
const cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing
const userRoutes = require("./routes/userRoutes"); // Import user routes
require("dotenv").config(); // Load environment variables from .env file

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3000; // Use environment variable for port or fallback to 3000

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse incoming JSON request bodies
app.use("/api", userRoutes); // Mount user routes at the /api path

// Serve static files from the "public" directory
app.use(express.static("public"));

// Health check route to verify server is up and running
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy" });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
