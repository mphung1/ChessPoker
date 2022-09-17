const express = require("express");
const router = express.Router();
const User = require("../models/User");
const generateToken = require("../config/generateToken");

router.get("/", function (req,res) {
    res.status(200).send("hello world")
});

router.post("/api/register", async function (req,res) {
    console.log(req.body);
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })

      res.json({status: 'ok'})

    } catch(err) {
      console.log(err);
      res.json({status: 'error', error: 'Duplicate Email'})
    }
});

router.post("/api/login", async function (req,res) {
      const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
      })

      if (user) {
        const token = generateToken(user.name, user.email)

        return res.json({ status: 'ok', user: token })
      } else {
        return res.json({ status: 'error', user: false })
      }
      res.json({status: 'ok'})

});

module.exports = router;
