const express = require("express");
const actorController = require("../controllers/actorController");

const router = express.Router();

router
	.route("/")
	.get(actorController.getAllActors)
	.post(actorController.addActor);

router
	.route("/:id")
	.get(actorController.getActor)
	.patch(actorController.updateActor)
	.delete(actorController.deleteActor);

module.exports = router;
