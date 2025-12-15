const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function clearUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hardware_selection');
    await User.deleteMany({});
    console.log('All users cleared!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

clearUsers();