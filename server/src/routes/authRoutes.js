const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const generateToken = require("../config/generateToken");

const saltRounds = 10;

router.post("/api/auth/register", async function (req,res) {
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

      // const isValidPassword = matchPassword(req.body.password)
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      )

      if (isValidPassword) {
        const token = jwt.sign(
          {name: user.name, email: user.email},
          'secret_key_123'
        )

        return res.json({ status: 'ok', user: token })
      } else {
        return res.json({ status: 'error', user: false })
      }
      res.json({status: 'ok'})
});

router.get('/api/auth/logout', async function(req, res) {
  res.clearCookie('token', { path: '/' })
  res.status(200).send('User Logout')
});

router.get("/api/auth/logged-user", async function(req, res) {
});

module.exports = router;
