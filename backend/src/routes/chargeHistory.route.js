const express = require("express");
const chargeHistoryController = require("../controllers/chargeHistory.controller");

const router = express.Router({ mergeParams: true });

module.exports = router;
