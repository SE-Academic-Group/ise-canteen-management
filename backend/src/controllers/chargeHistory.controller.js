const ChargeHistory = require("../models/chargeHistory.model");
const ControllerFactory = require("./controller.factory");

exports.getAllChargeHistories = ControllerFactory.getAll(ChargeHistory);
exports.getChargeHistory = ControllerFactory.getOne(ChargeHistory);
exports.deleteChargeHistory = ControllerFactory.deleteOne(ChargeHistory);
exports.updateChargeHistory = ControllerFactory.updateOne(ChargeHistory);

exports.createChargeHistory = async (req, res, next) => {
	if (req.user.role === "customer") {
		req.body.userId = req.user.id;
		req.body.chargeMethod = "vnpay";
	}
};
