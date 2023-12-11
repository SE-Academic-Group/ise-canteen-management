const express = require("express");
const reviewController = require("../controllers/review.controller");

const router = express.Router({ mergeParams: true });

router.get("/", reviewController.getAllReviews);
router.get("/:id", reviewController.getReview);
router.post(
	"/",
	reviewController.setProductAndUserOnBody,
	reviewController.createReview
);
router.patch("/:id", reviewController.updateReview);
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
