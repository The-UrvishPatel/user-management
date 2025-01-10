const Joi = require("joi");

// Define the validation schema for user input using Joi
const userSchema = Joi.object({
  // Name must be a string, with a minimum length of 3 and a maximum length of 30, and is required
  name: Joi.string().min(3).max(30).required(),

  // Email must be a valid email format and is required
  email: Joi.string().email().required(),

  // Role must be one of the following values: "Admin", "Editor", or "Viewer", and is required
  role: Joi.string().valid("Admin", "Editor", "Viewer").required(),
});

// Export the userSchema to be used in other parts of the application
module.exports = { userSchema };
