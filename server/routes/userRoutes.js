const express = require("express");
const router = express.Router();
const { updateInfo, updatePassword } = require('../controllers/userController')

router.put('/updateInfo', updateInfo)
router.post('/updatePassword', updatePassword)

module.exports = router;
