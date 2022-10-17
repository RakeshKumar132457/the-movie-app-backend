const mongoose = require("mongoose");
const Actor = require("./actorsModel");
const Producer = require("./producersModel");

const movieSchema = new mongoose.Schema(
	{
		name: String,
		year_of_release: Date,
		plot: String,
		poster: String,
		actors: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "Actor",
			},
		],
		producer: {
			type: mongoose.Schema.ObjectId,
			ref: "Producer",
		},
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

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
