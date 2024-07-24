const express = require("express");
const router = express.Router();
const sysReqOptionsController = require("../controllers/sys_req_options.controller");

router.get("/", sysReqOptionsController.getAllOptions);

module.exports = router;
