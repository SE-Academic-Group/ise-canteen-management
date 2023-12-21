const mongoose = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
const statisticTypeToDateField = require("../utils/statistic.typeToDateField.converter");

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

paymentSchema.statics.generateRevenueReport = async function (
	startDate,
	endDate,
	statisticType
) {
	let dateField = statisticTypeToDateField(statisticType, "paymentDate");

	// Calculate total revenue
	const revenueStatistics = await Payment.aggregate([
		{
			$match: {
				paymentDate: {
					$gte: startDate,
					$lte: endDate,
				},
				paymentStatus: "success",
			},
		},
		{
			$addFields: {
				date: dateField,
			},
		},
		{
			$group: {
				_id: "$date",
				totalRevenue: { $sum: "$paymentAmount" },
			},
		},
		{
			$project: {
				_id: 0,
				date: "$_id",
				totalRevenue: 1,
			},
		},
		{
			$sort: { date: 1 },
		},
	]);

	return revenueStatistics;
};

paymentSchema.plugin(mongooseLeanVirtuals);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
