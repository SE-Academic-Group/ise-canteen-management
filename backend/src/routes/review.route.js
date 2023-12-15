const express = require("express");
const reviewController = require("../controllers/review.controller");
const authController = require("../controllers/auth.controller");
const {
	validateRequest,
	validateRequestId,
} = require("../middlewares/validateRequest");
const createReviewSchema = require("../schemas/review/createReview.schema");

const router = express.Router({ mergeParams: true });

router.get("/", reviewController.getAllReviews);
router.get("/:id", validateRequestId("id"), reviewController.getReview);

router.use(authController.protect);

router.post(
	"/",
	reviewController.setProductAndUserOnBody,
	validateRequest(createReviewSchema),
	reviewController.createReview
);
router.patch(
	"/:id",
	validateRequestId("id"),
	reviewController.checkReviewBelongsToUser,
	reviewController.updateReview
);
router.delete(
	"/:id",
	validateRequestId("id"),
	reviewController.checkReviewBelongsToUser,
	reviewController.deleteReview
);

module.exports = router;
