const express = require("express");
const paymentController = require("../controllers/payment.controller");

const router = express.Router({ mergeParams: true });

router.get("/", paymentController.getAllPayments);
router.get("/:id", paymentController.getPayment);

module.exports = router;
