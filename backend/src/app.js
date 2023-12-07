const express = require("express");
require("express-async-errors");
const cookieParser = require("cookie-parser");
const path = require("path");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const compression = require("compression");
const cors = require("cors");
const zod = require("zod");
const { fromZodError } = require("zod-validation-error");

const productRouter = require("./routes/product.route");
const userRouter = require("./routes/user.route");
const reviewRouter = require("./routes/review.route");
const orderRouter = require("./routes/order.route");
const inventoryItemRouter = require("./routes/inventoryItem.route");
const menuHistoryRouter = require("./routes/menuHistory.route");
const authRouter = require("./routes/auth.route");
const chargeHistoryRouter = require("./routes/chargeHistory.route");

const app = express();

// Trust proxy
app.enable("trust proxy");

// CORS;
app.use(
	cors({
		credentials: true,
		origin: "http://localhost:5173",
	})
);
// Implement CORS on all OPTIONS request
// Browser send OPTIONS req on preflight phase (before non-simple req like PUT,PATCH,DELETE,...)
// -> inorder to verify that the non-simple req is safe to perform
// -> we must set CORS on response
app.options("*", cors());

//////// IMPORTANT : helmet should be used in every Express app
// Security HTTP headers
app.use(
	helmet({
		crossOriginEmbedderPolicy: false,
		crossOriginResourcePolicy: {
			policy: "cross-origin",
		},
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["*"],
				scriptSrc: [
					"* data: 'unsafe-eval' 'unsafe-inline' blob: https://sandbox.vnpayment.vn",
				],
				connectSrc: ["*", "https://sandbox.vnpayment.vn"],
				frameSrc: ["*", "https://sandbox.vnpayment.vn"],
				navigateTo: ["*"],
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
app.use("/api/v1/charge-histories", chargeHistoryRouter);

// Error handler
app.use((err, req, res, next) => {
	// Check if erro is zod's error
	if (err instanceof zod.ZodError) {
		const validationErrors = fromZodError(err, {
			prefix: "Lỗi dữ liệu",
			includePath: false,
			unionSeparator: ", hoặc",
		});

		return res.status(400).json({
			status: "fail",
			errors: validationErrors.message,
		});
	}

	// Check if error is Mongoose ValidationError
	if (err.name === "ValidationError") {
		const validationErrorMessages = Object.values(err.errors).map(
			(error) => error.message
		);

		return res.status(400).json({
			status: "fail",
			errors: validationErrorMessages.join("; "),
		});
	}

	// Check if error is AppError (custom error)
	if (err.isOperational) {
		return res.status(err.statusCode || 500).json({
			status: err.status || "error",
			message: err.message,
		});
	} else {
		console.log(err);
		return res.status(500).json({
			status: "error",
			message: "Có lỗi xảy ra. Xin hãy liên hệ với admin.",
		});
	}
});

module.exports = app;
