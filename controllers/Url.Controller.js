const {Url} = require("../models");
const httpStatus = require("http-status");
const {generateUniqueId} = require("./../utils")

// This controller will receive the original url through the body and then we have to save the
// shorter version of the url in database
async function shortURL(req, res){

    try{

        const {originalUrl} = req.body;

        const shortURL = "http://"+req.headers.host+"/"+generateUniqueId();

        const url = await new Url({
            "originalUrl" : originalUrl,
            "shortendUrl" : shortURL,
        })

        await url.save()

        res.status(httpStatus.CREATED).json({
            "shortendUrl" : shortURL,
        })

    }catch(err){

        console.log(err)

        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            "message" : "Something went wrong on the server"
        })

    }

}

async function redirectToURL(req, res){

    try{

        const {urlId} = req.params;

        const shortURL = "http://"+req.headers.host+"/"+urlId;
    
        const doc  = await Url.findOne({"shortendUrl":shortURL})
    
        res.redirect(doc.originalUrl);

    }catch(err){

        console.log(err)

        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message : "Something went wrong"
        })

    }

}


module.exports = {
    shortURL,
    redirectToURL
}