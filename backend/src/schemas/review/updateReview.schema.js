const createReviewSchema = require("../schemas/review/createReview.schema");

const updateReviewSchema = createReviewSchema
	.omit({
		body: ["userId", "productId"],
	})
	.partial({
		body: ["rating", "review"],
	});
