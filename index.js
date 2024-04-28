require("express-async-errors");
const express = require("express")
const cors = require("cors");
const app = express()
const {Server} = require("socket.io")
require("dotenv").config()
require("./app/db/db")
app.use(cors())
app.use(express.json()); 

const error = require("./app/middleware/error");
const router = require("./app/router/router");
const PORT = 5000 || process.env.PORT;


app.use("/v1/api",router);

app.use(error)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

const io = new Server(4000,{
    cors: true,
  });

io.on("connection",(socket)=>{
    console.log(socket.id," Socket is connect")
    socket.emit("hello","World")

    socket.on("howdy",(arg)=>{
        console.log(arg)
    })
})