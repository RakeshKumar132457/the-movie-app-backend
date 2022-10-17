const express = require("express");
const producerController = require("../controllers/producerController");

const router = express.Router();

router
	.route("/")
	.get(producerController.getAllActors)
	.post(producerController.addActor);

router
	.route("/:id")
	.get(producerController.getActor)
	.patch(producerController.updateActor)
	.delete(producerController.deleteActor);

module.exports = router;
