const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games.controller");
const multer = require("multer");
const path = require("path");
const { verifyAccessToken } = require("../utils/jwt");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../utils/verifyRoles");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

const fileFields = [
  { name: "gameImage", maxCount: 1 },
  { name: "screenshots", maxCount: 20 }, // Adjust maxCount as needed
];

router.post(
  "/",
  verifyAccessToken,
  upload.fields(fileFields),
  gamesController.createNewGame
);

router.get("/", gamesController.getAllGames);
router.get("/genres", gamesController.getAllGenres);
router.get("/platforms", gamesController.getAllPlatforms);

module.exports = router;
