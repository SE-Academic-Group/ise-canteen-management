const AppError = require("./appError");

module.exports = function (statisticType, dateFieldName) {
	let dateField;

	switch (statisticType) {
		case "day":
			dateField = {
				$dateToString: { format: "%Y-%m-%d", date: `$${dateFieldName}` },
			};
			break;
		case "month":
			dateField = {
				$dateToString: { format: "%Y-%m", date: `$${dateFieldName}` },
			};
			break;
		case "year":
			dateField = {
				$dateToString: { format: "%Y", date: `$${dateFieldName}` },
			};
			break;
		default:
			throw new AppError(
				400,
				"INVALID_ARGUMENTS",
				"Không hỗ trợ thống kê theo thời gian này"
			);
	}

	return dateField;
};
