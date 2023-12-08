const InventoryItem = require("../models/inventoryItem.model");
const ControllerFactory = require("./controller.factory");

exports.getAllInventoryItems = ControllerFactory.getAll(InventoryItem);
exports.getInventoryItem = ControllerFactory.getOne(InventoryItem);
exports.createInventoryItem = ControllerFactory.createOne(InventoryItem);
exports.updateInventoryItem = ControllerFactory.updateOne(InventoryItem);
exports.deleteInventoryItem = ControllerFactory.deleteOne(InventoryItem);

exports.searchInventoryItems = async (req, res, next) => {
	// Search inventory items by name
	let { name } = req.query;

	// Replace all %20 with spaces
	name = name.replace(/%20/g, " ");

	// Use regex for search (case-insensitive)
	const filter = name ? { name: { $regex: `${name}`, $options: "i" } } : {};
	const inventoryItems = await InventoryItem.find(filter);

	res.status(200).json({
		status: "success",
		data: inventoryItems,
	});
};
