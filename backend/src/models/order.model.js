const mongoose = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const orderSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		orderDate: {
			type: Date,
			default: Date.now(),
			required: true,
		},
		orderStatus: {
			type: String,
			enum: ["preparing", "success", "cancelled", "completed"],
			default: "success",
		},
		orderDescription: {
			type: String,
		},
		orderItems: [
			{
				productId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: {
					type: Number,
					min: [0, "Số lượng sản phẩm không hợp lệ"],
					required: true,
				},
				price: {
					type: Number,
					min: [0, "Giá sản phẩm không hợp lệ"],
					required: true,
				},
			},
		],
		totalPrice: Number,
	},
	{
		toJSON: { virtuals: true, versionKey: false },
	}
);

orderSchema.index({ orderDate: 1, orderStatus: 1 });
orderSchema.index({ userId: 1 });

orderSchema.plugin(mongooseLeanVirtuals);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
