const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  password : String,
  email: String,
  role: String,
});
module.exports = mongoose.model('User', UserSchema);
