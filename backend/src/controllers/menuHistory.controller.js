const MenuHistory = require("../models/menuHistory.model");
const Product = require("../models/product.model");
const ControllerFactory = require("./controller.factory");
const AppError = require("../utils/appError");

exports.getAllMenuHistory = ControllerFactory.getAll(MenuHistory, {
	populate: {
		path: "menuItems.productId",
		select: "name image",
	},
});
exports.getMenuHistory = ControllerFactory.getOne(MenuHistory, {
	populate: {
		path: "menuItems.productId",
		select: "name image",
	},
});
exports.createMenuHistory = ControllerFactory.createOne(MenuHistory);
exports.updateMenuHistory = ControllerFactory.updateOne(MenuHistory);
exports.deleteMenuHistory = ControllerFactory.deleteOne(MenuHistory);

// // Get today's menu history
// exports.getTodayMenu = async (req, res, next) => {
// 	const todayMenu = await getTodayMenu({
// 		populate: {
// 			path: "menuItems.productId",
// 			select: "name",
// 		},
// 	});

// 	// If today's menu history doesn't exist, throw error
// 	if (!todayMenu) {
// 		throw new AppError(404, "NOT_FOUND", "Hôm nay chưa có menu.");
// 	}

// 	res.status(200).json({
// 		status: "success",
// 		data: {
// 			data: todayMenu,
// 		},
// 	});
// };

// // Create new menu history: used only by kitchen staff at the start of the day
// exports.createTodayMenu = async (req, res, next) => {
// 	const todayMenu = await getTodayMenu();
// 	if (todayMenu) {
// 		throw new AppError(
// 			400,
// 			"DUPLICATE_KEYS",
// 			"Hôm nay đã có menu, vui lòng cập nhật menu."
// 		);
// 	}

// 	// Create new menu history
// 	req.body.menuDate = new Date(Date.now());
// 	req.body.menuItems.forEach((item) => {
// 		item.remainQuantity = item.totalQuantity;
// 	});
// 	const menuHistory = await MenuHistory.create(req.body);

// 	// Update the quantity of all products in the Product table
// 	menuHistory.menuItems.forEach(async (item) => {
// 		const product = await Product.findByIdAndUpdate(item.productId, {
// 			quantity: item.totalQuantity,
// 		});

// 		if (!product) {
// 			throw new AppError(
// 				404,
// 				"NOT_FOUND",
// 				`Không có product với ID ${item.productId}`
// 			);
// 		}
// 	});

// 	// Send response
// 	res.status(201).json({
// 		status: "success",
// 		data: {
// 			menuHistory,
// 		},
// 	});
// };

// // Update menu history: used only by kitchen staff at middle of the day
// exports.updateTodayMenu = async (req, res, next) => {
// 	const todayMenu = await getTodayMenu();

// 	// If today's menu history doesn't exist, throw error
// 	if (!todayMenu) {
// 		throw new AppError(404, "NOT_FOUND", "Hôm nay chưa có menu.");
// 	}

// 	// Update today's menu history
// 	const menuHistory = await MenuHistory.findByIdAndUpdate(
// 		todayMenu.id,
// 		req.body,
// 		{
// 			new: true,
// 			runValidators: true,
// 		}
// 	);

// 	// Update the quantity of all products in the Product table
// 	menuHistory.menuItems.forEach(async (item) => {
// 		const product = await Product.findByIdAndUpdate(item.productId, {
// 			quantity: item.totalQuantity,
// 		});

// 		if (!product) {
// 			throw new AppError(
// 				404,
// 				"NOT_FOUND",
// 				`Không có product với ID ${item.productId}`
// 			);
// 		}
// 	});
// };

// // Update menu history's remaining quantity: used only by kitchen staff at the end of the day
// exports.updateMenuHistoryRemainingQuantity = async (req, res, next) => {
// 	// Check if today's menu history already exists
// 	const todayMenu = await getTodayMenu();

// 	// If today's menu history doesn't exist, throw error
// 	if (!todayMenu) {
// 		throw new AppError(404, "NOT_FOUND", "Hôm nay chưa có menu.");
// 	}

// 	// Update the remaining quantity of all products in the menu
// 	todayMenu.menuItems.forEach(async (item) => {
// 		const product = await Product.findById(item.id);
// 		if (!product) {
// 			throw new AppError(
// 				404,
// 				"NOT_FOUND",
// 				`Không có product với ID ${item.id}`
// 			);
// 		}

// 		item.remainingQuantity = product.quantity;
// 		// Discard the remaining quantity of the product if product.category is "food"
// 		if (product.category === "food") product.quantity = 0;
// 		await product.save();
// 	});

// 	await todayMenu.save();

// 	res.status(200).json({
// 		status: "success",
// 		data: {
// 			data: todayMenu,
// 		},
// 	});
// };

// exports.deleteTodayMenu = async (req, res, next) => {
// 	const todayMenu = await getTodayMenu();

// 	// If today's menu history doesn't exist, throw error
// 	if (!todayMenu) {
// 		throw new AppError(404, "NOT_FOUND", "Hôm nay chưa có menu.");
// 	}

// 	// Delete today's menu history
// 	await MenuHistory.findByIdAndDelete(todayMenu.id);

// 	res.status(204).json({
// 		status: "success",
// 		data: null,
// 	});
// };

// async function getTodayMenu(options) {
// 	const today = new Date();
// 	today.setHours(0, 0, 0, 0);

// 	const query = MenuHistory.findOne({
// 		menuDate: {
// 			$gte: today,
// 			$lte: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1), // Set to end of the day
// 		},
// 	});

// 	if (options && options.populate) {
// 		query.populate(options.populate);
// 	}

// 	const todayMenu = await query;

// 	return todayMenu;
// }
