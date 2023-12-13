const express = require("express");
const reviewController = require("../controllers/review.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router({ mergeParams: true });

router.get("/", reviewController.getAllReviews);
router.get("/:id", reviewController.getReview);

router.use(authController.protect);

router.post(
	"/",
	reviewController.setProductAndUserOnBody,
	reviewController.createReview
);
router.patch("/:id", reviewController.updateReview);
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
