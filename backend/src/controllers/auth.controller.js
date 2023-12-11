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

	const existUser = await User.findOne({ email });
	if (existUser) {
		throw new AppError(400, "DUPLICATE_KEYS", "Email đã tồn tại.", {
			field: "email",
			message: "Email đã tồn tại.",
		});
	}

	const user = await User.create({
		name,
		email,
		password,
		passwordConfirm,
	}).select("-password -passwordChangedAt -active");

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

	// 2) Check if user exists && password is correct
	const user = await User.findOne({ email }, "+password +active");
	if (!user || !(await user.isCorrectPassword(password)))
		throw new AppError(
			401,
			"INVALID_CREDENTIALS",
			"Email hoặc mật khẩu không đúng."
		);

	if (!user.active)
		throw new AppError(
			401,
			"ACCOUNT_DISABLED",
			"Tài khoản của bạn đã bị khóa. Vui lòng liên hệ với quản trị viên để mở lại."
		);

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

exports.updatePassword = async (req, res, next) => {
	const { oldPassword, newPassword, newPasswordConfirm } = req.body;

	// 1) Get user from collection
	const user = await User.findById(req.user.id).select("+password");

	// 2) Check if POSTed current password is correct
	if (!(await user.isCorrectPassword(oldPassword))) {
		throw new AppError(
			401,
			"INVALID_CREDENTIALS",
			"Mật khẩu hiện tại không đúng."
		);
	}

	// 3) Check if new password and confirm password are the same
	if (newPassword !== newPasswordConfirm) {
		throw new AppError(
			400,
			"INVALID_ARGUMENTS",
			"Mật khẩu nhập lại không khớp.",
			{
				newPasswordConfirm: "Mật khẩu nhập lại không khớp.",
			}
		);
	}

	// 3) If so, update password
	await user.updatePassword(newPassword);

	// 4) Log user in, send JWT
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

	console.log({ accessToken, refreshToken });

	// If there is no accessToken and no refreshToken, throw error
	if (!accessToken && !refreshToken) {
		throw new AppError(
			401,
			"SESSION_EXPIRED",
			"Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại."
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
			// If accessToken is expired (jwt.TokenExpiredError), skip the error and verify refreshToken
			if (err instanceof jwt.TokenExpiredError) {
				accessTokenExpired = true;
			} else if (
				err instanceof jwt.JsonWebTokenError ||
				err instanceof jwt.NotBeforeError
			) {
				throw new AppError(
					401,
					"INVALID_TOKENS",
					"Phiên đăng nhập có vấn đề. Vui lòng đăng nhập lại."
				);
			} else {
				throw err;
			}
		}
	}

	// If accessToken is expired
	if (accessTokenExpired) {
		if (!refreshToken) {
			throw new AppError(
				401,
				"SESSION_EXPIRED",
				"Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại."
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
					401,
					"INVALID_TOKENS",
					"Phiên đăng nhập có vấn đề. Vui lòng đăng nhập lại."
				);
			} else if (err instanceof jwt.TokenExpiredError) {
				throw new AppError(
					401,
					"SESSION_EXPIRED",
					"Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại."
				);
			}
		}
	}

	// Check if decode is undefined
	if (!decoded) {
		throw new AppError(
			401,
			"INVALID_TOKENS",
			"Phiên đăng nhập có vấn đề. Vui lòng đăng nhập lại."
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
		throw new AppError(404, "NOT_FOUND", "Người dùng không tồn tại.");

	if (!currentUser.active)
		throw new AppError(
			401,
			"ACCOUNT_DISABLED",
			"Tài khoản của bạn đã bị khóa. Vui lòng liên hệ với quản trị viên để mở lại."
		);

	// 4) Check if user changed password after the token was issued
	if (currentUser.isChangedPasswordAfter(decoded.iat))
		throw new AppError(
			401,
			"SESSION_EXPIRED",
			"Người dùng đã thay đổi mật khẩu. Vui lòng đăng nhập lại."
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
				403,
				"ACCESS_DENIED",
				"Người dùng không có quyền truy cập vào tài nguyên này."
			);
		}

		next();
	};
};
