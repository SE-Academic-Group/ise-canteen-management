const express = require("express");
require("express-async-errors");
const cookieParser = require("cookie-parser");
const path = require("path");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const compression = require("compression");
const cors = require("cors");

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

// CORS
app.use(
	cors({
		withCredentials: true,
		credentials: true,
	})
);
// Implement CORS on all OPTIONS request
// Browser send OPTIONS req on preflight phase (before non-simple req like PUT,PATCH,DELETE,...)
// -> inorder to verify that the non-simple req is safe to perform
// -> we must set CORS on response
app.options(
	"*",
	cors({
		withCredentials: true,
		credentials: true,
	})
);

//////// IMPORTANT : helmet should be used in every Express app
// Security HTTP headers
app.use(
	helmet({
		crossOriginEmbedderPolicy: false,
		crossOriginResourcePolicy: {
			allowOrigins: ["*"],
		},
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["*"],
				scriptSrc: ["* data: 'unsafe-eval' 'unsafe-inline' blob:"],
			},
		},
	})
);

//////// IMPORTANT ////////
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
// replace malicious HTML code : ex : <div id='error-code'></div> -> &lt;div id='error-code'&gt;...
app.use(xss());

// compress all the response text (ex: JSON or HTML)
app.use(compression());

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
	if (err.isOperational) {
		res.status(err.statusCode || 500).json({
			status: err.status || "error",
			message: err.message,
		});
	} else {
		res.status(500).json({
			status: "error",
			message: "Something went wrong! Please contact the admin",
		});

		console.log(err);
	}
});

module.exports = app;
