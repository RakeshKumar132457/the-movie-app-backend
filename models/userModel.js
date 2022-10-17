const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Provide a name"],
	},
	email: {
		type: String,
		unique: true,
		required: [true, "Provide a email"],
	},
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user",
	},
	password: {
		type: String,
		required: [true, "Provide a password"],
	},
	passwordConfirm: {
		type: String,
	},
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});

userSchema.methods.correctPassword = async function (candidatePass, userPass) {
	return await bcrypt.compare(candidatePass, userPass);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
