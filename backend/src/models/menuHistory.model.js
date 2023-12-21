const mongoose = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
const statisticTypeToDateFieldConverter = require("../utils/statistic.typeToDateField.converter");

const menuHistorySchema = new mongoose.Schema(
	{
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
	},
	{
		toJSON: { virtuals: true, versionKey: false },
	}
);

menuHistorySchema.statics.generateMenuReport = async function (
	startDate,
	endDate,
	statisticType
) {
	let dateField;

	switch (statisticType) {
		case "day":
			dateField = {
				$dateToString: { format: "%Y-%m-%d", date: "$menuDate" },
			};
			break;
		case "month":
			dateField = {
				$dateToString: { format: "%Y-%m", date: "$menuDate" },
			};
			break;
		case "year":
			dateField = {
				$dateToString: { format: "%Y", date: "$menuDate" },
			};
			break;
		default:
			throw new AppError(
				"Không hỗ trợ thống kê theo kiểu này",
				400,
				"INVALID_ARGUMENTS"
			);
	}

	const menuStatistics = await MenuHistory.aggregate([
		{
			$match: {
				menuDate: {
					$gte: startDate,
					$lte: endDate,
				},
			},
		},
		{
			$unwind: "$menuItems",
		},
		{
			$group: {
				_id: {
					date: dateField,
					productId: "$menuItems.productId",
				},
				totalQuantity: { $sum: "$menuItems.totalQuantity" },
				totalPrice: {
					$sum: { $multiply: ["$menuItems.price", "$menuItems.totalQuantity"] },
				},
			},
		},
		{
			$group: {
				_id: "$_id.date",
				menuStats: {
					$push: {
						productId: "$_id.productId",
						totalQuantity: "$totalQuantity",
						totalPrice: "$totalPrice",
					},
				},
			},
		},
		{
			$project: {
				_id: 0,
				date: "$_id",
				menuStats: 1,
			},
		},
	]);

	return menuStats;
};

menuHistorySchema.statics.generateSaleReport = async function (
	startDate,
	endDate,
	statisticType
) {
	let dateField = statisticTypeToDateFieldConverter(statisticType, "menuDate");

	const saleStatistics = await MenuHistory.aggregate([
		{
			$match: {
				menuDate: {
					$gte: startDate,
					$lte: endDate,
				},
			},
		},
		{
			$unwind: "$menuItems",
		},
		{
			$group: {
				_id: {
					date: dateField,
					productId: "$menuItems.productId",
				},
				totalQuantity: { $sum: "$menuItems.totalQuantity" },
				totalPrice: {
					$sum: {
						$multiply: ["$menuItems.price", "$menuItems.totalQuantity"],
					},
				},
				soldQuantity: {
					$sum: {
						$subtract: [
							"$menuItems.totalQuantity",
							"$menuItems.remainQuantity",
						],
					},
				},
				soldPrice: {
					$sum: {
						$multiply: [
							"$menuItems.price",
							{
								$subtract: [
									"$menuItems.totalQuantity",
									"$menuItems.remainQuantity",
								],
							},
						],
					},
				},
			},
		},
		{
			$group: {
				_id: "$_id.date",
				items: {
					$push: {
						productId: "$_id.productId",
						totalQuantity: "$totalQuantity",
						totalPrice: "$totalPrice",
						soldQuantity: "$soldQuantity",
						soldPrice: "$soldPrice",
						soldPercent: {
							$multiply: [
								{
									$divide: ["$soldQuantity", "$totalQuantity"],
								},
								100,
							],
						},
					},
				},
				totalQuantity: { $sum: "$totalQuantity" },
				totalPrice: { $sum: "$totalPrice" },
				totalSoldQuantity: { $sum: "$soldQuantity" },
				totalSoldPrice: { $sum: "$soldPrice" },
				avgSoldPercent: {
					$avg: {
						$multiply: [
							{
								$divide: ["$soldQuantity", "$totalQuantity"],
							},
							100,
						],
					},
				},
			},
		},
		{
			$project: {
				_id: 0,
				date: "$_id",
				items: 1,
				totalQuantity: 1,
				totalPrice: 1,
				totalSoldPrice: 1,
				totalSoldQuantity: 1,
				avgSoldPercent: 1,
			},
		},
		{
			$sort: { date: 1 },
		},
	]);

	return saleStatistics;
};

menuHistorySchema.plugin(mongooseLeanVirtuals);

const MenuHistory = mongoose.model("MenuHistory", menuHistorySchema);

module.exports = MenuHistory;
