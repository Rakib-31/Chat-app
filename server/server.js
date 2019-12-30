const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '/../public');


const port = process.env.PORT || 3000;

let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', generateMessage('admin','welcome to the chat room'));

    socket.broadcast.emit('newMessage', generateMessage('admin','new user connected'));

    socket.on('createMessage', (message, callback) => {
        console.log('create message ', message);
        io.emit('newMessage', generateMessage(message.from, message.text));

        callback('this is the server');
    
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', `${coords.lat},${coords.long}`));
    })

    socket.on('disconnect', () => {
        console.log('user was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server running on  port ${port}`);
});
