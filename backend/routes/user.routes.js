const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models");
const { where } = require("sequelize");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/signup", userController.signup);

router.post("/login", userController.login);

module.exports = router;
