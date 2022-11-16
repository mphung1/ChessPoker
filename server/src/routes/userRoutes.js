const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateToken = require("../config/generateToken");

router.get("/", function (req,res) {
    res.status(200).send("hello world")
});

router.get("/api/user/top-bughouse-ratings", async function (req, res) {
  try {
    const users = await User.find({}, { _id: 0, name: 1, bughouse_rating: 1 }).sort( { bughouse_rating: -1 } ).limit(5)

    return res.json({ status: 'ok', users })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err: 'top bughouse ratings are not available' })
  }
});

router.get("/api/user/top-chesspoker-ratings", async function (req, res) {
  try {
    const users = await User.find({}, { _id: 0, name: 1, chesspoker_rating: 1 }).sort( { chesspoker_rating: -1 } ).limit(5)

    return res.json({ status: 'ok', users })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err: 'top chesspoker ratings are not available' })
  }
});

router.get("/api/user/info", async function (req, res) {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, "secret_key_123")
    const email = decoded.email
    const user = await User.findOne({ email: email })

    return res.json({
      status: 'ok',
      name: user.name,
      email: user.email,
      image: user.image,
      chips: user.chips
    })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err: 'invalid token' })
  }}
);

router.get("/api/user/ratings", async function (req, res) {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, "secret_key_123")
    const email = decoded.email
    const user = await User.findOne({ email: email })

    return res.json({
      status: 'ok',
      ratings: user.ratings
    })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err: 'invalid token' })
  }}
);

router.get("/api/user/scores", async function (req, res) {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, "secret_key_123")
    const email = decoded.email
    const user = await User.findOne({ email: email })

    return res.json({
      status: 'ok',
      scores: user.scores
    })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err: 'invalid token' })
  }}
);

router.post("/api/user/chips", async function (req,res) {
      const token = req.headers['x-access-token']

      try {
          const decoded = jwt.verify(token, "secret_key_123")
          const email = decoded.email
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
