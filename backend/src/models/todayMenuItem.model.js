const mongoose = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const todayMenuItemSchema = new mongoose.Schema(
	{
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
			default: function () {
				return this.quantity;
			},
		},
		description: {
			type: String,
		},
		ratingAverage: {
			type: Number,
		},
	},
	{
		toJSON: { virtuals: true, versionKey: false },
	}
);

todayMenuItemSchema.index({ productId: 1 }, { unique: true });
todayMenuItemSchema.plugin(mongooseLeanVirtuals);

const TodayMenuItem = mongoose.model("TodayMenuItem", todayMenuItemSchema);

module.exports = TodayMenuItem;
