const express = require("express");
const {Signin, Signup, ProfileImageUpload} = require("./../controllers")
const multer = require("multer");
const path = require("path");
const {Authentication} = require("./../middlewares");

const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, "uploads/")
    },
    filename : (req, file, cb)=>{
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage : storage});

const UserRouter = express.Router();

UserRouter.post("/signup", Signup);

UserRouter.post("/signin", Signin);

UserRouter.post("/profile", Authentication,  upload.single("image"), ProfileImageUpload);

module.exports = UserRouter