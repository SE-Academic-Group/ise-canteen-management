const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
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
	},
	description: String,
	ratingAverage: {
		type: Number,
	},
});

productSchema.index({ name: 1 });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
