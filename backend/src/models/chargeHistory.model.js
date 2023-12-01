const mongoose = require("mongoose");

const chargeHistorySchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: [true, "Giao dịch nạp tiền phải có người dùng"],
	},
	chargeAmount: {
		type: Number,
		required: [true, "Giao dịch nạp tiền phải có số tiền"],
	},
	chargeDate: {
		type: Date,
		default: Date.now(),
		required: true,
	},
	chargeMethod: {
		type: String,
		enum: ["cash", "vnpay"],
		default: "cash",
	},
	chargeStatus: {
		type: String,
		enum: ["pending", "success", "failed"],
	},
	chargeDescription: {
		type: String,
		default: "",
	},
});

chargeHistorySchema.index({ userId: 1 });

const ChargeHistory = mongoose.model("ChargeHistory", chargeHistorySchema);

module.exports = ChargeHistory;