const express = require("express");
const passport = require('passport');
const initializePassport = require('./passport.config');
initializePassport(passport);
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require("cors");
const morgan = require("morgan");
const db = require("./config/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}));
app.use(cors({
	credentials: true,
	origin: '*',
}));
app.use(cookieParser())

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

app.use((req, res) => {
	res.status(404).json({ status: 'Not Found' });
});

app.use((err, req, res, next) => {
	if (err.status === 401) {
		res.sendStatus(401);
	} else {
		logger.error(err);
		res.status(500).json({ status: 'Internal Server Error' });
	}
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`listening on port ${PORT}`))
