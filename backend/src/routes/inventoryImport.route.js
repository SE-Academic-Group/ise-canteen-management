const express = require("express");
const inventoryImportController = require("../controllers/inventoryImport.controller");
const authController = require("../controllers/auth.controller");
const { validateRequestId } = require("../middlewares/validateRequest");

const router = express.Router();

router.use(
	authController.protect,
	authController.restrictTo("admin", "staff", "cashier")
);

router.get("/", inventoryImportController.getAllInventoryImports);
router.post("/", inventoryImportController.createInventoryImport);

router
	.route("/:id")
	.all(validateRequestId("id"))
	.get(inventoryImportController.getInventoryImport)
	.delete(inventoryImportController.deleteInventoryImport)
	.patch(inventoryImportController.updateInventoryImport);

module.exports = router;
