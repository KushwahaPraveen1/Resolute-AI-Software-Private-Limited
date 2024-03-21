const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = 5000;

let comments = [];

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.emit('comments', comments);

    socket.on('comment', (newComment) => {
        comments.push(newComment);
        io.emit('comment', newComment);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
