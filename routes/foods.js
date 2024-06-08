const express = require("express");
const router = express.Router();
const foodsController = require("../controllers/foods");

router.get("/", foodsController.index); // connecting with controllers

module.exports = router;
