// In your Express router
const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game.controller");
// const { verifyAccessToken } = require("../utils/jwt");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../utils/verifyRoles");

router.get("/:name", gameController.getGame);
router.get("/gameScreenShots/:id", gameController.getGameScreenShots);
router.delete(
  "/:id",
  verifyRoles(ROLES_LIST.Admin),
  gameController.destroyGame
);
router.get("/:id/edit", verifyRoles(ROLES_LIST.Admin), gameController.editGame);
router.put("/:id", verifyRoles(ROLES_LIST.Admin), gameController.updateGame);

module.exports = router;
