const mongoose = require("mongoose");

const inventoryImportSchema = new mongoose.Schema(
	{
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
				price: Number,
				quantity: {
					type: Number,
					required: true,
				},
			},
		],
	},
	{
		toJSON: { virtuals: true, versionKey: false },
	}
);

inventoryImportSchema.index({ inventoryItemId: 1 });

const InventoryImport = mongoose.model(
	"InventoryImport",
	inventoryImportSchema
);

module.exports = InventoryImport;
