const jwt = require("jsonwebtoken");
require("dotenv").config();
const httpStatus = require("http-status");
const {User} = require("./../models")

async function Authentication(req, res, next){

    try{

        const token = req.headers["auth-token"];

        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(decoded){

            req.userId = decoded.id;

            const user = await User.findById(req.userId);

            req.userRole = user.role;
            
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

function Authorization(roles){

    return (req, res, next)=>{
        
        const role = req.userRole;
        
        if(roles.includes(role)){
            next()
        }else{
            res.status(httpStatus.UNAUTHORIZED).json({
                message : "Unauthorized access"
            })
        }
    }

}

module.exports = {
    Authentication,
    Authorization
}