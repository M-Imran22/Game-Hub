const express = require("express");
const router = express.Router();
const gameController = require("../controllers/games.controller");
const multer = require("multer");
const path = require("path");
const { verifyAccessToken, verifyRefreshToken } = require("../utils/jwt");

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
  { name: "screenShots", maxCount: 20 }, // Adjust maxCount as needed
];

router.post("/", upload.fields(fileFields), gameController.createNewGame);

router.get("/", verifyAccessToken, gameController.getAllGames);

module.exports = router;
