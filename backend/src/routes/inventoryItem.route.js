const express = require("express");
const inventoryItemController = require("../controllers/inventoryItem.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// Protect all routes after this middleware
router.use(
	authController.protect,
	authController.restrictTo("admin", "staff", "cashier")
);

router.get("/", inventoryItemController.getAllInventoryItems);
router.get("/:id", inventoryItemController.getInventoryItem);
router.post("/", inventoryItemController.createInventoryItem);
router.patch("/:id", inventoryItemController.updateInventoryItem);
router.delete("/:id", inventoryItemController.deleteInventoryItem);

module.exports = router;
