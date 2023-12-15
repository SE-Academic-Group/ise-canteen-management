const express = require("express");

const inventoryExportController = require("../controllers/inventoryExport.controller");
const authController = require("../controllers/auth.controller");
const {
	validateRequest,
	validateRequestId,
} = require("../middlewares/validateRequest");
const createInventoryExportSchema = require("../schemas/inventoryExport/createInventoryExport.schema");

const router = express.Router();

router.use(
	authController.protect,
	authController.restrictTo("admin", "staff", "cashier")
);

router.get("/", inventoryExportController.getAllInventoryExports);

router.post(
	"/",
	validateRequest(createInventoryExportSchema),
	inventoryExportController.createInventoryExport
);

router
	.route("/:id")
	.all(validateRequestId("id"))
	.get(inventoryExportController.getInventoryExport)
	.patch(inventoryExportController.updateInventoryExport)
	.delete(inventoryExportController.deleteInventoryExport);

module.exports = router;
