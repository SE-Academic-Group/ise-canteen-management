const slugify = require("slugify");

const Product = require("../models/product.model");
const ControllerFactory = require("./controller.factory");
const multerUpload = require("../utils/multerUpload");

// Controllers for product's images upload
exports.uploadProductImage = multerUpload.upload.single("image");
exports.resizeProductImage = async (req, res, next) => {
	if (!req.file) return next();

	req.file.filename = `product-${
		req.params.id || slugify(req.body.name, { locale: "vi", lower: true })
	}-${Date.now()}.jpeg`;

	await sharp(req.file.buffer)
		.resize(500, 500)
		.toFormat("jpeg")
		.jpeg({ quality: 90 })
		.toFile(`public/images/products/${req.file.filename}`);

	return next();
};

exports.createProduct = ControllerFactory.createOne(Product);
exports.getAllProducts = ControllerFactory.getAll(Product);
exports.getProduct = ControllerFactory.getOne(Product);
exports.updateProduct = ControllerFactory.updateOne(Product);
exports.deleteProduct = ControllerFactory.deleteOne(Product);
