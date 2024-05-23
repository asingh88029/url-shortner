const {Url} = require("../models");
const httpStatus = require("http-status");
const {generateUniqueId} = require("./../utils")

// This controller will receive the original url through the body and then we have to save the
// shorter version of the url in database
async function shortURL(req, res){

    try{

        const {originalUrl} = req.body;

        const userId = req.userId;

        const shortURL = "http://"+req.headers.host+"/"+generateUniqueId();

        const url = await new Url({
            "originalUrl" : originalUrl,
            "shortendUrl" : shortURL,
            "user" : userId
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

        const prevClicked = doc.clicked;
        doc.clicked = prevClicked + 1;
        
        await doc.save()
    
        res.redirect(doc.originalUrl);

    }catch(err){

        console.log(err)

        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message : "Something went wrong"
        })

    }

}

async function getAllUrls(req, res){

    try{

        const userId = req.userId;

        const result = await Url.find({user: userId});

        console.log(result)

        if(!result.length){

            res.status(httpStatus.NOT_FOUND).json({
                message : "URL not found"
            })

        }else{

            res.status(httpStatus.OK).json({
                data : result
            })

        }

    }catch(er){

        console.log(err)

        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message : "Something went wrong"
        })

    }

}

module.exports = {
    shortURL,
    redirectToURL,
    getAllUrls
}