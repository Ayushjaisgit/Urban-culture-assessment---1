const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  user_name: {
    type: String,
    Required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('user', UserSchema)
