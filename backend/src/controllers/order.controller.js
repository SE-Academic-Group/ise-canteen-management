const Order = require("../models/order.model");
const ControllerFactory = require("./controller.factory");
const ApiFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");

exports.getAllOrders = ControllerFactory.getAll(Order, {
	populate: {
		path: "orderItems.productId",
		select: "name image",
	},
	allowNested: ["userId"],
});
exports.getOrder = ControllerFactory.getOne(Order, {
	populate: {
		path: "orderItems.productId",
		select: "name image",
	},
});
exports.createOrder = async (req, res, next) => {
	// Get user from req.user
	const user = req.user;
	const orderItems = req.body;
	const totalPrice = orderItems.reduce((total, item) => {
		return total + item.quantity * item.price;
	}, 0);

	const order = new Order({
		orderStatus: "pending",
		orderItems,
		totalPrice,
	});

	// If user.role === "cashier" or "admin", then create order without userId
	if (user.role === "cashier" || user.role === "admin") {
		order.userId = null;
	} else {
		// If user.role === "customer" or other, then create order with userId = user.id
		order.userId = user.id;
	}

	await order.save();
	// Populate order.orderItems.productId
	await order.populate({
		path: "orderItems.productId",
		select: "name image",
		options: { lean: true },
	});

	// Send response
	res.status(201).json({
		status: "success",
		data: order,
	});
};
exports.updateOrder = ControllerFactory.updateOne(Order);
exports.deleteOrder = ControllerFactory.deleteOne(Order);
