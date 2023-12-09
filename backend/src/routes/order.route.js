const express = require("express");
const orderController = require("../controllers/order.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrder);
router.post("/", orderController.setUserIds, orderController.createOrder);
router.patch("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
