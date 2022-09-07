const express = require("express");
const cors = require("cors");
const app = express();

const http = require('http')
const server = http.createServer(app)
const port = 8080 || process.env.PORT;

const {Server} = require('socket.io')
const io = new Server(server)

//middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send("hello world")
})

app.get('/chat', (req, res) => {

})

io.on('connection', (socket) => {
    console.log('user connected.')
})

//db

server.listen(port, () => console.log(`listening on port ${port}`))
