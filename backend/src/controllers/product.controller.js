const slugify = require("slugify");

const Product = require("../models/product.model");
const ControllerFactory = require("./controller.factory");
const multerUpload = require("../utils/multerUpload");
const sharp = require("sharp");

// Controllers for product's images upload
exports.setImagePath = (req, res, next) => {
	if (!req.file) return next();

	req.body.image = req.file.filename;

	return next();
};
exports.uploadProductImage = multerUpload.upload.single("image");
exports.resizeProductImage = async (req, res, next) => {
	if (!req.file) return next();

	req.file.filename = `/images/products/product-${
		req.params.id || slugify(req.body.name, { locale: "vi", lower: true })
	}-${Date.now()}.jpeg`;

	const writtenFilePath = `${__dirname}/../public${req.file.filename}`;

	await sharp(req.file.buffer)
		.resize(500, 500)
		.toFormat("jpeg")
		.jpeg({ quality: 90 })
		.toFile(writtenFilePath);

	return next();
};

exports.searchProducts = async (req, res, next) => {
	const { query } = req.query;

	const products = await Product.find({ $text: { $search: query } });

	res.status(200).json({
		status: "success",
		results: products.length,
		data: {
			products,
		},
	});
};

exports.createProduct = ControllerFactory.createOne(Product);
exports.getAllProducts = ControllerFactory.getAll(Product);
exports.getProduct = ControllerFactory.getOne(Product);
exports.updateProduct = ControllerFactory.updateOne(Product);
exports.deleteProduct = ControllerFactory.deleteOne(Product);
