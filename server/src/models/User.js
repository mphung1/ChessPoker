const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.Schema(
  {
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
      required: true,
      unique: true
    },
    chips: {
      type: Number,
      default: 10000
    },
    ratings: {
      bughouse: {
        type: Number,
        default: 1500
      },
      chesspoker: {
        type: Number,
        default: 1500
      },
    },
    scores: {
      bughouse_wins: {
        type: Number,
        default: 0
      },
      bughouse_losses: {
        type: Number,
        default: 0
      },
      chesspoker_wins: {
        type: Number,
        default: 0
      },
      chesspoker_losses: {
        type: Number,
        default: 0
      },
    },
    image: {
      type: String,
      default: 'https://static.thenounproject.com/png/5034901-200.png'
    }
  },
 {
   collection: 'user-data'
 })

User.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('UserData', User)
