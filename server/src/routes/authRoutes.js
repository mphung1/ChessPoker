const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/User");
const generateToken = require("../config/generateToken");

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

router.post("/api/auth/register", async function (req,res) {
    console.log(req.body);
    try {
      const newPassword = await bcrypt.hash(req.body.password, saltRounds);
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: newPassword,
      })

      res.json({status: 'ok'})

    } catch(err) {
      console.log(err);
      res.json({status: 'error', error: 'Duplicate Email'})
    }
});

router.post("/api/auth/login", async function (req,res) {
      const user = await User.findOne({
        email: req.body.email,
        // password: req.body.password
      })
      if (!user) {
        return { status: 'error', err: 'Failed login attempt' }
      }

      const isValidPassword = matchPassword(req.body.password)

      if (isValidPassword) {
        const token = generateToken(user.name, user.email)

        return res.json({ status: 'ok', user: token })
      } else {
        return res.json({ status: 'error', user: false })
      }

      res.json({status: 'ok'})
});

module.exports = router;
