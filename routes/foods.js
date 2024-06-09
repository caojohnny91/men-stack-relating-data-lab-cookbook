const express = require("express");
const router = express.Router();
const foodsController = require("../controllers/foods");

router.get("/", foodsController.index); // connecting with controllers

router.get("/new", foodsController.newPage);

router.post("/", foodsController.create);

router.get("/:foodId", foodsController.show);

router.delete("/:foodId", foodsController.deleteFood);

module.exports = router;
