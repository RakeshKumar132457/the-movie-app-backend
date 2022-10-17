const Movie = require("../models/moviesModel");

const factory = require("./handleFactory");

exports.getAllActors = factory.getAll(Movie);
exports.getActor = factory.getOne(Movie);
exports.addActor = factory.addOne(Movie);
exports.updateActor = factory.updateOne(Movie);
exports.deleteActor = factory.deleteOne(Movie);
