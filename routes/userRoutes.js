const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const validate = require("../middleware/validate");
const { userSchema } = require("../validations/userValidation");

router.get("/ping", userController.pong);
router.get("/users", userController.getAllUsers);
router.post("/users", validate(userSchema), userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
