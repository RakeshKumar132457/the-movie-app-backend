const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const User = require("../models/userModel");
const AppError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

exports.signup = catchAsync(async (req, res, next) => {
	const newUser = await User.create(req.body);

	const token = signToken(newUser._id);

	res.status(201).json({
		status: "success",
		token,
		data: {
			user: newUser,
		},
	});
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return next(new AppError("Email password doesn't exist", 404));
	}

	const user = await User.findOne({ email }).select("+password");

	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new Error("Email or password doesn't exist"));
	}
	const token = signToken(user.id);
	res.status(200).json({
		status: "success",
		token,
	});
});

exports.protect = catchAsync(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}

	if (!token) {
		return next(new AppError("You are not logged in", 401));
	}

	const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	const currentUser = await User.findById(decode.id);

	if (!currentUser) {
		return next(
			new AppError("The user belonging to this token doesn't exist", 401)
		);
	}

	req.user = currentUser;
	next();
});

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new AppError("You don't have permission to perform this action")
			);
		}
		next();
	};
};
