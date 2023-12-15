const zod = require("zod");

module.exports = zod.object({
	body: zod.object({
		name: zod.string({
			required_error: "Phải nhập tên",
			message: "Tên không hợp lệ",
		}),
		email: zod
			.string({
				required_error: "Phải nhập email",
				message: "Email không hợp lệ",
			})
			.email({
				message: "Email không hợp lệ",
			})
			.superRefine((data, ctx) => {
				const regex = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)*hcmus\.edu\.vn$/;
				if (!regex.test(data)) {
					ctx.addIssue({
						code: "custom",
						message:
							"Email phải thuộc về trường Đại học Khoa học Tự nhiên TP.HCM",
						path: ["email"],
					});
				}
			}),
		password: zod
			.string({
				required_error: "Phải nhập mật khẩu",
			})
			.min(8, {
				message: "Mật khẩu phải có ít nhất 8 ký tự",
			}),
		passwordConfirm: zod
			.string({
				required_error: "Phải xác nhận mật khẩu",
			})
			.min(8, {
				message: "Mật khẩu xác nhận phải có ít nhất 8 ký tự",
			}),
	}),
});
