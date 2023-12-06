const express = require("express");
const authController = require("../controllers/auth.controller");
const chargeHistoryController = require("../controllers/chargeHistory.controller");

const router = express.Router({ mergeParams: true });

// router.use(authController.protect);

router.get("/", chargeHistoryController.getAllChargeHistories);
router.post("/", chargeHistoryController.createChargeHistory);

module.exports = router;
