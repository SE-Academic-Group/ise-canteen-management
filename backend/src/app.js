const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const compression = require("compression");
const cors = require("cors");
const zod = require("zod");
const { fromZodError } = require("zod-validation-error");

// Import utils
const convertToReadableMetadata = require("./utils/convertToReadableMetadata");

const productRouter = require("./routes/product.route");
const userRouter = require("./routes/user.route");
const reviewRouter = require("./routes/review.route");
const orderRouter = require("./routes/order.route");
const inventoryItemRouter = require("./routes/inventoryItem.route");
const menuHistoryRouter = require("./routes/menuHistory.route");
const authRouter = require("./routes/auth.route");
const chargeHistoryRouter = require("./routes/chargeHistory.route");
const todayMenuRouter = require("./routes/todayMenu.route");
const inventoryExportRouter = require("./routes/inventoryExport.route");
const inventoryImportRouter = require("./routes/inventoryImport.route");
const paymentRouter = require("./routes/payment.route");
const statisticRouter = require("./routes/statistic.route");

const app = express();

// Trust proxy
app.enable("trust proxy");

// CORS;
const allowOrigins = [
	process.env.FRONTEND_URL,
	"http://localhost:5173",
	"http://localhost:4173",
];
app.use(
	cors({
		credentials: true,
		origin: allowOrigins,
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
app.use("/api/v1/today-menu", todayMenuRouter);
app.use("/api/v1/inventory-exports", inventoryExportRouter);
app.use("/api/v1/inventory-imports", inventoryImportRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/statistics", statisticRouter);

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
			message: validationErrors.message,
			reasonPhrase: "INVALID_ARGUMENTS",
			metadata: convertToReadableMetadata(validationErrors.details),
		});
	}

	// Check if error is Mongoose ValidationError
	if (err instanceof mongoose.Error.ValidationError) {
		const validationErrorMessages = Object.values(err.errors).map(
			(error) => error.message
		);

		return res.status(400).json({
			status: "fail",
			errors: validationErrorMessages.join("; "),
			reasonPhrase: "INVALID_ARGUMENTS",
		});
	} else if (err instanceof mongoose.Error.CastError) {
		// Check if error is Mongoose CastError
		return res.status(400).json({
			status: "fail",
			message: `Không tìm thấy ${err.path} với giá trị ${err.value}`,
			reasonPhrase: "INVALID_ARGUMENTS",
		});
	} else if (err.code === 11000) {
		// Check if error is Mongoose duplicate key error
		return res.status(400).json({
			status: "fail",
			message: `${Object.keys(err.keyValue)[0]} ${
				Object.values(err.keyValue)[0]
			} đã tồn tại.`,
			reasonPhrase: "INVALID_ARGUMENTS",
		});
	}

	// Check if error is AppError (custom error)
	if (err.isOperational) {
		return res.status(err.statusCode || 500).json({
			status: err.status,
			message: err.message,
			reasonPhrase: err.reasonPhrase,
			metadata: err.metadata,
		});
	} else {
		console.log(err);
		return res.status(500).json({
			status: "error",
			message: "Có lỗi xảy ra. Xin hãy liên hệ với admin.",
			reasonPhrase: "INTERNAL_SERVER_ERROR",
		});
	}
});

module.exports = app;
