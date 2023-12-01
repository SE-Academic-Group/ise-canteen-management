const mongoose = require("mongoose");

const inventoryItemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: String,
	category: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		min: [0, "Giá sản phẩm không hợp lệ"],
		required: true,
	},
	stockAmount: {
		type: Number,
		min: [0, "Số lượng sản phẩm không hợp lệ"],
		required: true,
	},
	unit: {
		type: String,
		required: true,
	},
	image: String,
	createdAt: {
		type: Date,
		default: Date.now(),
		required: true,
	},
	updatedAt: Date,
});

inventoryItemSchema.index({ name: 1 });

const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);

module.exports = InventoryItem;
