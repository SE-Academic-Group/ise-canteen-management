const express = require("express");

const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/signup", authController.signup);

router.get(
	"/me",
	authController.protect,
	userController.getMe,
	userController.getUser
);
router.patch(
	"/me",
	authController.protect,
	userController.uploadUserPhoto,
	userController.resizeUserPhoto,
	userController.updateMe
);

module.exports = router;
