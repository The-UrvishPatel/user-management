// Import necessary modules
const mysql = require("mysql2");
require("dotenv").config();

/**
 * Creates a connection to the MySQL database using configuration from environment variables.
 *
 * @function
 * @returns {Object} db - The MySQL database connection object.
 */
const db = mysql.createConnection({
  host: process.env.DB_HOST, // Host of the MySQL database (e.g., localhost)
  user: process.env.DB_USER, // Username for MySQL authentication
  port: process.env.DB_PORT || 3306, // Port to connect to the MySQL database, defaults to 3306
  password: process.env.DB_PASSWORD, // Password for MySQL authentication
  database: process.env.DB_NAME, // Database name to connect to
});

/**
 * Establishes the connection to the MySQL database.
 *
 * @callback
 * @param {Error|null} err - Error object if connection fails, or null if successful.
 */
db.connect((err) => {
  if (err) {
    // Log an error message if the connection fails
    console.error("Database connection failed: " + err.stack);
    return;
  }
  // Log a success message if the connection is established
  console.log("Connected to database.");
});

// Export the database connection object for use in other parts of the application
module.exports = db;
