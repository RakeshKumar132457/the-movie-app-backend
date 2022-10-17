const Producer = require("../models/producersModel");

const factory = require("./handleFactory");

exports.getAllActors = factory.getAll(Producer);
exports.getActor = factory.getOne(Producer);
exports.addActor = factory.addOne(Producer);
exports.updateActor = factory.updateOne(Producer);
exports.deleteActor = factory.deleteOne(Producer);
