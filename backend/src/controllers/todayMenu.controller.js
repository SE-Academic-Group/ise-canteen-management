const TodayMenuItem = require("../models/todayMenuItem.model");
const ControllerFactory = require("./controller.factory");
const AppError = require("../utils/appError");
const Product = require("../models/product.model");
const MenuHistory = require("../models/menuHistory.model");

// Used by kitchen staff to add new menu item to today menu
exports.createTodayMenuItem = async (req, res, next) => {
	let menuItems = req.body;
	// Populate menuItems with corresponding product info
	if (Array.isArray(menuItems)) {
		for (i in menuItems) {
			menuItems[i] = await populateMenuItemWithProductInfo(menuItems[i]);
		}
	} else {
		menuItems = await populateMenuItemWithProductInfo(menuItems);
	}

	try {
		const todayMenuItems = await TodayMenuItem.create(menuItems);

		res.status(200).json({
			status: "success",
			data: todayMenuItems,
		});
	} catch (err) {
		// Check if duplicate key error
		if (err.code === 11000) {
			// Get the duplicate key
			const duplicateKey = Object.keys(err.keyValue)[0];
			// Find the product with duplicate key
			const product = await Product.findById(err.keyValue[duplicateKey]);

			throw new AppError(
				400,
				"DUPLICATE_KEY",
				`Sản phẩm ${product.name} đã có trong menu hôm nay`
			);
		}
	}
};

// Used by kitchen staff to update each today menu item (quantity, price, etc.)
exports.updateTodayMenuItem = async (req, res, next) => {
	let todayMenuItem = await TodayMenuItem.findById(req.params.id);
	if (!todayMenuItem) {
		throw new AppError(
			404,
			"NOT_FOUND",
			`Không tìm thấy today menu item với ID ${req.params.id}`
		);
	}

	// Update today menu item
	const oldQuantity = todayMenuItem.quantity;
	todayMenuItem = Object.assign(todayMenuItem, req.body);
	// Update totalQuantity if quantity is updated
	if (req.body.quantity) {
		todayMenuItem.totalQuantity += req.body.quantity - oldQuantity;
	}

	await todayMenuItem.save();

	res.status(200).json({
		status: "success",
		data: todayMenuItem,
	});
};

// Used by kitchen staff to delete each today menu item
exports.deleteTodayMenuItem = ControllerFactory.deleteOne(TodayMenuItem);

// --- TODAY MENU ---

exports.getTodayMenu = ControllerFactory.getAll(TodayMenuItem);
exports.createTodayMenu = async (req, res, next) => {
	const checkTodayMenu = await TodayMenuItem.countDocuments();
	if (checkTodayMenu > 0) {
		throw new AppError(
			400,
			"BAD_REQUEST",
			"Hôm nay đã có menu, vui lòng cập nhật menu."
		);
	}

	const menuItems = req.body;
	// Populate menuItems with corresponding product info
	for (i in menuItems) {
		menuItems[i] = await populateMenuItemWithProductInfo(menuItems[i]);
	}
	const todayMenuItems = await TodayMenuItem.insertMany(menuItems);

	res.status(200).json({
		status: "success",
		data: todayMenuItems,
	});
};

exports.deleteTodayMenu = async (req, res, next) => {
	const checkTodayMenu = await TodayMenuItem.countDocuments();
	if (checkTodayMenu === 0) {
		throw new AppError(
			400,
			"NOT_FOUND",
			"Hôm nay chưa có menu, vui lòng tạo menu."
		);
	}

	await TodayMenuItem.deleteMany();

	res.status(204).json({
		status: "success",
		data: null,
	});
};

// Define a function for kitchen staff to end the day by updating the remaining quantity of all products in today's menu
exports.closeTodayMenu = async (req, res, next) => {
	const checkTodayMenu = await TodayMenuItem.countDocuments();
	if (checkTodayMenu === 0) {
		throw new AppError(
			400,
			"NOT_FOUND",
			"Hôm nay chưa có menu, vui lòng tạo menu."
		);
	}

	const todayMenuItems = await TodayMenuItem.find();

	for (item of todayMenuItems) {
		// 1) Update the remaining quantity of today menu item in Product
		const product = await Product.findById(item.productId);
		if (!product) {
			throw new AppError(
				404,
				"NOT_FOUND",
				`Không có product với ID ${item.productId}`
			);
		}

		product.quantity = item.quantity;
		// Discard the remaining quantity of the product if product.category is "food"
		if (product.category === "food") product.quantity = 0;
		await product.save();
	}

	// 2) Create a menu history
	const menuHistory = new MenuHistory({
		menuDate: new Date(),
		menuItems: todayMenuItems.map((item) => ({
			productId: item.productId,
			price: item.price,
			totalQuantity: item.totalQuantity,
			remainQuantity: item.quantity,
		})),
	});
	await menuHistory.save();

	// Delete today's menu
	await TodayMenuItem.deleteMany();

	res.status(204).json({
		status: "success",
		data: null,
	});
};

async function populateMenuItemWithProductInfo(menuItem) {
	const product = await Product.findById(menuItem.productId).lean();
	if (!product) {
		throw new AppError(
			404,
			"NOT_FOUND",
			`Không tìm thấy sản phẩm với ID ${menuItem.productId}`
		);
	}
	menuItem.price = menuItem.price || product.price;
	menuItem.quantity = menuItem.quantity || product.quantity;
	menuItem.totalQuantity = menuItem.quantity;

	menuItem.name = product.name;
	menuItem.category = product.category;
	menuItem.image = product.image;
	menuItem.description = product.description;
	menuItem.ratingAverage = product.ratingAverage;

	return menuItem;
}
