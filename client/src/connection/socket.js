const io = require('socket.io-client');

let URL = "http://localhost:8080";
const socket = io(URL);

export default socket;
