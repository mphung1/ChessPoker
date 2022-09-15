const mongoose = require ('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      userCreateIndex: true,
    })
    console.log('Connected.');

  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}

module.exports = connectDB
