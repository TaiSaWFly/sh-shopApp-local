const express = require("express");
const router = express.Router({ mergeParams: true });

const Controller = require("../controllers/popular.controller");

router.get("/", Controller.getList);

module.exports = router;
