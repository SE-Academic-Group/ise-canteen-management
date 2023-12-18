const InventoryImport = require("../models/inventoryImport.model");
const InventoryExport = require("../models/inventoryExport.model");
const InventoryItem = require("../models/inventoryItem.model");
const MenuHistory = require("../models/menuHistory.model");
const Payment = require("../models/payment.model");
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

	res.status(200).json({
		status: "success",
		data: saleStats,
	});
};
