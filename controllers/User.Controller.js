const {User} = require("./../models");
const bcrypt = require("bcrypt");
const httpStatus = require("http-status");
var jwt = require('jsonwebtoken');
require("dotenv").config()

async function Signup(req, res){

    try{

        const {name, email, password} = req.body;

        const encryptedPassword = await bcrypt.hash(password, parseInt(process.env.SALT))

        const user = await new User({
            name : name,
            email : email,
            password : encryptedPassword
        })

        await user.save()

        res.status(httpStatus.CREATED).json({
            message : "Now you are customer, We will make money!!"
        })

    }catch(err){

        console.log(err)

        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message : "Something went wrong"
        })

    }

}

async function Signin(req, res){

    try{

        const {email, password} = req.body;

        const doc = await User.findOne({email: email});

        if(!doc){

            res.status(httpStatus.BAD_REQUEST).json({
                message : "Invalid Credentials"
            })

        }

        const isValid = await bcrypt.compare(password, doc.password);

        if(isValid){

            // We will generate the token

            const payload = {
                id : doc._id
            }

            const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});

            res.status(httpStatus.OK).json({
                token : token
            })


        }else{
            
            res.status(httpStatus.BAD_REQUEST).json({
                message : "Invalid Credentials"
            })
            
        }


    }catch(err){

        console.log(err)

        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message : "Something went wrong"
        })

    }

}

module.exports = {
    Signup,
    Signin
}