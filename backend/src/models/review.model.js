const mongoose = require("mongoose");
const Product = require("./product.model");

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

reviewSchema.pre("save", function (next) {
	if (!this.isNew) {
		this.updatedAt = Date.now();
	}

	next();
});

reviewSchema.statics.calcRatingAverage = async function (productId) {
	const stats = await this.aggregate([
		{
			$match: { productId },
		},
		{
			$group: {
				_id: "$productId",
				ratingAverage: { $avg: "$rating" },
			},
		},
	]);

	console.log(stats);

	if (stats.length > 0) {
		await Product.findByIdAndUpdate(productId, {
			ratingAverage: stats[0].ratingAverage,
		});
	}
};

reviewSchema.post("save", async function (doc, next) {
	console.log("post save");
	await doc.constructor.calcRatingAverage(doc.productId);
	next();
});

reviewSchema.post(/^findOneAnd/, async function (doc, next) {
	await doc.constructor.calcRatingAverage(doc.productId);
	next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
