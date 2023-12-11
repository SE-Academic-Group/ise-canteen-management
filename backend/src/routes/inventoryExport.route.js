const express = require("express");

const inventoryExportController = require("../controllers/inventoryExport.controller");
const authController = require("../controllers/auth.controller");
const {
	validateRequest,
	validateRequestId,
} = require("../middlewares/validateRequest");

const router = express.Router();

router.use(
	authController.protect,
	authController.restrictTo("admin", "staff", "cashier")
);

router.get("/", inventoryExportController.getAllInventoryExports);
router.post("/", inventoryExportController.createInventoryExport);

router
	.route("/:id", validateRequestId("id"))
	.get(inventoryExportController.getInventoryExport)
	.patch(inventoryExportController.updateInventoryExport)
	.delete(inventoryExportController.deleteInventoryExport);

module.exports = router;
