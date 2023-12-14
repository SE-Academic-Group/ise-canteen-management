const Order = require("../models/order.model");
const ControllerFactory = require("./controller.factory");
const ApiFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");
const TodayMenuItem = require("../models/todayMenuItem.model");
const Payment = require("../models/payment.model");
const User = require("../models/user.model");

exports.getAllOrders = ControllerFactory.getAll(Order, {
	populate: {
		path: "orderItems.productId",
		select: "name image",
	},
	allowNestedQueries: ["userId"],
});
exports.getOrder = ControllerFactory.getOne(Order, {
	populate: {
		path: "orderItems.productId",
		select: "name image",
	},
});
exports.createOrder = async (req, res, next) => {
	// Get user from req.user
	const orderItems = req.body;
	const totalPrice = orderItems.reduce((total, item) => {
		return total + item.quantity * item.price;
	}, 0);

	const user = req.user;
	let userId, paymentMethod;
	if (user.role === "admin" || user.role === "cashier") {
		userId = undefined;
		paymentMethod = "cash";
	} else {
		userId = user.id;
		paymentMethod = "balance";
		// Check if user.balance >= totalPrice
		if (user.balance < totalPrice) {
			throw new AppError(
				400,
				"NOT_ENOUGH_BALANCE",
				"Số dư của bạn không đủ để thanh toán đơn hàng này",
				{
					balance: user.balance,
					totalPrice,
				}
			);
		}
	}

	let order;
	// For each orderItem, check if orderItem.quantity <= todayMenuItem.quantity
	// Use mongoose Session to rollback if any orderItem.quantity > todayMenuItem.quantity
	const session = await mongoose.startSession();
	// Substract all today
	try {
		session.startTransaction();
		for (const item of orderItems) {
			// findOneAndUpdate() is atomic on single document
			const updatedTodayMenuItem = await TodayMenuItem.findOneAndUpdate(
				{ productId: item.productId, quantity: { $gte: item.quantity } },
				{ $inc: { quantity: -item.quantity } },
				{ new: true, session }
			);

			if (!updatedTodayMenuItem) {
				throw new AppError(
					400,
					"NOT_ENOUGH_QUANTITY",
					`Số lượng ${item.name} không đủ để đặt hàng`,
					{
						quantity: item.quantity,
						name: item.name,
					}
				);
			}
		}

		// Subtract user.balance if paymentMethod === "balance"
		if (paymentMethod === "balance") {
			await User.findByIdAndUpdate(
				user.id,
				{ balance: user.balance - totalPrice },
				{ new: true, runValidators: true }
			);
		}

		// After subtracting all todayMenuItem.quantity, create order
		order = await Order.create({
			orderItems,
			totalPrice,
			userId,
			orderStatus: "success",
		});

		// Create payment
		const payment = await Payment.create({
			orderId: order.id,
			paymentMethod,
			paymentStatus: "success",
			paymentAmount: totalPrice,
			discountAmount: 0,
		});

		await session.commitTransaction();
		session.endSession();
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		throw error;
	}

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
