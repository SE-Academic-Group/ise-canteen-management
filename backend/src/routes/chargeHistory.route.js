const express = require("express");
const authController = require("../controllers/auth.controller");
const chargeHistoryController = require("../controllers/chargeHistory.controller");
const vnpayController = require("../controllers/vnpay.controller");
const validateRequest = require("../middlewares/validateRequest");
const createChargeHistorySchema = require("../schemas/chargeHistory/createChargeHistory.schema");

const router = express.Router({ mergeParams: true });

router.get("/vnpay-return", vnpayController.vnpayReturn);

router.use(authController.protect);

router.get("/", chargeHistoryController.getAllChargeHistories);
router.post(
	"/",
	validateRequest(createChargeHistorySchema),
	chargeHistoryController.createChargeHistory,
	vnpayController.createVNPAYCharge
);

module.exports = router;
