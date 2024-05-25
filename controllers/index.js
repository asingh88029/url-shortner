const {shortURL, redirectToURL, getAllUrls} = require("./Url.Controller.js");
const {Signup, Signin, ProfileImageUpload} = require("./User.Controller.js");

module.exports = {
    shortURL, 
    redirectToURL,
    getAllUrls,
    Signup,
    Signin,
    ProfileImageUpload
}