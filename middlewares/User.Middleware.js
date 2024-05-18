const jwt = require("jsonwebtoken");
require("dotenv").config();
const httpStatus = require("http-status");

async function Auth(req, res, next){

    try{

        const token = req.headers["auth-token"];

        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(decoded){

            req.userId = decoded.id
            next()

        }else{

            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message : "Invalid Token"
            })

        }

    }catch(err){

        console.log(err)

        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message : "Invalid Token"
        })

    }

}

module.exports = {
    Auth
}