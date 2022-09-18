const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateToken = require("../config/generateToken");

router.get("/", function (req,res) {
    res.status(200).send("hello world")
});

router.get("/api/user/chips", async function (req,res) {
      const token = req.headers['x-access-token']

      try {
          const decoded = jwt.verify(token, "secret_key_123")
          const email = decode.email
          const user = await User.findOne({ email: email })

          return res.json({ status: 'ok', chips: user.chips })
      } catch (err) {
          console.log(err)
          res.json({ status: 'error', err: 'invalid token' })
      }
});

router.post("/api/user/chips", async function (req,res) {
      const token = req.headers['x-access-token']

      try {
          const decoded = jwt.verify(token, "secret_key_123")
          const email = decode.email
          await User.updateOne(
            { email: email },
            { $set: { chips: req.body.chips }}
          )

          return { status: 'ok' }
      } catch (err) {
          console.log(err)
          res.json({ status: 'error', err: 'invalid token' })
      }
});

module.exports = router;
