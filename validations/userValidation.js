const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("Admin", "Editor", "Viewer").required(),
});

module.exports = { userSchema };
