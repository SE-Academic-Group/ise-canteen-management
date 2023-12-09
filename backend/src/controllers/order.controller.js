const Order = require("../models/order.model");
const ControllerFactory = require("./controller.factory");
const ApiFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");

exports.getAllOrders = ControllerFactory.getAll(Order);
exports.getOrder = ControllerFactory.getOne(Order);
exports.createOrder = async (req, res, next) => {
	// Get user from req.user
	const user = req.user;

	// If user.role === "cashier" or "admin", then create order without userId
	// Remove userId from req.body if it exists
	if (user.role === "cashier" || user.role === "admin") {
		if (req.body.userId) delete req.body.userId;
	} else if (user.role === "customer") {
		req.body.userId = user.id;
	}

	// Create order
	const order = await Order.create(req.body);

	// Send response
	res.status(201).json({
		status: "success",
		data: {
			order,
		},
	});
};
exports.updateOrder = ControllerFactory.updateOne(Order);
exports.deleteOrder = ControllerFactory.deleteOne(Order);

exports.setUserIds = (req, res, next) => {
	if (!req.body.userId) req.body.userId = req.user?.id;

	next();
};
