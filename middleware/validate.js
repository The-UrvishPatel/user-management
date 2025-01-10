// Validation middleware to validate request body against a given schema
/**
 * Middleware to validate the request body using a Joi schema.
 *
 * @function
 * @param {Object} schema - The Joi schema to validate the request body against.
 * @returns {Function} - The middleware function that validates the request body.
 */
const validate = (schema) => {
  /**
   * Middleware function to validate the request body using the given Joi schema.
   *
   * @param {Object} req - The request object containing the data to be validated.
   * @param {Object} res - The response object for sending validation errors.
   * @param {Function} next - The next middleware function to be called if validation passes.
   * @returns {Object} Response - If validation fails, returns a 400 status with error details.
   */
  return (req, res, next) => {
    // Validate the request body using the provided schema
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      // Map through error details and collect error messages
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors }); // Return 400 status with the error messages
    }

    next(); // Continue to the next middleware if validation is successful
  };
};

module.exports = validate; // Export the validate function for use in other parts of the application
