// In your Express router
const express = require("express");
const router = express.Router();
const gameScreenShotsController = require("../controllers/gameScreenShots.controller");

router.get("/:id", gameScreenShotsController.getGameScreenShots);

module.exports = router;
