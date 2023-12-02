const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.createOne = (Model) => async (req, res, next) => {
	const newDoc = await Model.create(req.body);

	res.status(201).json({
		status: "success",
		data: newDoc,
	});
};

exports.getAll = (Model) => async (req, res, next) => {
	let filter = {};

	// Allow nested routes
	if (req.params.userId) filter.userId = req.params.userId;
	if (req.params.productId) filter.productId = req.params.productId;

	// Allow filtering by today's date
	// Loops through query string, find any key that has a value of "today"
	// and add a filter to the filter object
	Object.keys(req.query).forEach((key) => {
		if (req.query[key] === "today") {
			// Filter orders by today's date
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			const tomorrow = new Date(today);
			tomorrow.setDate(tomorrow.getDate() + 1);
			filter[key] = {
				$gte: today,
				$lt: tomorrow,
			};

			// Delete the key from the query string
			delete req.query[key];
		}
	});

	// If req.query contains "search", implement full text search
	if (req.query.search) {
		// Replace %20 with space
		req.query.search = req.query.search.replace(/%20/g, " ");
		filter.name = { $regex: new RegExp(req.query.search, "i") };
	}

	// EXECUTE QUERY
	const features = new APIFeatures(Model.find(filter), req.query)
		.filter()
		.sort()
		.limitFields()
		.paginate();
	const docs = await features.query;
	// If want to return query statistics:
	// const docs = await features.query.explain();

	// SEND RESPONSE
	res.status(200).json({
		status: "success",
		result: docs.length,
		data: docs,
	});
};

exports.getOne = (Model, options) => async (req, res, next) => {
	let query = Model.findById(req.params.id);
	const doc = await query;

	if (!doc) {
		throw new AppError(`No document found with ID ${req.params.id}`, 404);
	}

	res.status(200).json({
		status: "success",
		data: doc,
	});
};

exports.updateOne = (Model) => async (req, res, next) => {
	const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!doc) {
		throw new AppError(`No document found with ID ${req.params.id}`, 404);
	}

	res.status(200).json({
		status: "success",
		data: doc,
	});
};

exports.deleteOne = (Model) => async (req, res, next) => {
	const doc = await Model.findByIdAndDelete(req.params.id);

	if (!doc) {
		throw new AppError(`No document found with ID ${req.params.id}`, 404);
	}

	res.status(204).json({
		status: "success",
		data: null,
	});
};
