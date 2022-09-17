const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// process.env.JWT_SECRET_KEY
const generateToken = (id) => {
  return jwt.sign({id}, "secret_key_123", {
    expiresIn: '1d',
  })
}

module.exports = generateToken
