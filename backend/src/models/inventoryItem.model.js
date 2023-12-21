const mongoose = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const inventoryItemSchema = new mongoose.Schema(
	{
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
			default: 0,
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
	},
	{
		toJSON: { virtuals: true, versionKey: false },
	}
);

inventoryItemSchema.index({ name: 1 });

inventoryItemSchema.plugin(mongooseLeanVirtuals);

const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);

module.exports = InventoryItem;
