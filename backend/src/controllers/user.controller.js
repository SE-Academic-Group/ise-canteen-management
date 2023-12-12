const fs = require("fs");
const path = require("path");
const ControllerFactory = require("./controller.factory");
const multerUpload = require("../utils/multerUpload");
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
exports.updateUser = async (req, res, next) => {
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: false,
	});

	if (!user) {
		throw new AppError(
			404,
			"NOT_FOUND",
			`Không tìm thấy người dùng với ID ${req.params.id}.`
		);
	}

	res.status(200).json({
		status: "success",
		data: user,
	});
};
exports.deleteUser = ControllerFactory.deleteOne(User);

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
		throw new AppError(
			400,
			"BAD_REQUEST",
			`Không thể cập nhật trường ${notAllowedFields.join(", ")}.`,
			Object.assign(
				{},
				...notAllowedFields.map((field) => ({
					[field]: `Không thể cập nhật trường ${field}.`,
				}))
			)
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
		data: {
			updatedUser,
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
