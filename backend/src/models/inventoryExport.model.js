const mongoose = require("mongoose");

const inventoryExportSchema = new mongoose.Schema({
	exportDate: {
		type: Date,
		default: Date.now(),
		required: true,
	},
	exportItems: [
		{
			inventoryItemId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "InventoryItem",
				required: true,
			},
			exportQuantity: {
				type: Number,
				min: [0, "Số lượng sản phẩm không hợp lệ"],
				required: true,
			},
			remainQuantity: {
				type: Number,
				min: [0, "Số lượng sản phẩm không hợp lệ"],
			},
		},
	],
});

const InventoryExport = mongoose.model(
	"InventoryExport",
	inventoryExportSchema
);

module.exports = InventoryExport;
