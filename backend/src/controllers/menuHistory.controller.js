const MenuHistory = require("../models/menuHistory.model");
const Product = require("../models/product.model");
const ControllerFactory = require("./controller.factory");

exports.getAllMenuHistory = ControllerFactory.getAll(MenuHistory);
exports.getMenuHistory = ControllerFactory.getOne(MenuHistory);

// Create new menu history: used only by kitchen staff at the start of the day
exports.createMenuHistory = async (req, res, next) => {
	const newMenuHistory = await MenuHistory.create(req.body);
	// Update the quantity of all products in the menu
	// newMenuHistory.menuItems.foreach(async (item) => {
	// 	await Product.findOneAndUpdate(item.id, {
	// 		// Check if product.quantity exists, if not set it to item.totalQuantity
	// 		// If it exists, add item.totalQuantity to product.quantity
	// 		quantity: item.totalQuantity + (await Product.findById(item.id).quantity),
	// 	});
	// });

	res.status(201).json({
		status: "success",
		data: {
			data: newMenuHistory,
		},
	});
};

// Update menu history: used only by kitchen staff at middle of the day
exports.updateMenuHistory = ControllerFactory.updateOne(MenuHistory);
exports.deleteMenuHistory = ControllerFactory.deleteOne(MenuHistory);

// Update menu history's remaining quantity: used only by kitchen staff at the end of the day
exports.updateMenuHistoryRemainingQuantity = async (req, res, next) => {
	const menuHistory = await MenuHistory.findById(req.params.id);
	if (!menuHistory) {
		throw new AppError(`No menu history found with ID ${req.params.id}`, 404);
	}

	// Update the remaining quantity of all products in the menu
	menuHistory.menuItems.foreach(async (item) => {
		const product = await Product.findById(item.id);
		if (!product) {
			throw new AppError(`No product found with ID ${item.id}`, 404);
		}

		item.remainingQuantity = product.quantity;
		// Discard the remaining quantity of the product if product.category is "food"
		if (product.category === "food") product.quantity = 0;
		await product.save();
	});

	await menuHistory.save();

	res.status(200).json({
		status: "success",
		data: {
			data: menuHistory,
		},
	});
};
