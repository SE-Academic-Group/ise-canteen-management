const InventoryImport = require("../models/inventoryImport.model");
const InventoryExport = require("../models/inventoryExport.model");
const InventoryItem = require("../models/inventoryItem.model");
const MenuHistory = require("../models/menuHistory.model");
const Payment = require("../models/payment.model");
const Product = require("../models/product.model");
const ChargeHistory = require("../models/chargeHistory.model");
const statisticDateConverter = require("../utils/statistic.dateConverter");

exports.importStatistic = async (req, res, next) => {
	let { type, startDate, endDate } = req.query;

	// Convert startDate, endDate to Date object
	// and type to statisticType
	const converted = statisticDateConverter(startDate, endDate, type);
	startDate = converted.startDate;
	endDate = converted.endDate;
	type = converted.type;

	const importStats = await InventoryImport.generateImportReport(
		startDate,
		endDate,
		type
	);

	// Populate inventoryItem name
	await InventoryItem.populate(importStats, {
		path: "items.inventoryItemId",
		select: "name category",
	});

	res.status(200).json({
		status: "success",
		data: importStats,
	});
};

exports.exportStatistic = async (req, res, next) => {
	let { type, startDate, endDate } = req.query;

	// Convert startDate, endDate to Date object
	// and type to statisticType
	const converted = statisticDateConverter(startDate, endDate, type);
	startDate = converted.startDate;
	endDate = converted.endDate;
	type = converted.type;

	const exportStats = await InventoryExport.generateExportReport(
		startDate,
		endDate,
		type
	);

	await InventoryItem.populate(exportStats, {
		path: "items.inventoryItemId",
		select: "name category",
	});

	res.status(200).json({
		status: "success",
		data: exportStats,
	});
};

exports.saleStatistic = async (req, res, next) => {
	let { type, startDate, endDate } = req.query;

	// Convert startDate, endDate to Date object
	// and type to statisticType
	const converted = statisticDateConverter(startDate, endDate, type);
	startDate = converted.startDate;
	endDate = converted.endDate;
	type = converted.type;

	const saleStats = await MenuHistory.generateSaleReport(
		startDate,
		endDate,
		type
	);

	await Product.populate(saleStats, {
		path: "items.productId",
		select: "name category",
	});

	saleStats.forEach((stat) => {
		stat.items?.forEach((item) => {
			if (item.productId?.category === "food") {
				// For "food" items, set and calculate totalPriceLoss
				item.totalPriceLoss = item.totalPrice - item.soldPrice;
			} else {
				item.totalPriceLoss = 0;
			}
		});
	});

	res.status(200).json({
		status: "success",
		data: saleStats,
	});
};

exports.revenueStatistic = async (req, res, next) => {
	let { type, startDate, endDate } = req.query;

	// Convert startDate, endDate to Date object
	// and type to statisticType
	const converted = statisticDateConverter(startDate, endDate, type);
	startDate = converted.startDate;
	endDate = converted.endDate;
	type = converted.type;

	const revenueStats = await Payment.generateRevenueReport(
		startDate,
		endDate,
		type
	);

	const importStats = await InventoryImport.generateImportReport(
		startDate,
		endDate,
		type
	);

	// Calculate profit = revenue - import value
	revenueStats.forEach((stat) => {
		const importStat = importStats.find((item) => item.date === stat.date);
		if (importStat) {
			stat.totalImportValue = importStat.totalValue;
			stat.totalProfit = stat.totalRevenue - importStat.totalValue;
		} else {
			stat.totalImportValue = 0;
			stat.totalProfit = stat.totalRevenue;
		}
	});

	res.status(200).json({
		status: "success",
		data: revenueStats,
	});
};
