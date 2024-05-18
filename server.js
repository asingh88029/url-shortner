const express = require("express");
require("dotenv").config();
const {URLRouter} = require("./routers");
const {UserRouter} = require("./routers")
require("./db/connect");
const {redirectToURL} = require("./controllers")

const PORT = process.env.PORT || 3000;

const server = express();

server.use(express.json())

server.use("/url", URLRouter);

server.use("/user", UserRouter)

server.get("/:urlId", redirectToURL)

server.listen(PORT, ()=>{
    console.log("Server is started at port - ", PORT)
})

