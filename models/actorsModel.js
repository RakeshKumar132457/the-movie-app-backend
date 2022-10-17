const Movie = require("./moviesModel");
const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema(
	{
		name: String,
		gender: String,
		date_of_birth: Date,
		bio: String,
	},
	{
		toJSON: {
			virtuals: true,
		},
		toObject: {
			virtuals: true,
		},
	}
);

actorSchema.virtual("movies", {
	ref: "Movie",
	foreignField: "actors",
	localField: "_id",
});

const Actor = mongoose.model("Actor", actorSchema);

module.exports = Actor;
