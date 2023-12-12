const mongoose = require("mongoose");
const InventoryItem = require("./inventoryItem.model");

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

inventoryImportSchema.pre("save", function (next) {
	this.importItems.forEach((item) => {
		if (!item.price) {
			InventoryItem.findById(item.inventoryItemId).then((inventoryItem) => {
				item.price = inventoryItem.price;
			});
		}
	});
	next();
});

const InventoryImport = mongoose.model(
	"InventoryImport",
	inventoryImportSchema
);

module.exports = InventoryImport;
