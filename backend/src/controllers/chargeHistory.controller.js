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
	// Create a new charge history
	const newCharge = {
		chargeAmount: req.body.chargeAmount,
		chargeDate: Date.now(),
		chargeStatus: "pending",
	};

	// Money is charged by admin or cashier
	if (req.body.role === "cashier" || req.user.role === "admin") {
		// Get the charged user by email from req.body
		console.log(req.body.email);
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
		// Money is charged by user
		newCharge.userId = req.user.id;
		newCharge.chargeMethod = "vnpay";
	}
	newCharge.chargeDescription = `Nap tien cho tai khoan ${newCharge.userId} voi so tien ${newCharge.chargeAmount}`;

	// Create a new charge history in database
	const chargeHistory = await ChargeHistory.create(newCharge);

	if (newCharge.chargeMethod === "vnpay") {
		req.body.id = chargeHistory.id;
		req.body.amount = chargeHistory.chargeAmount;
		req.body.bankCode = null;
		await vnpayController.createVNPAYCharge(req, res, next);
	} else {
		res.status(200).json({
			status: "success",
			data: {
				chargeHistory,
			},
		});
	}
};
