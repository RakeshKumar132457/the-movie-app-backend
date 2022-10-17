const express = require("express");
const movieController = require("../controllers/movieController");

const router = express.Router();

router
	.route("/")
	.get(movieController.getAllActors)
	.post(movieController.addActor);

router
	.route("/:id")
	.get(movieController.getActor)
	.patch(movieController.updateActor)
	.delete(movieController.deleteActor);

module.exports = router;
