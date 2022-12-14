const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router
	.route("/")
	.get(authController.protect, userController.getAllUser)
	.post(userController.addUser);

router
	.route("/:id")
	.get(userController.getUser)
	.patch(userController.updateUser)
	.delete(
		authController.protect,
		authController.restrictTo("admin"),
		userController.deleteUser
	);

module.exports = router;
