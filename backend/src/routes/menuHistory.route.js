const express = require("express");
const menuHistoryController = require("../controllers/menuHistory.controller");
const authController = require("../controllers/auth.controller");
const { validateRequestId } = require("../middlewares/validateRequest");

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// Manage today's menu history
router.use(authController.restrictTo("staff", "admin"));

// CRUD routes
router.use(authController.restrictTo("admin", "staff", "cashier"));
router.get("/", menuHistoryController.getAllMenuHistory);
router.post("/", menuHistoryController.createMenuHistory);

router
	.route("/:id")
	.all(validateRequestId("id"))
	.get(menuHistoryController.getMenuHistory)
	.patch(menuHistoryController.updateMenuHistory)
	.delete(menuHistoryController.deleteMenuHistory);

module.exports = router;
