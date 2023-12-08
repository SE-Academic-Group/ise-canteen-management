const express = require("express");
const productController = require("../controllers/product.controller");
const reviewRouter = require("./review.route");

const router = express.Router();

// Reviews belong to a product
router.use("/:productId/reviews", reviewRouter);

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProduct);
router.post(
	"/",
	productController.uploadProductImage,
	productController.resizeProductImage,
	productController.setImagePath,
	productController.createProduct
);
router.patch(
	"/:id",
	productController.uploadProductImage,
	productController.resizeProductImage,
	productController.setImagePath,
	productController.updateProduct
);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
