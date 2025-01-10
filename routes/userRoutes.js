const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const validate = require("../middleware/validate");
const { userSchema } = require("../validations/userValidation");

/**
 * Route to test the API (ping).
 * Responds with a simple "pong" message for checking connectivity.
 * @route GET /ping
 * @returns {object} 200 - Success response with message
 * @returns {object} 500 - Error response
 */
router.get("/ping", userController.pong);

/**
 * Route to fetch all users from the database.
 * @route GET /users
 * @returns {array} 200 - Array of user objects
 * @returns {object} 500 - Error response
 */
router.get("/users", userController.getAllUsers);

/**
 * Route to create a new user.
 * Validates input data using `userSchema` before passing it to the controller.
 * @route POST /users
 * @param {object} userData - User data (name, email, role)
 * @returns {object} 201 - Success response with message and user ID
 * @returns {object} 400 - Validation error response
 * @returns {object} 500 - Error response
 */
router.post("/users", validate(userSchema), userController.createUser);

/**
 * Route to update an existing user by ID.
 * @route PUT /users/:id
 * @param {string} id - User ID to update
 * @param {object} userData - Updated user data
 * @returns {object} 200 - Success response with updated message
 * @returns {object} 500 - Error response
 */
router.put("/users/:id", userController.updateUser);

/**
 * Route to delete a user by ID.
 * @route DELETE /users/:id
 * @param {string} id - User ID to delete
 * @returns {object} 200 - Success response with deleted message
 * @returns {object} 500 - Error response
 */
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
