const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = 3000;

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    res.sendFile(filePath);
});

var user = [];

io.on('connection', function (socket) {
    user.push(socket);
    console.log(`${socket.id} has connected`);

    socket.on('draw', (data) => {
        user.forEach(con => {
            if (con.id !== socket.id) {
                con.emit('ondraw', { x: data.x, y: data.y });
            }
        });
    });

    socket.on('down', (data) => {
        user.forEach((con) => {
            if (con.id !== socket.id) {
                con.emit('ondown', { x: data.x, y: data.y });
            }
        });
    });

    socket.on('disconnect', () => {
        console.log(`${socket.id} is Disconnected`);
        user = user.filter((con) => con.id !== socket.id);
    });
});

server.listen(port, () => {
    console.log(`Server is started on http://localhost:${port}`);
});
