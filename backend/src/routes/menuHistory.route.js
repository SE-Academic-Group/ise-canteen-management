const express = require("express");
const menuHistoryController = require("../controllers/menuHistory.controller");

const router = express.Router();

// Update remaining quantity of menu history
router.patch(
	"/:id/update-remain-quantity",
	menuHistoryController.updateMenuHistoryRemainingQuantity
);

// CRUD routes
router.get("/", menuHistoryController.getAllMenuHistory);
router.get("/:id", menuHistoryController.getMenuHistory);
router.post("/", menuHistoryController.createMenuHistory);
router.patch("/:id", menuHistoryController.updateMenuHistory);
router.delete("/:id", menuHistoryController.deleteMenuHistory);

module.exports = router;
