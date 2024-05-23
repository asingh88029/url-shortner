const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
    "originalUrl" : String,
    "shortendUrl" : String,
    "user" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User-FS14"
    },
    "clicked" : {
        type : Number,
        default : 0
    }
})

const Url = mongoose.model("Url", UrlSchema);

module.exports = Url;