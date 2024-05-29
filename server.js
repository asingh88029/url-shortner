const express = require("express");
require("dotenv").config();
const {URLRouter} = require("./routers");
const {UserRouter} = require("./routers")
require("./db/connect");
var cors = require('cors')
const {redirectToURL} = require("./controllers")
require("./postgresql");
const {Url : { createANewUrlInDB }} = require("./services")


const PORT = process.env.PORT || 3000;

const server = express();

server.use(cors());

server.use(express.json())

server.post("/", async (req, res)=>{
    const {originalUrl, shortUrl} = req.body;
    const result = await createANewUrlInDB(originalUrl, shortUrl)

    if(result.success){
        res.status(201).send({"messaage" : "New URL data added"})
    }else{
        res.status(500).send({"message" : "Falied to save new URL data"})
    }
})

server.use("/url", URLRouter);

server.use("/user", UserRouter);

server.get("/:urlId", redirectToURL);

// TODO 3 : write and apply error handling middleware

server.listen(PORT, ()=>{
    console.log("Server is started at port - ", PORT)
})

