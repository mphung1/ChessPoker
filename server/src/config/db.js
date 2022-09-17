const mongoose = require ('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/ChessDeck")
    console.log('Connected to mongodb');

  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}

module.exports = connectDB
