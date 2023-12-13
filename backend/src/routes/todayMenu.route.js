const express = require("express");

const todayMenuController = require("../controllers/todayMenu.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.get("/", todayMenuController.getTodayMenu);

router.use(
	authController.protect,
	authController.restrictTo("staff", "admin", "cashier")
);

// POST "/" should only be used to add new menu item after "/create-today-menu" is called
router.post("/", todayMenuController.createTodayMenuItem);
router.patch("/:id", todayMenuController.updateTodayMenuItem);
router.delete("/:id", todayMenuController.deleteTodayMenuItem);

router.post("/create-today-menu", todayMenuController.createTodayMenu);
router.delete("/delete-today-menu", todayMenuController.deleteTodayMenu);
router.post("/close-today-menu", todayMenuController.closeTodayMenu);

module.exports = router;
