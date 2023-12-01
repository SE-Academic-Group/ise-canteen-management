const Product = require("../models/product.model");
const ControllerFactory = require("./controller.factory");

exports.createProduct = ControllerFactory.createOne(Product);
exports.getAllProducts = ControllerFactory.getAll(Product);
exports.getProduct = ControllerFactory.getOne(Product);
exports.updateProduct = ControllerFactory.updateOne(Product);
exports.deleteProduct = ControllerFactory.deleteOne(Product);
