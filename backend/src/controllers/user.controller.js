const ControllerFactory = require("./controller.factory");
const multerUpload = require("../utils/multerUpload");
const filterObj = require("../utils/filterObj");
const sharp = require("sharp");
const AppError = require("../utils/appError");

const User = require("../models/user.model");

// For admin to manage users
exports.createUser = async (req, res, next) => {
	const newUser = await User(req.body).save({
		validateBeforeSave: false,
	});

	res.status(201).json({
		status: "success",
		data: {
			user: newUser,
		},
	});
};
exports.getAllUsers = ControllerFactory.getAll(User);
exports.getUser = ControllerFactory.getOne(User);
exports.updateUser = ControllerFactory.updateOne(User);
exports.deleteUser = ControllerFactory.deleteOne(User);

// ----- For customer to manage their own account -----
// For uploading user image

exports.uploadUserPhoto = multerUpload.upload.single("image");
exports.resizeUserPhoto = async (req, res, next) => {
	if (!req.file) return next();

	req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

	await sharp(req.file.buffer)
		.resize(500, 500)
		.toFormat("jpeg")
		.jpeg({ quality: 90 })
		.toFile(`public/images/users/${req.file.filename}`);

	return next();
};
exports.updateMe = async (req, res, next) => {
	// Filter out unwanted fields names that are not allowed to be updated
	const allowedFields = ["name", "phone", "image"];
	for (const key in req.body) {
		if (!allowedFields.includes(key)) {
			throw new AppError(`Người dùng không được cập nhật ${key}.`, 400);
		}
	}
	if (req.file) req.body.image = req.file.filename;

	// Update user document
	const user = await User.findByIdAndUpdate(req.user.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: "success",
		data: {
			user,
		},
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
