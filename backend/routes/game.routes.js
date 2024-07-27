// In your Express router
const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game.controller");

router.get("/:name", gameController.getGame);

module.exports = router;
