const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
})

const User = mongoose.model("User-FS14", UserSchema);

module.exports = User