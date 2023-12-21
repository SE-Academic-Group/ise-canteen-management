const express = require("express");
const statisticController = require("../controllers/statistic.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.use(
	authController.protect,
	authController.restrictTo("admin", "cashier")
);

router.get("/import", statisticController.importStatistic);
router.get("/export", statisticController.exportStatistic);
router.get("/sale", statisticController.saleStatistic);
router.get("/revenue", statisticController.revenueStatistic);

module.exports = router;
