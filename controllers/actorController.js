const Actor = require("../models/actorsModel");

const factory = require("./handleFactory");

exports.getAllActors = factory.getAll(Actor);
exports.getActor = factory.getOne(Actor);
exports.addActor = factory.addOne(Actor);
exports.updateActor = factory.updateOne(Actor);
exports.deleteActor = factory.deleteOne(Actor);
