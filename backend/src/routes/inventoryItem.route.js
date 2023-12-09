const express = require("express");
const inventoryItemController = require("../controllers/inventoryItem.controller");

const router = express.Router();

router.get("/", inventoryItemController.getAllInventoryItems);
router.get("/:id", inventoryItemController.getInventoryItem);
router.post("/", inventoryItemController.createInventoryItem);
router.patch("/:id", inventoryItemController.updateInventoryItem);
router.delete("/:id", inventoryItemController.deleteInventoryItem);

module.exports = router;
