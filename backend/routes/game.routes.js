const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game.controller");
const { verifyAccessToken } = require("../utils/jwt");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../utils/verifyRoles");

router.get("/:name", verifyAccessToken, gameController.getGame);
router.get("/gameScreenShots/:id", gameController.getGameScreenShots);
router.delete(
  "/:id",
  verifyRoles(ROLES_LIST.admin),
  gameController.destroyGame
);
router.get("/:id/edit", gameController.editGame);
router.put("/:id", gameController.updateGame);

module.exports = router;
