const nodemailer = require("nodemailer");

require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
});

async function sendEmail(to, subject, body){

    const payload = {
        from : "lpuecommercebackendmail@gmail.com",
        to,
        subject,
        text : body
    }

    transporter.sendMail(payload, (err, data)=>{

        if(err){
            console.log(err)
        }else{
            console.log("Email is sent to ", to)
        }

    })

}

module.exports = sendEmail;