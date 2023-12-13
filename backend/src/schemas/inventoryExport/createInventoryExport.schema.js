const zod = require("zod");

const createInventoryExportSchema = zod.object({
	body: zod.array(
		zod.object({
			inventoryItemId: zod.string({
				required_error: "Mã sản phẩm không được để trống",
			}),
			quantity: zod
				.number({
					required_error: "Số lượng sản phẩm không được để trống",
				})
				.min(0),
			price: zod.number().min(0).optional(),
		})
	),
});

module.exports = createInventoryExportSchema;
