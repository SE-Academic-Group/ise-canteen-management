const express = require("express");

const vnpayController = require("../controllers/vnpay.controller");

const router = express.Router({ mergeParams: true });

router.get("/vnpay-return", vnpayController.vnpayReturn);
router.get("/vnpay-ipn", vnpayController.vnpayIPN);
