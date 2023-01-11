const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

 const signUp = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("Email is already registered!")

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)

        db.query("INSERT INTO users (`email`, `password`, `username`) VALUES (?,?,?)",
        [email, hashedPassword, username],
        (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created.")
        });
    });
};

 const logIn =  (req, res) => {
    const email = req.body.email
    const rememberMe = req.body.rememberMe

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0 ) return res.status(404).json("User not found!")

        const validatePassword = bcrypt.compareSync(req.body.password, data[0].password)

        if (!validatePassword)
          return res.status(400).json("Incorrect password or username!")

        const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET_KEY)

        const { password, ...info } = data[0]

        if (rememberMe === true) {
          const oneWeek = 7 * 24 * 3600 * 1000;
          res.cookie("accessToken", token, {
            httpOnly: true,
            expires: new Date(Date.now() + oneWeek),
          }).status(200).json(info)
        } else {
          res.cookie("accessToken", token, {
              httpOnly: true,
          }).status(200).json(info)
        };
    });
};

const logOut = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out.")
};

module.exports = { signUp, logIn, logOut }
