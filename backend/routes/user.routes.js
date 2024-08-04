const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.post("/signup", UserController.addUser);
router.post("/login", UserController.getUser);
router.get("/admin", UserController.getAdmin);
router.get("/user", UserController.getUser);

module.exports = router;
