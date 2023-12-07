const zod = require("zod");

module.exports = zod.object({
	body: zod.object({
		chargeAmount: zod
			.number({
				required_error: "Phải nhập số tiền nạp",
				message: "Số tiền nạp không hợp lệ",
			})
			.min(10000, {
				message: "Số tiền nạp tối thiểu là 10.000đ",
			}),
		email: zod
			.string()
			.email({
				message: "Email không hợp lệ",
			})
			.optional(),
	}),
});
