const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  chips: {
    type: Number,
    default: 10000
  },
  image: {
    type: String,
    default: './default_user.png'
  }
})

User.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', User)
