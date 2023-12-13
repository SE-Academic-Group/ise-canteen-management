const InventoryImport = require("../models/inventoryImport.model");
const InventoryItem = require("../models/inventoryItem.model");
const ControllerFactory = require("./controller.factory");

exports.getAllInventoryImports = ControllerFactory.getAll(InventoryImport, {
	populate: {
		path: "importItems.inventoryItemId",
		select: "name unit price",
	},
});

exports.getInventoryImport = ControllerFactory.getOne(InventoryImport, {
	populate: {
		path: "importItems.inventoryItemId",
		select: "name unit price",
	},
});

exports.deleteInventoryImport = ControllerFactory.deleteOne(InventoryImport);

exports.createInventoryImport = async (req, res, next) => {
	const importItems = req.body;

	const inventoryImport = await InventoryImport.create({
		importItems,
	});

	// Update the inventory items stockAmount
	for (const item of importItems) {
		await InventoryItem.findByIdAndUpdate(item.inventoryItemId, {
			$inc: { stockAmount: item.quantity },
		});
	}

	res.status(201).json({
		status: "success",
		data: inventoryImport,
	});
};

exports.updateInventoryImport = async (req, res, next) => {
	// Remove {new: true} to get the old document => for updating stockAmount
	const inventoryImport = await InventoryImport.findByIdAndUpdate(
		req.params.id,
		{ importItems: req.body.importItems },
		{
			runValidators: true,
		}
	);

	if (!inventoryImport) {
		throw new AppError(
			404,
			"NOT_FOUND",
			`Không tìm thấy phiếu nhập kho với ID ${req.params.id}`,
			{
				id: req.params.id,
			}
		);
	}

	// Update the inventory items stockAmount
	const oldImportItems = inventoryImport.importItems;
	const newImportItems = req.body.importItems;
	// Subtract the old import quantity
	for (const item of oldImportItems) {
		await InventoryItem.findByIdAndUpdate(item.inventoryItemId, {
			$inc: { stockAmount: -item.quantity },
		});
	}

	// Add the new import quantity
	for (const item of newImportItems) {
		await InventoryItem.findByIdAndUpdate(item.inventoryItemId, {
			$inc: { stockAmount: item.quantity },
		});
	}

	res.status(200).json({
		status: "success",
		data: inventoryImport,
	});
};
