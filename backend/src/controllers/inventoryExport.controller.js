const InventoryExport = require("../models/inventoryExport.model");
const InventoryItem = require("../models/inventoryItem.model");
const ControllerFactory = require("./controller.factory");

exports.getAllInventoryExports = ControllerFactory.getAll(InventoryExport, {
	populate: {
		path: "exportItems.inventoryItemId",
		select: "name unit price",
	},
});

exports.getInventoryExport = ControllerFactory.getOne(InventoryExport, {
	populate: {
		path: "exportItems.inventoryItemId",
		select: "name unit price",
	},
});

exports.deleteInventoryExport = ControllerFactory.deleteOne(InventoryExport);

exports.createInventoryExport = async (req, res, next) => {
	const exportItems = req.body;

	const inventoryExport = await InventoryExport.create({
		exportItems,
	});

	// Update the inventory items stockAmount
	for (const item of exportItems) {
		await InventoryItem.findByIdAndUpdate(item.inventoryItemId, {
			$inc: { stockAmount: -item.exportQuantity },
		});
	}

	res.status(201).json({
		status: "success",
		data: {
			data: inventoryExport,
		},
	});
};

exports.updateInventoryExport = async (req, res, next) => {
	// Remove {new: true} to get the old document => for updating stockAmount
	const inventoryExport = await InventoryExport.findByIdAndUpdate(
		req.params.id,
		{ exportItems: req.body.exportItems },
		{
			runValidators: true,
		}
	);

	if (!inventoryExport) {
		throw new AppError(
			404,
			"NOT_FOUND",
			`Không tìm thấy phiếu xuất kho với ID ${req.params.id}`,
			{
				id: req.params.id,
			}
		);
	}

	// Update the inventory items stockAmount
	const oldExportItems = inventoryExport.exportItems;
	const newExportItems = req.body.exportItems;

	// Add the old export quantity into stockAmount
	for (const item of oldExportItems) {
		await InventoryItem.findByIdAndUpdate(item.inventoryItemId, {
			$inc: { stockAmount: item.exportQuantity },
		});
	}

	// Subtract the new export quantity from stockAmount
	for (const item of newExportItems) {
		await InventoryItem.findByIdAndUpdate(item.inventoryItemId, {
			$inc: { stockAmount: -item.exportQuantity },
		});
	}

	res.status(200).json({
		status: "success",
		data: {
			data: inventoryExport,
		},
	});
};
