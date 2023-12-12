const mongoose = require("mongoose");

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
		},
		paymentStatus: {
			type: String,
			enum: ["pending", "success", "failed"],
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

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
