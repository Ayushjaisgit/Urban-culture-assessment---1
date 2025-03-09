const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" })
mongoose.set('strictQuery', false)

async function connectToDatabase() {
  try {
    const connectRes = await mongoose.connect(process.env.MONGODB_URI);
    if (connectRes) {
      console.log("Connected to mongodb");
    } else {
      throw error;
    }
  } catch (error) {
    console.error('Error in Database Connection', error)
  }
}
connectToDatabase()
module.exports = connectToDatabase