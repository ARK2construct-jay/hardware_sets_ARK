const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

userSchema.methods.comparePassword = async function(password) {
  return this.password === password;
};

module.exports = mongoose.model('User', userSchema, 'userdetail');