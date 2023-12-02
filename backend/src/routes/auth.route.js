const express = require("express");

const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/signup", authController.signup);

router.use(authController.protect);
router.get("/me", userController.getMe, userController.getUser);
router.patch(
  "/me",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);

module.exports = router;
