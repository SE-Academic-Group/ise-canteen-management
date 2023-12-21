const slugify = require("slugify");
const mongoose = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Hãy nhập tên sản phẩm"],
			unique: true,
		},
		price: {
			type: Number,
			required: [true, "Hãy nhập giá sản phẩm"],
		},
		category: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			default: 0,
		},
		description: String,
		ratingAverage: {
			type: Number,
		},
	},
	{
		toJSON: { virtuals: true, versionKey: false },
	}
);

productSchema.index({ name: 1 });
productSchema.plugin(mongooseLeanVirtuals);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
