const express = require("express");
const inventoryItemController = require("../controllers/inventoryItem.controller");

const router = express.Router();

// Search inventory items by name from query string (case-insensitive)
router.get("/search", inventoryItemController.searchInventoryItems);

router.get("/", inventoryItemController.getAllInventoryItems);
router.get("/:id", inventoryItemController.getInventoryItem);
router.post("/", inventoryItemController.createInventoryItem);
router.patch("/:id", inventoryItemController.updateInventoryItem);
router.delete("/:id", inventoryItemController.deleteInventoryItem);

module.exports = router;
