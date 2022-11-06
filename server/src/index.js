const express = require("express");
const cors = require("cors");
const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
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

let users = []

const messages = {
  general: [],
  random: [],
  move: [],
}

io.on('connection', (socket) => {
    socket.on('message', (message) => {
      // console.log(message);
      io.emit('message', `${socket.id.substr(0,2)} said ${message}`);
    });

    socket.on('join server', (username) => {
      const user = {
        username,
        id: socket.id,
      }
      users.push(user);
      io.emit("new user", users)
    });

    socket.on('join room', (roomName, cb) => {
      socket.join(roomName)
      cb(messages[roomName])
      // socket.emit('joined', messages[roomName])
    });

    socket.on('send message', ({ content, to, sender, chatName, isChannel }) => {
      if (isChannel) {
        const payload = {
          content,
          chatName,
          sender
        };
        socket.to(to).emit('new message', payload)
      } else {
        const payload = {
          content,
          chatName: sender,
          sender
        };
        socket.to(to).emit('new message', payload)
      }
      if (messages[chatName]) {
        messages[chatName].push({
          sender,
          content
        });
      }
    });

    socket.on('disconnect', () => {
      users = users.filter(u => u.id !== socket.id);
      io.emit('new user', users)
    })
});

app.use(cors());
app.use(express.json());

const session = require('express-session');
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'secret_key_123'
}));

app.use(passport.initialize())
app.use(passport.session())

app.use(authRoutes);
app.use(userRoutes);

connectDB();

httpServer.listen(port, () => console.log(`listening on port ${port}`))
