const express = require("express");
const router = express.Router();
const platformController = require("../controllers/platforms.controller");

router.get("/", platformController.getAllPlatforms);

module.exports = router;
