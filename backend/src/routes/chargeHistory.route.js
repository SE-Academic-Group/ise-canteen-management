const express = require("express");
const authController = require("../controllers/auth.controller");
const chargeHistoryController = require("../controllers/chargeHistory.controller");
const vnpayController = require("../controllers/vnpay.controller");

const router = express.Router({ mergeParams: true });

router.get("/vnpay-return", vnpayController.vnpayReturn);

router.use(authController.protect);

router.get("/", chargeHistoryController.getAllChargeHistories);
router.post(
	"/",
	chargeHistoryController.createChargeHistory,
	vnpayController.createVNPAYCharge
);

module.exports = router;
