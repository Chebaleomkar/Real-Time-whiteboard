const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(http);
const socketIO = require('socket.io')
const io = socketIO(server);

app.get('/' , (req, res)=>{
    const indexhtmlFile = path.join(__dirname , 'index.html');
    res.sendFile(indexhtmlFile);
})

var user = 0;
io.on("connection", (socket)=>{
    console.log("Connected " + user + " users")
    user++;

    socket.on('disconnect' , ()=>{
        console.log("Disconnect")
        user--;
    })
})

server.listen(8000 , ()=>{
    console.log('server started once again');
})