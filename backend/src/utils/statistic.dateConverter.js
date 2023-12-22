module.exports = function (startDate, endDate, type) {
	if (!type) type = "today";

	switch (type) {
		case "today":
			type = "day";
			startDate = new Date();
			endDate = new Date();

			startDate.setHours(0, 0, 0, 0);
			endDate.setHours(23, 59, 59, 999);
			break;

		case "dateRange":
			type = "day";
			startDate = new Date(startDate);
			endDate = new Date(endDate);
			break;

		case "week":
			// startDate: 7 days ago
			// endDate: today
			type = "day";
			startDate = new Date();
			endDate = new Date();

			startDate.setDate(startDate.getDate() - 6);
			break;

		case "month":
			// startDate: 30 days ago
			// endDate: today
			type = "day";
			startDate = new Date();
			endDate = new Date();

			startDate.setDate(startDate.getDate() - 30);
			break;

		case "year":
			type = "month";
			startDate = new Date();
			endDate = new Date();

			// startDate: 12 months ago
			// endDate: today
			startDate.setMonth(startDate.getMonth() - 11);

			break;
	}

	return { startDate, endDate, type };
};
