const Actor = require("../models/actorsModel");
const Movie = require("../models/moviesModel");
const Producer = require("../models/producersModel");
const AppError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");

exports.getAll = (Model) =>
	catchAsync(async (req, res, next) => {
		let doc;
		if (Model === Actor || Model === Producer) {
			doc = await Model.find().populate("movies");
		} else if (Model === Movie) {
			const query = ["actors", "producer"];
			doc = await Model.find().populate(query);
		} else {
			doc = await Model.find();
		}

		if (!doc) {
			return next(new AppError("Document not found", 404));
		}

		res.status(200).json({
			status: "success",
			data: {
				data: doc,
			},
		});
	});

exports.getOne = (Model) =>
	catchAsync(async (req, res, next) => {
		let doc;
		if (Model === Actor || Model === Producer) {
			doc = await Model.findById(req.params.id).populate("movies");
		} else if (Model === Movie) {
			const query = ["actors", "producer"];
			doc = await Model.findById(req.params.id).populate(query);
		} else {
			doc = await Model.findById(req.params.id);
		}

		if (!doc) {
			return next(new AppError("Document not found", 404));
		}

		res.status(200).json({
			status: "success",
			data: {
				data: doc,
			},
		});
	});

exports.addOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.create(req.body);

		if (!doc) {
			return next(new AppError("Document not found", 404));
		}

		res.status(201).json({
			status: "success",
			data: {
				data: doc,
			},
		});
	});

exports.updateOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!doc) {
			return next(new AppError("Document not found", 404));
		}

		res.status(200).json({
			status: "success",
			data: {
				data: doc,
			},
		});
	});

exports.deleteOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.findByIdAndDelete(req.params.id);

		if (!doc) {
			return next(new AppError("Document not found", 404));
		}

		res.status(204).json({
			status: "success",
			data: null,
		});
	});
