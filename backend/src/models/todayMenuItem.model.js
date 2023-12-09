const mongoose = require("mongoose");

const todayMenuItemSchema = new mongoose.Schema({
	productId: {
		type: mongoose.Schema.ObjectId,
		ref: "Product",
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	totalQuantity: {
		type: Number,
	},
	description: {
		type: String,
	},
	ratingAverage: {
		type: Number,
	},
});

todayMenuItemSchema.index({ productId: 1 }, { unique: true });

const TodayMenuItem = mongoose.model("TodayMenuItem", todayMenuItemSchema);

module.exports = TodayMenuItem;
