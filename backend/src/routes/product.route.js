const express = require("express");
const productController = require("../controllers/product.controller");
const reviewRouter = require("./review.route");
const authController = require("../controllers/auth.controller");
const {
	validateRequest,
	validateRequestId,
} = require("../middlewares/validateRequest");

const router = express.Router();

// Reviews belong to a product
router.use("/:productId/reviews", validateRequestId("productId"), reviewRouter);

router.get("/", productController.getAllProducts);
router.get("/:id", validateRequestId("id"), productController.getProduct);

router.use(authController.protect, authController.restrictTo("admin", "staff"));
router.post(
	"/",
	productController.uploadProductImage,
	productController.resizeProductImage,
	productController.setImagePath,
	productController.createProduct
);
router.patch(
	"/:id",
	validateRequestId("id"),
	productController.uploadProductImage,
	productController.resizeProductImage,
	productController.setImagePath,
	productController.updateProduct
);
router.delete("/:id", validateRequestId("id"), productController.deleteProduct);

module.exports = router;
