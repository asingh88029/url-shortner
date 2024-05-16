const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
    "originalUrl" : String,
    "shortendUrl" : String,
})

const Url = mongoose.model("Url", UrlSchema);

module.exports = Url;