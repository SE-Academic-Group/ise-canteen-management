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

inventoryImportSchema.pre("save", async function (next) {
	const promises = this.importItems.map(async (item) => {
		if (!item.price) {
			const inventoryItem = await InventoryItem.findById(item.inventoryItemId);
			console.log(inventoryItem);
			item.price = inventoryItem?.price;
		}
	});

	// Wait for all promises to resolve before calling next()
	await Promise.all(promises);
	next();
});

// Static method to generate the report statistics of inventory import
inventoryImportSchema.statics.generateImportReport = async function (
	startDate,
	endDate
) {
	const stats = await this.aggregate([
		{
			$match: {
				importDate: {
					$gte: startDate,
					$lte: endDate,
				},
			},
		},
		{
			$unwind: "$importItems",
		},
		{
			$lookup: {
				from: "inventoryitems",
				localField: "importItems.inventoryItemId",
				foreignField: "_id",
				as: "inventoryItem",
			},
		},
		{
			$unwind: "$inventoryItem",
		},
		{
			$group: {
				_id: "$inventoryItem.name",
				totalImport: { $sum: "$importItems.quantity" },
				totalCost: {
					$sum: { $multiply: ["$importItems.price", "$importItems.quantity"] },
				},
			},
		},
	]);
};

const InventoryImport = mongoose.model(
	"InventoryImport",
	inventoryImportSchema
);

module.exports = InventoryImport;
