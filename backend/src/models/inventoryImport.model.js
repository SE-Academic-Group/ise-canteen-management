const mongoose = require("mongoose");
const InventoryItem = require("./inventoryItem.model");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
const statisticTypeToDateFieldConverter = require("../utils/statistic.typeToDateField.converter");
const statisticAddMissingDates = require("../utils/statistic.addMissingDates");

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

inventoryImportSchema.pre("save", async function (next) {
	const promises = this.importItems.map(async (item) => {
		if (!item.price) {
			const inventoryItem = await InventoryItem.findById(item.inventoryItemId);
			item.price = inventoryItem?.price;
		}
	});

	// Wait for all promises to resolve before calling next()
	await Promise.all(promises);
	next();
});

// Static method to generate the report statistics of inventory import
inventoryImportSchema.statics.generateImportReport = async (
	startDate,
	endDate,
	statisticType
) => {
	let dateField = statisticTypeToDateFieldConverter(
		statisticType,
		"importDate"
	);

	const importStatistics = await InventoryImport.aggregate([
		{
			$match: {
				importDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
			},
		},
		{
			$addFields: {
				date: dateField,
			},
		},
		{
			$unwind: "$importItems",
		},
		{
			$group: {
				_id: { date: "$date", itemId: "$importItems.inventoryItemId" },
				totalQuantity: { $sum: "$importItems.quantity" },
				totalValue: {
					$sum: {
						$multiply: ["$importItems.quantity", "$importItems.price"],
					},
				},
			},
		},
		{
			$group: {
				_id: "$_id.date",
				items: {
					$push: {
						inventoryItemId: "$_id.itemId",
						quantity: "$totalQuantity",
						totalValue: "$totalValue",
					},
				},
				totalQuantity: { $sum: "$totalQuantity" },
				totalValue: { $sum: "$totalValue" },
			},
		},
		{
			$project: {
				_id: 0,
				date: "$_id",
				totalQuantity: 1,
				totalValue: 1,
				items: 1,
			},
		},
		{
			$sort: { date: 1 },
		},
	]);

	const keys = ["totalQuantity", "totalValue"];
	const importStatisticsWithMissingDates = statisticAddMissingDates(
		importStatistics,
		startDate,
		endDate,
		statisticType,
		keys
	);

	return importStatisticsWithMissingDates;
};

inventoryImportSchema.plugin(mongooseLeanVirtuals);

const InventoryImport = mongoose.model(
	"InventoryImport",
	inventoryImportSchema
);

module.exports = InventoryImport;
