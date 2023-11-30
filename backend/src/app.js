const express = require("express");
require("express-async-errors");
const cookieParser = require("cookie-parser");

const productRouter = require("./routes/product.route");
const userRouter = require("./routes/user.route");
const reviewRouter = require("./routes/review.route");
const orderRouter = require("./routes/order.route");
const inventoryItemRouter = require("./routes/inventoryItem.route");
const menuHistoryRouter = require("./routes/menuHistory.route");
const authRouter = require("./routes/auth.route");

const app = express();

// Trust proxy
app.enable("trust proxy");

// Body parser
app.use(express.json());
// Cookie parser
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Set static files
app.use(express.static(`${__dirname}/public`));

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/inventory-items", inventoryItemRouter);
app.use("/api/v1/menu-histories", menuHistoryRouter);
app.use("/api/v1/auth", authRouter);

// Error handler
app.use((err, req, res, next) => {
	console.log(err);

	res.status(err.statusCode || 500).json({
		status: err.status || "error",
		message: err.message,
	});
});

module.exports = app;
