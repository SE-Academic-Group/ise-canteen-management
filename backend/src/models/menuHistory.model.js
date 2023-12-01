const mongoose = require("mongoose");

const menuHistorySchema = new mongoose.Schema({
	menuDate: {
		type: Date,
		default: Date.now(),
		required: true,
	},
	menuItems: [
		{
			productId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
				required: true,
			},
			totalQuantity: {
				type: Number,
				min: [0, "Số lượng sản phẩm không hợp lệ"],
				required: true,
			},
			remainQuantity: {
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

const MenuHistory = mongoose.model("MenuHistory", menuHistorySchema);

module.exports = MenuHistory;
