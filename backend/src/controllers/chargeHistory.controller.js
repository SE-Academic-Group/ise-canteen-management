const ChargeHistory = require("../models/chargeHistory.model");
const ControllerFactory = require("./controller.factory");
const vnpayController = require("./vnpay.controller");
const User = require("../models/user.model");
const AppError = require("../utils/appError");

exports.getAllChargeHistories = ControllerFactory.getAll(ChargeHistory, {
	populate: [{ path: "userId", select: "name email" }],
	allowNestedQueries: ["userId"],
});
exports.getChargeHistory = ControllerFactory.getOne(ChargeHistory);
exports.deleteChargeHistory = ControllerFactory.deleteOne(ChargeHistory);
exports.updateChargeHistory = ControllerFactory.updateOne(ChargeHistory);

exports.createChargeHistory = async (req, res, next) => {
	const { chargeAmount, email } = req.body;

	let newCharge = {
		chargeAmount,
		chargeStatus: "pending",
		chargeMethod: "",
		chargeDescription: "",
		userId: "",
	};

	// Money is charged by admin or cashier
	if (req.user.role === "cashier" || req.user.role === "admin") {
		// Check if email is provided
		if (!email) {
			throw new AppError(
				400,
				"INVALID_ARGUMENTS",
				"Phải có email của người được nạp tiền.",
				{ email }
			);
		}

		// Get the charged user by email from req.body
		const user = await User.findOne({ email });
		if (!user) {
			throw new AppError(
				404,
				"NOT_FOUND",
				`Không tìm thấy người dùng với email ${email}.`,
				{ email }
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
		email || req.user.email
	} voi so tien ${chargeAmount}`;

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
