const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');


const port = process.env.PORT || 3000;

let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', {
        from: 'admin',
        text: 'welcome to the chat room'
    });

    socket.broadcast.emit('newMessage', {
        from: 'admin',
        text: 'new user connected'
    });

    socket.on('createMessage', (message) => {
        console.log('create message ', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text
        })
    });

    socket.on('disconnect', () => {
        console.log('user was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server running on  port ${port}`);
});
