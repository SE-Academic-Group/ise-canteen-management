const express = require("express");
const inventoryItemController = require("../controllers/inventoryItem.controller");
const authController = require("../controllers/auth.controller");
const { validateRequestId } = require("../middlewares/validateRequest");

const router = express.Router();

// Protect all routes after this middleware
router.use(
	authController.protect,
	authController.restrictTo("admin", "staff", "cashier")
);

router.get("/", inventoryItemController.getAllInventoryItems);
router.post("/", inventoryItemController.createInventoryItem);
router
	.route("/:id")
	.all(validateRequestId("id"))
	.get(inventoryItemController.getInventoryItem)
	.patch(inventoryItemController.updateInventoryItem)
	.delete(inventoryItemController.deleteInventoryItem);

module.exports = router;
