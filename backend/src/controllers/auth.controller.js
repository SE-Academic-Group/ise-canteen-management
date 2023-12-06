const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("../utils/appError");
const {
	createAccessToken,
	createRefreshToken,
	signToken,
} = require("../utils/generateToken");

const User = require("../models/user.model");

exports.signup = async (req, res, next) => {
	const { name, email, password, passwordConfirm } = req.body;
	const user = await User.create({
		name,
		email,
		password,
		passwordConfirm,
	});

	const { accessToken, accessTokenOptions } = createAccessToken(user, req);
	const { refreshToken, refreshTokenOptions } = createRefreshToken(user, req);

	res.cookie("accessToken", accessToken, accessTokenOptions);
	res.cookie("refreshToken", refreshToken, refreshTokenOptions);

	res.status(201).json({
		status: "success",
		accessToken: accessToken,
		refreshToken: refreshToken,
		data: {
			user: user,
		},
	});
};

exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	// 1) Check if email and password exist
	if (!email || !password)
		throw new AppError("Vui lòng nhập email và mật khẩu.", 400);

	// 2) Check if user exists && password is correct
	const user = await User.findOne({ email }, "+password");
	if (!user || !(await user.isCorrectPassword(password)))
		throw new AppError("Email hoặc mật khẩu không đúng.", 401);

	// 3) If everything ok, send tokens to client
	const { accessToken, accessTokenOptions } = createAccessToken(user, req);
	const { refreshToken, refreshTokenOptions } = createRefreshToken(user, req);

	res.cookie("accessToken", accessToken, accessTokenOptions);
	res.cookie("refreshToken", refreshToken, refreshTokenOptions);

	res.status(200).json({
		status: "success",
		accessToken,
		refreshToken,
	});
};

exports.logout = (req, res, next) => {
	res.cookie("accessToken", "", {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.cookie("refreshToken", "", {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({ status: "success" });
};

exports.protect = async (req, res, next) => {
	// 1) Getting tokens
	let accessToken;
	let refreshToken;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		accessToken = req.headers.authorization.split(" ")[1];
	} else if (req.cookies.accessToken) {
		accessToken = req.cookies.accessToken;
	}
	refreshToken = req.cookies.refreshToken;

	// If there is no accessToken and no refreshToken, throw error
	if (!accessToken && !refreshToken) {
		throw new AppError(
			"Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục",
			401
		);
	}

	// 2) Verify Tokens
	let decoded;
	let sendNewAccessToken = false;
	let accessTokenExpired = false;

	if (accessToken) {
		// 2.1) Verify accessToken
		try {
			decoded = await promisify(jwt.verify)(
				accessToken,
				process.env.ACCESS_SECRET
			);
		} catch (err) {
			// If accessToken is expired (jwt.TokenExpiredError), skip this block and verify refreshToken
			if (
				err instanceof jwt.JsonWebTokenError ||
				err instanceof jwt.NotBeforeError
			) {
				throw new AppError(
					"Phiên đăng nhập có vấn đề. Vui lòng đăng nhập lại.",
					401
				);
			} else if (err instanceof jwt.TokenExpiredError) {
				accessTokenExpired = true;
			} else {
				throw err;
			}
		}
	}

	// If accessToken is expired
	if (accessTokenExpired) {
		if (!refreshToken) {
			throw new AppError(
				"Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.",
				401
			);
		}

		// 2.2) Verify refreshToken
		try {
			decoded = await promisify(jwt.verify)(
				refreshToken,
				process.env.REFRESH_SECRET
			);

			// If refreshToken is valid, check user id exists and send new accessToken
			sendNewAccessToken = true;
		} catch (err) {
			if (
				err instanceof jwt.JsonWebTokenError ||
				err instanceof jwt.NotBeforeError
			) {
				throw new AppError(
					"Phiên đăng nhập có vấn đề. Vui lòng đăng nhập lại.",
					401
				);
			} else if (err instanceof jwt.TokenExpiredError) {
				throw new AppError(
					"Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.",
					401
				);
			}
		}
	}

	// Check if decode is undefined
	if (!decoded) {
		throw new AppError(
			"Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.",
			401
		);
	}

	// 3) Check if user still exists

	// Find user by id and include inactive users
	const query = User.findById(
		decoded.id,
		"+password +passwordChangedAt +active"
	);
	query.includeInActive = true;
	const currentUser = await query;

	if (!currentUser)
		throw new AppError(
			"Người dùng này không còn tồn tại. Vui lòng đăng nhập lại.",
			401
		);

	if (!currentUser.active)
		throw new AppError(
			"Tài khoản của bạn đã bị khóa. Vui lòng liên hệ với quản trị viên để mở lại.",
			401
		);

	// 4) Check if user changed password after the token was issued
	if (currentUser.changedPasswordAfter(decoded.iat))
		throw new AppError(
			"Người dùng đã thay đổi mật khẩu. Vui lòng đăng nhập lại.",
			401
		);

	// GRANT ACCESS TO PROTECTED ROUTE
	req.user = currentUser;

	if (sendNewAccessToken) {
		const { accessToken, accessTokenOptions } = createAccessToken(
			req.user,
			req
		);
		res.cookie("accessToken", accessToken, accessTokenOptions);
	}

	return next();
};

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		// Admin have access to all routes
		if (req.user.role === "admin") return next();

		// roles ['admin', 'cashier', 'staff', 'customer']
		if (!roles.includes(req.user.role)) {
			throw new AppError(
				"Người dùng không có quyền để thực hiện hành động này.",
				403
			);
		}

		next();
	};
};
