const MenuHistory = require("../models/menuHistory.model");
const Product = require("../models/product.model");
const ControllerFactory = require("./controller.factory");

exports.getAllMenuHistory = ControllerFactory.getAll(MenuHistory, {
	populate: {
		path: "menuItems.productId",
		select: "name image",
	},
});
exports.getMenuHistory = ControllerFactory.getOne(MenuHistory, {
	populate: {
		path: "menuItems.productId",
		select: "name image",
	},
});
exports.createMenuHistory = ControllerFactory.createOne(MenuHistory);
exports.updateMenuHistory = ControllerFactory.updateOne(MenuHistory);
exports.deleteMenuHistory = ControllerFactory.deleteOne(MenuHistory);
