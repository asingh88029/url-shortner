const express = require("express");
const {shortURL, redirectToURL} = require("../controllers");
const {Auth} = require("./../middlewares");

const URLRouter = express.Router();

URLRouter.post("/create", Auth, shortURL);

module.exports = URLRouter