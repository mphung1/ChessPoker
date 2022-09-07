const io = require('socket.io-client');

const socket = io("localhost:8080");
console.log(socket);
