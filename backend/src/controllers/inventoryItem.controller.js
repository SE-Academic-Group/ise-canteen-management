const InventoryItem = require("../models/inventoryItem.model");
const ControllerFactory = require("./controller.factory");

exports.getAllInventoryItems = ControllerFactory.getAll(InventoryItem);
exports.getInventoryItem = ControllerFactory.getOne(InventoryItem);
exports.createInventoryItem = ControllerFactory.createOne(InventoryItem);
exports.updateInventoryItem = ControllerFactory.updateOne(InventoryItem);
exports.deleteInventoryItem = ControllerFactory.deleteOne(InventoryItem);
