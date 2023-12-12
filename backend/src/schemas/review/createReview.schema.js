const zod = require("zod");
const mongoose = require("mongoose");

const createReviewSchema = zod.object({
	body: zod
		.object({
			userId: zod
				.string({
					message: "Phải có id người dùng",
				})
				.superRefine((val, ctx) => {
					if (!mongoose.isValidObjectId(val)) {
						ctx.addIssue({
							code: zod.ZodIssueCode.invalid_arguments,
							message: `${val} không phải là ID người dùng hợp lệ`,
						});
					}
				}),
			productId: zod
				.string({
					message: "Phải có id sản phẩm",
				})
				.superRefine((val, ctx) => {
					if (!mongoose.isValidObjectId(val)) {
						ctx.addIssue({
							code: zod.ZodIssueCode.invalid_arguments,
							message: `${val} không phải là ID sản phẩm hợp lệ`,
						});
					}
				}),
			rating: zod
				.number({
					message: "Phải có rating là số",
				})
				.min(1, {
					message: "Rating phải lớn hơn 1",
				})
				.max(5, {
					message: "Rating phải nhỏ hơn 5",
				}),

			review: zod.string().optional(),
			createdAt: zod.date().optional(),
			updatedAt: zod.date().optional(),
		})
		.strict(),
});

module.exports = createReviewSchema;
