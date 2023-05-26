const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    //Sets up the URL
    res.sendFile(__dirname + '/index.html');

});
//Set up a socket (creates the socket)
io.on('connection', (socket) => {
    //Shows the ID of the Socket
    console.log(socket.id) 
    //Sets up a listener for the event chat message with a call back function
    socket.on('chat message', (msg) => {
        //Event to sent the message(msg) to every socket which is connected
        io.emit('chat message', msg);
    });
});

server.listen(3000, ()=> {
    console.log('listening on *:3000');
});
