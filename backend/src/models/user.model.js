const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Hãy nhập tên của bạn"],
	},
	email: {
		type: String,
		required: [true, "Hãy nhập email của bạn"],
		unique: true,
		validate: {
			validator: function () {
				const regex = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+hcmus\.edu\.vn$/;
				return regex.test(this.email);
			},
			message: "Email phải thuộc về trường Đại học Khoa học Tự nhiên TP.HCM",
		},
	},
	password: {
		type: String,
		required: [true, "Hãy nhập mật khẩu của bạn"],
		minlength: [8, "Mật khẩu phải có ít nhất 8 ký tự"],
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: [true, "Hãy nhập lại mật khẩu của bạn"],
		validate: {
			validator: function () {
				return this.password === this.passwordConfirm;
			},
			message: "Mật khẩu nhập lại không khớp",
		},
	},
	role: {
		type: String,
		enum: ["admin", "cashier", "customer", "staff"],
		default: "customer",
	},
	image: {
		type: String,
		default: "/images/users/default.jpg",
	},
	passwordChangedAt: {
		type: Date,
		select: false,
	},
	balance: {
		type: Number,
		default: 0,
	},
	phone: {
		type: String,
		validate: {
			validator: function () {
				const regex = /^\d{10}$/;
				return regex.test(this.phone);
			},
			message: "Số điện thoại phải có 10 chữ số",
		},
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	updatedAt: Date,
	active: {
		type: Boolean,
		default: true,
		select: false,
	},
});

////////// MIDDLEWARE ///////

// Decrypt password
userSchema.pre("save", async function (next) {
	// only run this function if Password is modified
	if (!this.isModified("password")) return next();

	// 12 : how CPU intensive to hash password
	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;

	next();
});

userSchema.pre(
	["updateOne", "findByIdAndUpdate", "findOneAndUpdate"],
	async function (next) {
		const data = this.getUpdate();
		if (data.password) {
			data.password = await bcrypt.hash(data.password, 12);
		}
		next();
	}
);

// Update passwordChangedAt
userSchema.pre("save", function (next) {
	if (!this.isModified("password") || this.isNew) return next();

	// A little hack: minus 1 seconds : b/c this save process might finish after JWT being created -> error
	this.passwordChangedAt = Date.now() - 1000;
	next();
});

userSchema.pre(/^find/, function (next) {
	if (!this.includeInactive) this.find({ active: { $ne: false } });
	next();
});

////////// METHODS //////////
userSchema.methods.isCorrectPassword = async function (inputPassword) {
	return await bcrypt.compare(inputPassword, this.password);
};

// Check if the password is changed after the token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	// Password has been changed after user being created
	if (this.passwordChangedAt) {
		const passwordChangeTime = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		return JWTTimestamp < passwordChangeTime;
	}

	// False: token was issued before password change time
	return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
