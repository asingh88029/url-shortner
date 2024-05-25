const {User} = require("./../models");
const bcrypt = require("bcrypt");
const httpStatus = require("http-status");
var jwt = require('jsonwebtoken');
const {sendEmail} = require("./../utils");
require("dotenv").config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
  

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

        const sub = `Welcome ${name} to shorturl.in`;
        const body = `Hello ${name},\n\nWelcome to the shorturl.in`;
        sendEmail(email, sub, body)

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

async function ProfileImageUpload(req, res, next){
    try{

        const userID = req.userId;

        // File is present or not
        if(!req.file){
            const err = new Error("File is missing");
            err.statusCode = httpStatus.BAD_REQUEST
            return next(err)
        }

        const {mimetype, path, size} = req.file;

        // File Size 
        if(size>512000){ // This in bytes
            const err = new Error("File size should be less than 512 KB");
            err.statusCode = httpStatus.BAD_REQUEST
            return next(err) 
        }

        console.log(mimetype)

        // TODO1 : Check for file type
        // File Type
        // if(mimetype!=="image/jpeg" || mimetype!=="image/png" || mimetype!=="image/jpg"){
        //     const err = new Error("File should be in JPEG/JPG/PNG format");
        //     err.statusCode = httpStatus.BAD_REQUEST
        //     return next(err) 
        // }

        const result = await cloudinary.uploader.upload(path);

        if(result.secure_url){

            // Save the image in db
            const doc = await User.findById(userID)

            doc.profileImageUrl = result.secure_url;
            await doc.save()

            // TODO 2 : Remove the image from the uploads/ folder

            res.status(httpStatus.CREATED).json({profileImageUrl : result.secure_url})

        }else{
            const err = new Error("Something went wrong while uploading image to cloudinary");
            err.statusCode = httpStatus.BAD_REQUEST
            return next(err)   
        }

    }catch(err){

    }
}

module.exports = {
    Signup,
    Signin,
    ProfileImageUpload
}