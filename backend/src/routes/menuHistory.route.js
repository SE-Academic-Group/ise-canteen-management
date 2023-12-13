const express = require("express");
const menuHistoryController = require("../controllers/menuHistory.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// Manage today's menu history
router.use(authController.restrictTo("staff", "admin"));

// router.post("/create-today-menu", menuHistoryController.createTodayMenu);
// router.get("/get-today-menu", menuHistoryController.getTodayMenu);
// router.patch("/update-today-menu", menuHistoryController.updateTodayMenu);
// router.patch(
// 	"/update-today-remain-quantity",
// 	menuHistoryController.updateMenuHistoryRemainingQuantity
// );

// CRUD routes
router.use(authController.restrictTo("admin", "staff", "cashier"));
router.get("/", menuHistoryController.getAllMenuHistory);
router.get("/:id", menuHistoryController.getMenuHistory);
router.post("/", menuHistoryController.createMenuHistory);
router.patch("/:id", menuHistoryController.updateMenuHistory);
router.delete("/:id", menuHistoryController.deleteMenuHistory);

module.exports = router;
