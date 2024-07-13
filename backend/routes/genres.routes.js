const express = require("express");
const router = express.Router();
const genreController = require("../controllers/genres.controller");

router.get("/", genreController.getAllGenres);

module.exports = router;
