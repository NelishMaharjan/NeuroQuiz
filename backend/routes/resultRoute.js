const express = require("express").Router();
const { saveResult, getUserResults } = require("../controllers/resultController");

express.post("/add", saveResult);
express.get("/user/:userId", getUserResults);

module.exports = express;