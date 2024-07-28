// In your Express router
const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game.controller");

router.get("/:name", gameController.getGame);
router.delete("/:id", gameController.destroyGame);
router.get("/:id/edit", gameController.editGame);
router.put("/:id", gameController.updateGame);

module.exports = router;
