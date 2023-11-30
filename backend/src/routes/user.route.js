const express = require("express");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const orderRouter = require("./order.route");
const paymentRouter = require("./payment.route");
const reviewRouter = require("./review.route");
const chargeHistoryRouter = require("./chargeHistory.route");

const router = express.Router();

// Orders belong to a user
router.use("/:userId/orders", orderRouter);
router.use("/:userId/payments", paymentRouter);
router.use("/:userId/reviews", reviewRouter);
router.use("/:userId/charge-histories", chargeHistoryRouter);

// For customer to manage their own account
router.patch(
	"/me",
	authController.protect,
	authController.restrictTo("customer"),
	userController.uploadUserPhoto,
	userController.resizeUserPhoto,
	userController.updateMe
);

// For admin to manage users
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.post("/", userController.createUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
