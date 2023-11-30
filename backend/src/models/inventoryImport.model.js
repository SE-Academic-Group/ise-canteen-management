const mongoose = require("mongoose");

const inventoryImportSchema = new mongoose.Schema({
	importDate: {
		type: Date,
		default: Date.now(),
		required: true,
	},
	importItems: [
		{
			inventoryItemId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "InventoryItem",
				required: true,
			},
			importQuantity: {
				type: Number,
				min: [0, "Số lượng sản phẩm không hợp lệ"],
				required: true,
			},
		},
	],
});

const InventoryImport = mongoose.model(
	"InventoryImport",
	inventoryImportSchema
);

module.exports = InventoryImport;
