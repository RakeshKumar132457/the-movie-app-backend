const express = require("express");
const viewController = require("./../controllers/viewController");

const router = express.Router();

router.get("/", viewController.testView);

module.exports = router;
