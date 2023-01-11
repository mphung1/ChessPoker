const db = require('../config/db');
const jwt = require('jsonwebtoken');

const updateInfo = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("User is not logged in!")

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    db.query("UPDATE users SET ? WHERE id = ?",
      [req.body, userInfo.id],
      (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data)
    });
  });
}

const updatePassword = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("User is not logged in!")

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {

  });
}

module.exports = { updateInfo, updatePassword }
