const express = require("express");

const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const validateRequest = require("../middlewares/validateRequest");
const loginSchema = require("../schemas/auth/login.schema");
const signupSchema = require("../schemas/auth/signup.schema");

const router = express.Router();

router.post("/signup", validateRequest(signupSchema), authController.signup);
router.post("/login", validateRequest(loginSchema), authController.login);
router.post("/logout", authController.logout);

router.use(authController.protect);
router.get("/me", userController.getMe, userController.getUser);
router.patch(
	"/me",
	userController.uploadUserPhoto,
	userController.resizeUserPhoto,
	userController.updateMe
);
router.delete("/me", userController.deleteMe);

module.exports = router;
