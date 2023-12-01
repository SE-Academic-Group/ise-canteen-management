const Payment = require("../models/payment.model");
const Order = require("../models/order.model");
const ControllerFactory = require("./controller.factory");

exports.getAllPayments = ControllerFactory.getAll(Payment);
exports.getPayment = ControllerFactory.getOne(Payment);
exports.createPayment = async (req, res, next) => {
	const order = await Order.findById(req.body.orderId);
	if (!order)
		throw new AppError(`No order found with ID ${req.body.orderId}`, 404);

	// If order.userId not exists and req.user.role === "cashier" or "admin", then create payment with method = "cash"
	if (
		!order.userId &&
		(req.user.role === "cashier" || req.user.role === "admin")
	) {
		req.body.paymentMethod = "cash";

		// Create payment
		const payment = await Payment.create(req.body);
	}
};
