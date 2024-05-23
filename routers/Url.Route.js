const express = require("express");
const {shortURL, getAllUrls} = require("../controllers");
const {Authentication, Authorization} = require("./../middlewares");

const URLRouter = express.Router();

URLRouter.post("/create", Authentication, shortURL);

URLRouter.get("/get-all", Authentication, getAllUrls);

URLRouter.get("/get-all-users-url", Authentication, Authorization(["admin"]), (req, res)=>{
    res.json({
        message : "Data sent"
    })
})

module.exports = URLRouter