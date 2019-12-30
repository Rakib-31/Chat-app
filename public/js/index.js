let socket = io();
socket.on('connect',() => {
    console.log('connencted to server');
});

socket.on('newMessage', (message) => {
    console.log('new message ', message);
});

socket.on('disconnect',() => {
    console.log('disconnencted from server');
});

socket.emit('createMessage', {
    from: tom,
    text: 'multipe text'
    },

    function (message) {
        console.log('got it...');
})