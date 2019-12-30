let socket = io();
socket.on('connect',() => {
    console.log('connencted to server');
});

socket.on('newMessage', (message) => {
    console.log('new message ', message);
    let li = document.createElement('li');
    li.innerHTML = `${message.from}: ${message.text}`
    document.querySelector('body').appendChild(li);
});

socket.on('newLocationMessage', (message) => {
    console.log('new location message ', message);
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('target', '_blank');
    a.setAttribute('href',message.url);
    a.innerText = 'Mu current location';
    li.appendChild(a);

    document.querySelector('body').appendChild(li);
});

document.querySelector('#submit-btn').addEventListener('click', function(e) {
    e.preventDefault();

    socket.emit("createMessage", {
        from: "User",
        text: document.querySelector('input[name="message"]').value
    }, function() {})
});

document.querySelector('#send-location').addEventListener('click', function(e) {
    if(!navigator.geolocation) {
        return alert('geolocation is not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage',{
            lat: position.coords.latitude,
            long: position.coords.longitude
        })
    }, function() {
        alert('Unable to fetch location');
    })
})

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