const express = require("express");
const {Signin, Signup} = require("./../controllers")

const UserRouter = express.Router();

UserRouter.post("/signup", Signup);

UserRouter.post("/signin", Signin);

module.exports = UserRouter