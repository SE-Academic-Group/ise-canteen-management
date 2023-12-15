const express = require("express");
const inventoryImportController = require("../controllers/inventoryImport.controller");
const authController = require("../controllers/auth.controller");
const {
	validateRequestId,
	validateRequest,
} = require("../middlewares/validateRequest");
const createInventoryImportSchema = require("../schemas/inventoryImport/createInventoryImport.schema");

const router = express.Router();

router.use(
	authController.protect,
	authController.restrictTo("admin", "staff", "cashier")
);

router.get("/", inventoryImportController.getAllInventoryImports);
router.post(
	"/",
	validateRequest(createInventoryImportSchema),
	inventoryImportController.createInventoryImport
);

router
	.route("/:id")
	.all(validateRequestId("id"))
	.get(inventoryImportController.getInventoryImport)
	.delete(inventoryImportController.deleteInventoryImport)
	.patch(inventoryImportController.updateInventoryImport);

module.exports = router;
