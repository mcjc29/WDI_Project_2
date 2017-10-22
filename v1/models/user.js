const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, minlength: 2, required: true, trim: true },
  lastName: { type: String, minlength: 2, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  username: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
