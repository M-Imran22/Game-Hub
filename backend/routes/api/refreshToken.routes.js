const express = require("express");
const router = express.Router();
const refreshTokenController = require("../../controllers/refreshToken.controller");

router.get("/", refreshTokenController.handlerefreshToken);

module.exports = router;
