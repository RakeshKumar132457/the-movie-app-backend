const mongoose = require("mongoose");
const Movie = require("./moviesModel");

const producerSchema = new mongoose.Schema(
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

producerSchema.virtual("movies", {
	ref: "Movie",
	foreignField: "producer",
	localField: "_id",
});

const Producer = mongoose.model("Producer", producerSchema);

module.exports = Producer;
