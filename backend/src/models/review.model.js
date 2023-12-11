const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Đánh giá phải có người dùng"],
		},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: [true, "Đánh giá phải có sản phẩm"],
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
			required: [true, "Đánh giá phải có rating"],
		},
		review: {
			type: String,
			required: [true, "Đánh giá phải có nội dung"],
		},
		createdAt: {
			type: Date,
			default: Date.now(),
			required: true,
		},
		updatedAt: Date,
	},
	{
		toJSON: { virtuals: true, versionKey: false },
	}
);

reviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
