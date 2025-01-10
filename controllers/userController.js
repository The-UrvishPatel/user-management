// Import necessary modules
const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");

/**
 * A simple pong endpoint for checking server status.
 *
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} Response - Returns a "pong" message with a 500 status code.
 */
exports.pong = (req, res) => {
  res.status(500).json("pong");
};

/**
 * Retrieves all users from the database.
 *
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} Response - Returns a list of users in JSON format.
 */
exports.getAllUsers = (req, res) => {
  User.getAllUsers((err, results) => {
    if (err) return res.status(500).send(err); // Handle database error
    res.json(results); // Return the list of users
  });
};

/**
 * Creates a new user in the database.
 *
 * @function
 * @param {Object} req - The request object containing user data in the body.
 * @param {Object} res - The response object.
 * @returns {Object} Response - Returns a success message with the created user's ID or an error message if the email is already taken.
 */
exports.createUser = (req, res) => {
  const userData = req.body; // Get user data from the request body
  User.createUser(userData, (err, results) => {
    if (err) {
      // Check for duplicate email error (MySQL error code 1062)
      if (err.errno == 1062)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ status: "error", message: "Duplicate email!" });

      return res.status(500).send(err); // Handle other database errors
    }

    // Return success message with the created user's ID
    res.status(201).json({ message: "User created", userId: results.insertId });
  });
};

/**
 * Updates an existing user in the database.
 *
 * @function
 * @param {Object} req - The request object containing user ID in the params and new user data in the body.
 * @param {Object} res - The response object.
 * @returns {Object} Response - Returns a success message if the user is updated.
 */
exports.updateUser = (req, res) => {
  const userId = req.params.id; // Get user ID from the request params
  const userData = req.body; // Get updated user data from the request body
  User.updateUser(userId, userData, (err, results) => {
    if (err) return res.status(500).send(err); // Handle database error
    res.json({ message: "User updated" }); // Return success message
  });
};

/**
 * Deletes an existing user from the database.
 *
 * @function
 * @param {Object} req - The request object containing user ID in the params.
 * @param {Object} res - The response object.
 * @returns {Object} Response - Returns a success message if the user is deleted.
 */
exports.deleteUser = (req, res) => {
  const userId = req.params.id; // Get user ID from the request params
  User.deleteUser(userId, (err, results) => {
    if (err) return res.status(500).send(err); // Handle database error
    res.json({ message: "User deleted" }); // Return success message
  });
};
