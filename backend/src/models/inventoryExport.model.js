const mongoose = require("mongoose");
const InventoryItem = require("./inventoryItem.model");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const inventoryExportSchema = new mongoose.Schema(
	{
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
					required: [true, "Mã sản phẩm không được để trống"],
				},
				quantity: {
					type: Number,
					min: [0, "Số lượng sản phẩm không hợp lệ"],
					required: [true, ["Số lượng sản phẩm không được để trống"]],
				},
				remainQuantity: {
					type: Number,
					min: [0, "Số lượng sản phẩm không hợp lệ"],
					default: function () {
						return this.quantity;
					},
				},
				price: {
					type: Number,
					min: [0, "Giá sản phẩm không hợp lệ"],
				},
			},
		],
	},
	{
		toJSON: { virtuals: true, versionKey: false },
	}
);

inventoryExportSchema.pre("save", async function (next) {
	const promises = this.exportItems.map(async (item) => {
		if (!item.price) {
			const inventoryItem = await InventoryItem.findById(item.inventoryItemId);
			item.price = inventoryItem?.price;
		}
	});

	// Wait for all promises to resolve before calling next()
	await Promise.all(promises);
	next();
});

inventoryExportSchema.statics.generateExportReport = async function (
	startDate,
	endDate,
	statisticType
) {
	let dateField;

	switch (statisticType) {
		case "day":
			dateField = {
				$dateToString: { format: "%Y-%m-%d", date: "$exportDate" },
			};
			break;

		case "month":
			dateField = {
				$dateToString: { format: "%Y-%m", date: "$exportDate" },
			};
			break;

		case "year":
			dateField = {
				$dateToString: { format: "%Y", date: "$exportDate" },
			};
			break;
	}

	const exportStatistics = await InventoryExport.aggregate([
		{
			$match: {
				exportDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
			},
		},
		{
			$addFields: {
				date: dateField,
			},
		},
		{
			$unwind: "$exportItems",
		},
		{
			$group: {
				_id: { date: "$date", itemId: "$exportItems.inventoryItemId" },
				totalQuantity: { $sum: "$exportItems.quantity" },
				remainQuantity: { $sum: "$exportItems.remainQuantity" },
				totalValue: {
					$sum: {
						$multiply: ["$exportItems.quantity", "$exportItems.price"],
					},
				},
				usedQuantity: {
					$sum: {
						$subtract: ["$exportItems.quantity", "$exportItems.remainQuantity"],
					},
				},
			},
		},
		{
			$group: {
				_id: "$_id.date",
				totalQuantity: { $sum: "$totalQuantity" },
				totalValue: { $sum: "$totalValue" },
				remainQuantity: { $sum: "$remainQuantity" },
				avgUsedPercent: {
					$avg: {
						$multiply: [
							{
								$divide: ["$usedQuantity", "$totalQuantity"],
							},
							100,
						],
					},
				},
				items: {
					$push: {
						inventoryItemId: "$_id.itemId",
						quantity: "$totalQuantity",
						remainQuantity: "$remainQuantity",
						totalValue: "$totalValue",
						usedPercent: {
							$multiply: [
								{
									$divide: ["$usedQuantity", "$totalQuantity"],
								},
								100,
							],
						},
					},
				},
			},
		},
		{
			$project: {
				_id: 0,
				date: "$_id",
				totalQuantity: 1,
				totalValue: 1,
				remainQuantity: 1,
				avgUsedPercent: 1,
				items: 1,
			},
		},
		{
			$sort: { date: 1 },
		},
	]);

	return exportStatistics;
};

inventoryExportSchema.plugin(mongooseLeanVirtuals);

const InventoryExport = mongoose.model(
	"InventoryExport",
	inventoryExportSchema
);

module.exports = InventoryExport;
