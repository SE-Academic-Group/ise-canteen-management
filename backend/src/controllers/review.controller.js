const Review = require("../models/review.model");
const ControllerFactory = require("./controller.factory");
const ApiFeatures = require("../utils/apiFeatures");

exports.getAllReviews = ControllerFactory.getAll(Review, {
	populate: [
		{ path: "productId", select: "name" },
		{ path: "userId", select: "name email" },
	],
	allowNestedQueries: ["productId", "userId"],
});
exports.getReview = ControllerFactory.getOne(Review, {
	populate: [
		{ path: "productId", select: "name" },
		{ path: "userId", select: "name email" },
	],
});
exports.createReview = ControllerFactory.createOne(Review);
exports.updateReview = ControllerFactory.updateOne(Review);
exports.deleteReview = ControllerFactory.deleteOne(Review);

// Middleware to check if the review belongs to the user
exports.checkReviewBelongsToUser = async (req, res, next) => {
	if (req.user?.role === "admin" || req.user?.role === "cashier") return next();

	const review = await Review.findById(req.params.id);

	if (!review) {
		throw new AppError(
			404,
			"NOT_FOUND",
			`Không tìm thấy đánh giá với ID ${req.params.id}.`,
			{
				id: req.params.id,
			}
		);
	}

	if (review.userId.toString() !== req.user?.id) {
		throw new AppError(
			403,
			"FORBIDDEN",
			"Bạn không được chỉnh sửa hay xoá đánh giá của người khác",
			{
				reviewId: review.id,
				userId: req.user?.id,
			}
		);
	}

	return next();
};

exports.setProductAndUserOnBody = (req, res, next) => {
	if (!req.body.productId) req.body.productId = req.params.productId;
	if (!req.body.userId) req.body.userId = req.user?.id;

	return next();
};
