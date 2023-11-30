const Review = require("../models/review.model");
const ControllerFactory = require("./controller.factory");
const ApiFeatures = require("../utils/apiFeatures");

exports.getAllReviews = ControllerFactory.getAll(Review);
exports.getReview = ControllerFactory.getOne(Review);
exports.createReview = async (req, res, next) => create(Review);
exports.updateReview = ControllerFactory.updateOne(Review);
exports.deleteReview = ControllerFactory.deleteOne(Review);

exports.setProductAndUserIds = (req, res, next) => {
	// Allow nested routes
	if (!req.body.product) req.body.product = req.params.productId;
	if (!req.body.user) req.body.user = req.user.id;

	next();
};
