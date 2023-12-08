const Review = require("../models/review.model");
const ControllerFactory = require("./controller.factory");
const ApiFeatures = require("../utils/apiFeatures");

exports.getAllReviews = ControllerFactory.getAll(Review, {
	populate: [
		{ path: "productId", select: "name" },
		{ path: "userId", select: "name email" },
	],
});
exports.getReview = ControllerFactory.getOne(Review);
exports.createReview = ControllerFactory.createOne(Review);
exports.updateReview = ControllerFactory.updateOne(Review);
exports.deleteReview = ControllerFactory.deleteOne(Review);

exports.setProductAndUserOnBody = (req, res, next) => {
	if (!req.body.productId) req.body.productId = req.params.productId;
	if (!req.body.userId) req.body.userId = req.user?.id;

	return next();
};

exports.setProductOnQuery = (req, res, next) => {
	if (!req.query.productId) req.query.productId = req.params.productId;

	return next();
};
