const ChargeHistory = require("../models/chargeHistory.model");
const ControllerFactory = require("./controller.factory");
const vnpayController = require("./vnpay.controller");
const User = require("../models/user.model");
const AppError = require("../utils/appError");

exports.getAllChargeHistories = ControllerFactory.getAll(ChargeHistory);
exports.getChargeHistory = ControllerFactory.getOne(ChargeHistory);
exports.deleteChargeHistory = ControllerFactory.deleteOne(ChargeHistory);
exports.updateChargeHistory = ControllerFactory.updateOne(ChargeHistory);

exports.createChargeHistory = async (req, res, next) => {
	if (!req.body.chargeAmount || req.body.chargeAmount <= 0) {
		throw new AppError("Phải cung cấp số tiền nạp hợp lệ.", 400);
	}

	let newCharge = {
		chargeAmount: req.body.chargeAmount,
	};

	// Money is charged by admin or cashier
	if (req.user.role === "cashier" || req.user.role === "admin") {
		// Check if email is provided
		if (!req.body.email) {
			throw new AppError("Phải cung cấp email người dùng muốn nạp tiền.", 400);
		}

		// Get the charged user by email from req.body
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			throw new AppError(
				`Không có người dùng với email ${req.body.email}`,
				404
			);
		}

		newCharge.userId = user.id;
		newCharge.chargeStatus = "success";
		newCharge.chargeMethod = "cash";
	} else {
		// Money is charged by users themselves
		newCharge.userId = req.user.id;
		newCharge.chargeMethod = "vnpay";
	}
	newCharge.chargeDescription = `Nap tien cho tai khoan ${
		req.body.email || req.user.email
	} voi so tien ${newCharge.chargeAmount}`;

	// Create a new charge history in database
	const chargeHistory = await ChargeHistory.create(newCharge);

	// If charge method is cash, increase user's balance
	if (newCharge.chargeMethod === "cash") {
		await User.findByIdAndUpdate(
			newCharge.userId,
			{ $inc: { balance: newCharge.chargeAmount } },
			{ new: true }
		);

		res.status(201).json({
			status: "success",
			data: chargeHistory,
		});
	} else {
		// If charge method is vnpay, create a new vnpay charge
		req.body.id = chargeHistory.id;
		req.body.amount = chargeHistory.chargeAmount;
		req.body.orderDescription = chargeHistory.chargeDescription;

		next();
	}
};
