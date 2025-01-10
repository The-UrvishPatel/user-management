// Import the database configuration
const db = require("../config/db");

/**
 * User model for interacting with the Users table in the database.
 * Provides methods to perform CRUD operations on user data.
 */
const User = {
  /**
   * Retrieves all users from the database.
   *
   * @function
   * @param {Function} callback - The callback function to handle the query results.
   */
  getAllUsers: (callback) => {
    const query = "SELECT * FROM Users"; // SQL query to fetch all users
    db.query(query, callback); // Execute the query and pass the result to the callback
  },

  /**
   * Creates a new user in the database.
   *
   * @function
   * @param {Object} userData - The user data to be inserted into the database.
   * @param {Function} callback - The callback function to handle the query results.
   */
  createUser: (userData, callback) => {
    const query = "INSERT INTO Users SET ?"; // SQL query to insert a new user
    db.query(query, userData, callback); // Execute the query with user data and pass the result to the callback
  },

  /**
   * Updates an existing user in the database.
   *
   * @function
   * @param {number} id - The ID of the user to be updated.
   * @param {Object} userData - The updated user data.
   * @param {Function} callback - The callback function to handle the query results.
   */
  updateUser: (id, userData, callback) => {
    const query = "UPDATE Users SET ? WHERE userId = ?"; // SQL query to update a user's information
    db.query(query, [userData, id], callback); // Execute the query with the user data and ID, and pass the result to the callback
  },

  /**
   * Deletes a user from the database.
   *
   * @function
   * @param {number} id - The ID of the user to be deleted.
   * @param {Function} callback - The callback function to handle the query results.
   */
  deleteUser: (id, callback) => {
    const query = "DELETE FROM Users WHERE userId = ?"; // SQL query to delete a user by ID
    db.query(query, id, callback); // Execute the query with the user ID and pass the result to the callback
  },
};

// Export the User model for use in other parts of the application
module.exports = User;
