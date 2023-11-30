const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: [true, "Đơn hàng phải có người dùng"],
	},
	orderDate: {
		type: Date,
		default: Date.now(),
		required: true,
	},
	orderStatus: {
		type: String,
		enum: ["pending", "completed", "cancelled", "preparing"],
		default: "pending",
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
});

// Set virtual field totalPrice
orderSchema.virtual("totalPrice").get(function () {
	return this.orderItems.reduce((total, item) => {
		return total + item.quantity * item.price;
	}, 0);
});

orderSchema.index({ orderDate: 1 });
orderSchema.index({ userId: 1 });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
