const express = require("express");
const session = require('cookie-session');
const cors = require("cors");
const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');
const SocketIO = require('socket.io');
dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 8080;

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
    socket.on('message', (msg) => {
      console.log('Message from client: ' + msg);
      io.emit('message', 'I am server');
    });

    socket.on('move', (move) => {
      io.emit('lastMove', move)
    })

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
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'secret_key_123'
}));

app.use(authRoutes);
app.use(userRoutes);

connectDB();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

httpServer.listen(PORT, () => console.log(`listening on port ${PORT}`))
