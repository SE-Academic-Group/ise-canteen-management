const fs = require("fs");
const path = require("path");
const ControllerFactory = require("./controller.factory");
const multerUpload = require("../utils/multerUpload");
const sharp = require("sharp");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

const User = require("../models/user.model");

// For admin to manage users
exports.createUser = async (req, res, next) => {
	// Check if email is already taken
	const query = User.findOne({ email: req.body.email }).select("+active");
	query.includeInactive = true;
	const existUser = await query;

	if (existUser) {
		throw new AppError(
			400,
			"BAD_REQUEST",
			`Email ${req.body.email} đã được sử dụng.`,
			{
				email: req.body.email,
			}
		);
	}

	const newUser = await User(req.body).save({
		validateBeforeSave: false,
	});

	res.status(201).json({
		status: "success",
		data: newUser,
	});
};

exports.getAllUsers = async (req, res, next) => {
	// Allow filtering by today's date
	// Loops through query string, find any key that has a value of "today"
	// and replace it with an object that specifies the range of today's date
	Object.keys(req.query).forEach((key) => {
		if (req.query[key] === "today") {
			// Filter orders by today's date
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			const tomorrow = new Date(today);
			tomorrow.setDate(tomorrow.getDate() + 1);
			req.query[key] = {
				$gte: today,
				$lt: tomorrow,
			};
		}
	});

	// EXECUTE QUERY
	const query = User.find().select("+active");
	query.includeInactive = true;
	const features = new APIFeatures(query, req.query)
		.filter()
		.limitFields()
		.paginate()
		.sort();

	// Added .lean() to improve performance
	const docs = await features.query.lean({ virtuals: true });
	const count = await User.countDocuments(features.filterObj);

	// SEND RESPONSE
	// Set X-Total-Count header
	res.set("Access-Control-Expose-Headers", "X-Total-Count");
	res.set("X-Total-Count", count);
	res.status(200).json({
		status: "success",
		data: docs,
	});
};
exports.getUser = async (req, res, next) => {
	const query = User.findById(req.params.id)
		.select("+active")
		.lean({ virtuals: true });
	query.includeInactive = true;

	const doc = await query;

	if (!doc) {
		throw new AppError(
			404,
			"NOT_FOUND",
			`Không tìm thấy user với ID ${req.params.id}`,
			{
				id: req.params.id,
				modelName: "user",
			}
		);
	}

	res.status(200).json({
		status: "success",
		data: doc,
	});
};
exports.updateUser = async (req, res, next) => {
	const query = User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: false,
	});
	query.includeInactive = true;

	const user = await query;

	if (!user) {
		throw new AppError(
			404,
			"NOT_FOUND",
			`Không tìm thấy người dùng với ID ${req.params.id}.`,
			{
				id: req.params.id,
			}
		);
	}

	res.status(200).json({
		status: "success",
		data: user,
	});
};
exports.deleteUser = async (req, res, next) => {
	const query = User.findByIdAndDelete(req.params.id);
	query.includeInactive = true;

	const user = await query;

	if (!user) {
		throw new AppError(
			404,
			"NOT_FOUND",
			`Không tìm thấy người dùng với ID ${req.params.id}.`,
			{
				id: req.params.id,
			}
		);
	}

	res.status(204).json({
		status: "success",
		data: null,
	});
};

// ----- For customer to manage their own account -----
// For uploading user image
exports.uploadUserPhoto = multerUpload.upload.single("image");
exports.resizeUserPhoto = async (req, res, next) => {
	if (!req.file) return next();

	req.file.filename = `/images/users/user-${req.user.id}-${Date.now()}.jpeg`;
	const writtenFilePath = `${__dirname}/../public${req.file.filename}`;

	await sharp(req.file.buffer)
		.resize(500, 500)
		.toFormat("jpeg")
		.jpeg({ quality: 90 })
		.toFile(writtenFilePath);

	return next();
};

exports.updateMe = async (req, res, next) => {
	if (req.file) req.body.image = req.file.filename;

	// Check allowed fields (form data validation with zod is not working)
	const allowedFields = ["name", "phone", "image"];
	const receivedFields = Object.keys(req.body);
	const notAllowedFields = receivedFields.filter(
		(field) => !allowedFields.includes(field)
	);
	if (notAllowedFields.length > 0) {
		const metadata = {};
		notAllowedFields.forEach((field) => {
			metadata[field] = req.body[field];
		});

		throw new AppError(
			400,
			"BAD_REQUEST",
			`Không thể cập nhật trường ${notAllowedFields.join(", ")}.`,
			metadata
		);
	}

	// Update user document
	const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
		new: true,
		runValidators: true,
	});

	// Delete local image
	if (
		req.user.image &&
		req.user.image !== updatedUser.image &&
		!(req.user.image.search("default") !== -1) // prevent deleting default image
	) {
		const imagePath = path.join(__dirname, `../public${req.user.image}`);
		fs.unlink(imagePath, (err) => {
			if (err) {
				console.error(err);
			}
		});
	}

	res.status(200).json({
		status: "success",
		data: updatedUser,
	});
};

exports.getMe = (req, res, next) => {
	req.params.id = req.user.id;
	next();
};

exports.deleteMe = async (req, res, next) => {
	await User.findByIdAndUpdate(req.user.id, { active: false });

	res.status(204).json({
		status: "success",
		data: null,
	});
};
