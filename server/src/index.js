const express = require("express");
const cors = require("cors");
const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes')
const connectDB = require('./config/db');
const SocketIO = require('socket.io');
const { notFound, errorHandler } = require('./middleware/error');
dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const port = 8080 || process.env.PORT;

const io = SocketIO(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
    socket.on('message', (message) => {
      console.log(message);
      io.emit('message', `${socket.id.substr(0,2)} said ${message}`);
    });
});

// app.use(cors({ origin: true, credentials: true }));
app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(userRoutes);

connectDB();

httpServer.listen(port, () => console.log(`listening on port ${port}`))
