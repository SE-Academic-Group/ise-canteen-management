const mongoose = require("mongoose");

const inventoryExportSchema = new mongoose.Schema(
	{
		exportDate: {
			type: Date,
			default: Date.now(),
			required: true,
		},
		exportItems: [
			{
				inventoryItemId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "InventoryItem",
					required: [true, "Mã sản phẩm không được để trống"],
				},
				quantity: {
					type: Number,
					min: [0, "Số lượng sản phẩm không hợp lệ"],
					required: [true, ["Số lượng sản phẩm không được để trống"]],
				},
				remainQuantity: {
					type: Number,
					min: [0, "Số lượng sản phẩm không hợp lệ"],
					default: function () {
						return this.quantity;
					},
				},
			},
		],
	},
	{
		toJSON: { virtuals: true, versionKey: false },
	}
);

const InventoryExport = mongoose.model(
	"InventoryExport",
	inventoryExportSchema
);

module.exports = InventoryExport;
