const mongoose = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const paymentSchema = new mongoose.Schema(
	{
		orderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order",
			required: true,
		},
		paymentMethod: {
			type: String,
			default: "cash",
			enum: ["cash", "balance"],
		},
		paymentStatus: {
			type: String,
			enum: ["pending", "success", "cancelled"],
			default: "pending",
		},
		paymentDate: {
			type: Date,
			default: Date.now(),
			required: true,
		},
		paymentDescription: {
			type: String,
			default: "",
		},
		paymentAmount: {
			type: Number,
			required: true,
		},
		discountAmount: {
			type: Number,
		},
	},
	{
		toJSON: { virtuals: true, versionKey: false },
	}
);

paymentSchema.index({ orderId: 1 });

paymentSchema.plugin(mongooseLeanVirtuals);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
