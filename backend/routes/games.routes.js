const express = require("express");
const router = express.Router();
const gameController = require("../controllers/games.controller");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post("/", upload.single("gameImage"), gameController.createNewGame);

router.get("/", gameController.getAllGames);

module.exports = router;
